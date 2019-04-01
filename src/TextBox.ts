import { Control } from "./Control";
import { Errors } from "./Errors";

export type TextBoxParams<T> = {
    element: HTMLInputElement, dataField: keyof T, dataItem: T,
    valueType: 'string' | 'int' | 'float'
}
export class TextBox<T> extends Control<HTMLInputElement>{
    constructor(params: TextBoxParams<T>) {
        if (params == null) throw Errors.argumentNull("params")
        if (!params.element) throw Errors.argumentFieldNull("params", "element")
        if (!params.dataField) throw Errors.argumentFieldNull("params", "dataField")
        if (!params.dataItem) throw Errors.argumentFieldNull("params", "dataItem")
        if (!params.valueType) throw Errors.argumentFieldNull("params", "valuetype")

        super(params.element)

        let { element, dataField, dataItem, valueType } = params
        let value = dataItem[dataField]
        element.value = `${value}`
        element.onchange = () => {
            if (valueType == 'int') {
                dataItem[dataField] = Number.parseInt(element.value) as any
            }
            else if (valueType == 'float') {
                dataItem[dataField] = Number.parseFloat(element.value) as any
            }
            else {
                dataItem[dataField] = element.value as any
            }
        }
    }
} 