/*!
 * 
 *  maishu-wuzhui v1.4.8
 *  https://github.com/ansiboy/wuzhui
 *  
 *  Copyright (c) 2016-2018, shu mai <ansiboy@163.com>
 *  Licensed under the MIT License.
 * 
 */
define(function() { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./out/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./out/Control.js":
/*!************************!*\
  !*** ./out/Control.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./Errors */ "./out/Errors.js"), __webpack_require__(/*! ./Utility */ "./out/Utility.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Errors_1, Utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // namespace wuzhui {
    const CONTROL_DATA_NAME = 'Control';
    class Control {
        constructor(element) {
            if (!element)
                throw Errors_1.Errors.argumentNull('element');
            this._element = element;
            Utility_1.ElementHelper.data(element, CONTROL_DATA_NAME, this);
        }
        get visible() {
            return Utility_1.ElementHelper.isVisible(this._element);
        }
        set visible(value) {
            if (value) {
                Utility_1.ElementHelper.showElement(this._element);
            }
            else {
                Utility_1.ElementHelper.hideElement(this._element);
            }
        }
        get element() {
            return this._element;
        }
        appendChild(child, index) {
            if (child == null)
                throw Errors_1.Errors.argumentNull('child');
            let childElement;
            if (child instanceof Control)
                childElement = child.element;
            else
                childElement = child;
            let placeChild;
            if (index != null) {
                placeChild = this.element.children[index];
            }
            if (placeChild == null) {
                this.element.appendChild(childElement);
            }
            else {
                this.element.insertBefore(childElement, placeChild);
            }
        }
        style(value) {
            Utility_1.applyStyle(this.element, value);
        }
        static getControlByElement(element) {
            return Utility_1.ElementHelper.data(element, CONTROL_DATA_NAME);
        }
    }
    exports.Control = Control;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
// }


/***/ }),

/***/ "./out/DataSource.js":
/*!***************************!*\
  !*** ./out/DataSource.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./Errors */ "./out/Errors.js"), __webpack_require__(/*! ./Utility */ "./out/Utility.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Errors_1, Utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DataSource {
        constructor(args) {
            this.inserting = Utility_1.callbacks1();
            this.inserted = Utility_1.callbacks1();
            this.deleting = Utility_1.callbacks();
            this.deleted = Utility_1.callbacks();
            this.updating = Utility_1.callbacks();
            this.updated = Utility_1.callbacks();
            this.selecting = Utility_1.callbacks();
            this.selected = Utility_1.callbacks();
            this.error = Utility_1.callbacks();
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
                throw Errors_1.Errors.dataSourceCanntInsert();
            if (!item)
                throw Errors_1.Errors.argumentNull("item");
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
                throw Errors_1.Errors.dataSourceCanntDelete();
            if (!item)
                throw Errors_1.Errors.argumentNull("item");
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
                throw Errors_1.Errors.dataSourceCanntUpdate();
            if (!item)
                throw Errors_1.Errors.argumentNull("item");
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
                throw Errors_1.Errors.argumentNull('theItem');
            if (otherItem == null)
                throw Errors_1.Errors.argumentNull('otherItem');
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
                    throw Errors_1.Errors.primaryKeyNull(key);
            }
        }
        select(args) {
            args = args || {};
            Utility_1.fireCallback(this.selecting, this, args);
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
                    throw Errors_1.Errors.queryResultTypeError();
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
    exports.DataSource = DataSource;
    class DataSourceSelectArguments {
        constructor() {
            this.startRowIndex = 0;
            this.maximumRows = 2147483647;
        }
    }
    exports.DataSourceSelectArguments = DataSourceSelectArguments;
    class ArrayDataSource extends DataSource {
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
    exports.ArrayDataSource = ArrayDataSource;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
// }


/***/ }),

/***/ "./out/DropDown.js":
/*!*************************!*\
  !*** ./out/DropDown.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./Control */ "./out/Control.js"), __webpack_require__(/*! ./Errors */ "./out/Errors.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Control_1, Errors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DropDown extends Control_1.Control {
        constructor(params) {
            super(params.element);
            if (params == null)
                throw Errors_1.Errors.argumentNull('params');
            if (params.dataSource == null)
                throw Errors_1.Errors.argumentFieldNull('params', 'dataSource');
            if (params.element == null)
                throw Errors_1.Errors.argumentFieldNull('params', 'element');
            this.init(params);
        }
        init(params) {
            return __awaiter(this, void 0, void 0, function* () {
                let r = yield params.dataSource.select({});
                r.dataItems.forEach(dataItem => {
                    let option = document.createElement('option');
                    let name = params.nameField ? dataItem[params.nameField] : dataItem;
                    let value = params.valueField ? dataItem[params.valueField] : dataItem;
                    if (name == null)
                        name = '';
                    if (value == null)
                        value = '';
                    option.innerHTML = name;
                    option.value = value;
                    this.element.appendChild(option);
                });
            });
        }
    }
    exports.DropDown = DropDown;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./out/Errors.js":
/*!***********************!*\
  !*** ./out/Errors.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // namespace wuzhui {
    class Errors {
        static notImplemented(message) {
            message = message || "Not implemented";
            return new Error(message);
        }
        static argumentNull(paramName) {
            return new Error("Argument '" + paramName + "' can not be null.");
        }
        static controllBelonsAnother() {
            return new Error("The control is belongs another control.");
        }
        static columnsCanntEmpty() {
            return new Error("Columns cannt empty.");
        }
        static dataSourceCanntInsert() {
            return new Error("DataSource can not insert.");
        }
        static dataSourceCanntUpdate() {
            return new Error("DataSource can not update.");
        }
        static dataSourceCanntDelete() {
            return new Error("DataSource can not delete.");
        }
        static primaryKeyNull(key) {
            let msg = `Primary key named '${key}' value is null.`;
            return new Error(msg);
        }
        static queryResultTypeError() {
            let msg = 'Type of the query result is expected as Array or DataSourceSelectResult.';
            return new Error(msg);
        }
        static argumentFieldNull(argumentName, fieldName) {
            let msg = `Argument ${argumentName} ${fieldName} field can not be null or empty.`;
            return new Error(msg);
        }
    }
    exports.Errors = Errors;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
// }


/***/ }),

