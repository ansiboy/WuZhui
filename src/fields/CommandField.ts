/// <reference path="DataControlField.ts"/>

namespace wuzhui {

    class GridViewCommandCell extends GridViewCell {
        cacelButton: HTMLElement;
        deleteButton: HTMLElement;
        editButton: HTMLElement;
        newButton: HTMLElement;
        updateButton: HTMLElement;

        constructor(field: DataControlField) {
            super()
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

        handleUpdate?: () => Promise<any>
    }

    export class CommandField extends DataControlField {
        // private _updating = false;
        // private _deleting = false;
        private currentMode = 'read'

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

        get deleteButtonHTML(): string {
            return this.params().deleteButtonHTML;
        }

        get editButtonHTML(): string {
            return this.params().editButtonHTML;
        }

        get updateButtonHTML(): string {
            return this.params().updateButtonHTML;
        }

        get newButtonHTML(): string {
            return this.params().newButtonHTML;
        }

        get insertButtonHTML(): string {
            return this.params().insertButtonHTML;
        }

        get cancelButtonClass(): string {
            return this.params().cancelButtonClass;
        }

        get deleteButtonClass(): string {
            return this.params().deleteButtonClass;
        }

        get editButtonClass(): string {
            return this.params().editButtonClass;
        }

        get newButtonClass(): string {
            return this.params().newButtonClass;
        }

        get updateButtonClass(): string {
            return this.params().updateButtonClass;
        }

        get insertButtonClass(): string {
            return this.params().insertButtonClass;
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
                // $(editButton).click(this.on_editButtonClick);
                editButton.addEventListener('click', (e) => this.on_editButtonClick(e));
                cell.appendChild(editButton);

                let updateButton = this.createUpdateButton();
                updateButton.style.display = 'none';
                updateButton.style.marginRight = '4px';
                if (this.updateButtonClass)
                    updateButton.className = this.updateButtonClass;

                cell.updateButton = updateButton;
                updateButton.addEventListener('click', (e) => this.on_updateButtonClick(e));
                cell.appendChild(updateButton);

                let cancelButton = this.createCancelButton();
                cancelButton.style.display = 'none';
                cancelButton.style.marginRight = '4px';
                if (this.cancelButtonClass)
                    cancelButton.className = this.cancelButtonClass;

                cell.cacelButton = cancelButton;

                cancelButton.addEventListener('click', (e) => this.on_cancelButtonClick(e));
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
        private hideButton(button: HTMLElement) {
            button.style.display = 'none';
        }
        private showButton(button: HTMLElement) {
            button.style.removeProperty('display');
        }
        private findParentCell(element: HTMLElement) {
            let cellElement: HTMLTableCellElement;
            let p = element.parentElement;
            while (p) {
                if (p.tagName == 'TD') {
                    cellElement = p as HTMLTableCellElement;
                    break;
                }
                p = p.parentElement;
            }
            return cellElement;
        }
        private on_editButtonClick(e: MouseEvent) {
            let cellElement = this.findParentCell(e.target as HTMLElement);
            console.assert(cellElement != null);

            let rowElement = <HTMLTableRowElement>cellElement.parentElement;

            for (let i = 0; i < rowElement.cells.length; i++) {
                let cell = Control.getControlByElement(<HTMLElement>rowElement.cells[i]);
                if (cell instanceof GridViewEditableCell) {
                    (<GridViewEditableCell>cell).beginEdit();
                }
            }

            let cell = <GridViewCommandCell>Control.getControlByElement(cellElement);
            this.showButton(cell.cacelButton);
            this.showButton(cell.updateButton);
            this.hideButton(cell.editButton);

            if (cell.deleteButton)
                this.hideButton(cell.deleteButton);

            if (cell.newButton)
                this.hideButton(cell.newButton);
        }
        private on_cancelButtonClick(e: MouseEvent) {
            let cellElement = this.findParentCell(e.target as HTMLElement);
            console.assert(cellElement != null);
            let rowElement = <HTMLTableRowElement>cellElement.parentElement;

            for (let i = 0; i < rowElement.cells.length; i++) {
                let cell = Control.getControlByElement(<HTMLElement>rowElement.cells[i]);
                if (cell instanceof GridViewEditableCell) {
                    (<GridViewEditableCell>cell).cancelEdit();
                }
            }

            let cell = <GridViewCommandCell>Control.getControlByElement(cellElement);
            this.hideButton(cell.cacelButton);
            this.hideButton(cell.updateButton);
            this.showButton(cell.editButton);
            if (cell.deleteButton)
                this.showButton(cell.deleteButton);

            if (cell.newButton)
                this.showButton(cell.newButton);
        }
        private on_updateButtonClick(e: MouseEvent) {

            if (e.target['_updating'])
                e.target['_updating'] = true;

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
                    dataItem[(<BoundField>cell.field).dataField] = cell.controlValue;
                    editableCells.push(cell);
                }
            }
            try {

                return dataSource.update(dataItem)
                    .then(() => {
                        editableCells.forEach((item) => item.endEdit());
                        let cell = <GridViewCommandCell>Control.getControlByElement(cellElement);
                        this.hideButton(cell.cacelButton);
                        this.hideButton(cell.updateButton);
                        e.target['_updating'] = false;
                    })
                    .catch(() => e.target['_updating'] = false);
            }
            finally {

            }
        }
        private on_deleteButtonClick(e: JQueryEventObject) {
            // if (this._deleting)
            //     return;

            // this._deleting = true;
            let rowElement = <HTMLTableRowElement>$(e.target).parents('tr').first()[0];
            let row = <GridViewDataRow>Control.getControlByElement(rowElement);
            let dataSource = row.gridView.dataSource;
            dataSource.delete(row.dataItem)
                .then(() => {
                    $(rowElement).remove();
                    // this._deleting = false;
                });
            // .catch(() => this._deleting = false);
        }

    }
}