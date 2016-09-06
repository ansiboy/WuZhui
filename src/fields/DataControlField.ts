/// <reference path="../Control.ts"/>

namespace wuzhui {
    export class GridViewCell extends Control {
        private _field: DataControlField;

        constructor(field: DataControlField) {
            super(document.createElement('td'));

            this._field = field;
        }

        get field() {
            return this._field;
        }
    }

    export interface DataControlFieldParams {
        footerText?: string,
        headerText?: string,
        nullText?: string,
        itemStyle?: string | CSSStyleDeclaration;
        headerStyle?: string | CSSStyleDeclaration;
        footerStyle?: string | CSSStyleDeclaration;
        visible?: boolean
    }

    export class DataControlField {
        private _gridView: GridView;
        protected _params: DataControlFieldParams;

        constructor(params?: DataControlFieldParams) {
            if (params.visible == null)
                params.visible = true;

            this._params = params;
        }

        /**
         * Gets the text that is displayed in the footer item of a data control field.
         */
        public get footerText(): string {
            return this._params.footerText;
        }
        /**
         * Sets the text that is displayed in the footer item of a data control field.
         */
        public set footerText(value: string) {
            this._params.footerText = value;
        }
        /**
         * Gets the text that is displayed in the header item of a data control field.
         */
        public get headerText(): string {
            return this._params.headerText;
        }
        /**
        * Sets the text that is displayed in the header item of a data control field.
        */
        public set headerText(value: string) {
            this._params.headerText = value;
        }
        /**
         * Gets the caption displayed for a field when the field's value is null.
         */
        public get nullText(): string {
            return this._params.nullText;
        }
        public get itemStyle(): string | CSSStyleDeclaration {
            return this._params.itemStyle;
        }
        public set itemStyle(value: string | CSSStyleDeclaration) {
            this._params.itemStyle = value;
        }
        public get footerStyle(): string | CSSStyleDeclaration {
            return this._params.footerStyle;
        }
        public set footerStyle(value: string | CSSStyleDeclaration) {
            this._params.footerStyle = value;
        }
        public get headerStyle(): string | CSSStyleDeclaration {
            return this._params.headerStyle;
        }
        public set headerStyle(value: string | CSSStyleDeclaration) {
            this._params.headerStyle = value;
        }
        get visible(): boolean {
            return this._params.visible;
        }
        get gridView(): GridView {
            return this._gridView;
        }
        set gridView(value: GridView) {
            this._gridView = value;
        }
        createHeaderCell(): GridViewCell {
            let cell = new GridViewCell(this);
            cell.html = this.headerText || '';
            cell.style(this.headerStyle);

            return cell;
        }
        createFooterCell(): GridViewCell {
            let cell = new GridViewCell(this);
            cell.html = this.footerText || '';
            cell.style(this.footerStyle);

            return cell;
        }
        createItemCell(dataItem: any): GridViewCell {
            if (!dataItem)
                throw Errors.argumentNull('dataItem');

            let cell = new GridViewCell(this);
            cell.style(this.itemStyle);

            return cell;
        }
    }
}