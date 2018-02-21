/// <reference path="../Control.ts"/>

namespace wuzhui {
    export class GridViewCell extends Control<HTMLTableCellElement> {

        constructor() {
            super(document.createElement('td'));
        }
    }

    export class GridViewDataCell extends GridViewCell {
        private _value: any;
        private _valueElement: HTMLElement;
        private nullText: string;
        private dataFormatString: string;
        private _dataField: string;
        private render: (element: HTMLElement, value: any) => void;

        constructor(params: {
            dataItem: any, dataField: string,
            render?: (element: HTMLElement, value) => void,
            nullText?: string, dataFormatString?: string
        }) {
            super();

            this._valueElement = document.createElement('span');
            this.element.appendChild(this._valueElement);
            this.nullText = params.nullText != null ? params.nullText : '';
            this.dataFormatString = params.dataFormatString;
            this._dataField = params.dataField;
            this.render = params.render || ((element: HTMLElement, value) => {
                if (!element) throw Errors.argumentNull('element');

                var text: string;
                if (value == null)
                    text = this.nullText;
                else if (this.dataFormatString)
                    text = this.formatValue(this.dataFormatString, value);
                else
                    text = value;

                element.innerHTML = text;
            });

            this.value = params.dataItem[params.dataField];
            this.render(this.valueElement, this.value);
        }

        protected get valueElement() {
            return this._valueElement;
        }

        get dataField() {
            return this._dataField;
        }

        set value(value) {
            if (this._value == value)
                return;

            this._value = value;
            // this._valueElement.innerHTML = this.getCellHtml(value);
            this.render(this._valueElement, value);
        }
        get value() {
            return this._value;
        }

        // getCellHtml(value: any): string {
        //     // if (this.html)
        //     //     return this.html(value);

        //     if (value == null)
        //         return this.nullText;

        //     if (this.dataFormatString)
        //         return this.formatValue(this.dataFormatString, value);

        //     return value;
        // }

        private formatValue(format: string, arg): string {//...args
            var result = '';
            // var format = args[0];

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
                // var colonIndex = brace.indexOf(':');
                // var argNumber = parseInt((colonIndex < 0) ? brace : brace.substring(0, colonIndex), 10) + 1;
                // if (isNaN(argNumber))
                //     throw new Error(`string format '${format}' error`);

                // var argFormat = (colonIndex < 0) ? '' : brace.substring(colonIndex + 1);
                var argFormat = brace;
                // var arg = args[argNumber];
                if (typeof (arg) === "undefined" || arg === null) {
                    arg = '';
                }

                if (arg instanceof Date)
                    result = result + this.formatDate(arg, argFormat);
                else if (arg instanceof Number || typeof arg == 'number')
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
    }

    export interface DataControlFieldParams {
        footerText?: string,
        headerText?: string,
        itemStyle?: string | CSSStyleDeclaration;
        headerStyle?: string | CSSStyleDeclaration;
        footerStyle?: string | CSSStyleDeclaration;
        visible?: boolean,
        sortExpression?: string
    }

    export class GridViewHeaderCell extends Control<HTMLTableHeaderCellElement> {
        private _sortType: 'asc' | 'desc';
        private _iconElement: HTMLElement;
        private field: DataControlField;

        ascHTML = '↑';
        descHTML = '↓';
        sortingHTML = '...';

        sorting: Callback1<GridViewHeaderCell, { sortType: string }>;
        sorted: Callback1<GridViewHeaderCell, { sortType: string }>;

        constructor(field: DataControlField) {
            super(document.createElement('th'));

            this.field = field;
            this.sorting = callbacks();
            this.sorted = callbacks();

            if (field.sortExpression) {
                let labelElement = document.createElement('a');
                labelElement.href = 'javascript:';

                labelElement.innerHTML = this.defaultHeaderText();
                labelElement.onclick = () => this.handleSort();

                this._iconElement = document.createElement('span');

                this.appendChild(labelElement);
                this.appendChild(this._iconElement);

                this.sorting.add(() => this._iconElement.innerHTML = this.sortingHTML);
                this.sorted.add(() => this.updateSortIcon());
            }
            else {
                this.element.innerHTML = this.defaultHeaderText();
            }

            this.style(field.headerStyle);
        }

