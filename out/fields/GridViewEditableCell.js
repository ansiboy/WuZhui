define(["require", "exports", "./DataControlField", "../Errors", "../Utility"], function (require, exports, DataControlField_1, Errors_1, Utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GridViewEditableCell extends DataControlField_1.GridViewDataCell {
        constructor(field, dataItem) {
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
            this._mode = 'read';
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
                // this.element.innerHTML = `<input type="text" />`;
                // applyStyle(this.element.querySelector('input'), this._field.controlStyle);
                // this.element.querySelector('input').value =
                //     value === undefined ? null : `${value}`;
                this.element.innerHTML = "";
                let control = this.createControl(value);
                Utility_1.applyStyle(control, this._field.controlStyle);
                this.element.appendChild(control);
                return;
            }
            super.render(dataItem);
        }
    }
    exports.GridViewEditableCell = GridViewEditableCell;
});
