import { errors } from "maishu-toolkit";

export class ElementHelper {
    static showElement(element: HTMLElement) {
        if (!element) throw errors.argumentNull('element');
        element.style.removeProperty('display');
    }

    static hideElement(element: HTMLElement) {
        if (!element) throw errors.argumentNull('element');
        element.style.display = 'none';
    }

    static isVisible(element: HTMLElement) {
        let { display } = element.style;
        return !display || display != 'none';
    }

    static data(e: HTMLElement, name: string, value?: any) {
        let element = e as any;
        element['data'] = element['data'] || {};
        if (value == null)
            return element['data'].name;

        element['data'].name = value;
    }

    static findFirstParentByTagName(element: Element, tagName: string): HTMLElement | null {
        if (element == null) throw errors.argumentNull("element");
        if (!tagName) throw errors.argumentNull('tagName');
        let parent = element.parentElement;
        while (parent != null) {
            if (parent.tagName.toLowerCase() == tagName.toLowerCase()) {
                return parent;
            }

            parent = parent.parentElement;
        }

        return null;
    }
}

export function applyStyle(element: HTMLElement, value: Partial<CSSStyleDeclaration> | string) {
    if (typeof value == 'string') {
        element.setAttribute('style', value);
        return;
    }

    for (let key in value) {
        element.style[key] = value[key] as any;
    }
}