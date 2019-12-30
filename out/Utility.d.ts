export declare class ElementHelper {
    static showElement(element: HTMLElement): void;
    static hideElement(element: HTMLElement): void;
    static isVisible(element: HTMLElement): boolean;
    static data(element: HTMLElement, name: string, value?: any): any;
    static findFirstParentByTagName(element: Element, tagName: string): HTMLElement | null;
}
export declare function applyStyle(element: HTMLElement, value: Partial<CSSStyleDeclaration> | string | undefined): void;
export declare class Callback {
    private funcs;
    constructor();
    add(func: (...args: Array<any>) => any): void;
    remove(func: (...args: Array<any>) => any): void;
    fire(...args: Array<any>): void;
}
export interface Callback1<S, A> extends Callback {
    add(func: (sender: S, arg: A) => any): any;
    remove(func: (sender: S, arg: A) => any): any;
    fire(sender: S, arg: A): any;
}
export interface Callback2<S, A, A1> extends Callback {
    add(func: (sender: S, arg: A, arg1: A1) => any): any;
    remove(func: (sender: S, arg: A, arg1: A1) => any): any;
    fire(sender: S, arg: A, arg1: A1): any;
}
export declare function callbacks<S, A>(): Callback1<S, A>;
export declare function callbacks1<S, A, A1>(): Callback2<S, A, A1>;
export declare function fireCallback<S, A, B>(callback: Callback2<S, A, B>, sender: S, arg1: A, arg2: B): any;
export declare function fireCallback<S, A>(callback: Callback1<S, A>, sender: S, args: A): any;
