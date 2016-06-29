
/// <reference path="WebControl.ts"/>

namespace wuzhui {
    class GridViewRow extends WebControl {
        constructor() {
            let element = document.createElement('TR');
            super(element);
        }

        protected createCell(): WebControl {
            var cell = new WebControl(document.createElement('TD'));
            return cell;
        }
    }

    class GridViewDataRow extends GridViewRow {
        constructor(gridView: GridView, dataItem: any) {
            super();

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
        private pagerSettings: PagerSettings;

        //========================================================
        // 样式
        headerStyle: string;
        footerStyle: string;
        rowStyle: string;
        alternatingRowStyle: string;
        emptyDataRowStyle: string;
        //========================================================

        constructor(params: {
            dataSource: DataSource,
            columns: Array<DataControlField>,
            showHeader?: boolean,
            showFooter?: boolean,
            allowPaging?: boolean
        }) {
            let element: HTMLElement = document.createElement('TABLE');
            super(element);

            params = $.extend({
                showHeader: true, showFooter: false,
                allowPaging: false
            }, params);

            this._columns = params.columns;
            this.dataSource = params.dataSource;
            this.dataSource.selected.add((sender, e) => this.on_selectExecuted(e.items, e.selectArguments));
            this.pagerSettings = new PagerSettings();

            if (params.showHeader) {
                this._header = new WebControl(document.createElement('THEAD'));
                this.appendChild(this._header);
                this.appendHeaderRow();
            }

            this._body = new WebControl(document.createElement('TBODY'));
            this.appendChild(this._body);

            // if (params.allowPaging) {

            // }

            if (params.showFooter || params.allowPaging) {
                this._footer = new WebControl(document.createElement('TFOOT'));
                this.appendChild(this._footer);

                if (params.showFooter)
                    this.appendFooterRow();

                if (params.allowPaging)
                    this.appendPagingBar();
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

        private createDataRow(dataItem: any) {
            var row = new GridViewDataRow(this, dataItem);
            return row;
        }

        private appendHeaderRow() {
            var row = new GridViewRow();
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
            var row = new GridViewRow();
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

        private appendPagingBar() {
            var row = new GridViewRow();
            var cell = this.createCell();
            row.appendChild(cell);
            cell.element.setAttribute('colSpan', <any>this.columns.length);

            var pagingBar = new NumberPagingBar(this.dataSource, this.pagerSettings, cell.element);
            pagingBar.render();

            this._footer.appendChild(row);
        }

        private createCell() {
            let cell = new WebControl(document.createElement('TD'));
            return cell;
        }

        private on_selectExecuted(items: Array<any>, args: DataSourceSelectArguments) {
            this._body.element.innerHTML = "";
            for (let i = 0; i < items.length; i++) {
                let dataRow = this.createDataRow(items[i]);
                this._body.appendChild(dataRow);
            }
        }
    }
}