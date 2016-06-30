namespace wuzhui {

    export interface DataControlFieldParams {
        footerText?: string,
        headerText?: string,
        nullText?: string,
        cellHtml?: (dataItem: any) => string;
        itemStyle?: string | CSSStyleDeclaration;
        headerStyle?: string | CSSStyleDeclaration;
        footerStyle?: string | CSSStyleDeclaration;
        visible?: boolean
    }

    export class DataControlField {
        private _footerText: string;
        private _headerText: string;
        private _nullText: string;
        private _cellHtml: (dataItem: any) => string;
        private _itemStyle: string | CSSStyleDeclaration;
        private _headerStyle: string | CSSStyleDeclaration;
        private _footerStyle: string | CSSStyleDeclaration;
        private _visible: boolean;
        private _gridView: GridView;

        constructor(params?: DataControlFieldParams) {
            params = $.extend({
                cellHtml: () => "",
                visible: true
            }, params);

            this._footerText = params.footerText;
            this._headerText = params.headerText;
            this._nullText = params.nullText;
            this._cellHtml = params.cellHtml;
            this._itemStyle = params.itemStyle;
            this._headerStyle = params.headerStyle;
            this._footerStyle = params.footerStyle;
            this._visible = params.visible;
        }

        /**
         * Gets the text that is displayed in the footer item of a data control field.
         */
        protected get footerText(): string {
            return this._footerText;
        }
        /**
         * Gets the text that is displayed in the header item of a data control field.
         */
        protected get headerText(): string {
            return this._headerText;
        }
        /**
         * Gets the caption displayed for a field when the field's value is null.
         */
        protected get nullText(): string {
            return this._nullText;
        }
        protected get itemStyle(): string | CSSStyleDeclaration {
            return this._itemStyle;
        }
        protected get footerStyle(): string | CSSStyleDeclaration {
            return this._footerStyle;
        }
        protected get headerStyle(): string | CSSStyleDeclaration {
            return this._headerStyle;
        }
        get visible(): boolean {
            return this._visible;
        }
        get gridView(): GridView {
            return this._gridView;
        }
        set gridView(value: GridView) {
            this._gridView = value;
        }
        createHeaderCell(): GridViewCell {
            let cell = new GridViewCell();
            cell.html = this.headerText || '';
            cell.style(this.headerStyle);

            return cell;
        }
        createFooterCell(): GridViewCell {
            let cell = new GridViewCell();
            cell.html = this.footerText || '';
            cell.style(this.footerStyle);

            return cell;
        }
        createDataCell(dataItem: any): GridViewCell {
            if (!dataItem)
                throw Errors.argumentNull('dataItem');

            let cell = new GridViewCell();
            cell.style(this.itemStyle);

            return cell;
        }
    }

    export interface CommandFieldParams extends DataControlFieldParams {
        showEditButton?: boolean,
        showInsertButton?: boolean,
        showDeleteButton?: boolean,
        showUpdateButton?: boolean
    }

    export class CommandField extends DataControlField {
        private params: CommandFieldParams;

        constructor(params?: CommandFieldParams) {
            super(params);
            this.params = params;
        }

        createDataCell(dataItem: any): GridViewCell {
            let cell = new GridViewCell();
            cell.style(this.itemStyle);
            if (this.params.showEditButton) {
                let editButton = this.createEditButton();
                editButton.style.marginRight = '4px';
                cell.appendChild(editButton);

                let updateButton = this.createUpdateButton();
                updateButton.style.display = 'none';
                updateButton.style.marginRight = '4px';
                cell.appendChild(updateButton);
            }
            if (this.params.showDeleteButton) {
                let deleteButton = this.createDeleteButton();
                deleteButton.style.marginRight = '4px';
                cell.appendChild(deleteButton);
            }
            if (this.params.showInsertButton) {
                let insertButton = this.createInsertButton();
                insertButton.style.marginRight = '4px';
                cell.appendChild(insertButton);
            }
            return cell;
        }
        createEditButton(): HTMLElement {
            let button = document.createElement('a');
            button.innerHTML = '编辑';
            button.href = 'javascript:'
            return button;
        }
        createDeleteButton(): HTMLElement {
            let button = document.createElement('a');
            button.innerHTML = '删除';
            button.href = 'javascript:'
            return button;
        }
        createInsertButton(): HTMLElement {
            let button = document.createElement('a');
            button.innerHTML = '新增'
            button.href = 'javascript:'
            return button;
        }
        createUpdateButton(): HTMLElement {
            let button = document.createElement('a');
            button.innerHTML = '更新';
            button.href = 'javascript:'
            return button;
        }
    }

    export interface BoundFieldParams extends DataControlFieldParams {
        sortExpression?: string,
        dataField: string,
        dataFormatString?: string
    }

    export class BoundField extends DataControlField {
        private _dataField: string;
        private _sortExpression: string;
        private _dataFormatString: string;
        private _sortType: 'asc' | 'desc'

        constructor(params: BoundFieldParams) {
            params = $.extend({
                cellHtml: (dataItem) => this.getCellHtml(dataItem)
            }, params);

            super(params);

            this.sortExpression = params.sortExpression;
            this.dataField = params.dataField;
            this.dataFormatString = params.dataFormatString;
        }

        createHeaderCell() {
            if (!this.sortExpression) {
                return super.createHeaderCell();
            }
            let cell = new GridViewCell();
            let a = document.createElement('a');
            a.href = 'javascript:';
            a.innerText = this.headerText || '&nbsp;';
            $(a).click(() => this.handleSort());

            cell.appendChild(a);
            cell.style(this.headerStyle);

            return cell;
        }

        createDataCell(dataItem: any) {
            let cell = super.createDataCell(dataItem);
            cell.html = this.getCellHtml(dataItem);
            return cell;
        }

        private handleSort() {
            var selectArgument = this.gridView.dataSource.currentSelectArguments;
            if (selectArgument == null)
                return;

            if (this._sortType == 'asc') {
                this._sortType = 'desc';
            }
            else if (this._sortType == 'desc') {
                this._sortType = 'asc';
            }
            else if (this._sortType == null) {
                this._sortType = 'asc'
            }
            selectArgument.sortExpression = this.sortExpression + ' ' + this._sortType;
            this.gridView.dataSource.select(selectArgument);
        }

        private getCellHtml(dataItem: any): string {
            if (!dataItem) throw Errors.argumentNull("dataItem");

            let value = dataItem[this.dataField];
            if (value == null)
                return this.nullText;

            if (this.dataFormatString)
                return this.formatValue(this.dataFormatString, value);

            return value;
        }

        private formatValue(...args): string {
            var result = '';
            var format = args[0];

            for (var i = 0; ;) {
                var open = format.indexOf('{', i);
                var close = format.indexOf('}', i);
                if ((open < 0) && (close < 0)) {
                    result += format.slice(i);
                    break;
                }
                if ((close > 0) && ((close < open) || (open < 0))) {
                    if (format.charAt(close + 1) !== '}') {
                        throw new Error('Sys.Res.stringFormatBraceMismatch');
                    }
                    result += format.slice(i, close + 1);
                    i = close + 2;
                    continue;
                }

                result += format.slice(i, open);
                i = open + 1;

                if (format.charAt(i) === '{') {
                    result += '{';
                    i++;
                    continue;
                }

                if (close < 0)
                    throw new Error('Sys.Res.stringFormatBraceMismatch');


                var brace = format.substring(i, close);
                var colonIndex = brace.indexOf(':');
                var argNumber = parseInt((colonIndex < 0) ? brace : brace.substring(0, colonIndex), 10) + 1;
                if (isNaN(argNumber)) throw new Error('Sys.Res.stringFormatInvalid');
                var argFormat = (colonIndex < 0) ? '' : brace.substring(colonIndex + 1);

                var arg = args[argNumber];
                if (typeof (arg) === "undefined" || arg === null) {
                    arg = '';
                }

                if (arg instanceof Date)
                    result = result + this.formatDate(arg, argFormat);
                else if (typeof arg == 'number')
                    result = result + this.formatNumber(arg, argFormat);
                else
                    result = result + arg.toString();

                i = close + 1;
            }

            return result;
        }

        private formatDate(value: Date, format: string): string {
            switch (format) {
                case 'd':
                    return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
                case 'g':
                    return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()} ${value.getHours()}:${value.getMinutes()}`;
                case 'G':
                    return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()} ${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`;
                case 't':
                    return `${value.getHours()}:${value.getMinutes()}`;
                case 'T':
                    return `${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`;
            }

            return value.toString();
        }

        private formatNumber(value: Number, format: string): string {
            let reg = new RegExp('^C[0-9]+');
            if (reg.test(format)) {
                let num: any = format.substr(1);
                return value.toFixed(num);
            }
            return value.toString();
        }

        /**
         * Gets a sort expression that is used by a data source control to sort data.
         */
        get sortExpression(): string {
            return this._sortExpression;
        }

        /**
         * Sets a sort expression that is used by a data source control to sort data.
         */
        set sortExpression(value: string) {
            this._sortExpression = value;
        }

        /**
         * Gets the field for the value.
         */
        get dataField(): string {
            return this._dataField;
        }
        /**
         * Sets the field for the value.
         */
        set dataField(value: string) {
            this._dataField = value;
        }

        /**
         * Gets the string that specifies the display format for the value of the field.
         */
        get dataFormatString(): string {
            return this._dataFormatString;
        }
        /**
         * Sets the string that specifies the display format for the value of the field.
         */
        set dataFormatString(value: string) {
            this._dataFormatString = value;
        }
    }
}
