import { DataSource } from "maishu-toolkit";
import { Control } from "./Control";
import { Errors as errors } from "./Errors";

export interface DropdownParams<T> {
    dataSource: DataSource<T>
    element: HTMLSelectElement
    nameField: keyof T
    valueField: keyof T
}

export class Dropdown<T> extends Control<HTMLSelectElement> {

    #dataSource: DataSource<T>;
    #options: { [key: string]: HTMLOptionElement } = {};
    #nameField: keyof T;
    #valueField: keyof T;

    constructor(params: DropdownParams<T>) {
        super(params.element)

        if (params == null) throw errors.argumentNull('params')
        if (params.dataSource == null) throw errors.argumentFieldNull('params', 'dataSource')
        if (params.element == null) throw errors.argumentFieldNull('params', 'element')
        if (params.nameField == null) throw errors.argumentFieldNull("params", "nameField");
        if (params.valueField == null) throw errors.argumentFieldNull("params", "valueField");

        this.#nameField = params.nameField;
        this.#valueField = params.valueField;

        this.init(params);
    }

    get dataSource() {
        return this.#dataSource;
    }

    async init(params: DropdownParams<T>) {

        this.#dataSource = params.dataSource;

        let r = await params.dataSource.select({})
        r.dataItems.forEach(dataItem => {
            this.addOptionElement(dataItem);
        })

        this.#dataSource.inserted.add(args => {
            this.addOptionElement(args.dataItem);
        })

        this.#dataSource.deleted.add(args => {
            let pk = this.primaryKeyValue(args.dataItem);
            let option = this.#options[pk];
            if (option) {
                this.element.removeChild(option);
            }
        })

        this.#dataSource.updated.add(args => {
            let pk = this.primaryKeyValue(args.dataItem);
            let option = this.#options[pk];
            if (option && args.dataItem[this.#nameField] != null) {
                option.innerHTML = args.dataItem[this.#nameField] as any;
            }
        })
    }

    private addOptionElement(dataItem: T) {
        console.assert(this.#nameField != null);
        console.assert(this.#valueField != null);
        
        let name: any = dataItem[this.#nameField];
        let value: any = dataItem[this.#valueField];

        let option = document.createElement('option')
        option.innerHTML = name || "";
        option.value = value || "";

        this.element.appendChild(option);
        let pk = this.primaryKeyValue(dataItem);
        this.#options[pk] = option;
        return option;
    }

    private primaryKeyValue(dataItem: T) {
        let r = this.#dataSource.primaryKeys.map(pk => dataItem[pk]).join("-");
        return r;
    }

}