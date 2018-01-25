namespace wuzhui {

    export class ElementHelper {
        static showElement(element: HTMLElement) {
            if (!element) throw Errors.argumentNull('element');
            element.style.removeProperty('display');
        }

        static hideElement(element: HTMLElement) {
            if (!element) throw Errors.argumentNull('element');
            element.style.display = 'none';
        }

        static isVisible(element: HTMLElement) {
            let { display } = element.style;
            return !display || display != 'none';
        }

        static data(element: HTMLElement, name: string, value?: any) {
            element['data'] = element['data'] || {};
            if (value == null)
                return element['data'].name;

            element['data'].name = value;
        }

        static findFirstParentByTagName(element: Element, tagName: string): HTMLElement {
            if (element == null) throw Errors.argumentNull("element");
            if (!tagName) throw Errors.argumentNull('tagName');
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

    export function applyStyle(element: HTMLElement, value: CSSStyleDeclaration | string) {
        let style = value || '';
        if (typeof style == 'string') {
            element.setAttribute('style', style);
        }
        else {
            for (let key in <any>style) {
                element.style[key] = style[key];
            }
        }
    }


    export class Callback<S, A> {
        private funcs = new Array<(ender: S, args: A) => void>();

        constructor() {
        }
        add(func: (sender: S, args: A) => any) {
            this.funcs.push(func);
        }
        remove(func: (sender: S, args: A) => any) {
            this.funcs = this.funcs.filter(o => o != func);
        }
        fire(sender: S, args: A) {
            this.funcs.forEach(o => o(sender, args));
        }
    }


    export function callbacks<S, A>(): Callback<S, A> {
        return new Callback<S, A>();
    }

    export function fireCallback<S, A>(callback: Callback<S, A>, sender: S, args: A) {
        callback.fire(sender, args);
    }



}