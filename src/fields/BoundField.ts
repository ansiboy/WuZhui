/// <reference path="DataControlField.ts"/>

import { DataControlFieldParams, DataControlField, GridViewCell } from "./DataControlField";
import { GridViewTextBoxCell } from "./GridViewTextBoxCell";

export interface BoundFieldParams<T> extends DataControlFieldParams {
    dataField: keyof T,
    dataFormatString?: string,
    controlStyle?: Partial<CSSStyleDeclaration> | string,
    nullText?: string,
    readOnly?: boolean,
    valueType?: ValueType,
}

export type ValueType = 'number' | 'date' | 'string' | 'boolean'

export class BoundField<T> extends DataControlField<T, BoundFieldParams<T>> {

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
    public get nullText(): string {
        return this.params.nullText;
    }

    createItemCell(dataItem: T): GridViewCell {
        let cell = new GridViewTextBoxCell(this, dataItem, this.params.valueType);
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
    get dataFormatString(): string {
        return this.params.dataFormatString;
    }

    get controlStyle() {
        return this.params.controlStyle;
    }

    get readOnly() {
        return this.params.readOnly;
    }
}