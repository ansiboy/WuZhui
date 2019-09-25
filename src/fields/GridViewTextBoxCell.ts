import { GridViewEditableCell } from "./GridViewEditableCell";
import { BoundField, ValueType } from "./BoundField";

export class GridViewTextBoxCell<T> extends GridViewEditableCell<T> {
    private _valueType: string;

    constructor(field: BoundField<T>, dataItem: any, valueType?: ValueType) {
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

    createControl(value: any): HTMLElement {
        let control = document.createElement("input");
        control.value = value === undefined ? "" : `${value}`;
        control.name = this.field.dataField as string;
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