/***/ "./out/GridView.js":
/*!*************************!*\
  !*** ./out/GridView.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./Control */ "./out/Control.js"), __webpack_require__(/*! ./DataSource */ "./out/DataSource.js"), __webpack_require__(/*! ./fields/DataControlField */ "./out/fields/DataControlField.js"), __webpack_require__(/*! ./NumberPagingBar */ "./out/NumberPagingBar.js"), __webpack_require__(/*! ./Utility */ "./out/Utility.js"), __webpack_require__(/*! ./Errors */ "./out/Errors.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Control_1, DataSource_1, DataControlField_1, NumberPagingBar_1, Utility_1, Errors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // namespace wuzhui {
    var GridViewRowType;
    (function (GridViewRowType) {
        GridViewRowType[GridViewRowType["Header"] = 0] = "Header";
        GridViewRowType[GridViewRowType["Footer"] = 1] = "Footer";
        GridViewRowType[GridViewRowType["Data"] = 2] = "Data";
        GridViewRowType[GridViewRowType["Paging"] = 3] = "Paging";
        GridViewRowType[GridViewRowType["Empty"] = 4] = "Empty";
    })(GridViewRowType = exports.GridViewRowType || (exports.GridViewRowType = {}));
    function findParentElement(element, parentTagName) {
        console.assert(element != null);
        console.assert(parentTagName != null);
        parentTagName = parentTagName.toUpperCase();
        let p = element.parentElement;
        while (p) {
            if (p.tagName == parentTagName)
                return p;
            p = p.parentElement;
        }
    }
    class GridViewRow extends Control_1.Control {
        constructor(rowType) {
            let element = document.createElement('tr');
            super(element);
            this._rowType = rowType;
        }
        get rowType() {
            return this._rowType;
        }
        get gridView() {
            if (this._gridView == null) {
                let gridViewElement = findParentElement(this.element, 'table');
                console.assert(gridViewElement != null);
                this._gridView = Control_1.Control.getControlByElement(gridViewElement);
                console.assert(this._gridView != null);
            }
            return this._gridView;
        }
        get cells() {
            let cells = new Array();
            for (let i = 0; i < this.element.cells.length; i++) {
                let cell = Control_1.Control.getControlByElement(this.element.cells[i]);
                console.assert(cell != null);
                cells[i] = cell;
            }
            return cells;
        }
    }
    exports.GridViewRow = GridViewRow;
    class GridViewDataRow extends GridViewRow {
        constructor(gridView, dataItem) {
            super(GridViewRowType.Data);
            this._dataItem = dataItem;
            for (var i = 0; i < gridView.columns.length; i++) {
                var column = gridView.columns[i];
                var cell = column.createItemCell(dataItem);
                cell.visible = column.visible;
                this.appendChild(cell);
            }
        }
        get dataItem() {
            return this._dataItem;
        }
    }
    exports.GridViewDataRow = GridViewDataRow;
    class GridView extends Control_1.Control {
        constructor(params) {
            super(params.element || document.createElement('table'));
            this.emptyDataHTML = '暂无记录';
            this.initDataHTML = '数据正在加载中...';
            this.loadFailHTML = '加载数据失败，点击重新加载。';
            //========================================================
            // 样式
            // headerStyle: string;
            // footerStyle: string;
            // rowStyle: string;
            // alternatingRowStyle: string;
            //private emptyDataRowStyle: string;
            //========================================================
            this.rowCreated = Utility_1.callbacks();
            params = Object.assign({
                showHeader: true, showFooter: false,
                allowPaging: false
            }, params);
            this._params = params;
            this._columns = params.columns || [];
            if (this._columns.length == 0)
                throw Errors_1.Errors.columnsCanntEmpty();
            for (var i = 0; i < this._columns.length; i++) {
                var column = this._columns[i];
                column.gridView = this;
            }
            this._dataSource = params.dataSource;
            this._dataSource.selected.add((sender, e) => this.on_selectedExecuted(e));
            this._dataSource.updated.add((sender, item) => this.on_updateExecuted(item));
            this._dataSource.inserted.add((sender, item, index) => this.on_insertExecuted(item, index));
            this._dataSource.deleted.add((sender, item) => this.on_deleteExecuted(item));
            this._dataSource.selecting.add((sender, e) => {
                let display = this._emtpyRow.element.style.display;
                if (display != 'none') {
                    this._emtpyRow.element.cells[0].innerHTML = this.initDataHTML;
                }
            });
            this._dataSource.error.add((sender, e) => {
                if (e.method == 'select') {
                    this.renderDataItems([]);
                    var element = this._emtpyRow.cells[0].element;
                    element.innerHTML = this.loadFailHTML;
                    element.onclick = () => {
                        this._dataSource.select(this.selectArguments);
                    };
                    e.handled = true;
                    console.error(e.message);
                    console.log(e.stack);
                }
            });
            if (params.showHeader) {
                this._header = new Control_1.Control(document.createElement('thead'));
                this.appendChild(this._header);
                this.appendHeaderRow();
            }
            this.emptyDataHTML = params.emptyDataHTML || this.emptyDataHTML;
            this.initDataHTML = params.initDataHTML || this.initDataHTML;
            this._body = new Control_1.Control(document.createElement('tbody'));
            this.appendChild(this._body);
            this.appendEmptyRow();
            let allowPaging = params.pageSize;
            if (params.showFooter || allowPaging) {
                this._footer = new Control_1.Control(document.createElement('tfoot'));
                this.appendChild(this._footer);
                if (params.showFooter)
                    this.appendFooterRow();
                if (allowPaging) {
                    this.createPagingBar(params.pagerSettings);
                    this.pagingBar.selectArguments.maximumRows = params.pageSize;
                }
            }
            this.selectArguments = this.pagingBar ? this.pagingBar.selectArguments : new DataSource_1.DataSourceSelectArguments();
            this.dataSource.select(this.selectArguments);
        }
        createPagingBar(pagerSettings) {
            var pagingBarContainer = document.createElement('tr');
            var pagingBarElement = document.createElement('td');
            pagingBarElement.className = GridView.pagingBarClassName;
            pagingBarElement.colSpan = this.columns.length;
            pagingBarContainer.appendChild(pagingBarElement);
            console.assert(this._footer != null);
            this._footer.appendChild(pagingBarContainer);
            this.pagingBar = new NumberPagingBar_1.DataSourcePagingBar({ dataSource: this.dataSource, element: pagingBarElement, pagerSettings });
        }
        get columns() {
            return this._columns;
        }
        get dataSource() {
            return this._dataSource;
        }
        appendEmptyRow() {
            this._emtpyRow = new GridViewRow(GridViewRowType.Empty);
            this._emtpyRow.element.className = GridView.emptyRowClassName;
            let cell = new DataControlField_1.GridViewCell();
            cell.element.colSpan = this.columns.length;
            if (!this._params.emptyDataRowStyle) {
                Utility_1.applyStyle(cell.element, this._params.emptyDataRowStyle);
            }
            this._emtpyRow.appendChild(cell);
            this._body.appendChild(this._emtpyRow);
            Utility_1.fireCallback(this.rowCreated, this, { row: this._emtpyRow });
        }
        appendDataRow(dataItem, index) {
            var row = new GridViewDataRow(this, dataItem);
            row.element.className = GridView.dataRowClassName;
            this._body.appendChild(row, index);
            let cells = row.cells;
            for (let j = 0; j < cells.length; j++) {
                let cell = cells[j];
                if (cell instanceof DataControlField_1.GridViewDataCell) {
                    cell.render(dataItem);
                }
            }
            Utility_1.fireCallback(this.rowCreated, this, { row });
            if (this._emtpyRow.element.style.display != 'none')
                this.hideEmptyRow();
            return row;
        }
        on_sort(sender, args) {
            if (this._currentSortCell != null && this._currentSortCell != sender) {
                this._currentSortCell.clearSortIcon();
            }
            this._currentSortCell = sender;
        }
        appendHeaderRow() {
            var row = new GridViewRow(GridViewRowType.Header);
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                let cell = column.createHeaderCell();
                if (cell instanceof DataControlField_1.GridViewHeaderCell) {
                    cell.sorting.add((e, a) => this.on_sort(e, a));
                }
                row.appendChild(cell);
                cell.visible = this.columns[i].visible;
            }
            this._header.appendChild(row);
        }
        appendFooterRow() {
            var row = new GridViewRow(GridViewRowType.Footer);
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                let cell = column.createFooterCell();
                row.appendChild(cell);
                cell.visible = column.visible;
            }
            this._footer.appendChild(row);
        }
        renderDataItems(items) {
            var rows = this._body.element.querySelectorAll(`.${GridView.dataRowClassName}`);
            for (let i = 0; i < rows.length; i++)
                this._body.element.removeChild(rows[i]);
            if (items.length == 0) {
                this.showEmptyRow();
                return;
            }
            for (let i = 0; i < items.length; i++) {
                this.appendDataRow(items[i]);
            }
        }
        on_selectedExecuted(e) {
            let dataItems = e.dataItems;
            if (this._params.sort) {
                dataItems = this._params.sort(dataItems);
            }
            this.renderDataItems(dataItems);
        }
        on_updateExecuted(item) {
            console.assert(item != null);
            let dataItems = [];
            for (let i = 0; i < this._body.element.rows.length; i++) {
                let row_element = this._body.element.rows[i];
                let row = Control_1.Control.getControlByElement(row_element);
                ;
                if (!(row instanceof GridViewDataRow))
                    continue;
                let dataItem = row.dataItem;
                dataItems.push(dataItem);
                if (!this.dataSource.isSameItem(dataItem, item))
                    continue;
                if (dataItem != item) {
                    Object.assign(dataItem, item);
                }
                let cells = row.cells;
                for (let j = 0; j < cells.length; j++) {
                    let cell = cells[j];
                    if (cell instanceof DataControlField_1.GridViewDataCell) {
                        cell.render(dataItem);
                    }
                }
                // break;
            }
            if (this._params.sort) {
                dataItems = this._params.sort(dataItems);
                this.renderDataItems(dataItems);
            }
        }
        on_insertExecuted(item, index) {
            if (index == null)
                index = 0;
            if (!this._params.sort) {
                this.appendDataRow(item, index);
                return;
            }
            let dataItems = [item];
            for (let i = 0; i < this._body.element.rows.length; i++) {
                let row_element = this._body.element.rows[i];
                let row = Control_1.Control.getControlByElement(row_element);
                ;
                if (!(row instanceof GridViewDataRow))
                    continue;
                let dataItem = row.dataItem;
                dataItems.push(dataItem);
            }
            dataItems = this._params.sort(dataItems);
            this.renderDataItems(dataItems);
        }
        on_deleteExecuted(item) {
            let rows = this._body.element.rows;
            let dataRows = new Array();
            for (let i = 0; i < rows.length; i++) {
                let row = Control_1.Control.getControlByElement(rows.item(i));
                if ((row instanceof GridViewDataRow))
                    dataRows.push(row);
            }
            if (this._params.sort) {
                let dataItems = dataRows.map(o => o.dataItem)
                    .filter(o => !this.dataSource.isSameItem(o, item));
                dataItems = this._params.sort(dataItems);
                this.renderDataItems(dataItems);
                return;
            }
            for (let i = 0; i < dataRows.length; i++) {
                let dataRow = dataRows[i];
                if (!this.dataSource.isSameItem(item, dataRow.dataItem))
                    continue;
                dataRow.element.remove();
                if (dataRows.length == 1)
                    this.showEmptyRow();
            }
        }
        showEmptyRow() {
            this._emtpyRow.element.cells[0].innerHTML = this.emptyDataHTML;
            this._emtpyRow.element.style.removeProperty('display');
        }
        hideEmptyRow() {
            this._emtpyRow.element.style.display = 'none';
        }
    }
    exports.GridView = GridView;
    GridView.emptyRowClassName = 'empty';
    GridView.dataRowClassName = 'data';
    GridView.pagingBarClassName = 'pagingBar';
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
// }


