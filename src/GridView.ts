
namespace wuzhui {
    export enum GridViewRowType {
        Header,
        Footer,
        Data,
        Paging,
        Empty
    }

    function findParentElement(element: HTMLElement, parentTagName: string) {
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

    export class GridViewRow extends Control<HTMLTableRowElement> {
        private _rowType: GridViewRowType;
        private _gridView: GridView<any>;

        constructor(rowType: GridViewRowType) {
            let element = document.createElement('tr');
            super(element);
            this._rowType = rowType;
        }

        get rowType() {
            return this._rowType;
        }

        get gridView(): GridView<any> {
            if (this._gridView == null) {
                let gridViewElement = findParentElement(this.element, 'table');
                console.assert(gridViewElement != null);
                this._gridView = <GridView<any>>Control.getControlByElement(gridViewElement);
                console.assert(this._gridView != null);
            }
            return this._gridView;
        }

        get cells(): GridViewCell[] {
            let cells = new Array<GridViewCell>();
            for (let i = 0; i < this.element.cells.length; i++) {
                let cell = Control.getControlByElement(this.element.cells[i] as HTMLTableCellElement) as GridViewCell;
                console.assert(cell != null);
                cells[i] = cell;
            }
            return cells;
        }
    }

    export class GridViewDataRow extends GridViewRow {
        private _dataItem;
        constructor(gridView: GridView<any>, dataItem: any) {
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

    export interface GridViewArguments<T> {
        dataSource: DataSource<T>,
        columns: Array<DataControlField<T>>,
        showHeader?: boolean,
        showFooter?: boolean,
        element?: HTMLTableElement,
        emptyDataRowStyle?: string,
        // allowPaging?: boolean,
        pageSize?: number,
        pagerSettings?: PagerSettings,
        emptyDataHTML?: string,
        initDataHTML?: string
    }

    export class GridView<T> extends Control<HTMLTableElement> {
        private _pageSize: number;
        private _selectedRowStyle: string;
        private _showFooter: boolean;
        private _showHeader: boolean;
        private _columns: Array<DataControlField<T>>;
        private _dataSource: DataSource<T>;
        private _header: Control<HTMLTableSectionElement>;
        private _footer: Control<HTMLTableSectionElement>;
        private _body: Control<HTMLTableSectionElement>;
        private _emtpyRow: GridViewRow;
        private _currentSortCell: GridViewHeaderCell<T>;
        private _params: GridViewArguments<T>;
        static emptyRowClassName = 'empty';
        static dataRowClassName = 'data';
        static pagingBarClassName = 'pagingBar';

        private emptyDataHTML = '暂无记录';
        private initDataHTML = '数据正在加载中...';
        private loadFailHTML = '加载数据失败，点击重新加载。';
        //========================================================
        // 样式
        // headerStyle: string;
        // footerStyle: string;
        // rowStyle: string;
        // alternatingRowStyle: string;
        //private emptyDataRowStyle: string;
        //========================================================

        rowCreated = callbacks<GridView<T>, { row: GridViewRow }>();

        constructor(params: GridViewArguments<T>) {

            super(params.element || document.createElement('table'));

            params = Object.assign({
                showHeader: true, showFooter: false,
                allowPaging: false
            }, params);
            this._params = params;
            this._columns = params.columns || [];
            if (this._columns.length == 0)
                throw Errors.columnsCanntEmpty();

            for (var i = 0; i < this._columns.length; i++) {
                var column = this._columns[i];
                column.gridView = this;
            }

            this._dataSource = params.dataSource;
            this._dataSource.selected.add((sender, e) => this.on_selectExecuted(e.dataItems));
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
                    this.on_selectExecuted([]);
                    var element = this._emtpyRow.cells[0].element;
                    element.innerHTML = this.loadFailHTML;
                    element.onclick = () => {
                        this._dataSource.select();
                    }
                    e.handled = true;
                    console.error(e.message);
                    console.log(e.stack)
                }
            })

            if (params.showHeader) {
                this._header = new Control(document.createElement('thead'));
                this.appendChild(this._header);
                this.appendHeaderRow();
            }

            this.emptyDataHTML = params.emptyDataHTML || this.emptyDataHTML;
            this.initDataHTML = params.initDataHTML || this.initDataHTML;

            this._body = new Control(document.createElement('tbody'));
            this.appendChild(this._body);

            this.appendEmptyRow();

            let allowPaging = params.pageSize;
            if (params.showFooter || allowPaging) {
                this._footer = new Control(document.createElement('tfoot'));
                this.appendChild(this._footer);

                if (params.showFooter)
                    this.appendFooterRow();

                if (allowPaging) {
                    this.createPagingBar(params.pagerSettings);
                    this.dataSource.selectArguments.maximumRows = params.pageSize;
                }
            }

            this.dataSource.select();
        }

        private createPagingBar(pagerSettings?: PagerSettings) {
            var pagingBarContainer = document.createElement('tr');
            var pagingBarElement = document.createElement('td');
            pagingBarElement.className = GridView.pagingBarClassName;
            pagingBarElement.colSpan = this.columns.length;
            pagingBarContainer.appendChild(pagingBarElement);
            console.assert(this._footer != null);
            this._footer.appendChild(pagingBarContainer);
            new wuzhui.NumberPagingBar({ dataSource: this.dataSource, element: pagingBarElement, pagerSettings });
        }

        get columns() {
            return this._columns;
        }

        get dataSource() {
            return this._dataSource;
        }

        private appendEmptyRow() {
            this._emtpyRow = new GridViewRow(GridViewRowType.Empty);
            this._emtpyRow.element.className = GridView.emptyRowClassName;

            let cell = new GridViewCell();
            cell.element.colSpan = this.columns.length;
            // cell.element.innerHTML = this.initDataHTML;
            if (!this._params.emptyDataRowStyle) {
                applyStyle(cell.element, this._params.emptyDataRowStyle);
            }
            this._emtpyRow.appendChild(cell);
            this._body.appendChild(this._emtpyRow);
            fireCallback(this.rowCreated, this, { row: this._emtpyRow });
        }

        public appendDataRow(dataItem: any, index?: number) {
            var row = new GridViewDataRow(this, dataItem);
            row.element.className = GridView.dataRowClassName;
            this._body.appendChild(row, index);

            let cells = row.cells;
            for (let j = 0; j < cells.length; j++) {
                let cell = cells[j];
                if (cell instanceof GridViewDataCell) {
                    let value = cell.dataField ? dataItem[cell.dataField] : dataItem;
                    if (value !== undefined) {
                        // cell.value = value;
                        cell.render(value);
                        dataItem[cell.dataField] = value;
                    }
                }
            }

            fireCallback(this.rowCreated, this, { row });
            if (this._emtpyRow.element.style.display != 'none')
                this.hideEmptyRow();

            return row;
        }

        private on_sort(sender: GridViewHeaderCell<T>, args: any) {
            if (this._currentSortCell != null && this._currentSortCell != sender) {
                this._currentSortCell.clearSortIcon();
            }
            this._currentSortCell = sender;
        }

        private appendHeaderRow() {
            var row = new GridViewRow(GridViewRowType.Header);
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                let cell = column.createHeaderCell();
                if (cell instanceof GridViewHeaderCell) {
                    (cell as GridViewHeaderCell<T>).sorting.add((e, a) => this.on_sort(e, a));
                }

                row.appendChild(cell);
                cell.visible = this.columns[i].visible;
            }
            this._header.appendChild(row);
        }

