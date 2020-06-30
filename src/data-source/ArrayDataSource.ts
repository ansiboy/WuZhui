import { DataSource } from "maishu-toolkit"

export class ArrayDataSource<T> extends DataSource<T> {
    #dataItems: T[];

    constructor(dataItems: T[], primaryKeys?: (keyof T)[]) {
        super({
            primaryKeys,
            select: async (args) => {
                let arr = this.dataItems;
                if (args.maximumRows == null || args.maximumRows <= arr.length)
                    return { dataItems: arr, totalRowCount: arr.length };

                args.startRowIndex = args.startRowIndex || 0;
                let dataItems = arr.slice(args.startRowIndex, args.startRowIndex + args.maximumRows)
                let result = { dataItems, totalRowCount: arr.length }
                return result
            },
            update: async (dataItem) => {
                let item = this.findDataItem(dataItem);
                if (item != null) {
                    Object.assign(item, dataItem);
                }
                return item;
            },
            insert: async (dataItem) => {
                let items = this.dataItems;
                items.push(dataItem);
            },
            delete: async (dataItem) => {
                let item = this.findDataItem(dataItem);
                if (item == null) {
                    console.assert(this.#dataItems != null);
                    this.#dataItems = this.#dataItems.filter(o => o != item);
                }
                return item;
            }
        })

        this.#dataItems = dataItems;
    }

    get dataItems() {
        return this.#dataItems;
    }
    set dataItems(value) {
        this.#dataItems = value;
    }

    private findDataItem(pks: Partial<T>): T {
        let items = this.dataItems;
        for (let i = 0; i < items.length; i++) {
            if (this.samePrimaryKeyValues(items[i], pks)) {
                return items[i];
            }
        }
        return null;
    }

    private samePrimaryKeyValues(item1: Partial<T>, item2: Partial<T>) {
        for (let j = 0; j < this.primaryKeys.length; j++) {
            if (item1[this.primaryKeys[j]] != item2[this.primaryKeys[j]]) {
                return false;
            }
        }
        return true;
    }
}