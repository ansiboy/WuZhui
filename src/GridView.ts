
/// <reference path="WebControl.ts"/>

namespace wuzhui {
    abstract class GridViewRow extends WebControl {
        constructor() {
            let element = document.createElement('TR');
            super(element);
        }

        protected createCell(): WebControl {
            var cell = new WebControl(document.createElement('TD'));
            return cell;
        }
    }

    class GridViewHeaderRow extends GridViewRow {
    }

    class GridViewFooterRow extends GridViewRow {

    }

    class GridViewDataRow extends GridViewRow {
        constructor(gridView: GridView, dataItem: any) {
            super();

            for (var i = 0; i < gridView.columns.length; i++) {
                var column = gridView.columns[i];
                var cell = this.createCell();
                this.appendChild(cell);
                cell.html = column.cellHtml(dataItem);
            }
        }
    }

    export class GridView extends WebControl {
        private _pageSize: number;
        private _selectedRowStyle: string;
        private _showFooter: boolean;
        private _showHeader: boolean;
        private _columns: Array<DataControlField>;
        private dataSource: DataSource;
        private _header: WebControl;
        private _footer: WebControl;
        private _body: WebControl;

        //========================================================
        // 样式
        headerStyle: string;
        footerStyle: string;
        rowStyle: string;
        alternatingRowStyle: string;
        emptyDataRowStyle: string;
        //========================================================

        constructor(dataSource: DataSource, columns: Array<DataControlField>) {
            let element: HTMLElement = document.createElement('TABLE');
            super(element);

            this._columns = columns;
            this.dataSource = dataSource;
            this.dataSource.selected.add((sender, e) => this.on_select_executed(e.items, e.arguments));

            this._header = new WebControl(document.createElement('THEAD'));
            this._footer = new WebControl(document.createElement('TFOOT'));
            this._body = new WebControl(document.createElement('TBODY'));

            this.appendChild(this._header);
            this.appendChild(this._body);
            this.appendChild(this._footer);

            this.appendHeaderRow();
            this.appendFooterRow();
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

        get selectedRowStyle(): string {
            return this._selectedRowStyle;
        }
        set selectedRowStyle(value: string) {
            this._selectedRowStyle = value;
        }

        get showFooter(): boolean {
            return this._showFooter;
        }
        set showFooter(value: boolean) {
            this._showFooter = value;
        }

        get showHeader(): boolean {
            return this._showHeader;
        }
        set showHeader(value: boolean) {
            this._showHeader = value;
        }

        get columns() {
            return this._columns;
        }
        set columns(value) {
            this._columns = value;
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

        private createDataRow(dataItem: any) {
            var row = new GridViewDataRow(this, dataItem);
            return row;
        }

        private appendHeaderRow() {
            var row = new GridViewHeaderRow();
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                let cell = this.createCell();
                cell.html = column.headerText;
                row.appendChild(cell);
            }
            this._header.appendChild(row);
        }

        private appendFooterRow() {
            var row = new GridViewFooterRow();
            this._footer.appendChild(row);
        }

        private createCell() {
            let cell = new WebControl(document.createElement('TD'));
            return cell;
        }

        private on_select_executed(items: Array<any>, args: DataSourceSelectArguments) {
            this._body.element.innerHTML = "";
            for (let i = 0; i < items.length; i++) {
                let dataRow = this.createDataRow(items[i]);
                this.appendChild(dataRow);
            }
        }
    }
}