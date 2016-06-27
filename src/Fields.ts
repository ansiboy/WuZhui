namespace wuzhui {
    export interface DataControlField {
        footerText?: string;
        headerText?: string;
        nullText?: string;
    }

    export interface BoundField extends DataControlField {
        sortExpression?: string;
        dataField: string;
        dataFormatString?: string;
    }

    // export class DataControlField {
    //     private _footerText: string;
    //     private _headerText: string;
    //     private _nullText: string;

    //     get footerText(): string {
    //         return this._footerText;
    //     }
    //     set footerText(value: string) {
    //         this._footerText = value;
    //     }
    //     get headerText(): string {
    //         return this._headerText;
    //     }
    //     set headerText(value: string) {
    //         this._headerText = value;
    //     }
    //     get nullText(): string {
    //         return this._nullText;
    //     }
    //     set nullText(value: string) {
    //         this._nullText = value;
    //     }
    // }

    // export class BoundField extends DataControlField {
    //     private _dataField: string;
    //     private _sortExpression: string;
    //     private _dataFormatString: string;

    //     get sortExpression(): string {
    //         return this._sortExpression;
    //     }
    //     set sortExpression(value: string) {
    //         this._sortExpression = value;
    //     }

    //     get dataField(): string {
    //         return this._dataField;
    //     }
    //     set dataField(value: string) {
    //         this._dataField = value;
    //     }

    //     get dataFormatString(): string {
    //         return this._dataFormatString;
    //     }
    //     set dataFormatString(value: string) {
    //         this._dataFormatString = value;
    //     }
    // }

    // export class CommandField extends DataControlField {

    // }
}
