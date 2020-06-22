import { DataControlFieldParams, DataControlField } from "./DataControlField";
import { GridViewEditableCell } from "../cells/GridViewEditableCell";
import { GridViewCell, GridViewCellControl } from "../cells/index";

export interface BoundFieldParams<T> extends DataControlFieldParams {
    dataField: Extract<keyof T, string>,
    dataFormatString?: string,
    controlStyle?: Partial<CSSStyleDeclaration>,
    nullText?: string,
    readOnly?: boolean,
    valueType?: ValueType,
}

export type ValueType = 'number' | 'date' | 'string' | 'boolean'

export class BoundField<T> extends DataControlField<T, BoundFieldParams<T>> {

    /**
     * Gets the caption displayed for a field when the field's value is null.
     */
    public get nullText(): string {
        return this.params.nullText || "";
    }

    createItemCell(dataItem: T, cellElement?: HTMLElement): GridViewCell {
        cellElement = cellElement || this.elementProvider.createCellElement("body");
        let cell = new GridViewEditableCell(this, dataItem, cellElement);
        cell.style(this.itemStyle);

        return cell;
    }

    /**
     * Gets the field for the value.
     */
    get dataField(): keyof T {
        return this.params.dataField;
    }

    /**
     * Gets the string that specifies the display format for the value of the field.
     */
    get dataFormatString(): string | undefined {
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
    createControl(): GridViewCellControl {
        let element = document.createElement("input");
        let valueType = this.params.valueType;
        let control = {
            element,
            get value(): any {
                let it = this as typeof control;
                let input = it.element as HTMLInputElement;
                let text = input.value;
                switch (valueType) {
                    case 'number':
                        return new Number(text).valueOf();
                    case 'date':
                        return new Date(text);
                    default:
                        return text;
                }
            },
            set value(value) {
                let it = this as typeof control;
                let input = it.element as HTMLInputElement;
                input.value = value == null ? "" : value;
            }
        }

        return control;
    }

}

