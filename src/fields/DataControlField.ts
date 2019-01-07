/// <reference path="../Control.ts"/>

namespace wuzhui {
    export class GridViewCell extends Control<HTMLTableCellElement> {

        constructor() {
            super(document.createElement('td'));
        }
    }

    export class GridViewDataCell<T> extends GridViewCell {
        private _value: any;
        private nullText: string;
        private dataFormatString: string;

        dataField: keyof T;

        constructor(params?: {
            dataField?: keyof T,
            render?: (value, element: HTMLElement) => void,
            nullText?: string, dataFormatString?: string
        }) {
            super();

            params = params || {}
            this.nullText = params.nullText != null ? params.nullText : '';
            this.dataFormatString = params.dataFormatString;
            this.dataField = params.dataField;
            if (params.render) {
                this.render = (value) => params.render(value, this.element);
            }
        }

        render(value) {
            var text: string;
            if (value == null)
                text = this.nullText;
            else if (this.dataFormatString)
                text = this.formatValue(this.dataFormatString, value);
            else
                text = value;

            this.element.innerHTML = text;
        }

        private formatValue(format: string, arg): string {//...args
            var result = '';

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
                var argFormat = brace;
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
            let y = value.getFullYear()
            let m = value.getMonth() + 1
            let d = value.getDate()
            let h = value.getHours()
            let M = value.getMinutes()
            let s = value.getSeconds()

            let twoDigit = function (value: number): string {
                const TEN = 10
                if (value < TEN)
                    return `0` + value

                return value.toString()
            }

            switch (format) {
                case 'd':
                    return `${y}-${m}-${d}`;
                case 'g':
                    return `${y}-${m}-${d} ${h}:${M}`;
                case 'gg':
                    return `${y}-${twoDigit(m)}-${twoDigit(d)} ${twoDigit(h)}:${twoDigit(M)}`;
                case 'G':
                    return `${y}-${m}-${d} ${h}:${M}:${s}`;
                case 'GG':
                    return `${y}-${twoDigit(m)}-${twoDigit(d)} ${twoDigit(h)}:${twoDigit(M)}:${twoDigit(s)}`;
                case 't':
                    return `${h}:${M}`;
                case 'T':
                    return `${h}:${M}:${s}`;
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
        itemStyle?: string | Partial<CSSStyleDeclaration>;
        headerStyle?: string | Partial<CSSStyleDeclaration>;
        footerStyle?: string | Partial<CSSStyleDeclaration>;
        visible?: boolean,
        sortExpression?: string
    }

    export class GridViewHeaderCell<T> extends Control<HTMLTableHeaderCellElement> {
        private _sortType: 'asc' | 'desc';
        private _iconElement: HTMLElement;
        private field: DataControlField<T>;

        ascHTML = '↑';
        descHTML = '↓';
        sortingHTML = '...';

        sorting: Callback1<GridViewHeaderCell<T>, { sortType: string }>;
        sorted: Callback1<GridViewHeaderCell<T>, { sortType: string }>;

        constructor(field: DataControlField<T>) {
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
            let selectArguments = this.field.gridView.selectArguments;
            let sortType: 'asc' | 'desc' = this.sortType == 'asc' ? 'desc' : 'asc';

            fireCallback(this.sorting, this, { sortType });
            selectArguments.sortExpression = (this.field as BoundField<T>).sortExpression + ' ' + sortType;
            return this.field.gridView.dataSource.select(selectArguments)
                .then(() => {
                    this.sortType = sortType;
                    fireCallback(this.sorted, this, { sortType });
                });
        }

        private defaultHeaderText() {
            return this.field.headerText || (this.field as BoundField<T>).dataField as string || '';
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

    export class DataControlField<T> {
        private _gridView: GridView<T>;
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

        public get itemStyle(): string | Partial<CSSStyleDeclaration> {
            return this._params.itemStyle;
        }
        public set itemStyle(value: string | Partial<CSSStyleDeclaration>) {
            this._params.itemStyle = value;
        }
        public get footerStyle(): string | Partial<CSSStyleDeclaration> {
            return this._params.footerStyle;
        }
        public set footerStyle(value: string | Partial<CSSStyleDeclaration>) {
            this._params.footerStyle = value;
        }
        public get headerStyle(): string | Partial<CSSStyleDeclaration> {
            return this._params.headerStyle;
        }
        public set headerStyle(value: string | Partial<CSSStyleDeclaration>) {
            this._params.headerStyle = value;
        }
        get visible(): boolean {
            return this._params.visible;
        }
        get gridView(): GridView<any> {
            return this._gridView;
        }
        set gridView(value: GridView<any>) {
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