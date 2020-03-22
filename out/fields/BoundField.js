import { DataControlField } from "./DataControlField";
import { GridViewEditableCell } from "./GridViewEditableCell";
export class BoundField extends DataControlField {
    /**
     * Gets the caption displayed for a field when the field's value is null.
     */
    get nullText() {
        return this.params.nullText || "";
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
    //===============================================
    // Virutal Methods
    createControl() {
        // let control = document.createElement("input");
        // control.name = this.dataField as string;
        // return control;
        let element = document.createElement("input");
        let control = {
            element,
            valueType: this.params.valueType,
            get value() {
                let it = this;
                let input = it.element;
                let text = input.value;
                switch (it.valueType) {
                    case 'number':
                        return new Number(text).valueOf();
                    case 'date':
                        return new Date(text);
                    default:
                        return text;
                }
            },
            set value(value) {
                let it = this;
                let input = it.element;
                input.value = value == null ? "" : value;
            }
        };
        return control;
    }
}
