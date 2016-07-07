/// <reference path="DataControlField.ts"/>

namespace wuzhui {

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

    export interface CommandFieldParams extends DataControlFieldParams {
        showEditButton?: boolean,
        showNewButton?: boolean,
        showDeleteButton?: boolean,

        cancelButtonHTML?: string,
        deleteButtonHTML?: string,
        editButtonHTML?: string,
        newButtonHTML?: string,
        updateButtonHTML?: string,
        insertButtonHTML?: string,

        cancelButtonClass?: string,
        deleteButtonClass?: string,
        editButtonClass?: string,
        newButtonClass?: string,
        updateButtonClass?: string,
        insertButtonClass?: string,

        handleUpdate?: () => JQueryPromise<any>
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

        get cancelButtonClass(): string {
            return this.params().cancelButtonClass;
        }
        set cancelButtonClass(value: string) {
            this.params().cancelButtonClass = value;
        }

        get deleteButtonClass(): string {
            return this.params().deleteButtonClass;
        }
        set deleteButtonClass(value: string) {
            this.params().deleteButtonClass = value;
        }

        get editButtonClass(): string {
            return this.params().editButtonClass;
        }
        set editButtonClass(value: string) {
            this.params().editButtonClass = value;
        }

        get newButtonClass(): string {
            return this.params().newButtonClass;
        }
        set newButtonClass(value: string) {
            this.params().newButtonClass = value;
        }

        get updateButtonClass(): string {
            return this.params().updateButtonClass;
        }
        set updateButtonClass(value: string) {
            this.params().updateButtonClass = value;
        }

        get insertButtonClass(): string {
            return this.params().insertButtonClass;
        }
        set insertButtonClass(value: string) {
            this.params().insertButtonClass = value;
        }

        createItemCell(dataItem: any): GridViewCell {
            let cell = new GridViewCommandCell(this);
            cell.style(this.itemStyle);
            if (this.params().showEditButton) {
                let editButton = this.createEditButton();
                editButton.style.marginRight = '4px';
                if (this.editButtonClass)
                    editButton.className = this.editButtonClass;

                cell.editButton = editButton;
                $(editButton).click(this.on_editButtonClick);
                cell.appendChild(editButton);

                let updateButton = this.createUpdateButton();
                updateButton.style.display = 'none';
                updateButton.style.marginRight = '4px';
                if (this.updateButtonClass)
                    updateButton.className = this.updateButtonClass;

                cell.updateButton = updateButton;
                $(updateButton).click(this.on_updateButtonClick);
                cell.appendChild(updateButton);

                let cancelButton = this.createCancelButton();
                cancelButton.style.display = 'none';
                cancelButton.style.marginRight = '4px';
                if (this.cancelButtonClass)
                    cancelButton.className = this.cancelButtonClass;

                cell.cacelButton = cancelButton;

                $(cancelButton).click(this.on_cancelButtonClick);
                cell.appendChild(cancelButton);
            }
            if (this.params().showDeleteButton) {
                let deleteButton = this.createDeleteButton();
                deleteButton.style.marginRight = '4px';
                if (this.deleteButtonClass)
                    deleteButton.className = this.deleteButtonClass;

                cell.deleteButton = deleteButton;
                $(deleteButton).click(this.on_deleteButtonClick);
                cell.appendChild(deleteButton);
            }
            if (this.params().showNewButton) {
                let newButton = this.createNewButton();
                newButton.style.marginRight = '4px';
                if (this.newButtonClass)
                    newButton.className = this.newButtonClass;

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
}