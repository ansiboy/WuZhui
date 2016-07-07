/// <reference path="DataControlField.ts"/>
namespace wuzhui {

    export interface CustomFieldParams extends DataControlFieldParams {
        renderHeader: (element: HTMLElement) => void,
        renderFooter: (element: HTMLElement) => void,
        renderItem: (element: HTMLElement, dataItem: any) => void
    }

    export class CustomField extends DataControlField {
        constructor(params: CustomFieldParams) {
            super(params);
        }
    }
}