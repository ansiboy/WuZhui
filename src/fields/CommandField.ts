/// <reference path="DataControlField.ts"/>

import { DataControlField, DataControlFieldParams } from "./DataControlField";
import { Control } from "../Control";
import { BoundField } from "./BoundField";
import { GridViewEditableCell } from "./GridViewEditableCell";
import { ElementHelper } from "../Utility";
import { GridViewRow, GridViewDataRow } from "../rows/index";
import { GridViewCell } from "../cells/index";


class GridViewCommandCell<T> extends GridViewCell {
    cacelButton: HTMLElement;
    deleteButton: HTMLElement;
    editButton: HTMLElement;
    newButton: HTMLElement;
    updateButton: HTMLElement;
    insertButton: HTMLElement;

    constructor(field: DataControlField<T>, cellElement: HTMLElement) {
        super(cellElement)
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


}

export class CommandField<T> extends DataControlField<T, CommandFieldParams> {
    constructor(params?: CommandFieldParams) {
        super(params);
        if (!this.params.cancelButtonHTML)
            this.params.cancelButtonHTML = '取消';
        if (!this.params.deleteButtonHTML)
            this.params.deleteButtonHTML = '删除';
        if (!this.params.editButtonHTML)
            this.params.editButtonHTML = '编辑';
        if (!this.params.updateButtonHTML)
            this.params.updateButtonHTML = '更新';
        if (!this.params.newButtonHTML)
            this.params.newButtonHTML = '新增';
        if (!this.params.insertButtonHTML)
            this.params.insertButtonHTML = '添加';
    }

    // private params(): CommandFieldParams {
    //     return this.params;
    // }

    get cancelButtonHTML(): string {
        return this.params.cancelButtonHTML;
    }

    get deleteButtonHTML(): string {
        return this.params.deleteButtonHTML;
    }

    get editButtonHTML(): string {
        return this.params.editButtonHTML;
    }

    get updateButtonHTML(): string {
        return this.params.updateButtonHTML;
    }

    get newButtonHTML(): string {
        return this.params.newButtonHTML;
    }

    get insertButtonHTML(): string {
        return this.params.insertButtonHTML;
    }

    get cancelButtonClass(): string {
        return this.params.cancelButtonClass;
    }

    get deleteButtonClass(): string {
        return this.params.deleteButtonClass;
    }

    get editButtonClass(): string {
        return this.params.editButtonClass;
    }

    get newButtonClass(): string {
        return this.params.newButtonClass;
    }

    get updateButtonClass(): string {
        return this.params.updateButtonClass;
    }

    get insertButtonClass(): string {
        return this.params.insertButtonClass;
    }

