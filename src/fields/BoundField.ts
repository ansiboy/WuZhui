/// <reference path="DataControlField.ts"/>

namespace wuzhui {

    export class GridViewEditableCell extends GridViewDataCell {

        private _dataItem: any;
        // private _valueElement: HTMLElement;
        private _editorElement: HTMLElement
        // private _value: any;
        private _valueType: string;
        private _field: BoundField;

        constructor(field: BoundField, dataItem: any) {
            if (field == null) throw Errors.argumentNull('field');
            if (dataItem == null) throw Errors.argumentNull('dataItem');

            super({
                dataItem, dataField: field.dataField,
                nullText: field.nullText, dataFormatString: field.dataFormatString
            });

            this._field = field;
            this._dataItem = dataItem;

            this._editorElement = this.createControl();
            this.appendChild(this._editorElement);

            applyStyle(this._editorElement, this.field.controlStyle)
            this.value = dataItem[field.dataField];

            if (this.value instanceof Date)
                this._valueType = 'date'
            else
                this._valueType = typeof this.value;

            // $(this._editorElement).hide();
            ElementHelper.hideElement(this._editorElement);
        }

        get field() {
            return this._field;
        }

        beginEdit() {
            ElementHelper.hideElement(this.valueElement);
            ElementHelper.showElement(this._editorElement);
            let value = this._dataItem[this.field.dataField];
            this.controlValue = value;
        }
        endEdit() {
            this.value = this.controlValue;
            this._dataItem[this.field.dataField] = this.value;
            ElementHelper.hideElement(this._editorElement);
            ElementHelper.showElement(this.valueElement);
        }
        cancelEdit() {
            ElementHelper.hideElement(this._editorElement);
            ElementHelper.showElement(this.valueElement);
        }
        //==============================================
        // Virtual Methods
        protected createControl(): HTMLElement {
            let ctrl = document.createElement('span');
            ctrl.appendChild(document.createElement('input'));
            return ctrl;
        }
        set controlValue(value: any) {
            this._editorElement.querySelector('input').value = value;
        }
        get controlValue() {
            var text = this._editorElement.querySelector('input').value;
            switch (this._valueType) {
                case 'number':
                    return new Number(text).valueOf();
                case 'date':
                    return new Date(text);
                default:
                    return text;
            }
        }
    }



    export interface BoundFieldParams extends DataControlFieldParams {
        dataField: string,
        dataFormatString?: string,
        controlStyle?: CSSStyleDeclaration | string,
        nullText?: string,
    }

    export class BoundField extends DataControlField {
        private _valueElement: HTMLElement;

        constructor(params: BoundFieldParams) {
            super(params);

            this._params = params;
            this._valueElement = document.createElement('span');
        }

        private params(): BoundFieldParams {
            return <BoundFieldParams>this._params;
        }

        /**
         * Gets the caption displayed for a field when the field's value is null.
         */
        public get nullText(): string {
            return this.params().nullText;
        }



        createItemCell(dataItem: any): GridViewCell {
            let cell = new GridViewEditableCell(this, dataItem);
            cell.style(this.itemStyle);

            return cell;
        }

        /**
         * Gets the field for the value.
         */
        get dataField(): string {
            return this.params().dataField;
        }

        /**
         * Gets the string that specifies the display format for the value of the field.
         */
        get dataFormatString(): string {
            return this.params().dataFormatString;
        }

        get controlStyle() {
            return this.params().controlStyle;
        }
    }
}