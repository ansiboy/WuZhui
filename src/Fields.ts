/// <reference path="Control.ts"/>

namespace wuzhui {

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

    export interface CommandFieldParams extends DataControlFieldParams {
        showEditButton?: boolean,
        showNewButton?: boolean,
        showDeleteButton?: boolean,
        cancelButtonHTML?: string,
        deleteButtonHTML?: string,
        editButtonHTML?: string,
        newButtonHTML?: string,
        updateButtonHTML?: string,
        insertButtonHTML?: string
    }



    export class CommandField extends DataControlField {
        private _updating = false;
        private _deleting = false;

        constructor(params?: CommandFieldParams) {
            super(params);
            if (!this.params().cancelButtonHTML)
                this.params().cancelButtonHTML = '取消';
            if (!this.params().deleteButtonHTML)
                this.params().deleteButtonHTML = '删除';
            if (!this.params().editButtonHTML)
                this.params().editButtonHTML = '编辑';
            if (!this.params().updateButtonHTML)
                this.params().updateButtonHTML = '更新';
        }

        private params(): CommandFieldParams {
            return this._params;
        }

        get cancelButtonHTML(): string {
            return this.params().cancelButtonHTML;
        }
        set cancelButtonHTML(value: string) {
            this.params().cancelButtonHTML = value;
        }

        get deleteButtonHTML(): string {
            return this.params().deleteButtonHTML;
        }
        set deleteButtonHTML(value: string) {
            this.params().deleteButtonHTML = value;
        }

        get editButtonHTML(): string {
            return this.params().editButtonHTML;
        }
        set editButtonHTML(value: string) {
            this.params().editButtonHTML = value;
        }

        get updateButtonHTML(): string {
            return this.params().updateButtonHTML;
        }
        set updateButtonHTML(value: string) {
            this.params().updateButtonHTML = value;
        }

        get newButtonHTML(): string {
            return this.params().newButtonHTML;
        }
        set newButtonHTML(value: string) {
            this.params().newButtonHTML = value;
        }

        get insertButtonHTML(): string {
            return this.params().insertButtonHTML;
        }
        set insertButtonHTML(value: string) {
            this.params().insertButtonHTML = value;
        }

        createItemCell(dataItem: any): GridViewCell {
            let cell = new GridViewCommandCell(this);
            cell.style(this.itemStyle);
            if (this.params().showEditButton) {
                let editButton = this.createEditButton();
                editButton.style.marginRight = '4px';
                //editButton.className = 'edit';
                cell.editButton = editButton;
                $(editButton).click(this.on_editButtonClick);
                cell.appendChild(editButton);

                let updateButton = this.createUpdateButton();
                updateButton.style.display = 'none';
                updateButton.style.marginRight = '4px';
                //updateButton.className = 'update';
                cell.updateButton = updateButton;
                $(updateButton).click(this.on_updateButtonClick);
                cell.appendChild(updateButton);

                let cancelButton = this.createCancelButton();
                cancelButton.style.display = 'none';
                cancelButton.style.marginRight = '4px';
                //cancelButton.className = 'cancel';
                cell.cacelButton = cancelButton;

                $(cancelButton).click(this.on_cancelButtonClick);
                cell.appendChild(cancelButton);
            }
            if (this.params().showDeleteButton) {
                let deleteButton = this.createDeleteButton();
                deleteButton.style.marginRight = '4px';
                cell.deleteButton = deleteButton;
                $(deleteButton).click(this.on_deleteButtonClick);
                cell.appendChild(deleteButton);
            }
            if (this.params().showNewButton) {
                let newButton = this.createNewButton();
                newButton.style.marginRight = '4px';
                cell.newButton = newButton;
                cell.appendChild(newButton);
            }
            return cell;
        }
        private createEditButton(): HTMLElement {
            let button = document.createElement('a');
            button.innerHTML = this.editButtonHTML;
            button.href = 'javascript:'

            return button;
        }
        private createDeleteButton(): HTMLElement {
            let button = document.createElement('a');
            button.innerHTML = this.deleteButtonHTML;
            button.href = 'javascript:'

            return button;
        }
        private createInsertButton(): HTMLElement {
            let button = document.createElement('a');
            button.innerHTML = this.insertButtonHTML;
            button.href = 'javascript:'
            return button;
        }
        private createUpdateButton(): HTMLElement {
            let button = document.createElement('a');
            button.innerHTML = this.updateButtonHTML;
            button.href = 'javascript:'

            return button;
        }
        private createCancelButton(): HTMLElement {
            let button = document.createElement('a');
            button.innerHTML = this.cancelButtonHTML;
            button.href = 'javascript:'

            return button;
        }
        private createNewButton(): HTMLElement {
            let button = document.createElement('a');
            button.innerHTML = this.newButtonHTML;
            button.href = 'javascript:'

            return button;
        }