/***/ }),

/***/ "./out/NumberPagingBar.js":
/*!********************************!*\
  !*** ./out/NumberPagingBar.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./Errors */ "./out/Errors.js"), __webpack_require__(/*! ./DataSource */ "./out/DataSource.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Errors_1, DataSource_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // namespace wuzhui {
    var PagerPosition;
    (function (PagerPosition) {
        PagerPosition[PagerPosition["Bottom"] = 0] = "Bottom";
        PagerPosition[PagerPosition["Top"] = 1] = "Top";
        PagerPosition[PagerPosition["TopAndBottom"] = 2] = "TopAndBottom";
    })(PagerPosition = exports.PagerPosition || (exports.PagerPosition = {}));
    ;
    class PagingBar {
        init(dataSource, selectArguments) {
            // if (dataSource == null)
            //     throw Errors.argumentNull('dataSource');
            this._pageIndex = 0;
            this._selectArguments = selectArguments || new DataSource_1.DataSourceSelectArguments();
            var pagingBar = this;
            pagingBar.totalRowCount = 1000000;
            if (dataSource) {
                dataSource.selected.add((source, args) => {
                    pagingBar.pageSize = this._selectArguments.maximumRows;
                    var totalRowCount = args.totalRowCount;
                    if (totalRowCount != null && totalRowCount >= 0) {
                        pagingBar.totalRowCount = totalRowCount;
                    }
                    var startRowIndex = this._selectArguments.startRowIndex;
                    if (startRowIndex == null || startRowIndex <= 0)
                        startRowIndex = 0;
                    pagingBar.pageIndex = Math.floor(startRowIndex / pagingBar.pageSize);
                    pagingBar.render();
                });
                dataSource.deleted.add(function () {
                    pagingBar.totalRowCount = pagingBar.totalRowCount - 1;
                    pagingBar.render();
                });
                dataSource.inserted.add(function () {
                    pagingBar.totalRowCount = pagingBar.totalRowCount + 1;
                    pagingBar.render();
                });
            }
        }
        get selectArguments() {
            return this._selectArguments;
        }
        get pageCount() {
            var pageCount = Math.ceil(this.totalRowCount / this.pageSize);
            return pageCount;
        }
        get pageSize() {
            return this._pageSize;
        }
        set pageSize(value) {
            this._pageSize = value;
        }
        get pageIndex() {
            return this._pageIndex;
        }
        set pageIndex(value) {
            this._pageIndex = value;
        }
        get totalRowCount() {
            return this._totalRowCount;
        }
        set totalRowCount(value) {
            this._totalRowCount = value;
        }
        // Virtual Method
        render() {
            throw Errors_1.Errors.notImplemented('The table-row render method is not implemented.');
        }
    }
    exports.PagingBar = PagingBar;
    class DataSourcePagingBar extends PagingBar {
        constructor(params) {
            if (!params.dataSource)
                throw Errors_1.Errors.argumentNull('dataSource');
            if (!params.element)
                throw Errors_1.Errors.argumentNull('element');
            let pagerSettings = Object.assign({
                pageButtonCount: 10,
                firstPageText: '<<',
                lastPageText: '>>',
                nextPageText: '...',
                previousPageText: '...',
                showTotal: true,
            }, params.pagerSettings || {});
            super();
            this.dataSource = params.dataSource;
            this.pagerSettings = pagerSettings;
            this.element = params.element;
            this.numberButtons = new Array();
            this.createButton = this.createPagingButton;
            this.createLabel = this.createTotalLabel;
            let buttonContainer = pagerSettings.buttonContainerWraper ?
                document.createElement(pagerSettings.buttonContainerWraper) :
                document.createElement('div');
            buttonContainer.className = pagerSettings.buttonContainerClassName || "buttons";
            this.element.appendChild(buttonContainer);
            this.createPreviousButtons(buttonContainer);
            this.createNumberButtons(buttonContainer);
            this.createNextButtons(buttonContainer);
            if (this.pagerSettings.showTotal) {
                this.totalElement = this.createLabel();
                this.totalElement.visible = false;
            }
            this.init(params.dataSource, params.selectArguments);
        }
        createPagingButton(container) {
            var pagerSettings = this.pagerSettings;
            let button = document.createElement('a');
            button.href = 'javascript:';
            if (this.pagerSettings.buttonWrapper) {
                let w = document.createElement(this.pagerSettings.buttonWrapper);
                w.appendChild(button);
                container.appendChild(w);
            }
            else {
                container.appendChild(button);
            }
            let result = {
                _button: button,
                get visible() {
                    let button = this._button;
                    return button.style.display != 'none';
                },
                set visible(value) {
                    let button = this._button;
                    let element = pagerSettings.buttonWrapper ? button.parentElement : button;
                    if (value) {
                        element.style.removeProperty('display');
                    }
                    else {
                        element.style.display = 'none';
                    }
                },
                get pageIndex() {
                    let button = this._button;
                    return new Number(button.getAttribute('pageIndex')).valueOf();
                },
                set pageIndex(value) {
                    let button = this._button;
                    button.setAttribute('pageIndex', value);
                },
                get text() {
                    let button = this._button;
                    return button.innerHTML;
                },
                set text(value) {
                    let button = this._button;
                    button.innerHTML = value;
                },
                get active() {
                    let button = this._button;
                    return button.href != null;
                },
                set active(value) {
                    let button = this._button;
                    if (value == true) {
                        button.removeAttribute('href');
                        if (pagerSettings.activeButtonClassName) {
                            // button.className = pagerSettings.activeButtonClassName;
                            this.setClassName(pagerSettings.activeButtonClassName);
                        }
                        return;
                    }
                    button.href = 'javascript:';
                    if (pagerSettings.buttonClassName)
                        this.setClassName(pagerSettings.buttonClassName);
                    else
                        this.setClassName(null);
                },
                setClassName(value) {
                    let button = this._button;
                    let element = pagerSettings.buttonWrapper ? button.parentElement : button;
                    if (value)
                        element.className = value;
                    else
                        element.removeAttribute('class');
                },
                onclick: null
            };
            button.onclick = () => {
                if (result.onclick) {
                    result.onclick(result, this);
                }
            };
            return result;
        }
        createTotalLabel() {
            let totalElement = document.createElement('div');
            totalElement.className = 'total';
            let textElement = document.createElement('span');
            textElement.className = 'text';
            textElement.innerHTML = '总记录：';
            totalElement.appendChild(textElement);
            let numberElement = document.createElement('span');
            numberElement.className = 'number';
            totalElement.appendChild(numberElement);
            this.element.appendChild(totalElement);
            return {
                get text() {
                    return numberElement.innerHTML;
                },
                set text(value) {
                    numberElement.innerHTML = value;
                },
                get visible() {
                    let display = totalElement.style.display;
                    return display != 'none';
                },
                set visible(value) {
                    if (value == true)
                        totalElement.style.display = 'block';
                    else
                        totalElement.style.display = 'node';
                }
            };
        }
        createPreviousButtons(buttonContainer) {
            this.firstPageButton = this.createButton(buttonContainer);
            this.firstPageButton.onclick = DataSourcePagingBar.on_buttonClick;
            this.firstPageButton.text = this.pagerSettings.firstPageText;
            this.firstPageButton.visible = false;
            this.previousPageButton = this.createButton(buttonContainer);
            this.previousPageButton.onclick = DataSourcePagingBar.on_buttonClick;
            this.previousPageButton.text = this.pagerSettings.previousPageText;
            this.previousPageButton.visible = false;
        }
        createNextButtons(buttonContainer) {
            this.nextPageButton = this.createButton(buttonContainer);
            this.nextPageButton.onclick = DataSourcePagingBar.on_buttonClick;
            this.nextPageButton.text = this.pagerSettings.nextPageText;
            this.nextPageButton.visible = false;
            this.lastPageButton = this.createButton(buttonContainer);
            this.lastPageButton.onclick = DataSourcePagingBar.on_buttonClick;
            this.lastPageButton.text = this.pagerSettings.lastPageText;
            this.lastPageButton.visible = false;
        }
        createNumberButtons(buttonContainer) {
            let pagingBar = this;
            let buttonCount = this.pagerSettings.pageButtonCount;
            for (let i = 0; i < buttonCount; i++) {
                let button = this.createButton(buttonContainer);
                button.onclick = DataSourcePagingBar.on_buttonClick;
                this.numberButtons[i] = button;
            }
            this.numberButtons.forEach(btn => {
                btn.onclick = () => DataSourcePagingBar.on_buttonClick(btn, pagingBar);
            });
        }
        static on_buttonClick(button, pagingBar) {
            let pageIndex = button.pageIndex;
            if (!pageIndex == null) {
                return;
            }
            let args = pagingBar.selectArguments;
            args.maximumRows = pagingBar.pageSize;
            args.startRowIndex = pageIndex * pagingBar.pageSize;
            pagingBar.pageIndex = pageIndex;
            pagingBar.dataSource.select(pagingBar.selectArguments);
        }
        render() {
            var pagerSettings = this.pagerSettings;
            var buttonCount = pagerSettings.pageButtonCount;
            let pagingBarIndex = Math.floor(this.pageIndex / buttonCount);
            let pagingBarCount = Math.ceil(this.pageCount / buttonCount);
            this.previousPageButton.pageIndex = (pagingBarIndex - 1) * buttonCount;
            this.nextPageButton.pageIndex = (pagingBarIndex + 1) * buttonCount;
            this.firstPageButton.pageIndex = 0;
            this.lastPageButton.pageIndex = this.pageCount - 1;
            for (let i = 0; i < this.numberButtons.length; i++) {
                let pageIndex = pagingBarIndex * buttonCount + i;
                if (pageIndex < this.pageCount) {
                    this.numberButtons[i].pageIndex = pageIndex;
                    this.numberButtons[i].text = (pagingBarIndex * buttonCount + i + 1).toString();
                    this.numberButtons[i].visible = true;
                    this.numberButtons[i].active = pageIndex == this.pageIndex;
                }
                else {
                    this.numberButtons[i].visible = false;
                }
            }
            if (this.totalElement) {
                this.totalElement.text = this.totalRowCount;
                this.totalElement.visible = true;
            }
            this.firstPageButton.visible = false;
            this.previousPageButton.visible = false;
            this.lastPageButton.visible = false;
            this.nextPageButton.visible = false;
            if (pagingBarIndex > 0) {
                this.firstPageButton.visible = true;
                this.previousPageButton.visible = true;
            }
            if (pagingBarIndex < pagingBarCount - 1) {
                this.lastPageButton.visible = true;
                this.nextPageButton.visible = true;
            }
        }
    }
    exports.DataSourcePagingBar = DataSourcePagingBar;
    class NumberPagingBar extends PagingBar {
        constructor(params) {
            if (!params.loadData)
                throw Errors_1.Errors.argumentNull('loadData');
            if (!params.element)
                throw Errors_1.Errors.argumentNull('element');
            let pagerSettings = Object.assign({
                pageButtonCount: 10,
                firstPageText: '<<',
                lastPageText: '>>',
                nextPageText: '...',
                previousPageText: '...',
                showTotal: true,
            }, params.pagerSettings || {});
            super();
            this.loadData = params.loadData;
            this.pagerSettings = pagerSettings;
            this.element = params.element;
            this.numberButtons = new Array();
            this.createButton = this.createPagingButton;
            this.createLabel = this.createTotalLabel;
            let buttonContainer = pagerSettings.buttonContainerWraper ?
                document.createElement(pagerSettings.buttonContainerWraper) :
                document.createElement('div');
            buttonContainer.className = pagerSettings.buttonContainerClassName || "buttons";
            this.element.appendChild(buttonContainer);
            this.createPreviousButtons(buttonContainer);
            this.createNumberButtons(buttonContainer);
            this.createNextButtons(buttonContainer);
            if (this.pagerSettings.showTotal) {
                this.totalElement = this.createLabel();
                this.totalElement.visible = false;
            }
            this.init(null, params.selectArguments);
        }
        createPagingButton(container) {
            var pagerSettings = this.pagerSettings;
            let button = document.createElement('a');
            button.href = 'javascript:';
            if (this.pagerSettings.buttonWrapper) {
                let w = document.createElement(this.pagerSettings.buttonWrapper);
                w.appendChild(button);
                container.appendChild(w);
            }
            else {
                container.appendChild(button);
            }
            let result = {
                _button: button,
                get visible() {
                    let button = this._button;
                    return button.style.display != 'none';
                },
                set visible(value) {
                    let button = this._button;
                    let element = pagerSettings.buttonWrapper ? button.parentElement : button;
                    if (value) {
                        element.style.removeProperty('display');
                    }
                    else {
                        element.style.display = 'none';
                    }
                },
                get pageIndex() {
                    let button = this._button;
                    return new Number(button.getAttribute('pageIndex')).valueOf();
                },
                set pageIndex(value) {
                    let button = this._button;
                    button.setAttribute('pageIndex', value);
                },
                get text() {
                    let button = this._button;
                    return button.innerHTML;
                },
                set text(value) {
                    let button = this._button;
                    button.innerHTML = value;
                },
                get active() {
                    let button = this._button;
                    return button.href != null;
                },
                set active(value) {
                    let button = this._button;
                    if (value == true) {
                        button.removeAttribute('href');
                        if (pagerSettings.activeButtonClassName) {
                            // button.className = pagerSettings.activeButtonClassName;
                            this.setClassName(pagerSettings.activeButtonClassName);
                        }
                        return;
                    }
                    button.href = 'javascript:';
                    if (pagerSettings.buttonClassName)
                        this.setClassName(pagerSettings.buttonClassName);
                    else
                        this.setClassName(null);
                },
                setClassName(value) {
                    let button = this._button;
                    let element = pagerSettings.buttonWrapper ? button.parentElement : button;
                    if (value)
                        element.className = value;
                    else
                        element.removeAttribute('class');
                },
                onclick: null
            };
            button.onclick = () => {
                if (result.onclick) {
                    result.onclick(result, this);
                }
            };
            return result;
        }
        createTotalLabel() {
            let totalElement = document.createElement('div');
            totalElement.className = 'total';
            let textElement = document.createElement('span');
            textElement.className = 'text';
            textElement.innerHTML = '总记录：';
            totalElement.appendChild(textElement);
            let numberElement = document.createElement('span');
            numberElement.className = 'number';
            totalElement.appendChild(numberElement);
            this.element.appendChild(totalElement);
            return {
                get text() {
                    return numberElement.innerHTML;
                },
                set text(value) {
                    numberElement.innerHTML = value;
                },
                get visible() {
                    let display = totalElement.style.display;
                    return display != 'none';
                },
                set visible(value) {
                    if (value == true)
                        totalElement.style.display = 'block';
                    else
                        totalElement.style.display = 'node';
                }
            };
        }
        createPreviousButtons(buttonContainer) {
            this.firstPageButton = this.createButton(buttonContainer);
            this.firstPageButton.onclick = NumberPagingBar.on_buttonClick;
            this.firstPageButton.text = this.pagerSettings.firstPageText;
            this.firstPageButton.visible = false;
            this.previousPageButton = this.createButton(buttonContainer);
            this.previousPageButton.onclick = NumberPagingBar.on_buttonClick;
            this.previousPageButton.text = this.pagerSettings.previousPageText;
            this.previousPageButton.visible = false;
        }
        createNextButtons(buttonContainer) {
            this.nextPageButton = this.createButton(buttonContainer);
            this.nextPageButton.onclick = NumberPagingBar.on_buttonClick;
            this.nextPageButton.text = this.pagerSettings.nextPageText;
            this.nextPageButton.visible = false;
            this.lastPageButton = this.createButton(buttonContainer);
            this.lastPageButton.onclick = NumberPagingBar.on_buttonClick;
            this.lastPageButton.text = this.pagerSettings.lastPageText;
            this.lastPageButton.visible = false;
        }
        createNumberButtons(buttonContainer) {
            let pagingBar = this;
            let buttonCount = this.pagerSettings.pageButtonCount;
            for (let i = 0; i < buttonCount; i++) {
                let button = this.createButton(buttonContainer);
                button.onclick = NumberPagingBar.on_buttonClick;
                this.numberButtons[i] = button;
            }
            this.numberButtons.forEach(btn => {
                btn.onclick = () => NumberPagingBar.on_buttonClick(btn, pagingBar);
            });
        }
        static on_buttonClick(button, pagingBar) {
            let pageIndex = button.pageIndex;
            if (!pageIndex == null) {
                return;
            }
            let args = pagingBar.selectArguments;
            args.maximumRows = pagingBar.pageSize;
            args.startRowIndex = pageIndex * pagingBar.pageSize;
            pagingBar.pageIndex = pageIndex;
            //pagingBar.dataSource.select(pagingBar.selectArguments);
            pagingBar.loadData(pageIndex);
        }
        render() {
            var pagerSettings = this.pagerSettings;
            var buttonCount = pagerSettings.pageButtonCount;
            let pagingBarIndex = Math.floor(this.pageIndex / buttonCount);
            let pagingBarCount = Math.ceil(this.pageCount / buttonCount);
            this.previousPageButton.pageIndex = (pagingBarIndex - 1) * buttonCount;
            this.nextPageButton.pageIndex = (pagingBarIndex + 1) * buttonCount;
            this.firstPageButton.pageIndex = 0;
            this.lastPageButton.pageIndex = this.pageCount - 1;
            for (let i = 0; i < this.numberButtons.length; i++) {
                let pageIndex = pagingBarIndex * buttonCount + i;
                if (pageIndex < this.pageCount) {
                    this.numberButtons[i].pageIndex = pageIndex;
                    this.numberButtons[i].text = (pagingBarIndex * buttonCount + i + 1).toString();
                    this.numberButtons[i].visible = true;
                    this.numberButtons[i].active = pageIndex == this.pageIndex;
                }
                else {
                    this.numberButtons[i].visible = false;
                }
            }
            if (this.totalElement) {
                this.totalElement.text = this.totalRowCount;
                this.totalElement.visible = true;
            }
            this.firstPageButton.visible = false;
            this.previousPageButton.visible = false;
            this.lastPageButton.visible = false;
            this.nextPageButton.visible = false;
            if (pagingBarIndex > 0) {
                this.firstPageButton.visible = true;
                this.previousPageButton.visible = true;
            }
            if (pagingBarIndex < pagingBarCount - 1) {
                this.lastPageButton.visible = true;
                this.nextPageButton.visible = true;
            }
        }
    }
    exports.NumberPagingBar = NumberPagingBar;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
// }


/***/ }),

