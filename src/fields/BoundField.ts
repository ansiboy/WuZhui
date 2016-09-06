/// <reference path="DataControlField.ts"/>

namespace wuzhui {
    export class GridViewEditableCell extends GridViewCell {

        private _dataItem: any;
        private _valueElement: HTMLElement;
        private _editorElement: HTMLElement
        private _value: any;
        private _valueType: string;

        constructor(field: BoundField, dataItem: any) {
            if (field == null) throw Errors.argumentNull('field');
            if (dataItem == null) throw Errors.argumentNull('dataItem');

            super(field);

            this._dataItem = dataItem;
            this._valueElement = document.createElement('span');
            this._editorElement = this.createControl();
            this.appendChild(this._valueElement);
            this.appendChild(this._editorElement);

            applyStyle(this._editorElement, (<BoundField>this.field).controlStyle)
            this.value = dataItem[field.dataField];
            if (this.value instanceof Date)
                this._valueType = 'date'
            else
                this._valueType = typeof this.value;

            $(this._editorElement).hide();
        }

        beginEdit() {
            $(this._valueElement).hide();
            $(this._editorElement).show();
            let value = this._dataItem[(<BoundField>this.field).dataField];
            this.setControlValue(value);
        }
        endEdit() {
            let value = this.getControlValue();
            this._dataItem[(<BoundField>this.field).dataField] = value;
            this._valueElement.innerHTML = this.getCellHtml(value);
            $(this._editorElement).hide();
            $(this._valueElement).show();
        }
        cancelEdit() {
            $(this._editorElement).hide();
            $(this._valueElement).show();
        }
        set value(value) {
            if (this._value == value)
                return;

            this._value = value;
            this.setControlValue(value);
            this._valueElement.innerHTML = this.getCellHtml(value);
        }
        get value() {
            return this._value;
        }
        //==============================================
        // Virtual Methods
        createControl(): HTMLElement {
            let ctrl = document.createElement('span');
            ctrl.appendChild(document.createElement('input'));
            return ctrl;
        }
        setControlValue(value: any) {
            $(this._editorElement).find('input').val(value);
        }
        getControlValue() {
            var text = $(this._editorElement).find('input').val();
            switch (this._valueType) {
                case 'number':
                    return new Number(text).valueOf();
                case 'date':
                    return new Date(text);
                default:
                    return text;
            }
        }
        //==============================================

        private getCellHtml(value: any): string {
            if (value == null)
                return this.field.nullText;

            if ((<BoundField>this.field).dataFormatString)
                return this.formatValue((<BoundField>this.field).dataFormatString, value);

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

    export interface BoundFieldParams extends DataControlFieldParams {
        sortExpression?: string,
        dataField: string,
        dataFormatString?: string,
        controlStyle?: CSSStyleDeclaration | string,
        headerHTML?: (sortType?: 'asc' | 'desc') => string
    }

    export class BoundField extends DataControlField {
        private _sortType: 'asc' | 'desc'
        private _valueElement: HTMLElement;

        constructor(params: BoundFieldParams) {
            super(params);
            if (params.headerHTML == null)
                params.headerHTML = this.headerHTML;

            this._params = params;
            this._valueElement = document.createElement('span');
        }

        private params(): BoundFieldParams {
            return <BoundFieldParams>this._params;
        }

        createHeaderCell() {
            let cell = new GridViewCell(this);
            if (this.sortExpression) {
                let a = document.createElement('a');
                a.href = 'javascript:';
                a.innerHTML = this.params().headerHTML(this._sortType);
                $(a).click(() => {
                    this.handleSort();
                    a.innerHTML = this.params().headerHTML(this._sortType);
                });

                cell.appendChild(a);
            }
            else {
                cell.element.innerHTML = this.params().headerHTML();
            }
            cell.style(this.headerStyle);

            return cell;
        }

        private headerHTML(sortType: 'asc' | 'desc') {
            let headerText = this.headerText || this.dataField;
            if (sortType == 'asc')
                return headerText + '↑';
            else if (sortType == 'desc')
                return headerText + '↓';
            else
                return headerText;
        }

        createItemCell(dataItem: any): GridViewCell {
            let cell = new GridViewEditableCell(this, dataItem);
            cell.style(this.itemStyle);

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
            return this.gridView.dataSource.select(selectArgument);
        }

        /**
         * Gets a sort expression that is used by a data source control to sort data.
         */
        get sortExpression(): string {
            return this.params().sortExpression;
        }

        /**
         * Gets the field for the value.
         */
        get dataField(): string {
            return this.params().dataField;
        }

        /**
         * Gets the string that specifies the display format for the value of the field.
         */
        get dataFormatString(): string {
            return this.params().dataFormatString;
        }

        get controlStyle() {
            return this.params().controlStyle;
        }
    }
}