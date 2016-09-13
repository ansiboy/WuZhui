namespace wuzhui {
    export interface DataSourceSelectResult<T> {
        totalRowCount: number,
        dataItems: Array<T>
    }
    export abstract class DataSource<T> {
        private _currentSelectArguments: DataSourceSelectArguments;
        protected primaryKeys: string[];

        inserting = <Callback<DataSource<T>, { item: any }>>$.Callbacks();
        inserted = <Callback<DataSource<T>, { item: any }>>$.Callbacks();
        deleting = <Callback<DataSource<T>, { item: any }>>$.Callbacks();
        deleted = <Callback<DataSource<T>, { item: any }>>$.Callbacks();
        updating = <Callback<DataSource<T>, { item: any }>>$.Callbacks();
        updated = <Callback<DataSource<T>, { item: any }>>$.Callbacks();
        selecting = <Callback<DataSource<T>, { selectArguments: DataSourceSelectArguments }>>$.Callbacks();
        selected = <Callback<DataSource<T>, { selectArguments: DataSourceSelectArguments, items: Array<any> }>>$.Callbacks();

        constructor(primaryKeys: string[]) {
            this.primaryKeys = primaryKeys;
            this._currentSelectArguments = new DataSourceSelectArguments();
        }

        get selectArguments() {
            return this._currentSelectArguments;
        }

        protected executeInsert(item: T): JQueryPromise<any> {
            throw Errors.notImplemented();
        }
        protected executeDelete(item: T): JQueryPromise<any> {
            throw Errors.notImplemented();
        }
        protected executeUpdate(item: T): JQueryPromise<any> {
            throw Errors.notImplemented();
        }
        protected executeSelect(args): JQueryPromise<Array<T> | DataSourceSelectResult<T>> {
            throw Errors.notImplemented();
        }

        insert(item) {
            if (!this.canInsert)
                throw Errors.dataSourceCanntInsert();

            this.checkPrimaryKeys(item);

            this.inserting.fireWith(this, [this, { item }]);
            return this.executeInsert(item).done((data) => {
                $.extend(item, data);
                this.inserted.fireWith(this, [this, { item }]);
            });
        }
        delete(item) {
            if (!this.canDelete)
                throw Errors.dataSourceCanntDelete();

            this.checkPrimaryKeys(item);

            this.deleting.fireWith(this, [this, { item }]);
            return this.executeDelete(item).done(() => {
                this.deleted.fireWith(this, [this, { item }]);
            });
        }
        update(item) {
            if (!this.canUpdate)
                throw Errors.dataSourceCanntDelete();

            this.checkPrimaryKeys(item);

            this.updating.fireWith(this, [this, { item }]);
            return this.executeUpdate(item).done((data) => {
                $.extend(item, data);
            });
        }
        private checkPrimaryKeys(item) {
            for (let key in item) {
                if (item[key] == null && this.primaryKeys.indexOf(key) >= 0)
                    throw Errors.primaryKeyNull(key);
            }
        }
        select() {

            let args = this.selectArguments;
            this.selecting.fireWith(this, [this, { selectArguments: args }]);
            return this.executeSelect(args).done((data) => {
                let data_items: Array<T>;
                let result = data as DataSourceSelectResult<T>;
                if ($.isArray(data)) {
                    data_items = <Array<T>>data;
                    args.totalRowCount = data_items.length;
                }
                else if (result.dataItems !== undefined && result.totalRowCount !== undefined) {//(<any>data).Type == 'DataSourceSelectResult') {
                    data_items = (<DataSourceSelectResult<T>>data).dataItems;
                    args.totalRowCount = (<DataSourceSelectResult<T>>data).totalRowCount;
                }
                else {
                    throw new Error('Type of the query result is expected as Array or DataSourceSelectResult.');
                }
                this.selected.fireWith(this, [this, { selectArguments: args, items: data_items }]);
            });
        }

        //===============================================
        //Virtual Properties
        get canDelete() {
            return false;
        }
        get canInsert() {
            return false;
        }
        get canUpdate() {
            return false;
        }
        //===============================================
    }

    export class DataSourceSelectArguments {
        startRowIndex: number;
        totalRowCount: number;
        maximumRows: number;
        sortExpression: string;
        filter: string;

        constructor() {
            this.startRowIndex = 0;
            this.maximumRows = 2147483647;
        }
    }

    export type WebDataSourceArguments = {
        primaryKeys?: string[]
        selectUrl: string,
        insertUrl?: string,
        updateUrl?: string,
        deleteUrl?: string
    };

    export class WebDataSource<T> extends DataSource<T> {
        private args: WebDataSourceArguments;
        constructor(args: WebDataSourceArguments) {
            super(args.primaryKeys);
            this.args = args;
        }
        get canDelete() {
            return this.args.deleteUrl != null && this.primaryKeys.length > 0;
        }
        get canInsert() {
            return this.args.insertUrl != null && this.primaryKeys.length > 0;
        }
        get canUpdate() {
            return this.args.updateUrl != null && this.primaryKeys.length > 0;
        }

        protected executeInsert(item: T): JQueryPromise<any> {
            if (!item) throw Errors.argumentNull("item");

            return ajax(this.args.selectUrl, this.formatData(item));
        }
        protected executeDelete(item: T): JQueryPromise<any> {
            if (!item) throw Errors.argumentNull("item");

            return ajax(this.args.deleteUrl, this.formatData(item));
        }
        protected executeUpdate(item: T): JQueryPromise<any> {
            if (!item) throw Errors.argumentNull("item");

            return ajax(this.args.updateUrl, this.formatData(item));
        }
        protected executeSelect(args): JQueryPromise<Array<T> | DataSourceSelectResult<T>> {
            if (!args) throw Errors.argumentNull("args");

            return ajax(this.args.selectUrl, args);
        }

        private formatData(data) {
            let obj = $.extend({}, data);
            for (let name in obj) {
                if (data[name] instanceof Date) {
                    // 说明：对于MVC3，必须把日期时间转换成'yyyy-MM-dd HH:mm'这种格式。
                    let date = <Date>obj[name];
                    let y = date.getFullYear();
                    let m = date.getMonth() + 1;
                    let d = date.getDate();

                    let h = date.getHours();
                    let M = date.getMinutes();
                    let s = date.getSeconds();

                    obj[name] = y + "-" + m + "-" + d + " " + h + ":" + M + ":" + s;
                }
            }
            return obj;
        }
    }

    export class ArrayDataSource<T> extends DataSource<T> {
        private source: Array<T>;
        constructor(items: Array<T>, primaryKeys?: string[]) {
            if (items == null)
                throw Errors.argumentNull('items');

            super(primaryKeys);
            this.source = items;
        }
        protected executeInsert(item: T): JQueryPromise<any> {
            if (item == null)
                throw Errors.argumentNull('item')

            this.source.push(item);
            return $.Deferred().resolve();
        }

        protected executeDelete(item: T): JQueryPromise<any> {
            if (item == null)
                throw Errors.argumentNull('item')

            let pkValues = this.getPrimaryKeyValues(item);
            let itemIndex = this.findItem(pkValues);

            this.source.filter((value, index, array): boolean => {
                return index != itemIndex;
            })

            return $.Deferred().resolve();
        }

        protected executeUpdate(item: T): JQueryPromise<any> {
            if (item == null)
                throw Errors.argumentNull('item')

            let pkValues = this.getPrimaryKeyValues(item);
            let itemIndex = this.findItem(pkValues);
            if (itemIndex >= 0) {
                let sourceItem = this.source[itemIndex];
                for (let key in sourceItem) {
                    sourceItem[key] = item[key];
                }
            }

            return $.Deferred().resolve();
        }

        protected executeSelect(args): JQueryPromise<Array<T> | DataSourceSelectResult<T>> {
            return $.Deferred().resolve(this.source);
        }

        get canDelete() {
            return this.primaryKeys.length > 0;
        }
        get canInsert() {
            return this.primaryKeys.length > 0;
        }
        get canUpdate() {
            return this.primaryKeys.length > 0;
        }


        private getPrimaryKeyValues(item) {
            let pkValues = [];
            for (let i = 0; i < this.primaryKeys.length; i++) {
                pkValues[i] = item[this.primaryKeys[i]];
            }
            return pkValues;
        }

        private findItem(pkValues: Array<any>): number {
            for (let i = 0; i < this.source.length; i++) {
                let item = this.source[i];
                let same = true;
                for (let j = 0; j < this.primaryKeys.length; j++) {
                    let primaryKey = this.primaryKeys[j];
                    if (item[primaryKey] != pkValues[primaryKey]) {
                        same = false
                        break;
                    }
                }

                if (same) {
                    return i;
                }
            }

            return -1;
        }
    }
}