        handleSort() {
            let selectArguments = this.field.gridView.dataSource.selectArguments;
            let sortType: 'asc' | 'desc' = this.sortType == 'asc' ? 'desc' : 'asc';

            fireCallback(this.sorting, this, { sortType });
            selectArguments.sortExpression = (this.field as BoundField).sortExpression + ' ' + sortType;
            return this.field.gridView.dataSource.select()
                .then(() => {
                    this.sortType = sortType;
                    fireCallback(this.sorted, this, { sortType });
                });
        }

        private defaultHeaderText() {
            return this.field.headerText || (this.field as BoundField).dataField || '';
        }

        get sortType() {
            return this._sortType;
        }
        set sortType(value) {
            this._sortType = value;
        }

        clearSortIcon() {
            this._iconElement.innerHTML = '';
        }

        private updateSortIcon() {
            if (this.sortType == 'asc') {
                this._iconElement.innerHTML = '↑';
            }
            else if (this.sortType == 'desc') {
                this._iconElement.innerHTML = '↓';
            }
            else {
                this._iconElement.innerHTML = '';
            }
        }
    }

    export class DataControlField {
        private _gridView: GridView;
        protected _params: DataControlFieldParams;

        constructor(params?: DataControlFieldParams) {
            if (params.visible == null)
                params.visible = true;

            this._params = params;
        }

        /**
         * Gets the text that is displayed in the footer item of a data control field.
         */
        public get footerText(): string {
            return this._params.footerText;
        }
        /**
         * Sets the text that is displayed in the footer item of a data control field.
         */
        public set footerText(value: string) {
            this._params.footerText = value;
        }
        /**
         * Gets the text that is displayed in the header item of a data control field.
         */
        public get headerText(): string {
            return this._params.headerText;
        }
        /**
        * Sets the text that is displayed in the header item of a data control field.
        */
        public set headerText(value: string) {
            this._params.headerText = value;
        }

        public get itemStyle(): string | CSSStyleDeclaration {
            return this._params.itemStyle;
        }
        public set itemStyle(value: string | CSSStyleDeclaration) {
            this._params.itemStyle = value;
        }
        public get footerStyle(): string | CSSStyleDeclaration {
            return this._params.footerStyle;
        }
        public set footerStyle(value: string | CSSStyleDeclaration) {
            this._params.footerStyle = value;
        }
        public get headerStyle(): string | CSSStyleDeclaration {
            return this._params.headerStyle;
        }
        public set headerStyle(value: string | CSSStyleDeclaration) {
            this._params.headerStyle = value;
        }
        get visible(): boolean {
            return this._params.visible;
        }
        get gridView(): GridView {
            return this._gridView;
        }
        set gridView(value: GridView) {
            this._gridView = value;
        }
        /**
         * Gets a sort expression that is used by a data source control to sort data.
         */
        get sortExpression(): string {
            return this._params.sortExpression;
        }
        /**
         * Sets a sort expression that is used by a data source control to sort data.
         */
        set sortExpression(value: string) {
            this._params.sortExpression = value;
        }

        createHeaderCell(): GridViewCell {
            let cell = new GridViewHeaderCell(this);
            return cell;
        }
        createFooterCell(): GridViewCell {
            let cell = new GridViewCell();
            cell.element.innerHTML = this.footerText || '';
            cell.style(this.footerStyle);

            return cell;
        }
        createItemCell(dataItem: any): GridViewCell {
            if (!dataItem)
                throw Errors.argumentNull('dataItem');

            let cell = new GridViewCell();
            cell.style(this.itemStyle);

            return cell;
        }
    }
}