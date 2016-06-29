namespace wuzhui {
    const CONTROL_DATA_NAME = 'Control';
    export class Control {
        private _text: string;
        private _visible: boolean;
        private _element: HTMLElement;
        private _parent: Control;

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

        get parent(): Control {
            return this._parent;
        }

        appendChild(child: Control) {
            if (child == null)
                throw Errors.argumentNull('child');

            if (child.parent != null)
                throw Errors.controllBelonsAnother();

            child._parent = this;
            this.element.appendChild(child.element);
        }

        style(value: CSSStyleDeclaration | string) {
            let style = value || '';
            if (typeof style == 'string')
                $(this.element).attr('style', <string>style);
            else {
                for (let key in <any>style) {
                    this.element.style[key] = style[key];
                }
            }
        }

        static getControlByElement(element: HTMLElement): Control {
            return $(element).data(CONTROL_DATA_NAME);
        }
    }
}