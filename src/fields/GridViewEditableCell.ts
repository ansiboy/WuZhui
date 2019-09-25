import { GridViewDataCell } from "./DataControlField";
import { Errors } from "../Errors";
import { applyStyle } from "../Utility";
import { BoundField } from "./BoundField";

export abstract class GridViewEditableCell<T> extends GridViewDataCell<T> {
    private _dataItem: any;
    private _field: BoundField<T>;
    private _mode: 'read' | 'edit';

    constructor(field: BoundField<T>, dataItem: any) {
        if (field == null)
            throw Errors.argumentNull('field');
        if (dataItem == null)
            throw Errors.argumentNull('dataItem');
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

    render(dataItem: T) {
        //value
        let value = dataItem[this.field.dataField];
        if (this._mode == 'edit') {
            // this.element.innerHTML = `<input type="text" />`;
            // applyStyle(this.element.querySelector('input'), this._field.controlStyle);
            // this.element.querySelector('input').value =
            //     value === undefined ? null : `${value}`;

            this.element.innerHTML = "";
            let control = this.createControl(value);
            applyStyle(control, this._field.controlStyle);
            this.element.appendChild(control);

            return;
        }
        super.render(dataItem);
    }

    abstract createControl(value: any): HTMLElement;
    abstract get controlValue();
}
