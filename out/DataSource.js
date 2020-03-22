var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Errors } from "./Errors";
import { fireCallback, callbacks1, callbacks } from "./Utility";
export class DataSource {
    constructor(args) {
        this.inserting = callbacks1();
        this.inserted = callbacks1();
        this.deleting = callbacks();
        this.deleted = callbacks();
        this.updating = callbacks();
        this.updated = callbacks();
        this.selecting = callbacks();
        this.selected = callbacks();
        this.error = callbacks();
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
    executeInsert(item, args) {
        return this.args.insert(item, args);
    }
    executeDelete(item, args) {
        return this.args.delete(item, args);
    }
    executeUpdate(item, args) {
        return this.args.update(item, args);
    }
    executeSelect(args) {
        args = args || {};
        return this.args.select(args);
    }
    insert(item, args, index) {
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
    delete(item, args) {
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
    update(item, args) {
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
        }).catch((exc) => {
            this.processError(exc, 'update');
            throw exc;
        });
    }
    isSameItem(theItem, otherItem) {
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
    checkPrimaryKeys(item) {
        for (let key in item) {
            if (item[key] == null && this.primaryKeys.indexOf(key) >= 0)
                throw Errors.primaryKeyNull(key);
        }
    }
    select(args) {
        args = args || {};
        fireCallback(this.selecting, this, args);
        return this.executeSelect(args).then((data) => {
            let dataItems;
            let totalRowCount;
            if (Array.isArray(data)) {
                dataItems = data;
                totalRowCount = data.length;
            }
            else if (data.dataItems !== undefined && data.totalRowCount !== undefined) {
                dataItems = data.dataItems;
                totalRowCount = data.totalRowCount;
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
    processError(exc, method) {
        exc.method = method;
        this.error.fire(this, exc);
        if (!exc.handled)
            throw exc;
    }
}
export class DataSourceSelectArguments {
    constructor() {
        this.startRowIndex = 0;
        this.maximumRows = 2147483647;
    }
}
export class ArrayDataSource extends DataSource {
    constructor(items) {
        super({
            select(args) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (args.sortExpression) {
                    }
                    let dataItems = items.slice(args.startRowIndex, args.startRowIndex + args.maximumRows);
                    let result = { dataItems, totalRowCount: items.length };
                    return result;
                });
            }
        });
    }
}
// }
