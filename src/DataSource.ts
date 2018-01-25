namespace wuzhui {
    export interface DataSourceSelectResult<T> {
        totalRowCount: number,
        dataItems: Array<T>
    }

    export interface DataSourceError extends Error {
        handled: boolean,
        method: DataMethod,
    }

    export type DataMethod = 'select' | 'update' | 'delete' | 'insert';
    export type SelectResult<T> = Array<T> | DataSourceSelectResult<T>;
    export class DataSource<T> {//extends DataSource<T> {   
        private _currentSelectArguments: DataSourceSelectArguments;
        private args: DataSourceArguments<T>;
        private primaryKeys: string[];

        inserting = callbacks<DataSource<T>, { item: T }>();
        inserted = callbacks<DataSource<T>, { item: T, index: number }>();

        deleting = callbacks<DataSource<T>, { item: T }>();
        deleted = callbacks<DataSource<T>, { item: T }>();
        updating = callbacks<DataSource<T>, { item: T }>();
        updated = callbacks<DataSource<T>, { item: T }>();
        selecting = callbacks<DataSource<T>, { selectArguments: DataSourceSelectArguments }>();
        selected = callbacks<DataSource<T>, DataSourceSelectResult<T>>();
        error = callbacks<this, DataSourceError>();

        constructor(args: DataSourceArguments<T>) {
            this.args = args;
            this.primaryKeys = args.primaryKeys || [];
            this._currentSelectArguments = new DataSourceSelectArguments();

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

        protected executeInsert(item: T): Promise<any> {
            if (!item) throw Errors.argumentNull("item");
            return this.args.insert(item);
        }
        protected executeDelete(item: T): Promise<any> {
            if (!item) throw Errors.argumentNull("item");
            return this.args.delete(item);
        }
        protected executeUpdate(item: T): Promise<any> {
            if (!item) throw Errors.argumentNull("item");
            return this.args.update(item);
        }
        protected executeSelect(args: DataSourceSelectArguments): Promise<SelectResult<T>> {
            if (!args) throw Errors.argumentNull("args");
            return this.args.select(args);
        }

        get selectArguments() {
            return this._currentSelectArguments;
        }

        insert(item: T) {
            if (!this.canInsert)
                throw Errors.dataSourceCanntInsert();

            this.checkPrimaryKeys(item);

            fireCallback(this.inserting, this, { item });
            return this.executeInsert(item).then((data) => {
                Object.assign(item, data);
                fireCallback(this.inserted, this, { item });
                return data;
            }).catch(exc => {
                this.processError(exc, 'insert');
            });
        }
        delete(item: T) {
            if (!this.canDelete)
                throw Errors.dataSourceCanntDelete();

            this.checkPrimaryKeys(item);

            fireCallback(this.deleting, this, { item });
            return this.executeDelete(item).then((data) => {
                fireCallback(this.deleted, this, { item });
                return data;
            }).catch(exc => {
                this.processError(exc, 'delete');
            });
        }
        update(item: T) {
            if (!this.canUpdate)
                throw Errors.dataSourceCanntUpdate();

            this.checkPrimaryKeys(item);

            fireCallback(this.updating, this, { item });
            return this.executeUpdate(item).then((data) => {
                Object.assign(item, data);
                fireCallback(this.updated, this, { item });
                return data;
            }).catch((exc: DataSourceError) => {
                this.processError(exc, 'update');
            });
        }
        isSameItem(theItem: T, otherItem: T) {
            if (theItem == null)
                throw Errors.argumentNull('theItem');

            if (otherItem == null)
                throw Errors.argumentNull('otherItem');

            if (theItem != otherItem && this.primaryKeys.length == 0)
                return false;

            if (this.primaryKeys.length > 0) {
                for (let pk of this.primaryKeys) {
                    if (theItem[pk] != otherItem[pk])
                        return false;
                }
            }

            return true;
        }
        private checkPrimaryKeys(item: T) {
            for (let key in item) {
                if (item[key] == null && this.primaryKeys.indexOf(key) >= 0)
                    throw Errors.primaryKeyNull(key);
            }
        }
        select() {
            let args = this.selectArguments;
            fireCallback(this.selecting, this, { selectArguments: args });
            return this.executeSelect(args).then((data) => {
                let data_items: Array<T>;
                let result = data as DataSourceSelectResult<T>;
                let totalRowCount: number
                if (Array.isArray(data)) {
                    data_items = <Array<T>>data;
                    totalRowCount = data_items.length;
                }
                else if (result.dataItems !== undefined && result.totalRowCount !== undefined) {
                    data_items = (<DataSourceSelectResult<T>>data).dataItems;
                    totalRowCount = (<DataSourceSelectResult<T>>data).totalRowCount;
                }
                else {
                    throw new Error('Type of the query result is expected as Array or DataSourceSelectResult.');
                }
                fireCallback(this.selected, this, { totalRowCount, dataItems: data_items });
                return data;
            }).catch(exc => {
                this.processError(exc, 'select');
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
        // totalRowCount?: number;
        maximumRows?: number;
        sortExpression?: string;
        filter?: string;

        constructor() {
            this.startRowIndex = 0;
            this.maximumRows = 2147483647;
        }
    }

    export type DataSourceArguments<T> = {
        primaryKeys?: string[]
        select: ((args: DataSourceSelectArguments) => Promise<SelectResult<T>>),
        insert?: ((item: T) => Promise<any>),
        update?: ((item: T) => Promise<any>),
        delete?: ((item: T) => Promise<any>)
    };



    export class WebDataSource<T> extends DataSource<T>{

    }

    export class ArrayDataSource<T> extends DataSource<T> {
    }

}