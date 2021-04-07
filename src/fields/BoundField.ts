import { DataControlFieldParams, DataControlField } from "./DataControlField";
import { GridViewEditableCell } from "../cells/GridViewEditableCell";
import { GridViewCell, GridViewCellControl } from "../cells/index";
import { Rule, ValidateField } from "maishu-dilu";

export interface BoundFieldParams<T> extends DataControlFieldParams {
    dataField: Extract<keyof T, string>,
    dataFormatString?: string,
    controlStyle?: Partial<CSSStyleDeclaration>,
    nullText?: string,
    readOnly?: boolean,
    valueType?: ValueType,
    emptyText?: string,
}

export type ValueType = 'number' | 'date' | 'string' | 'boolean'
export interface FieldValidation {
    validation: Omit<ValidateField, "name">
}

export class BoundField<T, P extends BoundFieldParams<T> = BoundFieldParams<T>> extends DataControlField<T, P> {

    /**
     * Gets the caption displayed for a field when the field's value is null.
     */
    public get nullText(): string | undefined {
        return this.params.nullText;
    }

    public get emptyText(): string | undefined {
        return this.params.emptyText;
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
        let field = this;
        let control = {
            element,
            get value(): any {
                let it = this as typeof control;
                let input = it.element as HTMLInputElement;
                let text = input.value;
                input.name = `${field.dataField}`;
                if (field.params.emptyText) {
                    input.placeholder = field.params.emptyText;
                }
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