        private appendFooterRow() {
            var row = new GridViewRow(GridViewRowType.Footer);
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                let cell = column.createFooterCell();

                row.appendChild(cell);
                cell.visible = column.visible;
            }
            this._footer.appendChild(row);
        }

        private on_selectExecuted(items: Array<any>) {
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

        private on_updateExecuted(item: any) {
            console.assert(item != null);
            for (let i = 0; i < this._body.element.rows.length; i++) {
                let row_element = this._body.element.rows[i] as HTMLElement;
                let row = Control.getControlByElement(row_element) as GridViewRow;;
                if (!(row instanceof GridViewDataRow))
                    continue;


                let dataItem = (row as GridViewDataRow).dataItem;
                if (!this.dataSource.isSameItem(item, dataItem))
                    continue;

                let cells = row.cells;
                for (let j = 0; j < cells.length; j++) {
                    let cell = cells[j];
                    if (cell instanceof GridViewDataCell) {
                        let value = cell.dataField ? item[cell.dataField] : item;
                        if (value !== undefined) {
                            // cell.value = value;
                            cell.render(value);
                            dataItem[cell.dataField] = value;
                        }
                    }
                }

                break;

            }
        }

        private on_insertExecuted(item: any, index?: number) {
            if (index == null)
                index = 0;

            this.appendDataRow(item, index);
        }

        private on_deleteExecuted(item: any) {

            let dataRowsCount = 0;
            let rows = this._body.element.rows;
            let dataRows = new Array<GridViewDataRow>();
            for (let i = 0; i < rows.length; i++) {
                let row = Control.getControlByElement(rows.item(i)) as GridViewRow;
                if ((row instanceof GridViewDataRow))
                    dataRows.push(row);
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

        private showEmptyRow() {
            this._emtpyRow.element.cells[0].innerHTML = this.emptyDataHTML;
            this._emtpyRow.element.style.removeProperty('display');
        }

        private hideEmptyRow() {
            this._emtpyRow.element.style.display = 'none';
        }
    }
}