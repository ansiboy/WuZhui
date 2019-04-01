export declare class Control<T extends HTMLElement> {
    private _text;
    private _visible;
    private _element;
    constructor(element: T);
    visible: boolean;
    readonly element: T;
    appendChild(child: Control<any> | HTMLElement, index?: number): void;
    style(value: Partial<CSSStyleDeclaration> | string): void;
    static getControlByElement(element: HTMLElement): Control<any>;
}
