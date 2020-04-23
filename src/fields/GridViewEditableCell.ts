import { GridViewDataCell } from "./DataControlField";
import { Errors } from "../Errors";
import { applyStyle } from "../Utility";
import { BoundField, GridViewCellControl } from "./BoundField";

export class GridViewEditableCell<T> extends GridViewDataCell<T> {
    private _dataItem: T;
    private _field: BoundField<T>;
    private _mode: 'read' | 'edit';
    control: GridViewCellControl;

    constructor(field: BoundField<T>, dataItem: T) {
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

    render(dataItem: T) {
        if (this._mode == 'edit') {
            this.element.innerHTML = "";

            this.createControl();
            console.assert(this.control != null);
            let value = dataItem[this.field.dataField];
            this.control.value = value;
            applyStyle(this.control.element, this._field.controlStyle);
            this.element.appendChild(this.control.element);

            return;
        }

        // this.control = null;
        super.render(dataItem);
    }

    createControl(): HTMLElement {
        this.control = this.field.createControl();
        return this.control.element;
    }

    get controlValue() {
        if (this.control == null)
            return null;

        return this.control.value;
    }
}
