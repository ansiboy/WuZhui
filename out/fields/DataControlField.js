define(["require", "exports", "../Control", "../Utility", "../Errors"], function (require, exports, Control_1, Utility_1, Errors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GridViewCell extends Control_1.Control {
        constructor() {
            super(document.createElement('td'));
        }
    }
    exports.GridViewCell = GridViewCell;
    class GridViewDataCell extends GridViewCell {
        constructor(params) {
            super();
            let p = params;
            this.nullText = p.nullText != null ? p.nullText : '';
            this.dataFormatString = p.dataFormatString;
            this.dataField = p.dataField;
            if (p.render) {
                this.render = (dataItem) => p.render.apply(this, [dataItem, this.element]);
            }
        }
        render(dataItem) {
            let value = dataItem[this.dataField];
            var text;
            if (value == null)
                text = this.nullText;
            else if (this.dataFormatString)
                text = this.formatValue(this.dataFormatString, value);
            else
                text = `${value}`;
            this.element.innerHTML = text;
        }
        formatValue(format, arg) {
            var result = '';
            for (var i = 0;;) {
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
        formatDate(value, format) {
            let y = value.getFullYear();
            let m = value.getMonth() + 1;
            let d = value.getDate();
            let h = value.getHours();
            let M = value.getMinutes();
            let s = value.getSeconds();
            let twoDigit = function (value) {
                const TEN = 10;
                if (value < TEN)
                    return `0` + value;
                return value.toString();
            };
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
        formatNumber(value, format) {
            let reg = new RegExp('^C[0-9]+');
            if (reg.test(format)) {
                let num = format.substr(1);
                return value.toFixed(num);
            }
            return value.toString();
        }
    }
    exports.GridViewDataCell = GridViewDataCell;
    class GridViewHeaderCell extends Control_1.Control {
        constructor(field) {
            super(document.createElement('th'));
            this.ascHTML = '↑';
            this.descHTML = '↓';
            this.sortingHTML = '...';
            this.toSortHTML = '↕';
            this.field = field;
            this.sorting = Utility_1.callbacks();
            this.sorted = Utility_1.callbacks();
            if (field.sortExpression) {
                let labelElement = document.createElement('a');
                labelElement.href = 'javascript:';
                labelElement.innerHTML = this.defaultHeaderText();
                labelElement.onclick = () => this.handleSort();
                this._iconElement = document.createElement('span');
                this._iconElement.innerHTML = this.toSortHTML;
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
            let sortType = this.sortType == 'asc' ? 'desc' : 'asc';
            Utility_1.fireCallback(this.sorting, this, { sortType });
            selectArguments.sortExpression = this.field.sortExpression + ' ' + sortType;
            return this.field.gridView.dataSource.select(selectArguments)
                .then(() => {
                this.sortType = sortType;
                Utility_1.fireCallback(this.sorted, this, { sortType });
            });
        }
        defaultHeaderText() {
            return this.field.headerText || this.field.dataField || '';
        }
        get sortType() {
            return this._sortType;
        }
        set sortType(value) {
            this._sortType = value;
        }
        clearSortIcon() {
            this._iconElement.innerHTML = this.toSortHTML;
        }
        updateSortIcon() {
            if (this.sortType == 'asc') {
                this._iconElement.innerHTML = this.ascHTML;
            }
            else if (this.sortType == 'desc') {
                this._iconElement.innerHTML = this.descHTML;
            }
            else {
                this._iconElement.innerHTML = this.toSortHTML;
            }
        }
    }
    exports.GridViewHeaderCell = GridViewHeaderCell;
    class DataControlField {
        constructor(params) {
            if (params.visible == null)
                params.visible = true;
            this._params = params;
        }
        /**
         * Gets the text that is displayed in the footer item of a data control field.
         */
        get footerText() {
            return this._params.footerText;
        }
        /**
         * Sets the text that is displayed in the footer item of a data control field.
         */
        set footerText(value) {
            this._params.footerText = value;
        }
        /**
         * Gets the text that is displayed in the header item of a data control field.
         */
        get headerText() {
            return this._params.headerText;
        }
        /**
        * Sets the text that is displayed in the header item of a data control field.
        */
        set headerText(value) {
            this._params.headerText = value;
        }
        get itemStyle() {
            return this._params.itemStyle;
        }
        set itemStyle(value) {
            this._params.itemStyle = value;
        }
        get footerStyle() {
            return this._params.footerStyle;
        }
        set footerStyle(value) {
            this._params.footerStyle = value;
        }
        get headerStyle() {
            return this._params.headerStyle;
        }
        set headerStyle(value) {
            this._params.headerStyle = value;
        }
        get visible() {
            return this._params.visible;
        }
        get gridView() {
            return this._gridView;
        }
        set gridView(value) {
            this._gridView = value;
        }
        /**
         * Gets a sort expression that is used by a data source control to sort data.
         */
        get sortExpression() {
            return this._params.sortExpression;
        }
        /**
         * Sets a sort expression that is used by a data source control to sort data.
         */
        set sortExpression(value) {
            this._params.sortExpression = value;
        }
        createHeaderCell() {
            let cell = new GridViewHeaderCell(this);
            return cell;
        }
        createFooterCell() {
            let cell = new GridViewCell();
            cell.element.innerHTML = this.footerText || '';
            cell.style(this.footerStyle);
            return cell;
        }
        createItemCell(dataItem) {
            if (!dataItem)
                throw Errors_1.Errors.argumentNull('dataItem');
            let cell = new GridViewCell();
            cell.style(this.itemStyle);
            return cell;
        }
    }
    exports.DataControlField = DataControlField;
});
