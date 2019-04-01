import { Errors } from "./Errors";
import { ElementHelper, applyStyle } from "./Utility";

// namespace wuzhui {
const CONTROL_DATA_NAME = 'Control';
export class Control<T extends HTMLElement> {
    private _text: string;
    private _visible: boolean;
    private _element: T;

    constructor(element: T) {
        if (!element) throw Errors.argumentNull('element');
        this._element = element;
        ElementHelper.data(element, CONTROL_DATA_NAME, this);
    }

    get visible(): boolean {
        return ElementHelper.isVisible(this._element);
    }
    set visible(value: boolean) {
        if (value) {
            ElementHelper.showElement(this._element);
        }
        else {
            ElementHelper.hideElement(this._element);
        }
    }

    get element(): T {
        return this._element;
    }

    appendChild(child: Control<any> | HTMLElement, index?: number) {
        if (child == null)
            throw Errors.argumentNull('child');

        let childElement: HTMLElement;
        if (child instanceof Control)
            childElement = child.element;
        else
            childElement = child;

        let placeChild: HTMLElement;
        if (index != null) {
            placeChild = this.element.children[index] as HTMLElement;
        }

        if (placeChild == null) {
            this.element.appendChild(childElement);
        }
        else {
            this.element.insertBefore(childElement, placeChild);
        }
    }

    style(value: Partial<CSSStyleDeclaration> | string) {
        applyStyle(this.element, value);
    }

    static getControlByElement(element: HTMLElement): Control<any> {
        return ElementHelper.data(element, CONTROL_DATA_NAME);
    }
}
// }