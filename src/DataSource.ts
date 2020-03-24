import { DataSource } from "maishu-toolkit"

export class ArrayDataSource<T> extends DataSource<T> {
    constructor(items: T[]) {
        super({
            async select(args) {
                if (args.sortExpression) {

                }
                let dataItems = items.slice(args.startRowIndex, args.startRowIndex + args.maximumRows)
                let result = { dataItems, totalRowCount: items.length }
                return result
            }
        })
    }
}