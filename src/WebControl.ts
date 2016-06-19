namespace wuzhui {
    class WebControl {
        private _text: string;
        private _visible: boolean;
        private _element: HTMLElement;

        constructor(element: HTMLElement) {
            this._element = element;
        }

        get text(): string {
            return this._text;
        }
        set text(value) {
            this._text = value;
        }

        get visible(): boolean {
            return this._visible;
        }
        set visible(value: boolean) {
            this._visible = value;
        }
    }
}