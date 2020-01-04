define(["require", "exports", "./Control", "./DataSource", "./fields/DataControlField", "./NumberPagingBar", "./Utility", "./Errors"], function (require, exports, Control_1, DataSource_1, DataControlField_1, NumberPagingBar_1, Utility_1, Errors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // namespace wuzhui {
    var GridViewRowType;
    (function (GridViewRowType) {
        GridViewRowType[GridViewRowType["Header"] = 0] = "Header";
        GridViewRowType[GridViewRowType["Footer"] = 1] = "Footer";
        GridViewRowType[GridViewRowType["Data"] = 2] = "Data";
        GridViewRowType[GridViewRowType["Paging"] = 3] = "Paging";
        GridViewRowType[GridViewRowType["Empty"] = 4] = "Empty";
    })(GridViewRowType = exports.GridViewRowType || (exports.GridViewRowType = {}));
    function findParentElement(element, parentTagName) {
        console.assert(element != null);
        console.assert(parentTagName != null);
        parentTagName = parentTagName.toUpperCase();
        let p = element.parentElement;
        while (p) {
            if (p.tagName == parentTagName)
                return p;
            p = p.parentElement;
        }
    }
    class GridViewRow extends Control_1.Control {
        constructor(rowType) {
            let element = document.createElement('tr');
            super(element);
            this._rowType = rowType;
        }
        get rowType() {
            return this._rowType;
        }
        get gridView() {
            if (this._gridView == null) {
                let gridViewElement = findParentElement(this.element, 'table');
                console.assert(gridViewElement != null);
                this._gridView = Control_1.Control.getControlByElement(gridViewElement);
                console.assert(this._gridView != null);
            }
            return this._gridView;
        }
        get cells() {
            let cells = new Array();
            for (let i = 0; i < this.element.cells.length; i++) {
                let cell = Control_1.Control.getControlByElement(this.element.cells[i]);
                console.assert(cell != null);
                cells[i] = cell;
            }
            return cells;
        }
    }
    exports.GridViewRow = GridViewRow;
    class GridViewDataRow extends GridViewRow {
        constructor(gridView, dataItem) {
            super(GridViewRowType.Data);
            this._dataItem = dataItem;
            for (var i = 0; i < gridView.columns.length; i++) {
                var column = gridView.columns[i];
                var cell = column.createItemCell(dataItem);
                cell.visible = column.visible;
                this.appendChild(cell);
            }
        }
        get dataItem() {
            return this._dataItem;
        }
    }
    exports.GridViewDataRow = GridViewDataRow;
    class GridView extends Control_1.Control {
        constructor(params) {
            super(params.element || document.createElement('table'));
            this.emptyDataHTML = '暂无记录';
            this.initDataHTML = '数据正在加载中...';
            this.loadFailHTML = '加载数据失败，点击重新加载。';
            //========================================================
            // 样式
            // headerStyle: string;
            // footerStyle: string;
            // rowStyle: string;
            // alternatingRowStyle: string;
            //private emptyDataRowStyle: string;
            //========================================================
            this.rowCreated = Utility_1.callbacks();
            params = Object.assign({
                showHeader: true, showFooter: false,
                allowPaging: false
            }, params);
            this._params = params;
            this._columns = params.columns || [];
            if (this._columns.length == 0)
                throw Errors_1.Errors.columnsCanntEmpty();
            for (var i = 0; i < this._columns.length; i++) {
                var column = this._columns[i];
                column.gridView = this;
            }
            this._dataSource = params.dataSource;
            this._dataSource.selected.add((sender, e) => this.on_selectedExecuted(e));
            this._dataSource.updated.add((sender, item) => this.on_updateExecuted(item));
            this._dataSource.inserted.add((sender, item, index) => this.on_insertExecuted(item, index));
            this._dataSource.deleted.add((sender, item) => this.on_deleteExecuted(item));
            this._dataSource.selecting.add((sender, e) => {
                let display = this._emtpyRow.element.style.display;
                if (display != 'none') {
                    this._emtpyRow.element.cells[0].innerHTML = this.initDataHTML;
                }
            });
            this._dataSource.error.add((sender, e) => {
                if (e.method == 'select') {
                    this.renderDataItems([]);
                    var element = this._emtpyRow.cells[0].element;
                    element.innerHTML = this.loadFailHTML;
                    element.onclick = () => {
                        this._dataSource.select(this.selectArguments);
                    };
                    e.handled = true;
                    console.error(e.message);
                    console.log(e.stack);
                }
            });
            if (params.showHeader) {
                this._header = new Control_1.Control(document.createElement('thead'));
                this.appendChild(this._header);
                this.appendHeaderRow();
            }
            this.emptyDataHTML = params.emptyDataHTML || this.emptyDataHTML;
            this.initDataHTML = params.initDataHTML || this.initDataHTML;
            this._body = new Control_1.Control(document.createElement('tbody'));
            this.appendChild(this._body);
            this.appendEmptyRow();
            let allowPaging = params.pageSize;
            if (params.showFooter || allowPaging) {
                this._footer = new Control_1.Control(document.createElement('tfoot'));
                this.appendChild(this._footer);
                if (params.showFooter)
                    this.appendFooterRow();
                if (allowPaging) {
                    this.createPagingBar(params.pagerSettings);
                    this.pagingBar.selectArguments.maximumRows = params.pageSize;
                }
            }
            this.selectArguments = this.pagingBar ? this.pagingBar.selectArguments : new DataSource_1.DataSourceSelectArguments();
            this.dataSource.select(this.selectArguments);
        }
        createPagingBar(pagerSettings) {
            var pagingBarContainer = document.createElement('tr');
            var pagingBarElement = document.createElement('td');
            pagingBarElement.className = GridView.pagingBarClassName;
            pagingBarElement.colSpan = this.columns.length;
            pagingBarContainer.appendChild(pagingBarElement);
            console.assert(this._footer != null);
            this._footer.appendChild(pagingBarContainer);
            this.pagingBar = new NumberPagingBar_1.DataSourcePagingBar({ dataSource: this.dataSource, element: pagingBarElement, pagerSettings });
        }
        get columns() {
            return this._columns;
        }
        get dataSource() {
            return this._dataSource;
        }
        appendEmptyRow() {
            this._emtpyRow = new GridViewRow(GridViewRowType.Empty);
            this._emtpyRow.element.className = GridView.emptyRowClassName;
            let cell = new DataControlField_1.GridViewCell();
            cell.element.colSpan = this.columns.length;
            if (!this._params.emptyDataRowStyle) {
                Utility_1.applyStyle(cell.element, this._params.emptyDataRowStyle);
            }
            this._emtpyRow.appendChild(cell);
            this._body.appendChild(this._emtpyRow);
            Utility_1.fireCallback(this.rowCreated, this, { row: this._emtpyRow });
        }
        appendDataRow(dataItem, index) {
            var row = new GridViewDataRow(this, dataItem);
            row.element.className = GridView.dataRowClassName;
            this._body.appendChild(row, index);
            let cells = row.cells;
            for (let j = 0; j < cells.length; j++) {
                let cell = cells[j];
                if (cell.render != null) {
                    cell.render(dataItem);
                }
            }
            Utility_1.fireCallback(this.rowCreated, this, { row });
            if (this._emtpyRow.element.style.display != 'none')
                this.hideEmptyRow();
            return row;
        }
        on_sort(sender, args) {
            if (this._currentSortCell != null && this._currentSortCell != sender) {
                this._currentSortCell.clearSortIcon();
            }
            this._currentSortCell = sender;
        }
        appendHeaderRow() {
            var row = new GridViewRow(GridViewRowType.Header);
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                let cell = column.createHeaderCell();
                if (cell instanceof DataControlField_1.GridViewHeaderCell) {
                    cell.sorting.add((e, a) => this.on_sort(e, a));
                }
                row.appendChild(cell);
                cell.visible = this.columns[i].visible;
            }
            this._header.appendChild(row);
        }
        appendFooterRow() {
            var row = new GridViewRow(GridViewRowType.Footer);
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                let cell = column.createFooterCell();
                row.appendChild(cell);
                cell.visible = column.visible;
            }
            this._footer.appendChild(row);
        }
        renderDataItems(items) {
            var rows = this._body.element.querySelectorAll(`.${GridView.dataRowClassName}`);
            for (let i = 0; i < rows.length; i++)
                this._body.element.removeChild(rows[i]);
            if (items.length == 0) {
                this.showEmptyRow();
                return;
            }
            for (let i = 0; i < items.length; i++) {
                this.appendDataRow(items[i]);
            }
        }
        on_selectedExecuted(e) {
            let dataItems = e.dataItems;
            if (this._params.translate) {
                dataItems = this._params.translate(dataItems);
            }
            this.renderDataItems(dataItems);
        }
        on_updateExecuted(item) {
            console.assert(item != null);
            let dataItems = [];
            for (let i = 0; i < this._body.element.rows.length; i++) {
                let row_element = this._body.element.rows[i];
                let row = Control_1.Control.getControlByElement(row_element);
                ;
                if (!(row instanceof GridViewDataRow))
                    continue;
                let dataItem = row.dataItem;
                dataItems.push(dataItem);
                if (!this.dataSource.isSameItem(dataItem, item))
                    continue;
                if (dataItem != item) {
                    Object.assign(dataItem, item);
                }
                let cells = row.cells;
                for (let j = 0; j < cells.length; j++) {
                    let cell = cells[j];
                    if (cell instanceof DataControlField_1.GridViewDataCell) {
                        cell.render(dataItem);
                    }
                }
                // break;
            }
            if (this._params.translate) {
                dataItems = this._params.translate(dataItems);
                this.renderDataItems(dataItems);
            }
        }
        on_insertExecuted(item, index) {
            if (index == null)
                index = 0;
            if (!this._params.translate) {
                this.appendDataRow(item, index);
                return;
            }
            let dataItems = [item];
            for (let i = 0; i < this._body.element.rows.length; i++) {
                let row_element = this._body.element.rows[i];
                let row = Control_1.Control.getControlByElement(row_element);
                ;
                if (!(row instanceof GridViewDataRow))
                    continue;
                let dataItem = row.dataItem;
                dataItems.push(dataItem);
            }
            dataItems = this._params.translate(dataItems);
            this.renderDataItems(dataItems);
        }
        on_deleteExecuted(item) {
            let rows = this._body.element.rows;
            let dataRows = new Array();
            for (let i = 0; i < rows.length; i++) {
                let row = Control_1.Control.getControlByElement(rows.item(i));
                if ((row instanceof GridViewDataRow))
                    dataRows.push(row);
            }
            if (this._params.translate) {
                let dataItems = dataRows.map(o => o.dataItem)
                    .filter(o => !this.dataSource.isSameItem(o, item));
                dataItems = this._params.translate(dataItems);
                this.renderDataItems(dataItems);
                return;
            }
            for (let i = 0; i < dataRows.length; i++) {
                let dataRow = dataRows[i];
                if (!this.dataSource.isSameItem(item, dataRow.dataItem))
                    continue;
                dataRow.element.remove();
                if (dataRows.length == 1)
                    this.showEmptyRow();
            }
        }
        showEmptyRow() {
            this._emtpyRow.element.cells[0].innerHTML = this.emptyDataHTML;
            this._emtpyRow.element.style.removeProperty('display');
        }
        hideEmptyRow() {
            this._emtpyRow.element.style.display = 'none';
        }
    }
    exports.GridView = GridView;
    GridView.emptyRowClassName = 'empty';
    GridView.dataRowClassName = 'data';
    GridView.pagingBarClassName = 'pagingBar';
});
// }
