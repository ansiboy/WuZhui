namespace wuzhui {

    export abstract class DataSource {
        private _currentSelectArguments: DataSourceSelectArguments;

        inserting = <Callback<DataSource, { item: any }>>$.Callbacks();
        inserted = <Callback<DataSource, { item: any }>>$.Callbacks();
        deleting = <Callback<DataSource, { item: any }>>$.Callbacks();
        deleted = <Callback<DataSource, { item: any }>>$.Callbacks();
        updating = <Callback<DataSource, { item: any }>>$.Callbacks();
        updated = <Callback<DataSource, { item: any }>>$.Callbacks();
        selecting = <Callback<DataSource, { selectArguments: DataSourceSelectArguments }>>$.Callbacks();
        selected = <Callback<DataSource, { selectArguments: DataSourceSelectArguments, items: Array<any> }>>$.Callbacks();

        constructor() {
        }

        get currentSelectArguments() {
            return this._currentSelectArguments;
        }

        protected executeInsert(item): JQueryPromise<any> {
            throw Errors.notImplemented();
        }
        protected executeDelete(item): JQueryPromise<any> {
            throw Errors.notImplemented();
        }
        protected executeUpdate(item): JQueryPromise<any> {
            throw Errors.notImplemented();
        }
        protected executeSelect(args): JQueryPromise<any> {
            throw Errors.notImplemented();
        }

        insert(item) {
            if (!this.canInsert)
                throw Errors.dataSourceCanntInsert();

            this.inserting.fireWith(this, [this, { item }]);
            return this.executeInsert(item).done((data) => {
                $.extend(item, data);
                this.inserted.fireWith(this, [this, { item }]);
            });
        }
        delete(item) {
            if (!this.canDelete)
                throw Errors.dataSourceCanntDelete();

            this.deleting.fireWith(this, [this, { item }]);
            return this.executeDelete(item).done(() => {
                this.deleted.fireWith(this, [this, { item }]);
            });
        }
        update(item) {
            if (!this.canUpdate)
                throw Errors.dataSourceCanntDelete();

            this.updating.fireWith(this, [this, { item }]);
            return this.executeUpdate(item).done((data) => {
                $.extend(item, data);
            });
        }
        select(args?: DataSourceSelectArguments) {
            if (!args)
                args = new DataSourceSelectArguments();

            this._currentSelectArguments = args;
            this.selecting.fireWith(this, [this, { selectArguments: args }]);
            return this.executeSelect(args).done((data) => {
                let data_items: Array<any>;
                if ($.isArray(data)) {
                    data_items = data;
                    args.totalRowCount = data_items.length;
                }
                else if (data.Type == 'DataSourceSelectResult') {
                    data_items = data.DataItems;
                    args.totalRowCount = data.TotalRowCount;
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
        private _startRowIndex: number;
        private _totalRowCount: number;
        private _maximumRows: number;
        private _sortExpression: string;

        constructor(params?: {
            startRowIndex?: number,
            maximumRows?: number
        }) {

            params = $.extend({
                startRowIndex: 0,
                maximumRows: 2147483647
            }, params || {})

            this._startRowIndex = params.startRowIndex;
            this._totalRowCount = null;
            this._maximumRows = params.maximumRows;
            this._sortExpression = null;
        }

        get startRowIndex() {
            return this._startRowIndex;
        }
        set startRowIndex(value: number) {
            this._startRowIndex = value;
        }
        get totalRowCount() {
            return this._totalRowCount;
        }
        set totalRowCount(value: number) {
            this._totalRowCount = value;
        }
        get maximumRows() {
            return this._maximumRows;
        }
        set maximumRows(value: number) {
            this._maximumRows = value;
        }
        get sortExpression() {
            return this._sortExpression;
        }
        set sortExpression(value: string) {
            this._sortExpression = value;
        }
    }

    export type WebDataSourceArguments = {
        selectUrl: string,
        insertUrl?: string,
        updateUrl?: string,
        deleteUrl?: string
    };

    export class WebDataSource extends DataSource {
        private args: WebDataSourceArguments;
        constructor(args: WebDataSourceArguments) {
            super();
            this.args = args;
        }
        get canDelete() {
            return this.args.deleteUrl != null;
        }
        get canInsert() {
            return this.args.insertUrl != null;
        }
        get canUpdate() {
            return this.args.updateUrl != null;
        }

        protected executeInsert(item): JQueryPromise<any> {
            if (!item) throw Errors.argumentNull("item");

            return ajax(this.args.selectUrl, this.formatData(item));
        }
        protected executeDelete(item): JQueryPromise<any> {
            if (!item) throw Errors.argumentNull("item");

            return ajax(this.args.deleteUrl, this.formatData(item));
        }
        protected executeUpdate(item): JQueryPromise<any> {
            if (!item) throw Errors.argumentNull("item");

            return ajax(this.args.updateUrl, this.formatData(item));
        }
        protected executeSelect(args): JQueryPromise<any> {
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
}