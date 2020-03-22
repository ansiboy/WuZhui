import { Errors } from "./Errors";
import { ElementHelper, applyStyle } from "./Utility";
// namespace wuzhui {
const CONTROL_DATA_NAME = 'Control';
export class Control {
    constructor(element) {
        if (!element)
            throw Errors.argumentNull('element');
        this._element = element;
        ElementHelper.data(element, CONTROL_DATA_NAME, this);
    }
    get visible() {
        return ElementHelper.isVisible(this._element);
    }
    set visible(value) {
        if (value) {
            ElementHelper.showElement(this._element);
        }
        else {
            ElementHelper.hideElement(this._element);
        }
    }
    get element() {
        return this._element;
    }
    appendChild(child, index) {
        if (child == null)
            throw Errors.argumentNull('child');
        let childElement;
        if (child instanceof HTMLElement)
            childElement = child;
        else
            childElement = child.element;
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
        applyStyle(this.element, value);
    }
    static getControlByElement(element) {
        return ElementHelper.data(element, CONTROL_DATA_NAME);
    }
}
// }
