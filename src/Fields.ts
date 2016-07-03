/// <reference path="Control.ts"/>

namespace wuzhui {

    export interface DataControlFieldParams {
        footerText?: string,
        headerText?: string,
        nullText?: string,
        cellHtml?: (dataItem: any) => string;
        itemStyle?: string | CSSStyleDeclaration;
        headerStyle?: string | CSSStyleDeclaration;
        footerStyle?: string | CSSStyleDeclaration;
        visible?: boolean
    }

    export class DataControlField {
        private _footerText: string;
        private _headerText: string;
        private _nullText: string;
        private _cellHtml: (dataItem: any) => string;
        private _itemStyle: string | CSSStyleDeclaration;
        private _headerStyle: string | CSSStyleDeclaration;
        private _footerStyle: string | CSSStyleDeclaration;
        private _visible: boolean;
        private _gridView: GridView;

        constructor(params?: DataControlFieldParams) {
            params = $.extend({
                cellHtml: () => "",
                visible: true
            }, params);

            this._footerText = params.footerText;
            this._headerText = params.headerText;
            this._nullText = params.nullText;
            this._cellHtml = params.cellHtml;
            this._itemStyle = params.itemStyle;
            this._headerStyle = params.headerStyle;
            this._footerStyle = params.footerStyle;
            this._visible = params.visible;
        }

        /**
         * Gets the text that is displayed in the footer item of a data control field.
         */
        protected get footerText(): string {
            return this._footerText;
        }
        /**
         * Gets the text that is displayed in the header item of a data control field.
         */
        protected get headerText(): string {
            return this._headerText;
        }
        /**
         * Gets the caption displayed for a field when the field's value is null.
         */
        public get nullText(): string {
            return this._nullText;
        }
        protected get itemStyle(): string | CSSStyleDeclaration {
            return this._itemStyle;
        }
        protected get footerStyle(): string | CSSStyleDeclaration {
            return this._footerStyle;
        }
        protected get headerStyle(): string | CSSStyleDeclaration {
            return this._headerStyle;
        }
        get visible(): boolean {
            return this._visible;
        }
        get gridView(): GridView {
            return this._gridView;
        }
        set gridView(value: GridView) {
            this._gridView = value;
        }
        createHeaderCell(): GridViewCell {
            let cell = new GridViewCell();
            cell.html = this.headerText || '';
            cell.style(this.headerStyle);

            return cell;
        }
        createFooterCell(): GridViewCell {
            let cell = new GridViewCell();
            cell.html = this.footerText || '';
            cell.style(this.footerStyle);

            return cell;
        }
        createDataCell(dataItem: any): GridViewCell {
            if (!dataItem)
                throw Errors.argumentNull('dataItem');

            let cell = new GridViewCell();
            cell.style(this.itemStyle);

            return cell;
        }
    }

    export interface CommandFieldParams extends DataControlFieldParams {
        showEditButton?: boolean,
        showInsertButton?: boolean,
        showDeleteButton?: boolean,
        showUpdateButton?: boolean
    }

    export class CommandField extends DataControlField {
        private params: CommandFieldParams;

        constructor(params?: CommandFieldParams) {
            super(params);
            this.params = params;
        }

        createDataCell(dataItem: any): GridViewCell {
            let cell = new GridViewCell();
            cell.style(this.itemStyle);
            if (this.params.showEditButton) {
                let editButton = this.createEditButton();
                editButton.style.marginRight = '4px';
                editButton.className = 'edit';
                cell.appendChild(editButton);

                let updateButton = this.createUpdateButton();
                updateButton.style.display = 'none';
                updateButton.style.marginRight = '4px';
                updateButton.className = 'update';
                cell.appendChild(updateButton);

                let cancelButton = this.createCancelButton();
                cancelButton.style.display = 'none';
                cancelButton.style.marginRight = '4px';
                cancelButton.className = 'cancel';
                cell.appendChild(cancelButton);
            }
            if (this.params.showDeleteButton) {
                let deleteButton = this.createDeleteButton();
                deleteButton.style.marginRight = '4px';
                deleteButton.className = 'delete';
                cell.appendChild(deleteButton);
            }
            if (this.params.showInsertButton) {
                let insertButton = this.createInsertButton();
                insertButton.style.marginRight = '4px';
                insertButton.className = 'insert';
                cell.appendChild(insertButton);
            }
            return cell;
        }
        createEditButton(): HTMLElement {
            let button = document.createElement('a');
            button.innerHTML = '编辑';
            button.href = 'javascript:'
            $(button).click(this.on_editButtonClick);

            return button;
        }
        createDeleteButton(): HTMLElement {
            let button = document.createElement('a');
            button.innerHTML = '删除';
            button.href = 'javascript:'
            return button;
        }
        createInsertButton(): HTMLElement {
            let button = document.createElement('a');
            button.innerHTML = '新增'
            button.href = 'javascript:'
            return button;
        }
        createUpdateButton(): HTMLElement {
            let button = document.createElement('a');
            button.innerHTML = '更新';
            button.href = 'javascript:'
            $(button).click(this.on_updateButtonClick);

            return button;
        }
        createCancelButton(): HTMLElement {
            let button = document.createElement('a');
            button.innerHTML = '取消';
            button.href = 'javascript:'
            $(button).click(this.on_cancelButtonClick);
            return button;
        }