        private on_editButtonClick(e: JQueryEventObject) {
            let cellElement = $(e.target).parents('td').first()[0];
            let rowElement = <HTMLTableRowElement>cellElement.parentElement; //<HTMLTableRowElement>$(e.target).parents('tr').first()[0];

            for (let i = 0; i < rowElement.cells.length; i++) {
                let cell = Control.getControlByElement(<HTMLElement>rowElement.cells[i]);
                if (cell instanceof GridViewEditableCell) {
                    (<GridViewEditableCell>cell).beginEdit();
                }
            }

            let cell = <GridViewCommandCell>Control.getControlByElement(cellElement);
            $([cell.cacelButton, cell.updateButton]).show();
            $(cell.editButton).hide();
        }
        private on_cancelButtonClick(e: JQueryEventObject) {
            let cellElement = $(e.target).parents('td').first()[0];
            let rowElement = <HTMLTableRowElement>cellElement.parentElement;

            for (let i = 0; i < rowElement.cells.length; i++) {
                let cell = Control.getControlByElement(<HTMLElement>rowElement.cells[i]);
                if (cell instanceof GridViewEditableCell) {
                    (<GridViewEditableCell>cell).cancelEdit();
                }
            }

            let cell = <GridViewCommandCell>Control.getControlByElement(cellElement);
            $([cell.cacelButton, cell.updateButton]).hide();
            $(cell.editButton).show();
        }
        private on_updateButtonClick(e: JQueryEventObject) {
            if (this._updating)
                return;

            this._updating = true;
            let cellElement = $(e.target).parents('td').first()[0];
            let rowElement = <HTMLTableRowElement>cellElement.parentElement;
            let row = <GridViewDataRow>Control.getControlByElement(rowElement);

            //==========================================================
            // 复制 dataItem 副本
            let dataItem = $.extend({}, row.dataItem || {});
            //==========================================================
            let dataSource = row.gridView.dataSource;

            let editableCells = new Array<GridViewEditableCell>();
            for (var i = 0; i < rowElement.cells.length; i++) {
                var cell = Control.getControlByElement(<HTMLElement>rowElement.cells[i]);
                if (cell instanceof GridViewEditableCell) {
                    dataItem[(<BoundField>cell.field).dataField] = cell.getControlValue();
                    editableCells.push(cell);
                }
            }

            dataSource.update(dataItem)
                .done(() => {
                    editableCells.forEach((item) => item.endEdit());
                    let cell = <GridViewCommandCell>Control.getControlByElement(cellElement);
                    $([cell.cacelButton, cell.updateButton]).hide();
                    $(cell.editButton).show();
                })
                .always(() => this._updating = false);
        }
        private on_deleteButtonClick(e: JQueryEventObject) {
            if (this._deleting)
                return;

            this._deleting = true;
            let rowElement = <HTMLTableRowElement>$(e.target).parents('tr').first()[0];
            let row = <GridViewDataRow>Control.getControlByElement(rowElement);
            let dataSource = row.gridView.dataSource;
            dataSource.delete(row.dataItem)
                .done(() => {
                    $(rowElement).remove();
                })
                .always(() => this._deleting = false);
        }

    }

