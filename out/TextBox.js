import { Control } from "./Control";
import { Errors } from "./Errors";
export class TextBox extends Control {
    constructor(params) {
        if (params == null)
            throw Errors.argumentNull("params");
        if (!params.element)
            throw Errors.argumentFieldNull("params", "element");
        if (!params.dataField)
            throw Errors.argumentFieldNull("params", "dataField");
        if (!params.dataItem)
            throw Errors.argumentFieldNull("params", "dataItem");
        if (!params.valueType)
            throw Errors.argumentFieldNull("params", "valuetype");
        super(params.element);
        let { element, dataField, dataItem, valueType } = params;
        let value = dataItem[dataField];
        element.value = `${value}`;
        element.onchange = () => {
            if (valueType == 'int') {
                dataItem[dataField] = Number.parseInt(element.value);
            }
            else if (valueType == 'float') {
                dataItem[dataField] = Number.parseFloat(element.value);
            }
            else {
                dataItem[dataField] = (element.value || "");
            }
        };
    }
}
