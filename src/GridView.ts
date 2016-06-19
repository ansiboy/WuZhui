namespace wuzhui {
    class GridView {
        private _pageSize: number;
        private _selectedRowStyle: string;
        private _showFooter: boolean;
        private _showHeader: boolean;
        private _columns;

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
    }
}