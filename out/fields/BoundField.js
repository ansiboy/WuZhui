/// <reference path="DataControlField.ts"/>
define(["require", "exports", "./DataControlField", "../Errors", "../Utility"], function (require, exports, DataControlField_1, Errors_1, Utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GridViewEditableCell extends DataControlField_1.GridViewDataCell {
        constructor(field, dataItem, valueType) {
            if (field == null)
                throw Errors_1.Errors.argumentNull('field');
            if (dataItem == null)
                throw Errors_1.Errors.argumentNull('dataItem');
            super({
                dataField: field.dataField,
                nullText: field.nullText, dataFormatString: field.dataFormatString
            });
            this._field = field;
            this._dataItem = dataItem;
            this._valueType = valueType;
            this._mode = 'read';
            if (!this._valueType) {
                let value = dataItem[field.dataField];
                if (value instanceof Date)
                    this._valueType = 'date';
                else
                    this._valueType = typeof value;
            }
        }
        get field() {
            return this._field;
        }
        get mode() {
            return this._mode;
        }
        beginEdit() {
            if (this._field.readOnly) {
                return;
            }
            this._mode = 'edit';
            this.render(this._dataItem);
        }
        endEdit() {
            if (this._field.readOnly) {
                return;
            }
            this._mode = 'read';
            let value = this.controlValue;
            this.render(this._dataItem);
        }
        cancelEdit() {
            if (this._field.readOnly) {
                return;
            }
            this._mode = 'read';
            // let value = this._dataItem[this.field.dataField];
            this.render(this._dataItem);
        }
        render(dataItem) {
            //value
            let value = dataItem[this.field.dataField];
            if (this._mode == 'edit') {
                this.element.innerHTML = `<input type="text" />`;
                Utility_1.applyStyle(this.element.querySelector('input'), this._field.controlStyle);
                this.element.querySelector('input').value =
                    value === undefined ? null : `${value}`;
                return;
            }
            super.render(dataItem);
        }
        //==============================================
        // Virtual Methods
        get controlValue() {
            var text = this.element.querySelector('input').value;
            switch (this._valueType) {
                case 'number':
                    return new Number(text).valueOf();
                case 'date':
                    return new Date(text);
                default:
                    return text;
            }
        }
    }
    exports.GridViewEditableCell = GridViewEditableCell;
    class BoundField extends DataControlField_1.DataControlField {
        constructor(params) {
            super(params);
            this._params = params;
            this._valueElement = document.createElement('span');
        }
        params() {
            return this._params;
        }
        /**
         * Gets the caption displayed for a field when the field's value is null.
         */
        get nullText() {
            return this.params().nullText;
        }
        createItemCell(dataItem) {
            let cell = new GridViewEditableCell(this, dataItem);
            cell.style(this.itemStyle);
            return cell;
        }
        /**
         * Gets the field for the value.
         */
        get dataField() {
            return this.params().dataField;
        }
        /**
         * Gets the string that specifies the display format for the value of the field.
         */
        get dataFormatString() {
            return this.params().dataFormatString;
        }
        get controlStyle() {
            return this.params().controlStyle;
        }
        get readOnly() {
            return this.params().readOnly;
        }
    }
    exports.BoundField = BoundField;
});
