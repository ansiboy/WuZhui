import { Errors } from "./Errors";
import { fireCallback, callbacks1, callbacks } from "./Utility";

// namespace wuzhui {
export interface DataSourceSelectResult<T> {
    totalRowCount: number,
    dataItems: Array<T>
}

export interface DataSourceError extends Error {
    handled: boolean,
    method: DataMethod,
}

export type DataMethod = 'select' | 'update' | 'delete' | 'insert';
export class DataSource<T> {
    private args: DataSourceArguments<T>;
    private primaryKeys: (keyof T)[];

    inserting = callbacks1<DataSource<T>, T, number>();
    inserted = callbacks1<DataSource<T>, T, number>();

    deleting = callbacks<DataSource<T>, T>();
    deleted = callbacks<DataSource<T>, T>();
    updating = callbacks<DataSource<T>, T>();
    updated = callbacks<DataSource<T>, T>();
    selecting = callbacks<DataSource<T>, DataSourceSelectArguments>();
    selected = callbacks<DataSource<T>, DataSourceSelectResult<T>>();
    error = callbacks<this, DataSourceError>();

    constructor(args: DataSourceArguments<T>) {
        this.args = args;
        this.primaryKeys = args.primaryKeys || [];
    }
    get canDelete() {
        return this.args.delete != null && this.primaryKeys.length > 0;
    }
    get canInsert() {
        return this.args.insert != null && this.primaryKeys.length > 0;
    }
    get canUpdate() {
        return this.args.update != null && this.primaryKeys.length > 0;
    }

    executeInsert(item: T, args?: any) {
        return this.args.insert(item, args);
    }
    executeDelete(item: T, args?: any) {
        return this.args.delete(item, args);
    }
    executeUpdate(item: T, args?: any) {
        return this.args.update(item, args);
    }
    executeSelect(args: DataSourceSelectArguments) {
        return this.args.select(args);
    }

    insert(item: T)
    insert(item: T, index?: number)
    insert(item: T, args?: any, index?: number) {
        if (!this.canInsert)
            throw Errors.dataSourceCanntInsert();

        if (!item)
            throw Errors.argumentNull("item");

        if (typeof args == 'number') {
            index = args;
            args = null;
        }

        this.inserting.fire(this, item, index);
        return this.executeInsert(item, args).then((data) => {
            Object.assign(item, data);
            this.inserted.fire(this, item, index);
            return data;
        }).catch(exc => {
            this.processError(exc, 'insert');
            throw exc;
        });
    }
    delete(item: T, args?: any) {
        if (!this.canDelete)
            throw Errors.dataSourceCanntDelete();

        if (!item)
            throw Errors.argumentNull("item");

        this.checkPrimaryKeys(item);
        this.deleting.fire(this, item);
        return this.executeDelete(item, args).then((data) => {
            this.deleted.fire(this, item);
            return data;
        }).catch(exc => {
            this.processError(exc, 'delete');
            throw exc;
        });
    }
    update(item: T, args?: any) {
        if (!this.canUpdate)
            throw Errors.dataSourceCanntUpdate();

        if (!item)
            throw Errors.argumentNull("item");

        this.checkPrimaryKeys(item);
        this.updating.fire(this, item);
        return this.executeUpdate(item, args).then((data) => {
            Object.assign(item, data);
            this.updated.fire(this, item);
            return data;
        }).catch((exc: DataSourceError) => {
            this.processError(exc, 'update');
            throw exc;
        });
    }
    isSameItem(theItem: T, otherItem: Partial<T>) {
        if (theItem == null)
            throw Errors.argumentNull('theItem');

        if (otherItem == null)
            throw Errors.argumentNull('otherItem');

        if (this.primaryKeys.length == 0)
            return theItem == otherItem;

        this.checkPrimaryKeys(theItem);
        this.checkPrimaryKeys(otherItem);

        for (let pk of this.primaryKeys) {
            if (theItem[pk] != otherItem[pk])
                return false;
        }

        return true;
    }
    private checkPrimaryKeys(item: Partial<T>) {
        for (let key in item) {
            if (item[key] == null && this.primaryKeys.indexOf(key) >= 0)
                throw Errors.primaryKeyNull(key);
        }
    }
    select(args: DataSourceSelectArguments): Promise<DataSourceSelectResult<T>> {
        console.assert(args != null);

        fireCallback(this.selecting, this, args);
        return this.executeSelect(args).then((data) => {
            let dataItems: Array<T>;
            let totalRowCount: number
            if (Array.isArray(data)) {
                dataItems = data;
                totalRowCount = data.length;
            }
            else if (data.dataItems !== undefined && data.totalRowCount !== undefined) {
                dataItems = (<DataSourceSelectResult<T>>data).dataItems;
                totalRowCount = (<DataSourceSelectResult<T>>data).totalRowCount;
            }
            else {
                throw Errors.queryResultTypeError();
            }
            this.selected.fire(this, { totalRowCount, dataItems });
            return { totalRowCount, dataItems };
        }).catch(exc => {
            this.processError(exc, 'select');
            throw exc;
        });
    }

    private processError(exc: DataSourceError, method: DataMethod) {
        exc.method = method;
        this.error.fire(this, exc);
        if (!exc.handled)
            throw exc;
    }
}

export class DataSourceSelectArguments {
    startRowIndex?: number;
    maximumRows?: number;
    sortExpression?: string;
    filter?: string;

    constructor() {
        this.startRowIndex = 0;
        this.maximumRows = 2147483647;
    }
}

export type DataSourceArguments<T> = {
    primaryKeys?: (keyof T)[]
    select: ((args: DataSourceSelectArguments) => Promise<DataSourceSelectResult<T>>),
    insert?: ((item: Partial<T>, args?: any) => Promise<any>),
    update?: ((item: Partial<T>, args?: any) => Promise<any>),
    delete?: ((item: Partial<T>, args?: any) => Promise<any>),
    sort?: (items: T[]) => T[],
};

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
// }