    createItemCell(dataItem: any): GridViewCell {
        let cell = new GridViewCommandCell(this, this.gridView.elementProvider.createCellElement("body"));
        cell.style(this.itemStyle);
        if (this.params.showEditButton) {
            let editButton = this.createEditButton();
            editButton.style.marginRight = '4px';
            if (this.editButtonClass)
                editButton.className = this.editButtonClass;

            cell.editButton = editButton;
            editButton.addEventListener('click', (e) => this.on_editButtonClick(e));
            cell.appendChild(editButton);

            let updateButton = this.createUpdateButton();
            updateButton.style.display = 'none';
            updateButton.style.marginRight = '4px';
            if (this.updateButtonClass)
                updateButton.className = this.updateButtonClass;

            cell.updateButton = updateButton;
            updateButton.addEventListener('click', (e) => this.on_insertOrUpdateButtonClick(e));
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
        if (this.params.showDeleteButton) {
            let deleteButton = this.createDeleteButton();
            deleteButton.style.marginRight = '4px';
            if (this.deleteButtonClass)
                deleteButton.className = this.deleteButtonClass;

            cell.deleteButton = deleteButton;
            deleteButton.onclick = (e) => this.on_deleteButtonClick(e);
            cell.appendChild(deleteButton);
        }
        if (this.params.showNewButton) {
            let newButton = this.createNewButton();
            newButton.style.marginRight = '4px';
            if (this.newButtonClass)
                newButton.className = this.newButtonClass;

            newButton.onclick = (e) => this.on_newButtonClick(e);
            cell.newButton = newButton;
            cell.appendChild(newButton);

            let insertButton = this.createInsertButton();
            insertButton.style.display = 'none';
            insertButton.style.marginRight = '4px';
            insertButton.addEventListener('click', (e) => this.on_insertOrUpdateButtonClick(e));
            if (this.insertButtonClass)
                insertButton.className = this.updateButtonClass;

            cell.insertButton = insertButton;
            cell.appendChild(insertButton);

            let cancelButton = this.createCancelButton();
            cancelButton.style.display = 'none';
            cancelButton.style.marginRight = '4px';
            cancelButton.addEventListener('click', (e) => this.on_cancelButtonClick(e));
            if (this.cancelButtonClass)
                cancelButton.className = this.cancelButtonClass;

            cell.cacelButton = cancelButton;
            cell.appendChild(cancelButton);
        }
        return cell;
    }
    private showReadStatusButtons(cell: GridViewCommandCell<T>) {
        if (cell.newButton) {
            this.showButton(cell.newButton);
            this.hideButton(cell.insertButton);
        }
        if (cell.editButton) {
            this.showButton(cell.editButton);
            this.hideButton(cell.updateButton);
        }

        if (cell.deleteButton)
            this.showButton(cell.deleteButton);

        this.hideButton(cell.cacelButton);
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
            if ((<GridViewEditableCell<T>>cell).type == "GridViewEditableCell") {
                (<GridViewEditableCell<T>>cell).beginEdit();
            }
        }

        let cell = <GridViewCommandCell<T>>Control.getControlByElement(cellElement);
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
        var row = Control.getControlByElement(rowElement) as GridViewDataRow;
        if ((row as any)["isNew"] == true) {
            rowElement.remove();
            return;
        }

        for (let i = 0; i < rowElement.cells.length; i++) {
            let cell = Control.getControlByElement(<HTMLElement>rowElement.cells[i]);
            if ((<GridViewEditableCell<T>>cell).type == "GridViewEditableCell") {
                (<GridViewEditableCell<T>>cell).cancelEdit();
            }
        }

        let cell = <GridViewCommandCell<T>>Control.getControlByElement(cellElement);
        this.hideButton(cell.cacelButton);
        this.hideButton(cell.updateButton);
        this.showButton(cell.editButton);
        if (cell.deleteButton)
            this.showButton(cell.deleteButton);

        if (cell.newButton)
            this.showButton(cell.newButton);
    }
    private on_insertOrUpdateButtonClick(e: MouseEvent) {

        if ((e.target as any)['_updating'])
            (e.target as any)['_updating'] = true;

        let cellElement = ElementHelper.findFirstParentByTagName(e.target as HTMLElement, 'td');
        let rowElement = <HTMLTableRowElement>cellElement.parentElement;

        let cell = <GridViewCommandCell<T>>Control.getControlByElement(cellElement);
        let row = <GridViewDataRow>Control.getControlByElement(rowElement);

        //==========================================================
        // 复制 dataItem 副本
        let dataItem = Object.assign({}, row.dataItem || {});
        //==========================================================
        let dataSource = row.gridView.dataSource;

        let editableCells = new Array<GridViewEditableCell<T>>();
        for (let i = 0; i < rowElement.cells.length; i++) {
            let cell = Control.getControlByElement(<HTMLElement>rowElement.cells[i]);
            if ((<GridViewEditableCell<T>>cell).type == "GridViewEditableCell" && (cell as GridViewEditableCell<T>).mode == 'edit') {
                let field = (<GridViewEditableCell<T>>cell).field as BoundField<T>;
                dataItem[field.dataField] = (<GridViewEditableCell<T>>cell).controlValue;
                editableCells.push((<GridViewEditableCell<T>>cell));
            }
        }

        let isInsert = e.target == cell.insertButton;
        let p = isInsert ? dataSource.insert(dataItem, rowElement.rowIndex) : dataSource.update(dataItem);

        return p.then(() => {
            if (isInsert) {
                rowElement.remove();
                return;
            }
            editableCells.forEach((item) => item.endEdit());
            let cell = <GridViewCommandCell<T>>Control.getControlByElement(cellElement);
            this.showReadStatusButtons(cell);
            (e.target as any)['_updating'] = false;

        }).catch(() => (e.target as any)['_updating'] = false);

    }
    private on_deleteButtonClick(e: Event) {
        let rowElement = <HTMLTableRowElement>ElementHelper.findFirstParentByTagName(e.target as HTMLElement, "tr");
        let row = <GridViewDataRow>Control.getControlByElement(rowElement);
        let dataSource = row.gridView.dataSource;
        dataSource.delete(row.dataItem)
            .then(() => {
                rowElement.remove();
            });
    }
    private on_newButtonClick(e: Event) {
        let rowElement = ElementHelper.findFirstParentByTagName(e.target as HTMLElement, "tr") as HTMLTableRowElement; //cellElement.parentElement as HTMLTableRowElement;
        let row = <GridViewRow>Control.getControlByElement(rowElement);
        let gridView = row.gridView;

        let newRow = gridView.appendDataRow({}, rowElement.rowIndex);
        (newRow as any)["isNew"] = true;
        let commandCells = newRow.cells.filter(o => (<GridViewEditableCell<T>>o).type == "GridViewCommandCell");//GridViewCommandCell
        newRow.cells.filter(o => (<GridViewEditableCell<T>>o).type == "GridViewEditableCell")//GridViewEditableCell
            .forEach(c => (c as GridViewEditableCell<T>).beginEdit());

        commandCells.forEach(c => {
            let cell = c as GridViewCommandCell<T>;
            if (cell.deleteButton)
                this.hideButton(cell.deleteButton);

            if (cell.editButton)
                this.hideButton(cell.editButton);

            this.hideButton(cell.newButton);
            this.showButton(cell.insertButton);
            this.showButton(cell.cacelButton);
        })
    }
}