/***/ "./out/TextBox.js":
/*!************************!*\
  !*** ./out/TextBox.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./Control */ "./out/Control.js"), __webpack_require__(/*! ./Errors */ "./out/Errors.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Control_1, Errors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TextBox extends Control_1.Control {
        constructor(params) {
            if (params == null)
                throw Errors_1.Errors.argumentNull("params");
            if (!params.element)
                throw Errors_1.Errors.argumentFieldNull("params", "element");
            if (!params.dataField)
                throw Errors_1.Errors.argumentFieldNull("params", "dataField");
            if (!params.dataItem)
                throw Errors_1.Errors.argumentFieldNull("params", "dataItem");
            if (!params.valueType)
                throw Errors_1.Errors.argumentFieldNull("params", "valuetype");
            super(params.element);
            let { element, dataField, dataItem, valueType } = params;
            let value = dataItem[dataField];
            element.value = `${value}`;
            element.onchange = () => {
                if (valueType == 'int') {
                    dataItem[dataField] = Number.parseInt(element.value);
                }
                else if (valueType == 'float') {
                    dataItem[dataField] = Number.parseFloat(element.value);
                }
                else {
                    dataItem[dataField] = (element.value || "");
                }
            };
        }
    }
    exports.TextBox = TextBox;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./out/Utility.js":
