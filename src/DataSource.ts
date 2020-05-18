import { DataSource } from "maishu-toolkit"

export class ArrayDataSource<T> extends DataSource<T> {
    constructor(items: T[] | Promise<T[]>) {
        super({
            async select(args) {
                let arr: T[];
                if (Array.isArray(items)) {
                    arr = items;
                }
                else {
                    arr = await items;
                }
                if (args.sortExpression) {

                }
                let dataItems = arr.slice(args.startRowIndex, args.startRowIndex + args.maximumRows)
                let result = { dataItems, totalRowCount: arr.length }
                return result
            }
        })
    }
}