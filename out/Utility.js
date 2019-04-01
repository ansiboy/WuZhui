define(["require", "exports", "./Errors"], function (require, exports, Errors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ElementHelper {
        static showElement(element) {
            if (!element)
                throw Errors_1.Errors.argumentNull('element');
            element.style.removeProperty('display');
        }
        static hideElement(element) {
            if (!element)
                throw Errors_1.Errors.argumentNull('element');
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
                throw Errors_1.Errors.argumentNull("element");
            if (!tagName)
                throw Errors_1.Errors.argumentNull('tagName');
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
    exports.ElementHelper = ElementHelper;
    function applyStyle(element, value) {
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
    exports.applyStyle = applyStyle;
    class Callback {
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
    exports.Callback = Callback;
    function callbacks() {
        return new Callback();
    }
    exports.callbacks = callbacks;
    function callbacks1() {
        return new Callback();
    }
    exports.callbacks1 = callbacks1;
    function fireCallback(callback, ...args) {
        callback.fire(...args);
    }
    exports.fireCallback = fireCallback;
});
// }
