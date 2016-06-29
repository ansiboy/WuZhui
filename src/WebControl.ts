namespace wuzhui {
    export class WebControl {
        private _text: string;
        private _visible: boolean;
        private _element: HTMLElement;
        private _parent: WebControl;

        constructor(element: HTMLElement) {
            if (!element) throw Errors.argumentNull('element');

            this._element = element;
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

        get parent(): WebControl {
            return this._parent;
        }

        appendChild(child: WebControl) {
            if (child.parent != null)
                throw Errors.controllBelonsAnother();

            child._parent = this;
            this.element.appendChild(child.element);
        }
    }
}