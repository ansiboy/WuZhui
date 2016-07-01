namespace wuzhui {
    const CONTROL_DATA_NAME = 'Control';
    export class Control {
        private _text: string;
        private _visible: boolean;
        private _element: HTMLElement;

        constructor(element: HTMLElement) {
            if (!element) throw Errors.argumentNull('element');
            this._element = element;
            $(element).data(CONTROL_DATA_NAME, this);
        }

        get html(): string {
            return $(this.element).html();
        }
        set html(value) {
            $(this.element).html(value);
        }

        get visible(): boolean {
            return $(this.element).is(':visible');
        }
        set visible(value: boolean) {
            if (value)
                $(this._element).show();
            else
                $(this._element).hide();
        }

        get element(): HTMLElement {
            return this._element;
        }

        appendChild(child: Control | HTMLElement) {
            if (child == null)
                throw Errors.argumentNull('child');

            let childElement: HTMLElement;
            if (child instanceof Control)
                childElement = child.element;
            else
                childElement = child;

            this.element.appendChild(childElement);
        }

        style(value: CSSStyleDeclaration | string) {
            applyStyle(this.element, value);
        }

        static getControlByElement(element: HTMLElement): Control {
            return $(element).data(CONTROL_DATA_NAME);
        }
    }
}