
/// <reference path="WebControl.ts"/>

namespace wuzhui {
    export enum GridViewRowType {
        Header,
        Footer,
        Data,
        Paging
    }

    export class GridViewRow extends Control {
        private _rowType: GridViewRowType;

        constructor(rowType: GridViewRowType) {
            let element = document.createElement('TR');
            super(element);
            this._rowType = rowType;
        }

        protected createCell(): Control {
            var cell = new Control(document.createElement('TD'));
            return cell;
        }

        get rowType() {
            return this._rowType;
        }
    }

    class GridViewDataRow extends GridViewRow {
        constructor(gridView: GridView, dataItem: any) {
            super(GridViewRowType.Data);

            for (var i = 0; i < gridView.columns.length; i++) {
                var column = gridView.columns[i];
                var cell = this.createCell();
                this.appendChild(cell);
                cell.html = column.cellHtml(dataItem);
                if (column.itemStyle)
                    cell.style(column.itemStyle);
            }
        }
    }

    export class GridView extends Control {
        private _pageSize: number;
        private _selectedRowStyle: string;
        private _showFooter: boolean;
        private _showHeader: boolean;
        private _columns: Array<DataControlField>;
        private dataSource: DataSource;
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

            this._columns = params.columns;
            this.dataSource = params.dataSource;
            this.dataSource.selected.add((sender, e) => this.on_selectExecuted(e.items, e.selectArguments));
            //this.pagerSettings = new PagerSettings();

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

        /** 
         * Gets a reference to the TableItemStyle object that allows you to set the appearance of the selected row in a GridView control. 
         */
        get pageSize(): number {
            return this._pageSize;
        }
        /**
         * Sets a reference to the TableItemStyle object that allows you to set the appearance of the selected row in a GridView control.
         */
        set pageSize(value: number) {
            this._pageSize = value;
        }

        // get selectedRowStyle(): string {
        //     return this._selectedRowStyle;
        // }
        // set selectedRowStyle(value: string) {
        //     this._selectedRowStyle = value;
        // }

        get columns() {
            return this._columns;
        }
        // set columns(value) {
        //     this._columns = value;
        // }

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
                let cell = this.createCell();
                cell.html = column.headerText;
                if (this.columns[i].headerStyle)
                    cell.style(this.columns[i].headerStyle);

                row.appendChild(cell);
                cell.visible = this.columns[i].visible;
            }
            this._header.appendChild(row);
        }

        private appendFooterRow() {
            var row = new GridViewRow(GridViewRowType.Footer);
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                let cell = this.createCell();
                cell.html = column.footerText;
                if (this.columns[i].footerStyle)
                    cell.style(this.columns[i].footerStyle);

                row.appendChild(cell);
            }
            this._footer.appendChild(row);
        }

        private createCell() {
            let cell = new Control(document.createElement('TD'));
            return cell;
        }

        private on_selectExecuted(items: Array<any>, args: DataSourceSelectArguments) {
            this._body.element.innerHTML = "";
            for (let i = 0; i < items.length; i++) {
                this.appendDataRow(items[i]);
            }
        }
    }
}