    export interface BoundFieldParams extends DataControlFieldParams {
        sortExpression?: string,
        dataField: string,
        dataFormatString?: string,
        controlStyle?: CSSStyleDeclaration | string,
        headerHTML?: (sortType?: 'asc' | 'desc') => string
    }

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

    class GridViewCommandCell extends GridViewCell {
        cacelButton: HTMLElement;
        deleteButton: HTMLElement;
        editButton: HTMLElement;
        newButton: HTMLElement;
        updateButton: HTMLElement;

        constructor(field: DataControlField) {
            super(field)
        }

    }

    export class GridViewEditableCell extends GridViewCell {

        private _dataItem: any;
        private _valueElement: HTMLElement;
        private _editorElement: HTMLElement
        private _value: any;
        private _valueType: string;

        constructor(field: BoundField, dataItem: any) {
            if (field == null) throw Errors.argumentNull('field');
            if (dataItem == null) throw Errors.argumentNull('dataItem');

            super(field);

            this._dataItem = dataItem;
            this._valueElement = document.createElement('span');
            this._editorElement = this.createControl();
            this.appendChild(this._valueElement);
            this.appendChild(this._editorElement);

            applyStyle(this._editorElement, (<BoundField>this.field).controlStyle)
            this.value = dataItem[field.dataField];
            if (this.value instanceof Date)
                this._valueType = 'date'
            else
                this._valueType = typeof this.value;

            $(this._editorElement).hide();
        }

        beginEdit() {
            $(this._valueElement).hide();
            $(this._editorElement).show();
            let value = this._dataItem[(<BoundField>this.field).dataField];
            this.setControlValue(value);
        }
        endEdit() {
            let value = this.getControlValue();
            this._dataItem[(<BoundField>this.field).dataField] = value;
            this._valueElement.innerHTML = this.getCellHtml(value);
            $(this._editorElement).hide();
            $(this._valueElement).show();
        }
        cancelEdit() {
            $(this._editorElement).hide();
            $(this._valueElement).show();
        }
        set value(value) {
            if (this._value == value)
                return;

            this._value = value;
            this.setControlValue(value);
            this._valueElement.innerHTML = this.getCellHtml(value);
        }
        get value() {
            return this._value;
        }
        //==============================================
        // Virtual Methods
        createControl(): HTMLElement {
            let ctrl = document.createElement('span');
            ctrl.appendChild(document.createElement('input'));
            return ctrl;
        }
        setControlValue(value: any) {
            $(this._editorElement).find('input').val(value);
        }
        getControlValue() {
            var text = $(this._editorElement).find('input').val();
            switch (this._valueType) {
                case 'number':
                    return new Number(text).valueOf();
                case 'date':
                    return new Date(text);
                default:
                    return text;
            }
        }
        //==============================================

        private getCellHtml(value: any): string {
            if (value == null)
                return this.field.nullText;

            if ((<BoundField>this.field).dataFormatString)
                return this.formatValue((<BoundField>this.field).dataFormatString, value);

            return value;
        }

