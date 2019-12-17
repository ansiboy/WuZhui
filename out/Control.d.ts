export declare class Control<T extends HTMLElement> {
    private _element;
    constructor(element: T);
    get visible(): boolean;
    set visible(value: boolean);
    get element(): T;
    appendChild(child: Control<any> | HTMLElement, index?: number): void;
    style(value: Partial<CSSStyleDeclaration> | string): void;
    static getControlByElement(element: HTMLElement): Control<any>;
}
