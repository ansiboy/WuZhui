namespace wuzhui {
    const CONTROL_DATA_NAME = 'Control';
    export class Control<T extends HTMLElement> {
        private _text: string;
        private _visible: boolean;
        private _element: T;

        constructor(element: T) {
            if (!element) throw Errors.argumentNull('element');
            this._element = element;
            $(element).data(CONTROL_DATA_NAME, this);
        }

        // get html(): string {
        //     return $(this.element).html();
        // }
        // set html(value) {
        //     $(this.element).html(value);
        // }

        get visible(): boolean {
            return $(this.element).is(':visible');
        }
        set visible(value: boolean) {
            if (value)
                $(this._element).show();
            else
                $(this._element).hide();
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

        style(value: CSSStyleDeclaration | string) {
            applyStyle(this.element, value);
        }

        static getControlByElement(element: HTMLElement): Control<any> {
            return $(element).data(CONTROL_DATA_NAME);
        }
    }
}