/*!************************!*\
  !*** ./out/Utility.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./Errors */ "./out/Errors.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Errors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ElementHelper {
        static showElement(element) {
            if (!element)
                throw Errors_1.Errors.argumentNull('element');
            element.style.removeProperty('display');
        }
        static hideElement(element) {
            if (!element)
                throw Errors_1.Errors.argumentNull('element');
            element.style.display = 'none';
        }
        static isVisible(element) {
            let { display } = element.style;
            return !display || display != 'none';
        }
        static data(element, name, value) {
            element['data'] = element['data'] || {};
            if (value == null)
                return element['data'].name;
            element['data'].name = value;
        }
        static findFirstParentByTagName(element, tagName) {
            if (element == null)
                throw Errors_1.Errors.argumentNull("element");
            if (!tagName)
                throw Errors_1.Errors.argumentNull('tagName');
            let parent = element.parentElement;
            while (parent != null) {
                if (parent.tagName.toLowerCase() == tagName.toLowerCase()) {
                    return parent;
                }
                parent = parent.parentElement;
            }
            return null;
        }
    }
    exports.ElementHelper = ElementHelper;
    function applyStyle(element, value) {
        let style = value || '';
        if (typeof style == 'string') {
            element.setAttribute('style', style);
        }
        else {
            for (let key in style) {
                element.style[key] = style[key];
            }
        }
    }
    exports.applyStyle = applyStyle;
    class Callback {
        constructor() {
            this.funcs = new Array();
        }
        add(func) {
            this.funcs.push(func);
        }
        remove(func) {
            this.funcs = this.funcs.filter(o => o != func);
        }
        fire(...args) {
            this.funcs.forEach(o => o(...args));
        }
    }
    exports.Callback = Callback;
    function callbacks() {
        return new Callback();
    }
    exports.callbacks = callbacks;
    function callbacks1() {
        return new Callback();
    }
    exports.callbacks1 = callbacks1;
    function fireCallback(callback, ...args) {
        callback.fire(...args);
    }
    exports.fireCallback = fireCallback;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
// }


/***/ }),

