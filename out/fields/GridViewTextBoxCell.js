define(["require", "exports", "./GridViewEditableCell"], function (require, exports, GridViewEditableCell_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GridViewTextBoxCell extends GridViewEditableCell_1.GridViewEditableCell {
        constructor(field, dataItem, valueType) {
            super(field, dataItem);
            this._valueType = valueType;
            if (!this._valueType) {
                let value = dataItem[field.dataField];
                if (value instanceof Date)
                    this._valueType = 'date';
                else
                    this._valueType = typeof value;
            }
        }
        createControl(value) {
            let control = document.createElement("input");
            control.value = value === undefined ? "" : `${value}`;
            control.name = this.field.dataField;
            return control;
        }
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
    exports.GridViewTextBoxCell = GridViewTextBoxCell;
});
