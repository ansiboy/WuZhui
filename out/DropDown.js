var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Control } from "./Control";
import { Errors as errors } from "./Errors";
export class DropDown extends Control {
    constructor(params) {
        super(params.element);
        if (params == null)
            throw errors.argumentNull('params');
        if (params.dataSource == null)
            throw errors.argumentFieldNull('params', 'dataSource');
        if (params.element == null)
            throw errors.argumentFieldNull('params', 'element');
        this.init(params);
    }
    init(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = yield params.dataSource.select({});
            r.dataItems.forEach(dataItem => {
                let option = document.createElement('option');
                let name = params.nameField ? dataItem[params.nameField] : dataItem;
                let value = params.valueField ? dataItem[params.valueField] : dataItem;
                if (name == null)
                    name = '';
                if (value == null)
                    value = '';
                option.innerHTML = name;
                option.value = value;
                this.element.appendChild(option);
            });
        });
    }
}