/***/ "./out/fields/BoundField.js":
/*!**********************************!*\
  !*** ./out/fields/BoundField.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/// <reference path="DataControlField.ts"/>
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./DataControlField */ "./out/fields/DataControlField.js"), __webpack_require__(/*! ../Errors */ "./out/Errors.js"), __webpack_require__(/*! ../Utility */ "./out/Utility.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, DataControlField_1, Errors_1, Utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GridViewEditableCell extends DataControlField_1.GridViewDataCell {
        constructor(field, dataItem, valueType) {
            if (field == null)
                throw Errors_1.Errors.argumentNull('field');
            if (dataItem == null)
                throw Errors_1.Errors.argumentNull('dataItem');
            super({
                dataField: field.dataField,
                nullText: field.nullText, dataFormatString: field.dataFormatString
            });
            this._field = field;
            this._dataItem = dataItem;
            this._valueType = valueType;
            this._mode = 'read';
            if (!this._valueType) {
                let value = dataItem[field.dataField];
                if (value instanceof Date)
                    this._valueType = 'date';
                else
                    this._valueType = typeof value;
            }
        }
        get field() {
            return this._field;
        }
        get mode() {
            return this._mode;
        }
        beginEdit() {
            if (this._field.readOnly) {
                return;
            }
            this._mode = 'edit';
            this.render(this._dataItem);
        }
        endEdit() {
            if (this._field.readOnly) {
                return;
            }
            this._mode = 'read';
            let value = this.controlValue;
            this.render(this._dataItem);
        }
        cancelEdit() {
            if (this._field.readOnly) {
                return;
            }
            this._mode = 'read';
            // let value = this._dataItem[this.field.dataField];
            this.render(this._dataItem);
        }
        render(dataItem) {
            //value
            let value = dataItem[this.field.dataField];
            if (this._mode == 'edit') {
                this.element.innerHTML = `<input type="text" />`;
                Utility_1.applyStyle(this.element.querySelector('input'), this._field.controlStyle);
                this.element.querySelector('input').value =
                    value === undefined ? null : `${value}`;
                return;
            }
            super.render(dataItem);
        }
        //==============================================
        // Virtual Methods
        get controlValue() {
            var text = this.element.querySelector('input').value;
            switch (this._valueType) {
                case 'number':
                    return new Number(text).valueOf();
                case 'date':
                    return new Date(text);
                default:
                    return text;
            }
        }
    }
    exports.GridViewEditableCell = GridViewEditableCell;
    class BoundField extends DataControlField_1.DataControlField {
        constructor(params) {
            super(params);
            this._params = params;
            this._valueElement = document.createElement('span');
        }
        params() {
            return this._params;
        }
        /**
         * Gets the caption displayed for a field when the field's value is null.
         */
        get nullText() {
            return this.params().nullText;
        }
        createItemCell(dataItem) {
            let cell = new GridViewEditableCell(this, dataItem);
            cell.style(this.itemStyle);
            return cell;
        }
        /**
         * Gets the field for the value.
         */
        get dataField() {
            return this.params().dataField;
        }
        /**
         * Gets the string that specifies the display format for the value of the field.
         */
        get dataFormatString() {
            return this.params().dataFormatString;
        }
        get controlStyle() {
            return this.params().controlStyle;
        }
        get readOnly() {
            return this.params().readOnly;
        }
    }
    exports.BoundField = BoundField;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./out/fields/CommandField.js":
/*!************************************!*\
  !*** ./out/fields/CommandField.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/// <reference path="DataControlField.ts"/>
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./DataControlField */ "./out/fields/DataControlField.js"), __webpack_require__(/*! ../Control */ "./out/Control.js"), __webpack_require__(/*! ./BoundField */ "./out/fields/BoundField.js"), __webpack_require__(/*! ../Utility */ "./out/Utility.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, DataControlField_1, Control_1, BoundField_1, Utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GridViewCommandCell extends DataControlField_1.GridViewCell {
        constructor(field) {
            super();
        }
    }
    class CommandField extends DataControlField_1.DataControlField {
        constructor(params) {
            super(params);
            if (!this.params().cancelButtonHTML)
                this.params().cancelButtonHTML = '取消';
            if (!this.params().deleteButtonHTML)
                this.params().deleteButtonHTML = '删除';
            if (!this.params().editButtonHTML)
                this.params().editButtonHTML = '编辑';
            if (!this.params().updateButtonHTML)
                this.params().updateButtonHTML = '更新';
            if (!this.params().newButtonHTML)
                this.params().newButtonHTML = '新增';
            if (!this.params().insertButtonHTML)
                this.params().insertButtonHTML = '添加';
        }
        params() {
            return this._params;
        }
        get cancelButtonHTML() {
            return this.params().cancelButtonHTML;
        }
        get deleteButtonHTML() {
            return this.params().deleteButtonHTML;
        }
        get editButtonHTML() {
            return this.params().editButtonHTML;
        }
        get updateButtonHTML() {
            return this.params().updateButtonHTML;
        }
        get newButtonHTML() {
            return this.params().newButtonHTML;
        }
        get insertButtonHTML() {
            return this.params().insertButtonHTML;
        }
        get cancelButtonClass() {
            return this.params().cancelButtonClass;
        }
        get deleteButtonClass() {
            return this.params().deleteButtonClass;
        }
        get editButtonClass() {
            return this.params().editButtonClass;
        }
        get newButtonClass() {
            return this.params().newButtonClass;
        }
        get updateButtonClass() {
            return this.params().updateButtonClass;
        }
        get insertButtonClass() {
            return this.params().insertButtonClass;
        }
        createItemCell(dataItem) {
            let cell = new GridViewCommandCell(this);
            cell.style(this.itemStyle);
            if (this.params().showEditButton) {
                let editButton = this.createEditButton();
                editButton.style.marginRight = '4px';
                if (this.editButtonClass)
                    editButton.className = this.editButtonClass;
                cell.editButton = editButton;
                editButton.addEventListener('click', (e) => this.on_editButtonClick(e));
                cell.appendChild(editButton);
                let updateButton = this.createUpdateButton();
                updateButton.style.display = 'none';
                updateButton.style.marginRight = '4px';
                if (this.updateButtonClass)
                    updateButton.className = this.updateButtonClass;
                cell.updateButton = updateButton;
                updateButton.addEventListener('click', (e) => this.on_insertOrUpdateButtonClick(e));
                cell.appendChild(updateButton);
                let cancelButton = this.createCancelButton();
                cancelButton.style.display = 'none';
                cancelButton.style.marginRight = '4px';
                if (this.cancelButtonClass)
                    cancelButton.className = this.cancelButtonClass;
                cell.cacelButton = cancelButton;
                cancelButton.addEventListener('click', (e) => this.on_cancelButtonClick(e));
                cell.appendChild(cancelButton);
            }
            if (this.params().showDeleteButton) {
                let deleteButton = this.createDeleteButton();
                deleteButton.style.marginRight = '4px';
                if (this.deleteButtonClass)
                    deleteButton.className = this.deleteButtonClass;
                cell.deleteButton = deleteButton;
                deleteButton.onclick = (e) => this.on_deleteButtonClick(e);
                cell.appendChild(deleteButton);
            }
            if (this.params().showNewButton) {
                let newButton = this.createNewButton();
                newButton.style.marginRight = '4px';
                if (this.newButtonClass)
                    newButton.className = this.newButtonClass;
                newButton.onclick = (e) => this.on_newButtonClick(e);
                cell.newButton = newButton;
                cell.appendChild(newButton);
                let insertButton = this.createInsertButton();
                insertButton.style.display = 'none';
                insertButton.style.marginRight = '4px';
                insertButton.addEventListener('click', (e) => this.on_insertOrUpdateButtonClick(e));
                if (this.insertButtonClass)
                    insertButton.className = this.updateButtonClass;
                cell.insertButton = insertButton;
                cell.appendChild(insertButton);
                let cancelButton = this.createCancelButton();
                cancelButton.style.display = 'none';
                cancelButton.style.marginRight = '4px';
                cancelButton.addEventListener('click', (e) => this.on_cancelButtonClick(e));
                if (this.cancelButtonClass)
                    cancelButton.className = this.cancelButtonClass;
                cell.cacelButton = cancelButton;
                cell.appendChild(cancelButton);
            }
            return cell;
        }
        showReadStatusButtons(cell) {
            if (cell.newButton) {
                this.showButton(cell.newButton);
                this.hideButton(cell.insertButton);
            }
            if (cell.editButton) {
                this.showButton(cell.editButton);
                this.hideButton(cell.updateButton);
            }
            if (cell.deleteButton)
                this.showButton(cell.deleteButton);
            this.hideButton(cell.cacelButton);
        }
        createEditButton() {
            let button = document.createElement('a');
            button.innerHTML = this.editButtonHTML;
            button.href = 'javascript:';
            return button;
        }
        createDeleteButton() {
            let button = document.createElement('a');
            button.innerHTML = this.deleteButtonHTML;
            button.href = 'javascript:';
            return button;
        }
        createInsertButton() {
            let button = document.createElement('a');
            button.innerHTML = this.insertButtonHTML;
            button.href = 'javascript:';
            return button;
        }
        createUpdateButton() {
            let button = document.createElement('a');
            button.innerHTML = this.updateButtonHTML;
            button.href = 'javascript:';
            return button;
        }
        createCancelButton() {
            let button = document.createElement('a');
            button.innerHTML = this.cancelButtonHTML;
            button.href = 'javascript:';
            return button;
        }
        createNewButton() {
            let button = document.createElement('a');
            button.innerHTML = this.newButtonHTML;
            button.href = 'javascript:';
            return button;
        }
        hideButton(button) {
            button.style.display = 'none';
        }
        showButton(button) {
            button.style.removeProperty('display');
        }
        findParentCell(element) {
            let cellElement;
            let p = element.parentElement;
            while (p) {
                if (p.tagName == 'TD') {
                    cellElement = p;
                    break;
                }
                p = p.parentElement;
            }
            return cellElement;
        }
        on_editButtonClick(e) {
            let cellElement = this.findParentCell(e.target);
            console.assert(cellElement != null);
            let rowElement = cellElement.parentElement;
            for (let i = 0; i < rowElement.cells.length; i++) {
                let cell = Control_1.Control.getControlByElement(rowElement.cells[i]);
                if (cell instanceof BoundField_1.GridViewEditableCell) {
                    cell.beginEdit();
                }
            }
            let cell = Control_1.Control.getControlByElement(cellElement);
            this.showButton(cell.cacelButton);
            this.showButton(cell.updateButton);
            this.hideButton(cell.editButton);
            if (cell.deleteButton)
                this.hideButton(cell.deleteButton);
            if (cell.newButton)
                this.hideButton(cell.newButton);
        }
        on_cancelButtonClick(e) {
            let cellElement = this.findParentCell(e.target);
            console.assert(cellElement != null);
            let rowElement = cellElement.parentElement;
            var row = Control_1.Control.getControlByElement(rowElement);
            if (row["isNew"] == true) {
                rowElement.remove();
                return;
            }
            for (let i = 0; i < rowElement.cells.length; i++) {
                let cell = Control_1.Control.getControlByElement(rowElement.cells[i]);
                if (cell instanceof BoundField_1.GridViewEditableCell) {
                    cell.cancelEdit();
                }
            }
            let cell = Control_1.Control.getControlByElement(cellElement);
            this.hideButton(cell.cacelButton);
            this.hideButton(cell.updateButton);
            this.showButton(cell.editButton);
            if (cell.deleteButton)
                this.showButton(cell.deleteButton);
            if (cell.newButton)
                this.showButton(cell.newButton);
        }
        on_insertOrUpdateButtonClick(e) {
            if (e.target['_updating'])
                e.target['_updating'] = true;
            let cellElement = Utility_1.ElementHelper.findFirstParentByTagName(e.target, 'td');
            let rowElement = cellElement.parentElement;
            let cell = Control_1.Control.getControlByElement(cellElement);
            let row = Control_1.Control.getControlByElement(rowElement);
            //==========================================================
            // 复制 dataItem 副本
            let dataItem = Object.assign({}, row.dataItem || {});
            //==========================================================
            let dataSource = row.gridView.dataSource;
            let editableCells = new Array();
            for (let i = 0; i < rowElement.cells.length; i++) {
                let cell = Control_1.Control.getControlByElement(rowElement.cells[i]);
                if (cell instanceof BoundField_1.GridViewEditableCell && cell.mode == 'edit') {
                    dataItem[cell.field.dataField] = cell.controlValue;
                    editableCells.push(cell);
                }
            }
            let isInsert = e.target == cell.insertButton;
            let p = isInsert ? dataSource.insert(dataItem, rowElement.rowIndex) : dataSource.update(dataItem);
            return p.then(() => {
                if (isInsert) {
                    rowElement.remove();
                    return;
                }
                editableCells.forEach((item) => item.endEdit());
                let cell = Control_1.Control.getControlByElement(cellElement);
                this.showReadStatusButtons(cell);
                e.target['_updating'] = false;
            }).catch(() => e.target['_updating'] = false);
        }
        on_deleteButtonClick(e) {
            let rowElement = Utility_1.ElementHelper.findFirstParentByTagName(e.target, "tr");
            let row = Control_1.Control.getControlByElement(rowElement);
            let dataSource = row.gridView.dataSource;
            dataSource.delete(row.dataItem)
                .then(() => {
                rowElement.remove();
            });
        }
        on_newButtonClick(e) {
            let rowElement = Utility_1.ElementHelper.findFirstParentByTagName(e.target, "tr"); //cellElement.parentElement as HTMLTableRowElement;
            let row = Control_1.Control.getControlByElement(rowElement);
            let gridView = row.gridView;
            let newRow = gridView.appendDataRow({}, rowElement.rowIndex);
            newRow["isNew"] = true;
            let commandCells = newRow.cells.filter(o => o instanceof GridViewCommandCell);
            newRow.cells.filter(o => o instanceof BoundField_1.GridViewEditableCell)
                .forEach((c) => c.beginEdit());
            commandCells.forEach((cell) => {
                if (cell.deleteButton)
                    this.hideButton(cell.deleteButton);
                if (cell.editButton)
                    this.hideButton(cell.editButton);
                this.hideButton(cell.newButton);
                this.showButton(cell.insertButton);
                this.showButton(cell.cacelButton);
            });
        }
    }
    exports.CommandField = CommandField;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./out/fields/CustomField.js":
