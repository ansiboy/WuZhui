namespace wuzhui {

    export interface DataControlFieldParams {
        footerText?: string,
        headerText?: string,
        nullText?: string,
        cellHtml?: (dataItem: any) => string;
    }

    export class DataControlField {
        private _footerText: string;
        private _headerText: string;
        private _nullText: string;
        private _cellHtml: (dataItem: any) => string;

        constructor(params?: DataControlFieldParams) {
            params = $.extend({
                cellHtml: () => ""
            }, params);

            this.footerText = params.footerText;
            this.headerText = params.headerText;
            this.nullText = params.nullText;
            this.cellHtml = params.cellHtml;
        }

        /**
         * Gets the text that is displayed in the footer item of a data control field.
         */
        get footerText(): string {
            return this._footerText;
        }
        /**
         * Sets the text that is displayed in the footer item of a data control field.
         */
        set footerText(value: string) {
            this._footerText = value;
        }
        /**
         * Gets the text that is displayed in the header item of a data control field.
         */
        get headerText(): string {
            return this._headerText;
        }
        /**
         * Sets the text that is displayed in the header item of a data control field.
         */
        set headerText(value: string) {
            this._headerText = value;
        }
        /**
         * Gets the caption displayed for a field when the field's value is null.
         */
        get nullText(): string {
            return this._nullText;
        }
        /**
         * Sets the caption displayed for a field when the field's value is null.
         */
        set nullText(value: string) {
            this._nullText = value;
        }
        get cellHtml(): (dataItem: any) => string {
            return this._cellHtml;
        }
        set cellHtml(value: (dataItem: any) => string) {
            this._cellHtml = value;
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

        constructor(params: BoundFieldParams) {
            params = $.extend({
                cellHtml: (dataItem) => this.getCellHtml(dataItem)
            }, params);

            super(params);

            this.sortExpression = params.sortExpression;
            this.dataField = params.dataField;
            this.dataFormatString = params.dataFormatString;
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
