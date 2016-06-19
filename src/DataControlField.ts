namespace wuzhui {
    export class DataControlField {
        private _footerText: string;
        private _headerText: string;
        private _nullText: string;
        private _sortExpression: string;

        get footerText(): string {
            return this._footerText;
        }
        set footerText(value: string) {
            this._footerText = value;
        }
        get headerText(): string {
            return this._headerText;
        }
        set headerText(value: string) {
            this._headerText = value;
        }
        get nullText(): string {
            return this._nullText;
        }
        set nullText(value: string) {
            this._nullText = value;
        }

        get sortExpression(): string {
            return this._sortExpression;
        }
        set sortExpression(value: string) {
            this._sortExpression = value;
        }
    }
}
