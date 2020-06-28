import { DataSource } from "maishu-toolkit"

export class ArrayDataSource<T> extends DataSource<T> {
    #dataItems: T[];
    #items: T[] | Promise<T[]>;

    constructor(items: T[] | Promise<T[]>, primaryKeys?: (keyof T)[]) {
        super({
            primaryKeys,
            select: async (args) => {
                let arr = await this.getDateItems();
                if (args.maximumRows == null || args.maximumRows <= arr.length)
                    return { dataItems: arr, totalRowCount: arr.length };

                args.startRowIndex = args.startRowIndex || 0;
                let dataItems = arr.slice(args.startRowIndex, args.startRowIndex + args.maximumRows)
                let result = { dataItems, totalRowCount: arr.length }
                return result
            },
            update: async (dataItem) => {
                let item = await this.findDataItem(dataItem);
                if (item != null) {
                    Object.assign(item, dataItem);
                }
                return item;
            },
            insert: async (dataItem) => {
                let items = await this.getDateItems();
                items.push(dataItem);
            },
            delete: async (dataItem) => {
                let item = await this.findDataItem(dataItem);
                if (item == null) {
                    console.assert(this.#dataItems != null);
                    this.#dataItems = this.#dataItems.filter(o => o != item);
                }
                return item;
            }
        })

        this.#items = items;
    }

    private async findDataItem(pks: Partial<T>): Promise<T> {
        let items = await this.getDateItems();
        for (let i = 0; i < items.length; i++) {
            for (let j = 0; j < this.primaryKeys.length; j++) {
                if (items[i][this.primaryKeys[j]] != pks[this.primaryKeys[j]]) {
                    continue;
                }
            }
            return items[i];
        }
        return null;
    }

    private async getDateItems() {
        if (this.#dataItems == null) {
            if (Array.isArray(this.#items)) {
                this.#dataItems = this.#items;
            }
            else {
                this.#dataItems = await this.#items;
            }
        }

        return this.#dataItems;
    }
}