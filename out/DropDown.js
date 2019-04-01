var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "./Control", "./Errors"], function (require, exports, Control_1, Errors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DropDown extends Control_1.Control {
        constructor(params) {
            super(params.element);
            if (params == null)
                throw Errors_1.Errors.argumentNull('params');
            if (params.dataSource == null)
                throw Errors_1.Errors.argumentFieldNull('params', 'dataSource');
            if (params.element == null)
                throw Errors_1.Errors.argumentFieldNull('params', 'element');
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
    exports.DropDown = DropDown;
});