        private formatValue(...args): string {
            var result = '';
            var format = args[0];

            for (var i = 0; ;) {
                var open = format.indexOf('{', i);
                var close = format.indexOf('}', i);
                if ((open < 0) && (close < 0)) {
                    result += format.slice(i);
                    break;
                }
                if ((close > 0) && ((close < open) || (open < 0))) {
                    if (format.charAt(close + 1) !== '}') {
                        throw new Error('Sys.Res.stringFormatBraceMismatch');
                    }
                    result += format.slice(i, close + 1);
                    i = close + 2;
                    continue;
                }

                result += format.slice(i, open);
                i = open + 1;

                if (format.charAt(i) === '{') {
                    result += '{';
                    i++;
                    continue;
                }

                if (close < 0)
                    throw new Error('Sys.Res.stringFormatBraceMismatch');


                var brace = format.substring(i, close);
                var colonIndex = brace.indexOf(':');
                var argNumber = parseInt((colonIndex < 0) ? brace : brace.substring(0, colonIndex), 10) + 1;
                if (isNaN(argNumber)) throw new Error('Sys.Res.stringFormatInvalid');
                var argFormat = (colonIndex < 0) ? '' : brace.substring(colonIndex + 1);

                var arg = args[argNumber];
                if (typeof (arg) === "undefined" || arg === null) {
                    arg = '';
                }

                if (arg instanceof Date)
                    result = result + this.formatDate(arg, argFormat);
                else if (arg instanceof Number || typeof arg == 'number')
                    result = result + this.formatNumber(arg, argFormat);
                else
                    result = result + arg.toString();

                i = close + 1;
            }

            return result;
        }

        private formatDate(value: Date, format: string): string {
            switch (format) {
                case 'd':
                    return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
                case 'g':
                    return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()} ${value.getHours()}:${value.getMinutes()}`;
                case 'G':
                    return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()} ${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`;
                case 't':
                    return `${value.getHours()}:${value.getMinutes()}`;
                case 'T':
                    return `${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`;
            }

            return value.toString();
        }

        private formatNumber(value: Number, format: string): string {
            let reg = new RegExp('^C[0-9]+');
            if (reg.test(format)) {
                let num: any = format.substr(1);
                return value.toFixed(num);
            }
            return value.toString();
        }
    }

    export class BoundField extends DataControlField {
        private _sortType: 'asc' | 'desc'
        private _valueElement: HTMLElement;

        constructor(params: BoundFieldParams) {
            super(params);
            if (params.headerHTML == null)
                params.headerHTML = this.headerHTML;

            this._params = params;
            this._valueElement = document.createElement('span');
        }

        private params(): BoundFieldParams {
            return <BoundFieldParams>this._params;
        }

        createHeaderCell() {
            let cell = new GridViewCell(this);
            if (this.sortExpression) {
                let a = document.createElement('a');
                a.href = 'javascript:';
                a.innerHTML = this.params().headerHTML(this._sortType);
                $(a).click(() => {
                    this.handleSort();
                    a.innerHTML = this.params().headerHTML(this._sortType);
                });

                cell.appendChild(a);
            }
            else {
                cell.element.innerHTML = this.params().headerHTML();
            }
            cell.style(this.headerStyle);

            return cell;
        }

        private headerHTML(sortType: 'asc' | 'desc') {
            let headerText = this.headerText || this.dataField;
            if (sortType == 'asc')
                return headerText + '↑';
            else if (sortType == 'desc')
                return headerText + '↓';
            else
                return headerText;
        }

        createItemCell(dataItem: any): GridViewCell {
            let cell = new GridViewEditableCell(this, dataItem);
            cell.style(this.itemStyle);

            return cell;
        }

        private handleSort() {
            var selectArgument = this.gridView.dataSource.currentSelectArguments;
            if (selectArgument == null)
                return;

            if (this._sortType == 'asc') {
                this._sortType = 'desc';
            }
            else if (this._sortType == 'desc') {
                this._sortType = 'asc';
            }
            else if (this._sortType == null) {
                this._sortType = 'asc'
            }
            selectArgument.sortExpression = this.sortExpression + ' ' + this._sortType;
            return this.gridView.dataSource.select(selectArgument);
        }

        /**
         * Gets a sort expression that is used by a data source control to sort data.
         */
        get sortExpression(): string {
            return this.params().sortExpression;
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

    export class TextBoxField extends BoundField {
        beginEdit(cell: GridViewCell, value) {
            let control = document.createElement('input');
            control.value = value;
            cell.appendChild(control);
        }
        endEdit() {

        }
    }
}
