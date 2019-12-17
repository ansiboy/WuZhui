/// <reference path="DataControlField.d.ts" />
import { GridViewCell, DataControlField, DataControlFieldParams } from "./DataControlField";
export interface CommandFieldParams extends DataControlFieldParams {
    showEditButton?: boolean;
    showNewButton?: boolean;
    showDeleteButton?: boolean;
    cancelButtonHTML?: string;
    deleteButtonHTML?: string;
    editButtonHTML?: string;
    newButtonHTML?: string;
    updateButtonHTML?: string;
    insertButtonHTML?: string;
    cancelButtonClass?: string;
    deleteButtonClass?: string;
    editButtonClass?: string;
    newButtonClass?: string;
    updateButtonClass?: string;
    insertButtonClass?: string;
}
export declare class CommandField<T> extends DataControlField<T, CommandFieldParams> {
    constructor(params?: CommandFieldParams);
    get cancelButtonHTML(): string;
    get deleteButtonHTML(): string;
    get editButtonHTML(): string;
    get updateButtonHTML(): string;
    get newButtonHTML(): string;
    get insertButtonHTML(): string;
    get cancelButtonClass(): string;
    get deleteButtonClass(): string;
    get editButtonClass(): string;
    get newButtonClass(): string;
    get updateButtonClass(): string;
    get insertButtonClass(): string;
    createItemCell(dataItem: any): GridViewCell;
    private showReadStatusButtons;
    private createEditButton;
    private createDeleteButton;
    private createInsertButton;
    private createUpdateButton;
    private createCancelButton;
    private createNewButton;
    private hideButton;
    private showButton;
    private findParentCell;
    private on_editButtonClick;
    private on_cancelButtonClick;
    private on_insertOrUpdateButtonClick;
    private on_deleteButtonClick;
    private on_newButtonClick;
}
