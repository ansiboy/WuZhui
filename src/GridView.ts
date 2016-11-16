/// <reference path="Control.ts"/>

namespace wuzhui {
    export enum GridViewRowType {
        Header,
        Footer,
        Data,
        Paging,
        Empty
    }

    export class GridViewRow extends Control<HTMLTableRowElement> {
        private _rowType: GridViewRowType;
        private _gridView: GridView;

        constructor(rowType: GridViewRowType) {
            let element = document.createElement('tr');
            super(element);
            this._rowType = rowType;
        }

        get rowType() {
            return this._rowType;
        }

        get gridView(): GridView {
            if (this._gridView == null) {
                let gridViewElement = $(this.element).parents('table').first()[0];
                console.assert(gridViewElement != null);

                this._gridView = <GridView>Control.getControlByElement(gridViewElement);
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
        constructor(gridView: GridView, dataItem: any) {
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

    export interface GridViewArguments {
        dataSource: DataSource<any>,
        columns: Array<DataControlField>,
        showHeader?: boolean,
        showFooter?: boolean,
        element?: HTMLTableElement,
        emptyDataRowStyle?: string
    }

    export class GridView extends Control<HTMLTableElement> {
        private _pageSize: number;
        private _selectedRowStyle: string;
        private _showFooter: boolean;
        private _showHeader: boolean;
        private _columns: Array<DataControlField>;
        private _dataSource: DataSource<any>;
        private _header: Control<HTMLTableSectionElement>;
        private _footer: Control<HTMLTableSectionElement>;
        private _body: Control<HTMLTableSectionElement>;
        private _emtpyRow: GridViewRow;
        private _currentSortCell: GridViewHeaderCell;
        private _params: GridViewArguments;
        static emptyRowClassName = 'empty';
        static dataRowClassName = 'data';

        emptyDataText = '暂无记录';

        //========================================================
        // 样式
        // headerStyle: string;
        // footerStyle: string;
        // rowStyle: string;
        // alternatingRowStyle: string;
        //private emptyDataRowStyle: string;
        //========================================================

        rowCreated = callbacks<GridView, { row: GridViewRow }>();

        constructor(params: GridViewArguments) {

            super(params.element || document.createElement('table'));

            params = $.extend({
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
            this._dataSource.selected.add((sender, e) => this.on_selectExecuted(e.items, e.selectArguments));
            this._dataSource.updated.add((sender, e) => this.on_updateExecuted(e.item));

            if (params.showHeader) {
                this._header = new Control(document.createElement('thead'));
                this.appendChild(this._header);
                this.appendHeaderRow();
            }

            this._body = new Control(document.createElement('tbody'));
            this.appendChild(this._body);

            this.appendEmptyRow();

            if (params.showFooter) {
                this._footer = new Control(document.createElement('tfoot'));
                this.appendChild(this._footer);

                if (params.showFooter)
                    this.appendFooterRow();
            }
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

            let cell = document.createElement('td');
            cell.colSpan = this.columns.length;
            let textElement = document.createElement('span');
            textElement.innerText = this.emptyDataText;
            cell.appendChild(textElement);
            if (!this._params.emptyDataRowStyle) {
                applyStyle(cell, this._params.emptyDataRowStyle);
            }
            this._emtpyRow.appendChild(cell);
            this._body.appendChild(this._emtpyRow);
            fireCallback(this.rowCreated, this, { row: this._emtpyRow });
        }

        private appendDataRow(dataItem: any) {
            var row = new GridViewDataRow(this, dataItem);
            row.element.className = GridView.dataRowClassName;

            this._body.appendChild(row);
            fireCallback(this.rowCreated, this, { row });
        }

        private on_sort(sender: GridViewHeaderCell, args: any) {
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
                    (cell as GridViewHeaderCell).sorting.add(this.on_sort);
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

        private on_selectExecuted(items: Array<any>, args: DataSourceSelectArguments) {
            // Clear datarows
            $(this._body.element).find(`.${GridView.dataRowClassName}`).each((i, e) => this._body.element.removeChild(e));

            if (items.length == 0) {
                this.showEmptyRow();
                return;
            }

            this.hideEmptyRow();
            for (let i = 0; i < items.length; i++) {
                this.appendDataRow(items[i]);
            }
        }

        private on_updateExecuted(item: any) {
            console.assert(item != null);
            for (let i = 0; i < this._body.element.rows.length; i++) {
                let row_element = this._body.element.rows[i];
                let row = $(row_element).data('Control') as GridViewRow;
                if (!(row instanceof GridViewDataRow))
                    continue;


                let dataItem = (row as GridViewDataRow).dataItem;
                if (!this.dataSource.isSameItem(item, dataItem))
                    continue;

                for (let i = 0; i < this.columns.length; i++) {
                    let col = this.columns[i] as BoundField;
                    if (!(col instanceof BoundField))
                        continue;

                    let cell = row.cells[i];
                    if (cell instanceof GridViewEditableCell) {
                        let c = cell as GridViewEditableCell;
                        let value = item[col.dataField];
                        if (value !== undefined) {
                            c.value = value;
                            dataItem[col.dataField] = value;
                        }
                    }
                }
                break;

            }
        }

        private showEmptyRow() {
            $(this._emtpyRow.element).show();
        }

        private hideEmptyRow() {
            $(this._emtpyRow.element).hide();
        }



    }
}