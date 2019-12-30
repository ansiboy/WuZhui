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
        get dataItem() {
            return this._dataItem;
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
            this.render(this._dataItem);
        }
        render(dataItem) {
            if (this._mode == 'edit') {
                this.element.innerHTML = "";
                this.createControl();
                console.assert(this.control != null);
                let value = dataItem[this.field.dataField];
                this.control.value = value;
                Utility_1.applyStyle(this.control.element, this._field.controlStyle);
                this.element.appendChild(this.control.element);
                return;
            }
            // this.control = null;
            super.render(dataItem);
        }
        createControl() {
            this.control = this.field.createControl();
            return this.control.element;
        }
        get controlValue() {
            if (this.control == null)
                return null;
            return this.control.value;
        }
    }
    exports.GridViewEditableCell = GridViewEditableCell;
});
