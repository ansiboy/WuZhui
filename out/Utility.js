import { Errors } from "./Errors";
export class ElementHelper {
    static showElement(element) {
        if (!element)
            throw Errors.argumentNull('element');
        element.style.removeProperty('display');
    }
    static hideElement(element) {
        if (!element)
            throw Errors.argumentNull('element');
        element.style.display = 'none';
    }
    static isVisible(element) {
        let { display } = element.style;
        return !display || display != 'none';
    }
    static data(element, name, value) {
        element['data'] = element['data'] || {};
        if (value == null)
            return element['data'].name;
        element['data'].name = value;
    }
    static findFirstParentByTagName(element, tagName) {
        if (element == null)
            throw Errors.argumentNull("element");
        if (!tagName)
            throw Errors.argumentNull('tagName');
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
export function applyStyle(element, value) {
    let style = value || '';
    if (typeof style == 'string') {
        element.setAttribute('style', style);
    }
    else {
        for (let key in style) {
            element.style[key] = style[key];
        }
    }
}
export class Callback {
    constructor() {
        this.funcs = new Array();
    }
    add(func) {
        this.funcs.push(func);
    }
    remove(func) {
        this.funcs = this.funcs.filter(o => o != func);
    }
    fire(...args) {
        this.funcs.forEach(o => o(...args));
    }
}
export function callbacks() {
    return new Callback();
}
export function callbacks1() {
    return new Callback();
}
export function fireCallback(callback, ...args) {
    callback.fire(...args);
}
// }
