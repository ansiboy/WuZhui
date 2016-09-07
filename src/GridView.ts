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
        private _currentSortCell: BoundFieldHeaderCell;

        static emptyRowClassName = 'empty';
        static dataRowClassName = 'data';

        emptyDataText = '暂无记录';

        //========================================================
        // 样式
        headerStyle: string;
        footerStyle: string;
        rowStyle: string;
        alternatingRowStyle: string;
        emptyDataRowStyle: string;
        //========================================================

        rowCreated = callbacks<GridView, { row: GridViewRow }>();

        constructor(params: GridViewArguments) {

            super(document.createElement('table'));

            params = $.extend({
                showHeader: true, showFooter: false,
                allowPaging: false
            }, params);

            this._columns = params.columns || [];
            if (this._columns.length == 0)
                throw Errors.columnsCanntEmpty();

            for (var i = 0; i < this._columns.length; i++) {
                var column = this._columns[i];
                column.gridView = this;
            }

            this._dataSource = params.dataSource;
            this._dataSource.selected.add((sender, e) => this.on_selectExecuted(e.items, e.selectArguments));

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

        private on_sort(sender: BoundFieldHeaderCell, args: any) {
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
                if (cell instanceof BoundFieldHeaderCell) {
                    (cell as BoundFieldHeaderCell).sorting.add(this.on_sort);
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
            $(`.${GridView.dataRowClassName}`).each((i, e) => this._body.element.removeChild(e));

            if (items.length == 0) {
                this.showEmptyRow();
                return;
            }

            this.hideEmptyRow();
            for (let i = 0; i < items.length; i++) {
                this.appendDataRow(items[i]);
            }
        }

        private on_updateExecuted(items) {

        }

        private showEmptyRow() {
            $(this._emtpyRow.element).show();
        }

        private hideEmptyRow() {
            $(this._emtpyRow.element).hide();
        }

    }
}