
/// <reference path="WebControl.ts"/>

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

        constructor(rowType: GridViewRowType) {
            let element = document.createElement('TR');
            super(element);
            this._rowType = rowType;
        }

        // protected createCell(): Control {
        //     var cell = new Control(document.createElement('TD'));
        //     return cell;
        // }

        get rowType() {
            return this._rowType;
        }
    }

    export class GridViewCell extends Control {
        constructor() {
            super(document.createElement('TD'));
        }
    }

    class GridViewDataRow extends GridViewRow {
        constructor(gridView: GridView, dataItem: any) {
            super(GridViewRowType.Data);

            for (var i = 0; i < gridView.columns.length; i++) {
                var column = gridView.columns[i];
                var cell = column.createDataCell(dataItem);

                this.element.appendChild(cell.element);

                // if (column.itemStyle)
                //     cell.style(column.itemStyle);
            }
        }
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

        constructor(params: {
            dataSource: DataSource,
            columns: Array<DataControlField>,
            showHeader?: boolean,
            showFooter?: boolean,
        }) {

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

        get dataSource(){
            return this._dataSource;
        }

        private handleEdit(row) {

        }

        private handleInsert(row) {

        }

        private handlePage(pageIndex: number) {

        }

        private handleSelect(row) {

        }

        private handleSort(sortExpression, sortDirection) {

        }

        private handleUpdate(row) {

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

        private showEmptyRow() {
            var row = new GridViewRow(GridViewRowType.Empty);
            row.element.className = 'emtpy';
            this._body.appendChild(row);
        }

    }
}