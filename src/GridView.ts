/// <reference path="Control.ts"/>

namespace wuzhui {
    export enum GridViewRowType {
        Header,
        Footer,
        Data,
        Paging,
        Empty
    }

    export class GridViewRow extends Control {
        private _rowType: GridViewRowType;
        private _gridView: GridView;

        constructor(rowType: GridViewRowType) {
            let element = document.createElement('TR');
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
        dataSource: DataSource,
        columns: Array<DataControlField>,
        showHeader?: boolean,
        showFooter?: boolean,
    }

    export class GridView extends Control {
        private _pageSize: number;
        private _selectedRowStyle: string;
        private _showFooter: boolean;
        private _showHeader: boolean;
        private _columns: Array<DataControlField>;
        private _dataSource: DataSource;
        private _header: Control;
        private _footer: Control;
        private _body: Control;

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

            super(document.createElement('TABLE'));

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
                this._header = new Control(document.createElement('THEAD'));
                this.appendChild(this._header);
                this.appendHeaderRow();
            }

            this._body = new Control(document.createElement('TBODY'));
            this.appendChild(this._body);

            if (params.showFooter) {
                this._footer = new Control(document.createElement('TFOOT'));
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

        private appendDataRow(dataItem: any) {
            var row = new GridViewDataRow(this, dataItem);
            this._body.appendChild(row);
            fireCallback(this.rowCreated, this, { row });
        }

        private appendHeaderRow() {
            var row = new GridViewRow(GridViewRowType.Header);
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                let cell = column.createHeaderCell();

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
            if (items.length == 0) {
                this.showEmptyRow();
                return;
            }
            this._body.element.innerHTML = "";
            for (let i = 0; i < items.length; i++) {
                this.appendDataRow(items[i]);
            }
        }

        private on_updateExecuted(items) {

        }

        private showEmptyRow() {
            var row = new GridViewRow(GridViewRowType.Empty);
            row.element.className = 'emtpy';
            this._body.appendChild(row);
        }

    }
}