import { DataSource } from "./DataSource";
import { Control } from "./Control";
import { Errors } from "./Errors";

export interface DropDownArguments<T> {
    dataSource: DataSource<T>
    element: HTMLSelectElement
    nameField?: keyof T
    valueField?: keyof T
}

export class DropDown<T> extends Control<HTMLSelectElement> {
    constructor(params: DropDownArguments<T>) {
        super(params.element)

        if (params == null) throw Errors.argumentNull('params')
        if (params.dataSource == null) throw Errors.argumentFieldNull('params', 'dataSource')
        if (params.element == null) throw Errors.argumentFieldNull('params', 'element')

        this.init<T>(params)
    }

    async init<T>(params: DropDownArguments<T>) {
        let r = await params.dataSource.select({})
        r.dataItems.forEach(dataItem => {
            let option = document.createElement('option')

            let name: any = params.nameField ? dataItem[params.nameField] : dataItem
            let value: any = params.valueField ? dataItem[params.valueField] : dataItem

            if (name == null)
                name = ''

            if (value == null)
                value = ''

            option.innerHTML = name
            option.value = value

            this.element.appendChild(option)
        })
    }

}