/*!***********************************!*\
  !*** ./out/fields/CustomField.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./DataControlField */ "./out/fields/DataControlField.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, DataControlField_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CustomField extends DataControlField_1.DataControlField {
        constructor(params) {
            super(params);
        }
        params() {
            return this._params;
        }
        createHeaderCell() {
            if (this.params().createHeaderCell) {
                let cell = this.params().createHeaderCell();
                cell.style(this.headerStyle);
                return cell;
            }
            return super.createHeaderCell();
        }
        createFooterCell() {
            if (this.params().createFooterCell) {
                let cell = this.params().createFooterCell();
                cell.style(this.params().footerStyle);
                return cell;
            }
            return super.createFooterCell();
        }
        createItemCell(dataItem) {
            if (this.params().createItemCell) {
                let cell = this.params().createItemCell.apply(this, [dataItem]);
                cell.style(this.params().itemStyle);
                return cell;
            }
            return super.createItemCell(dataItem);
        }
    }
    exports.CustomField = CustomField;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./out/fields/DataControlField.js":
/*!****************************************!*\
  !*** ./out/fields/DataControlField.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ../Control */ "./out/Control.js"), __webpack_require__(/*! ../Utility */ "./out/Utility.js"), __webpack_require__(/*! ../Errors */ "./out/Errors.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, Control_1, Utility_1, Errors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GridViewCell extends Control_1.Control {
        constructor() {
            super(document.createElement('td'));
        }
    }
    exports.GridViewCell = GridViewCell;
    class GridViewDataCell extends GridViewCell {
        constructor(params) {
            super();
            let p = params;
            this.nullText = p.nullText != null ? p.nullText : '';
            this.dataFormatString = p.dataFormatString;
            this.dataField = p.dataField;
            if (p.render) {
                this.render = (dataItem) => p.render.apply(this, [dataItem, this.element]);
            }
        }
        render(dataItem) {
            let value = dataItem[this.dataField];
            var text;
            if (value == null)
                text = this.nullText;
            else if (this.dataFormatString)
                text = this.formatValue(this.dataFormatString, value);
            else
                text = `${value}`;
            this.element.innerHTML = text;
        }
        formatValue(format, arg) {
            var result = '';
            for (var i = 0;;) {
                var open = format.indexOf('{', i);
                var close = format.indexOf('}', i);
                if ((open < 0) && (close < 0)) {
                    result += format.slice(i);
                    break;
                }
                if ((close > 0) && ((close < open) || (open < 0))) {
                    if (format.charAt(close + 1) !== '}') {
                        throw new Error('Sys.Res.stringFormatBraceMismatch');
                    }
                    result += format.slice(i, close + 1);
                    i = close + 2;
                    continue;
                }
                result += format.slice(i, open);
                i = open + 1;
                if (format.charAt(i) === '{') {
                    result += '{';
                    i++;
                    continue;
                }
                if (close < 0)
                    throw new Error('Sys.Res.stringFormatBraceMismatch');
                var brace = format.substring(i, close);
                var argFormat = brace;
                if (typeof (arg) === "undefined" || arg === null) {
                    arg = '';
                }
                if (arg instanceof Date)
                    result = result + this.formatDate(arg, argFormat);
                else if (arg instanceof Number || typeof arg == 'number')
                    result = result + this.formatNumber(arg, argFormat);
                else
                    result = result + arg.toString();
                i = close + 1;
            }
            return result;
        }
        formatDate(value, format) {
            let y = value.getFullYear();
            let m = value.getMonth() + 1;
            let d = value.getDate();
            let h = value.getHours();
            let M = value.getMinutes();
            let s = value.getSeconds();
            let twoDigit = function (value) {
                const TEN = 10;
                if (value < TEN)
                    return `0` + value;
                return value.toString();
            };
            switch (format) {
                case 'd':
                    return `${y}-${m}-${d}`;
                case 'g':
                    return `${y}-${m}-${d} ${h}:${M}`;
                case 'gg':
                    return `${y}-${twoDigit(m)}-${twoDigit(d)} ${twoDigit(h)}:${twoDigit(M)}`;
                case 'G':
                    return `${y}-${m}-${d} ${h}:${M}:${s}`;
                case 'GG':
                    return `${y}-${twoDigit(m)}-${twoDigit(d)} ${twoDigit(h)}:${twoDigit(M)}:${twoDigit(s)}`;
                case 't':
                    return `${h}:${M}`;
                case 'T':
                    return `${h}:${M}:${s}`;
            }
            return value.toString();
        }
        formatNumber(value, format) {
            let reg = new RegExp('^C[0-9]+');
            if (reg.test(format)) {
                let num = format.substr(1);
                return value.toFixed(num);
            }
            return value.toString();
        }
    }
    exports.GridViewDataCell = GridViewDataCell;
    class GridViewHeaderCell extends Control_1.Control {
        constructor(field) {
            super(document.createElement('th'));
            this.ascHTML = '↑';
            this.descHTML = '↓';
            this.sortingHTML = '...';
            this.toSortHTML = '↕';
            this.field = field;
            this.sorting = Utility_1.callbacks();
            this.sorted = Utility_1.callbacks();
            if (field.sortExpression) {
                let labelElement = document.createElement('a');
                labelElement.href = 'javascript:';
                labelElement.innerHTML = this.defaultHeaderText();
                labelElement.onclick = () => this.handleSort();
                this._iconElement = document.createElement('span');
                this._iconElement.innerHTML = this.toSortHTML;
                this.appendChild(labelElement);
                this.appendChild(this._iconElement);
                this.sorting.add(() => this._iconElement.innerHTML = this.sortingHTML);
                this.sorted.add(() => this.updateSortIcon());
            }
            else {
                this.element.innerHTML = this.defaultHeaderText();
            }
            this.style(field.headerStyle);
        }
        handleSort() {
            let selectArguments = this.field.gridView.selectArguments;
            let sortType = this.sortType == 'asc' ? 'desc' : 'asc';
            Utility_1.fireCallback(this.sorting, this, { sortType });
            selectArguments.sortExpression = this.field.sortExpression + ' ' + sortType;
            return this.field.gridView.dataSource.select(selectArguments)
                .then(() => {
                this.sortType = sortType;
                Utility_1.fireCallback(this.sorted, this, { sortType });
            });
        }
        defaultHeaderText() {
            return this.field.headerText || this.field.dataField || '';
        }
        get sortType() {
            return this._sortType;
        }
        set sortType(value) {
            this._sortType = value;
        }
        clearSortIcon() {
            this._iconElement.innerHTML = this.toSortHTML;
        }
        updateSortIcon() {
            if (this.sortType == 'asc') {
                this._iconElement.innerHTML = this.ascHTML;
            }
            else if (this.sortType == 'desc') {
                this._iconElement.innerHTML = this.descHTML;
            }
            else {
                this._iconElement.innerHTML = this.toSortHTML;
            }
        }
    }
    exports.GridViewHeaderCell = GridViewHeaderCell;
    class DataControlField {
        constructor(params) {
            if (params.visible == null)
                params.visible = true;
            this._params = params;
        }
        /**
         * Gets the text that is displayed in the footer item of a data control field.
         */
        get footerText() {
            return this._params.footerText;
        }
        /**
         * Sets the text that is displayed in the footer item of a data control field.
         */
        set footerText(value) {
            this._params.footerText = value;
        }
        /**
         * Gets the text that is displayed in the header item of a data control field.
         */
        get headerText() {
            return this._params.headerText;
        }
        /**
        * Sets the text that is displayed in the header item of a data control field.
        */
        set headerText(value) {
            this._params.headerText = value;
        }
        get itemStyle() {
            return this._params.itemStyle;
        }
        set itemStyle(value) {
            this._params.itemStyle = value;
        }
        get footerStyle() {
            return this._params.footerStyle;
        }
        set footerStyle(value) {
            this._params.footerStyle = value;
        }
        get headerStyle() {
            return this._params.headerStyle;
        }
        set headerStyle(value) {
            this._params.headerStyle = value;
        }
        get visible() {
            return this._params.visible;
        }
        get gridView() {
            return this._gridView;
        }
        set gridView(value) {
            this._gridView = value;
        }
        /**
         * Gets a sort expression that is used by a data source control to sort data.
         */
        get sortExpression() {
            return this._params.sortExpression;
        }
        /**
         * Sets a sort expression that is used by a data source control to sort data.
         */
        set sortExpression(value) {
            this._params.sortExpression = value;
        }
        createHeaderCell() {
            let cell = new GridViewHeaderCell(this);
            return cell;
        }
        createFooterCell() {
            let cell = new GridViewCell();
            cell.element.innerHTML = this.footerText || '';
            cell.style(this.footerStyle);
            return cell;
        }
        createItemCell(dataItem) {
            if (!dataItem)
                throw Errors_1.Errors.argumentNull('dataItem');
            let cell = new GridViewCell();
            cell.style(this.itemStyle);
            return cell;
        }
    }
    exports.DataControlField = DataControlField;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ "./out/index.js":
