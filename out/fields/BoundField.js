/// <reference path="DataControlField.ts"/>
define(["require", "exports", "./DataControlField", "./GridViewTextBoxCell"], function (require, exports, DataControlField_1, GridViewTextBoxCell_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BoundField extends DataControlField_1.DataControlField {
        // constructor(params: BoundFieldParams<T>) {
        //     super(params);
        //     this._params = params;
        // }
        // private params(): BoundFieldParams<T> {
        //     return <BoundFieldParams<T>>this._params;
        // }
        /**
         * Gets the caption displayed for a field when the field's value is null.
         */
        get nullText() {
            return this.params.nullText;
        }
        createItemCell(dataItem) {
            let cell = new GridViewTextBoxCell_1.GridViewTextBoxCell(this, dataItem, this.params.valueType);
            cell.style(this.itemStyle);
            return cell;
        }
        /**
         * Gets the field for the value.
         */
        get dataField() {
            return this.params.dataField;
        }
        /**
         * Gets the string that specifies the display format for the value of the field.
         */
        get dataFormatString() {
            return this.params.dataFormatString;
        }
        get controlStyle() {
            return this.params.controlStyle;
        }
        get readOnly() {
            return this.params.readOnly;
        }
    }
    exports.BoundField = BoundField;
});
