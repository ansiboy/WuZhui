/// <reference path="DataControlField.ts"/>

namespace wuzhui {

    export type ValueType = 'number' | 'date' | 'string' | 'boolean'
    export class GridViewEditableCell extends GridViewDataCell {

        private _dataItem: any;
        private _valueType: string;
        private _field: BoundField;
        private _mode: 'read' | 'edit';

        constructor(field: BoundField, dataItem: any, valueType?: ValueType) {
            if (field == null) throw Errors.argumentNull('field');
            if (dataItem == null) throw Errors.argumentNull('dataItem');

            super({
                dataField: field.dataField,
                nullText: field.nullText, dataFormatString: field.dataFormatString
            });

            this._field = field;
            this._dataItem = dataItem;
            this._valueType = valueType;
            this._mode = 'read';

            if (!this._valueType) {
                let value = dataItem[field.dataField];
                if (value instanceof Date)
                    this._valueType = 'date'
                else
                    this._valueType = typeof value;
            }
        }

        get field() {
            return this._field;
        }

        get mode() {
            return this._mode;
        }

        beginEdit() {
            if (this._field.readOnly) {
                return;
            }

            this._mode = 'edit';
            let value = this._dataItem[this.field.dataField];
            this.render(value);
        }
        endEdit() {
            if (this._field.readOnly) {
                return;
            }

            this._mode = 'read';
            let value = this.controlValue;
            this._dataItem[this.field.dataField] = value;
            this.render(value);
        }
        cancelEdit() {
            if (this._field.readOnly) {
                return;
            }

            this._mode = 'read';
            let value = this._dataItem[this.field.dataField];
            this.render(value);
        }

        render(value) {
            if (this._mode == 'edit') {
                this.element.innerHTML = `<input type="text" />`;

                applyStyle(this.element.querySelector('input'), this._field.controlStyle);
                this.element.querySelector('input').value =
                    value === undefined ? null : value;
                return;
            }

            super.render(value);
        }

        //==============================================
        // Virtual Methods
        get controlValue() {
            var text = this.element.querySelector('input').value;
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
        readOnly?: boolean
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

        get readOnly() {
            return this.params().readOnly;
        }
    }
}