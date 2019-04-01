define(["require", "exports", "./Errors", "./Utility"], function (require, exports, Errors_1, Utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // namespace wuzhui {
    const CONTROL_DATA_NAME = 'Control';
    class Control {
        constructor(element) {
            if (!element)
                throw Errors_1.Errors.argumentNull('element');
            this._element = element;
            Utility_1.ElementHelper.data(element, CONTROL_DATA_NAME, this);
        }
        get visible() {
            return Utility_1.ElementHelper.isVisible(this._element);
        }
        set visible(value) {
            if (value) {
                Utility_1.ElementHelper.showElement(this._element);
            }
            else {
                Utility_1.ElementHelper.hideElement(this._element);
            }
        }
        get element() {
            return this._element;
        }
        appendChild(child, index) {
            if (child == null)
                throw Errors_1.Errors.argumentNull('child');
            let childElement;
            if (child instanceof Control)
                childElement = child.element;
            else
                childElement = child;
            let placeChild;
            if (index != null) {
                placeChild = this.element.children[index];
            }
            if (placeChild == null) {
                this.element.appendChild(childElement);
            }
            else {
                this.element.insertBefore(childElement, placeChild);
            }
        }
        style(value) {
            Utility_1.applyStyle(this.element, value);
        }
        static getControlByElement(element) {
            return Utility_1.ElementHelper.data(element, CONTROL_DATA_NAME);
        }
    }
    exports.Control = Control;
});
// }
