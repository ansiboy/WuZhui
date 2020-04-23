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


// export class Callback {
//     private funcs = new Array<(...args: Array<any>) => void>();

//     constructor() {
//     }

//     add(func: (...args: Array<any>) => any) {
//         this.funcs.push(func);
//     }
//     remove(func: (...args: Array<any>) => any) {
//         this.funcs = this.funcs.filter(o => o != func);
//     }
//     fire(...args: Array<any>) {
//         this.funcs.forEach(o => o(...args));
//     }
// }

// export interface Callback1<S, A> extends Callback {
//     add(func: (sender: S, arg: A) => any);
//     remove(func: (sender: S, arg: A) => any);
//     fire(sender: S, arg: A);
// }

// export interface Callback2<S, A, A1> extends Callback {
//     add(func: (sender: S, arg: A, arg1: A1) => any);
//     remove(func: (sender: S, arg: A, arg1: A1) => any);
//     fire(sender: S, arg: A, arg1: A1);
// }

// export function callbacks<S, A>(): Callback1<S, A> {
//     return new Callback();
// }

// export function callbacks1<S, A, A1>(): Callback2<S, A, A1> {
//     return new Callback();
// }

// export function fireCallback<S, A, B>(callback: Callback2<S, A, B>, sender: S, arg1: A, arg2: B)
// export function fireCallback<S, A>(callback: Callback1<S, A>, sender: S, args: A)
// export function fireCallback<S, A>(callback: Callback, ...args) {
//     callback.fire(...args);
// }



// }