import { BoundFieldParams, BoundField } from "./BoundField";
import { DataSource, errors } from "maishu-toolkit";
import { GridViewEditableCell } from "../cells/GridViewEditableCell";
import { Dropdown } from "DropDown";

const emptyValue = "";
interface DropdownFieldParams<T, S> extends BoundFieldParams<T> {
    dataSource: DataSource<S>;
    emptyText?: string;
    nameField: keyof S;
    valueField: keyof S
}

export function dropdownField<T, S>(params: DropdownFieldParams<T, S>) {
    let field = new DropdownField(params);
    return field;
}

export class DropdownField<T, S> extends BoundField<T, DropdownFieldParams<T, S>> {
    #dataItems: S[];
    #dataSource: DataSource<S>;

    constructor(params: DropdownFieldParams<T, S>) {
        super(params);

        if (!params.dataSource)
            throw errors.argumentFieldNull("params", "dataSource");

        if (!params.nameField)
            throw errors.argumentFieldNull("params", "nameField");

        if (!params.valueField)
            throw errors.argumentFieldNull("params", "valueField");

        this.#dataSource = params.dataSource;

        params.dataSource.deleted.add(args => {
            let dataItem = this.findDataItem(args.dataItem);
            if (dataItem != null) {
                this.#dataItems = this.#dataItems.filter(o => o != dataItem);
            }
        })

        params.dataSource.inserted.add(args => {
            if (this.#dataItems) {
                this.#dataItems.push(args.dataItem);
            }
        })

        params.dataSource.updated.add(args => {
            let dataItem = this.findDataItem(args.dataItem);
            if (dataItem != null) {
                dataItem = Object.assign(dataItem, args.dataItem);
            }
        })
    }

    private findDataItem(pks: Partial<S>): S | null {
        let items = this.#dataItems || [];
        for (let i = 0; i < items.length; i++) {
            if (this.samePrimaryKeyValues(items[i], pks)) {
                return items[i];
            }
        }
        return null;
    }

    private samePrimaryKeyValues(item1: Partial<S>, item2: Partial<S>) {
        let primaryKeys = this.#dataSource.primaryKeys;
        for (let j = 0; j < this.#dataSource.primaryKeys.length; j++) {
            if (item1[primaryKeys[j]] != item2[primaryKeys[j]]) {
                return false;
            }
        }
        return true;
    }

    private async getDataItems() {
        if (!this.#dataItems) {
            let r = await this.#dataSource.select({ startRowIndex: 0, maximumRows: 1000 });
            this.#dataItems = r.dataItems;
        }

        return this.#dataItems;
    }

    createControl() {
        let element = document.createElement("select");
        element.className = "form-control";

        if (this.params.emptyText) {
            let o = document.createElement("option");

            let emptyText = this.params.emptyText;
            if (emptyText != null)
                o.innerText = emptyText;

            o.value = emptyValue;
            element.append(o);
        }

        new Dropdown({
            element, dataSource: this.params.dataSource,
            nameField: this.params.nameField,
            valueField: this.params.valueField,
        })

        return {
            element,
            get value() {
                return element.value;
            },
            set value(value) {
                if (value == null) {
                    element.value = emptyValue;
                    return;
                }
                element.value = value;
            }
        }
    }

    createItemCell(dataItem: T, cellElement: HTMLElement) {
        let cell = super.createItemCell(dataItem, cellElement) as GridViewEditableCell<T>;
        let cellRender = cell.render;
        let field = this;
        cell.render = function (dataItem, mode) {
            mode = mode || "read";
            let it = this as typeof cell;
            let params = (it.field as DropdownField<T, S>).params as DropdownFieldParams<T, S>;
            if (mode == "read") {
                field.getDataItems().then(dataItems => {
                    let item = dataItems.filter(o => o[params.valueField] as any == dataItem[params.dataField])[0];
                    let content = "";
                    if (item != null && item[params.nameField] != null) {
                        content = `${item[params.nameField]}`;
                    }
                    cellElement.innerHTML = content;
                })
                return;
            }

            cellRender.apply(cell, [dataItem, mode]);
        }
        return cell;
    }
}