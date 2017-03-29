/// <reference path="../Control.ts"/>

namespace wuzhui {
    export class GridViewCell extends Control<HTMLTableCellElement> {
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
        itemStyle?: string | CSSStyleDeclaration;
        headerStyle?: string | CSSStyleDeclaration;
        footerStyle?: string | CSSStyleDeclaration;
        visible?: boolean,
        sortExpression?: string
    }

    export class GridViewHeaderCell extends GridViewCell {
        private _sortType: 'asc' | 'desc';
        private _iconElement: HTMLElement;

        ascHTML = '↑';
        descHTML = '↓';
        sortingHTML = '...';

        sorting: Callback<GridViewHeaderCell, { sortType: string }>;
        sorted: Callback<GridViewHeaderCell, { sortType: string }>;

        constructor(field: DataControlField) {
            super(field);

            this.sorting = callbacks();
            this.sorted = callbacks();

            if (field.sortExpression) {
                let labelElement = document.createElement('a');
                labelElement.href = 'javascript:';

                labelElement.innerHTML = this.defaultHeaderText();
                $(labelElement).click(() => this.handleSort());

                this._iconElement = document.createElement('span');

                this.appendChild(labelElement);
                this.appendChild(this._iconElement);

                this.sorting.add(() => this._iconElement.innerHTML = this.sortingHTML);
                this.sorted.add(() => this.updateSortIcon());
            }
            else {
                this.element.innerHTML = this.defaultHeaderText();
            }

            this.style(field.headerStyle);
        }

        handleSort() {
            let selectArguments = this.field.gridView.dataSource.selectArguments;
            let sortType: 'asc' | 'desc' = this.sortType == 'asc' ? 'desc' : 'asc';

            fireCallback(this.sorting, this, { sortType });
            selectArguments.sortExpression = (this.field as BoundField).sortExpression + ' ' + sortType;
            return this.field.gridView.dataSource.select()
                .then(() => {
                    this.sortType = sortType;
                    fireCallback(this.sorted, this, { sortType });
                });
        }

        private defaultHeaderText() {
            return this.field.headerText || (this.field as BoundField).dataField || '';
        }

        get sortType() {
            return this._sortType;
        }
        set sortType(value) {
            this._sortType = value;
        }

        clearSortIcon() {
            this._iconElement.innerHTML = '';
        }

        private updateSortIcon() {
            if (this.sortType == 'asc') {
                this._iconElement.innerHTML = '↑';
            }
            else if (this.sortType == 'desc') {
                this._iconElement.innerHTML = '↓';
            }
            else {
                this._iconElement.innerHTML = '';
            }
        }
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
        /**
         * Gets a sort expression that is used by a data source control to sort data.
         */
        get sortExpression(): string {
            return this._params.sortExpression;
        }
        /**
         * Sets a sort expression that is used by a data source control to sort data.
         */
        set sortExpression(value: string) {
            this._params.sortExpression = value;
        }

        createHeaderCell(): GridViewCell {
            let cell = new GridViewHeaderCell(this);
            return cell;
        }
        createFooterCell(): GridViewCell {
            let cell = new GridViewCell(this);
            cell.element.innerHTML = this.footerText || '';
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