/*!**********************!*\
  !*** ./out/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(/*! ./GridView */ "./out/GridView.js"), __webpack_require__(/*! ./fields/BoundField */ "./out/fields/BoundField.js"), __webpack_require__(/*! ./fields/CommandField */ "./out/fields/CommandField.js"), __webpack_require__(/*! ./fields/CustomField */ "./out/fields/CustomField.js"), __webpack_require__(/*! ./fields/DataControlField */ "./out/fields/DataControlField.js"), __webpack_require__(/*! ./DropDown */ "./out/DropDown.js"), __webpack_require__(/*! ./TextBox */ "./out/TextBox.js"), __webpack_require__(/*! ./DataSource */ "./out/DataSource.js"), __webpack_require__(/*! ./NumberPagingBar */ "./out/NumberPagingBar.js"), __webpack_require__(/*! ./Control */ "./out/Control.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, GridView_1, BoundField_1, CommandField_1, CustomField_1, DataControlField_1, DropDown_1, TextBox_1, DataSource_1, NumberPagingBar_1, Control_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GridView = GridView_1.GridView;
    exports.GridViewDataRow = GridView_1.GridViewDataRow;
    exports.GridViewRowType = GridView_1.GridViewRowType;
    exports.BoundField = BoundField_1.BoundField;
    exports.CommandField = CommandField_1.CommandField;
    exports.CustomField = CustomField_1.CustomField;
    exports.GridViewCell = DataControlField_1.GridViewCell;
    exports.DataControlField = DataControlField_1.DataControlField;
    exports.GridViewDataCell = DataControlField_1.GridViewDataCell;
    exports.DropDown = DropDown_1.DropDown;
    exports.TextBox = TextBox_1.TextBox;
    exports.DataSource = DataSource_1.DataSource;
    exports.DataSourceSelectArguments = DataSource_1.DataSourceSelectArguments;
    exports.ArrayDataSource = DataSource_1.ArrayDataSource;
    exports.NumberPagingBar = NumberPagingBar_1.NumberPagingBar;
    exports.DataSourcePagingBar = NumberPagingBar_1.DataSourcePagingBar;
    exports.Control = Control_1.Control;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

/******/ })});;
//# sourceMappingURL=index.js.map