        private on_editButtonClick(e: JQueryEventObject) {
            let row = <HTMLTableRowElement>$(e.target).parents('tr').first()[0];
            for (var i = 0; i < row.cells.length; i++) {
                var cell = Control.getControlByElement(<HTMLElement>row.cells[i]);
                if (cell instanceof GridViewEditableCell) {
                    (<GridViewEditableCell>cell).beginEdit();
                }
            }
            $(e.target.parentElement).find('.cancel, .update').show();
            $(e.target).hide();
        }
        private on_cancelButtonClick(e: JQueryEventObject) {
            let row = <HTMLTableRowElement>$(e.target).parents('tr').first()[0];
            for (var i = 0; i < row.cells.length; i++) {
                var cell = Control.getControlByElement(<HTMLElement>row.cells[i]);
                if (cell instanceof GridViewEditableCell) {
                    (<GridViewEditableCell>cell).cancelEdit();
                }
            }
            $(e.target.parentElement).find('.cancel, .update').hide();
            $(e.target.parentElement).find('.edit').show();
        }
        private on_updateButtonClick(e: JQueryEventObject) {
            let row = <HTMLTableRowElement>$(e.target).parents('tr').first()[0];
            for (var i = 0; i < row.cells.length; i++) {
                var cell = Control.getControlByElement(<HTMLElement>row.cells[i]);
                if (cell instanceof GridViewEditableCell) {
                    (<GridViewEditableCell>cell).endEdit();
                }
            }
            $(e.target.parentElement).find('.cancel, .update').hide();
            $(e.target.parentElement).find('.edit').show();

            let gridView = <GridView>Control.getControlByElement($(row).parents('table').first()[0]);
            let gridViewRow = <GridViewDataRow>Control.getControlByElement(row);
            //gridView.dataSource.update(this.data);
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
        constructor() {
            super(document.createElement('td'));
        }
    }

    export class GridViewEditableCell extends GridViewCell {

        private _field: BoundField;
        private _dataItem: any;
        private _valueElement: HTMLElement;
        private _editorElement: HTMLElement
        private _value: any;
        private _valueType: string;

        constructor(field: BoundField, dataItem: any) {
            if (field == null) throw Errors.argumentNull('field');
            if (dataItem == null) throw Errors.argumentNull('dataItem');

            super();

            this._field = field;
            this._dataItem = dataItem;
            this._valueElement = document.createElement('span');
            this._editorElement = this.createControl();
            //this._editorElement.style.display = 'none';
            this.appendChild(this._valueElement);
            this.appendChild(this._editorElement);

            applyStyle(this._editorElement, this._field.controlStyle)
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
            let value = this._dataItem[this._field.dataField];
            this.setControlValue(this._editorElement, value);
        }
        endEdit() {
            let value = this.getControlValue(this._editorElement);
            this._dataItem[this._field.dataField] = value;
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
            this.setControlValue(this._editorElement, value);
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
        setControlValue(control: HTMLElement, value: any) {
            $(control).find('input').val(value);
        }
        getControlValue(control: HTMLElement) {
            var text = $(control).find('input').val();
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
                return this._field.nullText;

            if (this._field.dataFormatString)
                return this.formatValue(this._field.dataFormatString, value);

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
        private _params: BoundFieldParams;

        constructor(params: BoundFieldParams) {
            super(params);
            if (params.headerHTML == null)
                params.headerHTML = this.headerHTML;

            this._params = params;
            this._valueElement = document.createElement('span');
        }

        createHeaderCell() {
            let cell = new GridViewCell();
            if (this.sortExpression) {
                let a = document.createElement('a');
                a.href = 'javascript:';
                a.innerHTML = this._params.headerHTML(this._sortType);
                $(a).click(() => {
                    this.handleSort();
                    a.innerHTML = this._params.headerHTML(this._sortType);
                });

                cell.appendChild(a);
            }
            else {
                cell.element.innerHTML = this._params.headerHTML();
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

        createDataCell(dataItem: any) {
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
            return this._params.sortExpression;
        }

        /**
         * Gets the field for the value.
         */
        get dataField(): string {
            return this._params.dataField;
        }

        /**
         * Gets the string that specifies the display format for the value of the field.
         */
        get dataFormatString(): string {
            return this._params.dataFormatString;
        }

        get controlStyle() {
            return this._params.controlStyle;
        }
    }

    // export abstract class EditableField extends BoundField {
    //     private _value: any;

    //     // Vritual Methods
    //     beginEdit() {

    //     }
    //     endEdit() {

    //     }
    //     createDataCell(dataItem) {
    //         let cell = new GridViewCell();

    //     }
    //     get value() {
    //         return this._value;
    //     }
    //     set value(value) {
    //         this._value = value;
    //     }
    // }

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
