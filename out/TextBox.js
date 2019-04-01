define(["require", "exports", "./Control", "./Errors"], function (require, exports, Control_1, Errors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TextBox extends Control_1.Control {
        constructor(params) {
            if (params == null)
                throw Errors_1.Errors.argumentNull("params");
            if (!params.element)
                throw Errors_1.Errors.argumentFieldNull("params", "element");
            if (!params.dataField)
                throw Errors_1.Errors.argumentFieldNull("params", "dataField");
            if (!params.dataItem)
                throw Errors_1.Errors.argumentFieldNull("params", "dataItem");
            if (!params.valueType)
                throw Errors_1.Errors.argumentFieldNull("params", "valuetype");
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
                    dataItem[dataField] = element.value;
                }
            };
        }
    }
    exports.TextBox = TextBox;
});
