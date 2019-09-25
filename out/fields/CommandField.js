/// <reference path="DataControlField.ts"/>
define(["require", "exports", "./DataControlField", "../Control", "./GridViewEditableCell", "../Utility"], function (require, exports, DataControlField_1, Control_1, GridViewEditableCell_1, Utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GridViewCommandCell extends DataControlField_1.GridViewCell {
        constructor(field) {
            super();
        }
    }
    class CommandField extends DataControlField_1.DataControlField {
        constructor(params) {
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
        get cancelButtonHTML() {
            return this.params.cancelButtonHTML;
        }
        get deleteButtonHTML() {
            return this.params.deleteButtonHTML;
        }
        get editButtonHTML() {
            return this.params.editButtonHTML;
        }
        get updateButtonHTML() {
            return this.params.updateButtonHTML;
        }
        get newButtonHTML() {
            return this.params.newButtonHTML;
        }
        get insertButtonHTML() {
            return this.params.insertButtonHTML;
        }
        get cancelButtonClass() {
            return this.params.cancelButtonClass;
        }
        get deleteButtonClass() {
            return this.params.deleteButtonClass;
        }
        get editButtonClass() {
            return this.params.editButtonClass;
        }
        get newButtonClass() {
            return this.params.newButtonClass;
        }
        get updateButtonClass() {
            return this.params.updateButtonClass;
        }
        get insertButtonClass() {
            return this.params.insertButtonClass;
        }
        createItemCell(dataItem) {
            let cell = new GridViewCommandCell(this);
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
        showReadStatusButtons(cell) {
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
        createEditButton() {
            let button = document.createElement('a');
            button.innerHTML = this.editButtonHTML;
            button.href = 'javascript:';
            return button;
        }
        createDeleteButton() {
            let button = document.createElement('a');
            button.innerHTML = this.deleteButtonHTML;
            button.href = 'javascript:';
            return button;
        }
        createInsertButton() {
            let button = document.createElement('a');
            button.innerHTML = this.insertButtonHTML;
            button.href = 'javascript:';
            return button;
        }
        createUpdateButton() {
            let button = document.createElement('a');
            button.innerHTML = this.updateButtonHTML;
            button.href = 'javascript:';
            return button;
        }
        createCancelButton() {
            let button = document.createElement('a');
            button.innerHTML = this.cancelButtonHTML;
            button.href = 'javascript:';
            return button;
        }
        createNewButton() {
            let button = document.createElement('a');
            button.innerHTML = this.newButtonHTML;
            button.href = 'javascript:';
            return button;
        }
        hideButton(button) {
            button.style.display = 'none';
        }
        showButton(button) {
            button.style.removeProperty('display');
        }
        findParentCell(element) {
            let cellElement;
            let p = element.parentElement;
            while (p) {
                if (p.tagName == 'TD') {
                    cellElement = p;
                    break;
                }
                p = p.parentElement;
            }
            return cellElement;
        }
        on_editButtonClick(e) {
            let cellElement = this.findParentCell(e.target);
            console.assert(cellElement != null);
            let rowElement = cellElement.parentElement;
            for (let i = 0; i < rowElement.cells.length; i++) {
                let cell = Control_1.Control.getControlByElement(rowElement.cells[i]);
                if (cell instanceof GridViewEditableCell_1.GridViewEditableCell) {
                    cell.beginEdit();
                }
            }
            let cell = Control_1.Control.getControlByElement(cellElement);
            this.showButton(cell.cacelButton);
            this.showButton(cell.updateButton);
            this.hideButton(cell.editButton);
            if (cell.deleteButton)
                this.hideButton(cell.deleteButton);
            if (cell.newButton)
                this.hideButton(cell.newButton);
        }
        on_cancelButtonClick(e) {
            let cellElement = this.findParentCell(e.target);
            console.assert(cellElement != null);
            let rowElement = cellElement.parentElement;
            var row = Control_1.Control.getControlByElement(rowElement);
            if (row["isNew"] == true) {
                rowElement.remove();
                return;
            }
            for (let i = 0; i < rowElement.cells.length; i++) {
                let cell = Control_1.Control.getControlByElement(rowElement.cells[i]);
                if (cell instanceof GridViewEditableCell_1.GridViewEditableCell) {
                    cell.cancelEdit();
                }
            }
            let cell = Control_1.Control.getControlByElement(cellElement);
            this.hideButton(cell.cacelButton);
            this.hideButton(cell.updateButton);
            this.showButton(cell.editButton);
            if (cell.deleteButton)
                this.showButton(cell.deleteButton);
            if (cell.newButton)
                this.showButton(cell.newButton);
        }
        on_insertOrUpdateButtonClick(e) {
            if (e.target['_updating'])
                e.target['_updating'] = true;
            let cellElement = Utility_1.ElementHelper.findFirstParentByTagName(e.target, 'td');
            let rowElement = cellElement.parentElement;
            let cell = Control_1.Control.getControlByElement(cellElement);
            let row = Control_1.Control.getControlByElement(rowElement);
            //==========================================================
            // 复制 dataItem 副本
            let dataItem = Object.assign({}, row.dataItem || {});
            //==========================================================
            let dataSource = row.gridView.dataSource;
            let editableCells = new Array();
            for (let i = 0; i < rowElement.cells.length; i++) {
                let cell = Control_1.Control.getControlByElement(rowElement.cells[i]);
                if (cell instanceof GridViewEditableCell_1.GridViewEditableCell && cell.mode == 'edit') {
                    dataItem[cell.field.dataField] = cell.controlValue;
                    editableCells.push(cell);
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
                let cell = Control_1.Control.getControlByElement(cellElement);
                this.showReadStatusButtons(cell);
                e.target['_updating'] = false;
            }).catch(() => e.target['_updating'] = false);
        }
        on_deleteButtonClick(e) {
            let rowElement = Utility_1.ElementHelper.findFirstParentByTagName(e.target, "tr");
            let row = Control_1.Control.getControlByElement(rowElement);
            let dataSource = row.gridView.dataSource;
            dataSource.delete(row.dataItem)
                .then(() => {
                rowElement.remove();
            });
        }
        on_newButtonClick(e) {
            let rowElement = Utility_1.ElementHelper.findFirstParentByTagName(e.target, "tr"); //cellElement.parentElement as HTMLTableRowElement;
            let row = Control_1.Control.getControlByElement(rowElement);
            let gridView = row.gridView;
            let newRow = gridView.appendDataRow({}, rowElement.rowIndex);
            newRow["isNew"] = true;
            let commandCells = newRow.cells.filter(o => o instanceof GridViewCommandCell);
            newRow.cells.filter(o => o instanceof GridViewEditableCell_1.GridViewEditableCell)
                .forEach((c) => c.beginEdit());
            commandCells.forEach((cell) => {
                if (cell.deleteButton)
                    this.hideButton(cell.deleteButton);
                if (cell.editButton)
                    this.hideButton(cell.editButton);
                this.hideButton(cell.newButton);
                this.showButton(cell.insertButton);
                this.showButton(cell.cacelButton);
            });
        }
    }
    exports.CommandField = CommandField;
});
