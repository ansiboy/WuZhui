'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var wuzhui;
(function (wuzhui) {
    var CONTROL_DATA_NAME = 'Control';

    var Control = function () {
        function Control(element) {
            _classCallCheck(this, Control);

            if (!element) throw wuzhui.Errors.argumentNull('element');
            this._element = element;
            wuzhui.ElementHelper.data(element, CONTROL_DATA_NAME, this);
        }

        _createClass(Control, [{
            key: 'appendChild',
            value: function appendChild(child, index) {
                if (child == null) throw wuzhui.Errors.argumentNull('child');
                var childElement = void 0;
                if (child instanceof Control) childElement = child.element;else childElement = child;
                var placeChild = void 0;
                if (index != null) {
                    placeChild = this.element.children[index];
                }
                if (placeChild == null) {
                    this.element.appendChild(childElement);
                } else {
                    this.element.insertBefore(childElement, placeChild);
                }
            }
        }, {
            key: 'style',
            value: function style(value) {
                wuzhui.applyStyle(this.element, value);
            }
        }, {
            key: 'visible',
            get: function get() {
                return wuzhui.ElementHelper.isVisible(this._element);
            },
            set: function set(value) {
                if (value) {
                    wuzhui.ElementHelper.showElement(this._element);
                } else {
                    wuzhui.ElementHelper.hideElement(this._element);
                }
            }
        }, {
            key: 'element',
            get: function get() {
                return this._element;
            }
        }], [{
            key: 'getControlByElement',
            value: function getControlByElement(element) {
                return wuzhui.ElementHelper.data(element, CONTROL_DATA_NAME);
            }
        }]);

        return Control;
    }();

    wuzhui.Control = Control;
})(wuzhui || (wuzhui = {}));
var wuzhui;
(function (wuzhui) {
    var DataSource = function () {
        function DataSource(args) {
            _classCallCheck(this, DataSource);

            this.inserting = wuzhui.callbacks1();
            this.inserted = wuzhui.callbacks1();
            this.deleting = wuzhui.callbacks();
            this.deleted = wuzhui.callbacks();
            this.updating = wuzhui.callbacks();
            this.updated = wuzhui.callbacks();
            this.selecting = wuzhui.callbacks();
            this.selected = wuzhui.callbacks();
            this.error = wuzhui.callbacks();
            this.args = args;
            this.primaryKeys = args.primaryKeys || [];
            this._currentSelectArguments = new DataSourceSelectArguments();
        }

        _createClass(DataSource, [{
            key: 'executeInsert',
            value: function executeInsert(item, args) {
                return this.args.insert(item, args);
            }
        }, {
            key: 'executeDelete',
            value: function executeDelete(item, args) {
                return this.args.delete(item, args);
            }
        }, {
            key: 'executeUpdate',
            value: function executeUpdate(item, args) {
                return this.args.update(item, args);
            }
        }, {
            key: 'executeSelect',
            value: function executeSelect(args) {
                return this.args.select(args);
            }
        }, {
            key: 'insert',
            value: function insert(item, args, index) {
                var _this = this;

                if (!this.canInsert) throw wuzhui.Errors.dataSourceCanntInsert();
                if (!item) throw wuzhui.Errors.argumentNull("item");
                if (typeof args == 'number') {
                    index = args;
                    args = null;
                }
                this.inserting.fire(this, item, index);
                return this.executeInsert(item, args).then(function (data) {
                    Object.assign(item, data);
                    _this.inserted.fire(_this, item, index);
                    return data;
                }).catch(function (exc) {
                    _this.processError(exc, 'insert');
                    throw exc;
                });
            }
        }, {
            key: 'delete',
            value: function _delete(item, args) {
                var _this2 = this;

                if (!this.canDelete) throw wuzhui.Errors.dataSourceCanntDelete();
                if (!item) throw wuzhui.Errors.argumentNull("item");
                this.checkPrimaryKeys(item);
                this.deleting.fire(this, item);
                return this.executeDelete(item, args).then(function (data) {
                    _this2.deleted.fire(_this2, item);
                    return data;
                }).catch(function (exc) {
                    _this2.processError(exc, 'delete');
                    throw exc;
                });
            }
        }, {
            key: 'update',
            value: function update(item, args) {
                var _this3 = this;

                if (!this.canUpdate) throw wuzhui.Errors.dataSourceCanntUpdate();
                if (!item) throw wuzhui.Errors.argumentNull("item");
                this.checkPrimaryKeys(item);
                this.updating.fire(this, item);
                return this.executeUpdate(item, args).then(function (data) {
                    Object.assign(item, data);
                    _this3.updated.fire(_this3, item);
                    return data;
                }).catch(function (exc) {
                    _this3.processError(exc, 'update');
                    throw exc;
                });
            }
        }, {
            key: 'isSameItem',
            value: function isSameItem(theItem, otherItem) {
                if (theItem == null) throw wuzhui.Errors.argumentNull('theItem');
                if (otherItem == null) throw wuzhui.Errors.argumentNull('otherItem');
                if (this.primaryKeys.length == 0) return theItem == otherItem;
                this.checkPrimaryKeys(theItem);
                this.checkPrimaryKeys(otherItem);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.primaryKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var pk = _step.value;

                        if (theItem[pk] != otherItem[pk]) return false;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return true;
            }
        }, {
            key: 'checkPrimaryKeys',
            value: function checkPrimaryKeys(item) {
                for (var key in item) {
                    if (item[key] == null && this.primaryKeys.indexOf(key) >= 0) throw wuzhui.Errors.primaryKeyNull(key);
                }
            }
        }, {
            key: 'select',
            value: function select(args) {
                var _this4 = this;

                console.assert(args != null);
                wuzhui.fireCallback(this.selecting, this, args);
                return this.executeSelect(args).then(function (data) {
                    var dataItems = void 0;
                    var totalRowCount = void 0;
                    if (Array.isArray(data)) {
                        dataItems = data;
                        totalRowCount = data.length;
                    } else if (data.dataItems !== undefined && data.totalRowCount !== undefined) {
                        dataItems = data.dataItems;
                        totalRowCount = data.totalRowCount;
                    } else {
                        throw wuzhui.Errors.queryResultTypeError();
                    }
                    _this4.selected.fire(_this4, { totalRowCount: totalRowCount, dataItems: dataItems });
                    return { totalRowCount: totalRowCount, dataItems: dataItems };
                }).catch(function (exc) {
                    _this4.processError(exc, 'select');
                    throw exc;
                });
            }
        }, {
            key: 'processError',
            value: function processError(exc, method) {
                exc.method = method;
                this.error.fire(this, exc);
                if (!exc.handled) throw exc;
            }
        }, {
            key: 'canDelete',
            get: function get() {
                return this.args.delete != null && this.primaryKeys.length > 0;
            }
        }, {
            key: 'canInsert',
            get: function get() {
                return this.args.insert != null && this.primaryKeys.length > 0;
            }
        }, {
            key: 'canUpdate',
            get: function get() {
                return this.args.update != null && this.primaryKeys.length > 0;
            }
        }]);

        return DataSource;
    }();

    wuzhui.DataSource = DataSource;

    var DataSourceSelectArguments = function DataSourceSelectArguments() {
        _classCallCheck(this, DataSourceSelectArguments);

        this.startRowIndex = 0;
        this.maximumRows = 2147483647;
    };

    wuzhui.DataSourceSelectArguments = DataSourceSelectArguments;
})(wuzhui || (wuzhui = {}));
var wuzhui;
(function (wuzhui) {
    var Errors = function () {
        function Errors(parameters) {
            _classCallCheck(this, Errors);
        }

        _createClass(Errors, null, [{
            key: 'notImplemented',
            value: function notImplemented(message) {
                message = message || "Not implemented";
                return new Error(message);
            }
        }, {
            key: 'argumentNull',
            value: function argumentNull(paramName) {
                return new Error("Argument '" + paramName + "' can not be null.");
            }
        }, {
            key: 'controllBelonsAnother',
            value: function controllBelonsAnother() {
                return new Error("The control is belongs another control.");
            }
        }, {
            key: 'columnsCanntEmpty',
            value: function columnsCanntEmpty() {
                return new Error("Columns cannt empty.");
            }
        }, {
            key: 'dataSourceCanntInsert',
            value: function dataSourceCanntInsert() {
                return new Error("DataSource can not insert.");
            }
        }, {
            key: 'dataSourceCanntUpdate',
            value: function dataSourceCanntUpdate() {
                return new Error("DataSource can not update.");
            }
        }, {
            key: 'dataSourceCanntDelete',
            value: function dataSourceCanntDelete() {
                return new Error("DataSource can not delete.");
            }
        }, {
            key: 'primaryKeyNull',
            value: function primaryKeyNull(key) {
                var msg = 'Primary key named \'' + key + '\' value is null.';
                return new Error(msg);
            }
        }, {
            key: 'queryResultTypeError',
            value: function queryResultTypeError() {
                var msg = 'Type of the query result is expected as Array or DataSourceSelectResult.';
                return new Error(msg);
            }
        }]);

        return Errors;
    }();

    wuzhui.Errors = Errors;
})(wuzhui || (wuzhui = {}));
var wuzhui;
(function (wuzhui) {
    var GridViewRowType = void 0;
    (function (GridViewRowType) {
        GridViewRowType[GridViewRowType["Header"] = 0] = "Header";
        GridViewRowType[GridViewRowType["Footer"] = 1] = "Footer";
        GridViewRowType[GridViewRowType["Data"] = 2] = "Data";
        GridViewRowType[GridViewRowType["Paging"] = 3] = "Paging";
        GridViewRowType[GridViewRowType["Empty"] = 4] = "Empty";
    })(GridViewRowType = wuzhui.GridViewRowType || (wuzhui.GridViewRowType = {}));
    function findParentElement(element, parentTagName) {
        console.assert(element != null);
        console.assert(parentTagName != null);
        parentTagName = parentTagName.toUpperCase();
        var p = element.parentElement;
        while (p) {
            if (p.tagName == parentTagName) return p;
            p = p.parentElement;
        }
    }

    var GridViewRow = function (_wuzhui$Control) {
        _inherits(GridViewRow, _wuzhui$Control);

        function GridViewRow(rowType) {
            _classCallCheck(this, GridViewRow);

            var element = document.createElement('tr');

            var _this5 = _possibleConstructorReturn(this, (GridViewRow.__proto__ || Object.getPrototypeOf(GridViewRow)).call(this, element));

            _this5._rowType = rowType;
            return _this5;
        }

        _createClass(GridViewRow, [{
            key: 'rowType',
            get: function get() {
                return this._rowType;
            }
        }, {
            key: 'gridView',
            get: function get() {
                if (this._gridView == null) {
                    var gridViewElement = findParentElement(this.element, 'table');
                    console.assert(gridViewElement != null);
                    this._gridView = wuzhui.Control.getControlByElement(gridViewElement);
                    console.assert(this._gridView != null);
                }
                return this._gridView;
            }
        }, {
            key: 'cells',
            get: function get() {
                var cells = new Array();
                for (var i = 0; i < this.element.cells.length; i++) {
                    var cell = wuzhui.Control.getControlByElement(this.element.cells[i]);
                    console.assert(cell != null);
                    cells[i] = cell;
                }
                return cells;
            }
        }]);

        return GridViewRow;
    }(wuzhui.Control);

    wuzhui.GridViewRow = GridViewRow;

    var GridViewDataRow = function (_GridViewRow) {
        _inherits(GridViewDataRow, _GridViewRow);

        function GridViewDataRow(gridView, dataItem) {
            _classCallCheck(this, GridViewDataRow);

            var _this6 = _possibleConstructorReturn(this, (GridViewDataRow.__proto__ || Object.getPrototypeOf(GridViewDataRow)).call(this, GridViewRowType.Data));

            _this6._dataItem = dataItem;
            for (var i = 0; i < gridView.columns.length; i++) {
                var column = gridView.columns[i];
                var cell = column.createItemCell(dataItem);
                cell.visible = column.visible;
                _this6.appendChild(cell);
            }
            return _this6;
        }

        _createClass(GridViewDataRow, [{
            key: 'dataItem',
            get: function get() {
                return this._dataItem;
            }
        }]);

        return GridViewDataRow;
    }(GridViewRow);

    wuzhui.GridViewDataRow = GridViewDataRow;

    var GridView = function (_wuzhui$Control2) {
        _inherits(GridView, _wuzhui$Control2);

        function GridView(params) {
            _classCallCheck(this, GridView);

            var _this7 = _possibleConstructorReturn(this, (GridView.__proto__ || Object.getPrototypeOf(GridView)).call(this, params.element || document.createElement('table')));

            _this7.emptyDataHTML = '暂无记录';
            _this7.initDataHTML = '数据正在加载中...';
            _this7.loadFailHTML = '加载数据失败，点击重新加载。';
            //========================================================
            // 样式
            // headerStyle: string;
            // footerStyle: string;
            // rowStyle: string;
            // alternatingRowStyle: string;
            //private emptyDataRowStyle: string;
            //========================================================
            _this7.rowCreated = wuzhui.callbacks();
            params = Object.assign({
                showHeader: true, showFooter: false,
                allowPaging: false
            }, params);
            _this7._params = params;
            _this7._columns = params.columns || [];
            if (_this7._columns.length == 0) throw wuzhui.Errors.columnsCanntEmpty();
            for (var i = 0; i < _this7._columns.length; i++) {
                var column = _this7._columns[i];
                column.gridView = _this7;
            }
            _this7._dataSource = params.dataSource;
            _this7._dataSource.selected.add(function (sender, e) {
                return _this7.on_selectExecuted(e.dataItems);
            });
            _this7._dataSource.updated.add(function (sender, item) {
                return _this7.on_updateExecuted(item);
            });
            _this7._dataSource.inserted.add(function (sender, item, index) {
                return _this7.on_insertExecuted(item, index);
            });
            _this7._dataSource.deleted.add(function (sender, item) {
                return _this7.on_deleteExecuted(item);
            });
            _this7._dataSource.selecting.add(function (sender, e) {
                var display = _this7._emtpyRow.element.style.display;
                if (display != 'none') {
                    _this7._emtpyRow.element.cells[0].innerHTML = _this7.initDataHTML;
                }
            });
            _this7._dataSource.error.add(function (sender, e) {
                if (e.method == 'select') {
                    _this7.on_selectExecuted([]);
                    var element = _this7._emtpyRow.cells[0].element;
                    element.innerHTML = _this7.loadFailHTML;
                    element.onclick = function () {
                        _this7._dataSource.select(_this7.selectArguments);
                    };
                    e.handled = true;
                    console.error(e.message);
                    console.log(e.stack);
                }
            });
            if (params.showHeader) {
                _this7._header = new wuzhui.Control(document.createElement('thead'));
                _this7.appendChild(_this7._header);
                _this7.appendHeaderRow();
            }
            _this7.emptyDataHTML = params.emptyDataHTML || _this7.emptyDataHTML;
            _this7.initDataHTML = params.initDataHTML || _this7.initDataHTML;
            _this7._body = new wuzhui.Control(document.createElement('tbody'));
            _this7.appendChild(_this7._body);
            _this7.appendEmptyRow();
            var allowPaging = params.pageSize;
            if (params.showFooter || allowPaging) {
                _this7._footer = new wuzhui.Control(document.createElement('tfoot'));
                _this7.appendChild(_this7._footer);
                if (params.showFooter) _this7.appendFooterRow();
                if (allowPaging) {
                    _this7.createPagingBar(params.pagerSettings);
                    _this7.pagingBar.selectArguments.maximumRows = params.pageSize;
                }
            }
            _this7._selectArguments = _this7.pagingBar ? _this7.pagingBar.selectArguments : new wuzhui.DataSourceSelectArguments();
            _this7.dataSource.select(_this7._selectArguments);
            return _this7;
        }

        _createClass(GridView, [{
            key: 'createPagingBar',
            value: function createPagingBar(pagerSettings) {
                var pagingBarContainer = document.createElement('tr');
                var pagingBarElement = document.createElement('td');
                pagingBarElement.className = GridView.pagingBarClassName;
                pagingBarElement.colSpan = this.columns.length;
                pagingBarContainer.appendChild(pagingBarElement);
                console.assert(this._footer != null);
                this._footer.appendChild(pagingBarContainer);
                this.pagingBar = new wuzhui.NumberPagingBar({ dataSource: this.dataSource, element: pagingBarElement, pagerSettings: pagerSettings });
            }
        }, {
            key: 'appendEmptyRow',
            value: function appendEmptyRow() {
                this._emtpyRow = new GridViewRow(GridViewRowType.Empty);
                this._emtpyRow.element.className = GridView.emptyRowClassName;
                var cell = new wuzhui.GridViewCell();
                cell.element.colSpan = this.columns.length;
                // cell.element.innerHTML = this.initDataHTML;
                if (!this._params.emptyDataRowStyle) {
                    wuzhui.applyStyle(cell.element, this._params.emptyDataRowStyle);
                }
                this._emtpyRow.appendChild(cell);
                this._body.appendChild(this._emtpyRow);
                wuzhui.fireCallback(this.rowCreated, this, { row: this._emtpyRow });
            }
        }, {
            key: 'appendDataRow',
            value: function appendDataRow(dataItem, index) {
                var row = new GridViewDataRow(this, dataItem);
                row.element.className = GridView.dataRowClassName;
                this._body.appendChild(row, index);
                var cells = row.cells;
                for (var j = 0; j < cells.length; j++) {
                    var cell = cells[j];
                    if (cell instanceof wuzhui.GridViewDataCell) {
                        var value = cell.dataField ? dataItem[cell.dataField] : dataItem;
                        // if (value !== undefined) {
                        cell.render(value);
                        // dataItem[cell.dataField] = value;
                        // }
                    }
                }
                wuzhui.fireCallback(this.rowCreated, this, { row: row });
                if (this._emtpyRow.element.style.display != 'none') this.hideEmptyRow();
                return row;
            }
        }, {
            key: 'on_sort',
            value: function on_sort(sender, args) {
                if (this._currentSortCell != null && this._currentSortCell != sender) {
                    this._currentSortCell.clearSortIcon();
                }
                this._currentSortCell = sender;
            }
        }, {
            key: 'appendHeaderRow',
            value: function appendHeaderRow() {
                var _this8 = this;

                var row = new GridViewRow(GridViewRowType.Header);
                for (var i = 0; i < this.columns.length; i++) {
                    var column = this.columns[i];
                    var cell = column.createHeaderCell();
                    if (cell instanceof wuzhui.GridViewHeaderCell) {
                        cell.sorting.add(function (e, a) {
                            return _this8.on_sort(e, a);
                        });
                    }
                    row.appendChild(cell);
                    cell.visible = this.columns[i].visible;
                }
                this._header.appendChild(row);
            }
        }, {
            key: 'appendFooterRow',
            value: function appendFooterRow() {
                var row = new GridViewRow(GridViewRowType.Footer);
                for (var i = 0; i < this.columns.length; i++) {
                    var column = this.columns[i];
                    var cell = column.createFooterCell();
                    row.appendChild(cell);
                    cell.visible = column.visible;
                }
                this._footer.appendChild(row);
            }
        }, {
            key: 'on_selectExecuted',
            value: function on_selectExecuted(items) {
                var rows = this._body.element.querySelectorAll('.' + GridView.dataRowClassName);
                for (var i = 0; i < rows.length; i++) {
                    this._body.element.removeChild(rows[i]);
                }if (items.length == 0) {
                    this.showEmptyRow();
                    return;
                }
                for (var _i = 0; _i < items.length; _i++) {
                    this.appendDataRow(items[_i]);
                }
            }
        }, {
            key: 'on_updateExecuted',
            value: function on_updateExecuted(item) {
                console.assert(item != null);
                for (var i = 0; i < this._body.element.rows.length; i++) {
                    var row_element = this._body.element.rows[i];
                    var row = wuzhui.Control.getControlByElement(row_element);
                    ;
                    if (!(row instanceof GridViewDataRow)) continue;
                    var dataItem = row.dataItem;
                    if (!this.dataSource.isSameItem(item, dataItem)) continue;
                    var cells = row.cells;
                    for (var j = 0; j < cells.length; j++) {
                        var cell = cells[j];
                        if (cell instanceof wuzhui.GridViewDataCell) {
                            var value = cell.dataField ? item[cell.dataField] : item;
                            cell.render(value);
                            if (cell.dataField) dataItem[cell.dataField] = value;
                        }
                    }
                    break;
                }
            }
        }, {
            key: 'on_insertExecuted',
            value: function on_insertExecuted(item, index) {
                if (index == null) index = 0;
                this.appendDataRow(item, index);
            }
        }, {
            key: 'on_deleteExecuted',
            value: function on_deleteExecuted(item) {
                var dataRowsCount = 0;
                var rows = this._body.element.rows;
                var dataRows = new Array();
                for (var i = 0; i < rows.length; i++) {
                    var row = wuzhui.Control.getControlByElement(rows.item(i));
                    if (row instanceof GridViewDataRow) dataRows.push(row);
                }
                for (var _i2 = 0; _i2 < dataRows.length; _i2++) {
                    var dataRow = dataRows[_i2];
                    if (!this.dataSource.isSameItem(item, dataRow.dataItem)) continue;
                    dataRow.element.remove();
                    if (dataRows.length == 1) this.showEmptyRow();
                }
            }
        }, {
            key: 'showEmptyRow',
            value: function showEmptyRow() {
                this._emtpyRow.element.cells[0].innerHTML = this.emptyDataHTML;
                this._emtpyRow.element.style.removeProperty('display');
            }
        }, {
            key: 'hideEmptyRow',
            value: function hideEmptyRow() {
                this._emtpyRow.element.style.display = 'none';
            }
        }, {
            key: 'selectArguments',
            get: function get() {
                return this._selectArguments;
            }
        }, {
            key: 'columns',
            get: function get() {
                return this._columns;
            }
        }, {
            key: 'dataSource',
            get: function get() {
                return this._dataSource;
            }
        }]);

        return GridView;
    }(wuzhui.Control);

    GridView.emptyRowClassName = 'empty';
    GridView.dataRowClassName = 'data';
    GridView.pagingBarClassName = 'pagingBar';
    wuzhui.GridView = GridView;
})(wuzhui || (wuzhui = {}));
var wuzhui;
(function (wuzhui) {
    var PagerPosition = void 0;
    (function (PagerPosition) {
        PagerPosition[PagerPosition["Bottom"] = 0] = "Bottom";
        PagerPosition[PagerPosition["Top"] = 1] = "Top";
        PagerPosition[PagerPosition["TopAndBottom"] = 2] = "TopAndBottom";
    })(PagerPosition = wuzhui.PagerPosition || (wuzhui.PagerPosition = {}));
    ;

    var PagingBar = function () {
        function PagingBar() {
            _classCallCheck(this, PagingBar);
        }

        _createClass(PagingBar, [{
            key: 'init',
            value: function init(dataSource, selectArguments) {
                var _this9 = this;

                if (dataSource == null) throw wuzhui.Errors.argumentNull('dataSource');
                this._pageIndex = 0;
                this._selectArguments = selectArguments || new wuzhui.DataSourceSelectArguments();
                var pagingBar = this;
                pagingBar.totalRowCount = 1000000;
                dataSource.selected.add(function (source, args) {
                    pagingBar._pageSize = _this9._selectArguments.maximumRows;
                    var totalRowCount = args.totalRowCount;
                    if (totalRowCount != null && totalRowCount >= 0) {
                        pagingBar.totalRowCount = totalRowCount;
                    }
                    var startRowIndex = _this9._selectArguments.startRowIndex;
                    if (startRowIndex <= 0) startRowIndex = 0;
                    pagingBar._pageIndex = Math.floor(startRowIndex / pagingBar._pageSize);
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
        }, {
            key: 'render',

            // Virtual Method
            value: function render() {
                throw wuzhui.Errors.notImplemented('The table-row render method is not implemented.');
            }
        }, {
            key: 'selectArguments',
            get: function get() {
                return this._selectArguments;
            }
        }, {
            key: 'pageCount',
            get: function get() {
                var pageCount = Math.ceil(this.totalRowCount / this.pageSize);
                return pageCount;
            }
        }, {
            key: 'pageSize',
            get: function get() {
                return this._pageSize;
            },
            set: function set(value) {
                this._pageSize = value;
            }
        }, {
            key: 'pageIndex',
            get: function get() {
                return this._pageIndex;
            },
            set: function set(value) {
                this._pageIndex = value;
            }
        }, {
            key: 'totalRowCount',
            get: function get() {
                return this._totalRowCount;
            },
            set: function set(value) {
                this._totalRowCount = value;
            }
        }]);

        return PagingBar;
    }();

    wuzhui.PagingBar = PagingBar;

    var NumberPagingBar = function (_PagingBar) {
        _inherits(NumberPagingBar, _PagingBar);

        function NumberPagingBar(params) {
            _classCallCheck(this, NumberPagingBar);

            if (!params.dataSource) throw wuzhui.Errors.argumentNull('dataSource');
            if (!params.element) throw wuzhui.Errors.argumentNull('element');
            var pagerSettings = Object.assign({
                pageButtonCount: 10,
                firstPageText: '<<',
                lastPageText: '>>',
                nextPageText: '...',
                previousPageText: '...',
                showTotal: true
            }, params.pagerSettings || {});

            var _this10 = _possibleConstructorReturn(this, (NumberPagingBar.__proto__ || Object.getPrototypeOf(NumberPagingBar)).call(this));

            _this10.dataSource = params.dataSource;
            _this10.pagerSettings = pagerSettings;
            _this10.element = params.element;
            _this10.numberButtons = new Array();
            _this10.createButton = _this10.createPagingButton;
            _this10.createLabel = _this10.createTotalLabel;
            var buttonContainer = pagerSettings.buttonContainerWraper ? document.createElement(pagerSettings.buttonContainerWraper) : document.createElement('div');
            buttonContainer.className = pagerSettings.buttonContainerClassName || "buttons";
            _this10.element.appendChild(buttonContainer);
            _this10.createPreviousButtons(buttonContainer);
            _this10.createNumberButtons(buttonContainer);
            _this10.createNextButtons(buttonContainer);
            if (_this10.pagerSettings.showTotal) {
                _this10.totalElement = _this10.createLabel();
                _this10.totalElement.visible = false;
            }
            _this10.init(params.dataSource, params.selectArguments);
            return _this10;
        }

        _createClass(NumberPagingBar, [{
            key: 'createPagingButton',
            value: function createPagingButton(container) {
                var _this11 = this;

                var pagerSettings = this.pagerSettings;
                var button = document.createElement('a');
                button.href = 'javascript:';
                if (this.pagerSettings.buttonWrapper) {
                    var w = document.createElement(this.pagerSettings.buttonWrapper);
                    w.appendChild(button);
                    container.appendChild(w);
                } else {
                    container.appendChild(button);
                }
                var result = {
                    _button: button,
                    get visible() {
                        var button = this._button;
                        return button.style.display != 'none';
                    },
                    set visible(value) {
                        var button = this._button;
                        var element = pagerSettings.buttonWrapper ? button.parentElement : button;
                        if (value) {
                            element.style.removeProperty('display');
                        } else {
                            element.style.display = 'none';
                        }
                    },
                    get pageIndex() {
                        var button = this._button;
                        return new Number(button.getAttribute('pageIndex')).valueOf();
                    },
                    set pageIndex(value) {
                        var button = this._button;
                        button.setAttribute('pageIndex', value);
                    },
                    get text() {
                        var button = this._button;
                        return button.innerHTML;
                    },
                    set text(value) {
                        var button = this._button;
                        button.innerHTML = value;
                    },
                    get active() {
                        var button = this._button;
                        return button.href != null;
                    },
                    set active(value) {
                        var button = this._button;
                        if (value == true) {
                            button.removeAttribute('href');
                            if (pagerSettings.activeButtonClassName) {
                                // button.className = pagerSettings.activeButtonClassName;
                                this.setClassName(pagerSettings.activeButtonClassName);
                            }
                            return;
                        }
                        button.href = 'javascript:';
                        if (pagerSettings.buttonClassName) this.setClassName(pagerSettings.buttonClassName);else this.setClassName(null);
                    },
                    setClassName: function setClassName(value) {
                        var button = this._button;
                        var element = pagerSettings.buttonWrapper ? button.parentElement : button;
                        if (value) element.className = value;else element.removeAttribute('class');
                    },

                    onclick: null
                };
                button.onclick = function () {
                    if (result.onclick) {
                        result.onclick(result, _this11);
                    }
                };
                return result;
            }
        }, {
            key: 'createTotalLabel',
            value: function createTotalLabel() {
                var totalElement = document.createElement('div');
                totalElement.className = 'total';
                var textElement = document.createElement('span');
                textElement.className = 'text';
                textElement.innerHTML = '总记录：';
                totalElement.appendChild(textElement);
                var numberElement = document.createElement('span');
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
                        var display = totalElement.style.display;
                        return display != 'none';
                    },
                    set visible(value) {
                        if (value == true) totalElement.style.display = 'block';else totalElement.style.display = 'node';
                    }
                };
            }
        }, {
            key: 'createPreviousButtons',
            value: function createPreviousButtons(buttonContainer) {
                this.firstPageButton = this.createButton(buttonContainer);
                this.firstPageButton.onclick = NumberPagingBar.on_buttonClick;
                this.firstPageButton.text = this.pagerSettings.firstPageText;
                this.firstPageButton.visible = false;
                this.previousPageButton = this.createButton(buttonContainer);
                this.previousPageButton.onclick = NumberPagingBar.on_buttonClick;
                this.previousPageButton.text = this.pagerSettings.previousPageText;
                this.previousPageButton.visible = false;
            }
        }, {
            key: 'createNextButtons',
            value: function createNextButtons(buttonContainer) {
                this.nextPageButton = this.createButton(buttonContainer);
                this.nextPageButton.onclick = NumberPagingBar.on_buttonClick;
                this.nextPageButton.text = this.pagerSettings.nextPageText;
                this.nextPageButton.visible = false;
                this.lastPageButton = this.createButton(buttonContainer);
                this.lastPageButton.onclick = NumberPagingBar.on_buttonClick;
                this.lastPageButton.text = this.pagerSettings.lastPageText;
                this.lastPageButton.visible = false;
            }
        }, {
            key: 'createNumberButtons',
            value: function createNumberButtons(buttonContainer) {
                var pagingBar = this;
                var buttonCount = this.pagerSettings.pageButtonCount;
                for (var i = 0; i < buttonCount; i++) {
                    var button = this.createButton(buttonContainer);
                    button.onclick = NumberPagingBar.on_buttonClick;
                    this.numberButtons[i] = button;
                }
                this.numberButtons.forEach(function (btn) {
                    btn.onclick = function () {
                        return NumberPagingBar.on_buttonClick(btn, pagingBar);
                    };
                });
            }
        }, {
            key: 'render',
            value: function render() {
                var pagerSettings = this.pagerSettings;
                var buttonCount = pagerSettings.pageButtonCount;
                var pagingBarIndex = Math.floor(this.pageIndex / buttonCount);
                var pagingBarCount = Math.ceil(this.pageCount / buttonCount);
                this.previousPageButton.pageIndex = (pagingBarIndex - 1) * buttonCount;
                this.nextPageButton.pageIndex = (pagingBarIndex + 1) * buttonCount;
                this.firstPageButton.pageIndex = 0;
                this.lastPageButton.pageIndex = this.pageCount - 1;
                for (var i = 0; i < this.numberButtons.length; i++) {
                    var pageIndex = pagingBarIndex * buttonCount + i;
                    if (pageIndex < this.pageCount) {
                        this.numberButtons[i].pageIndex = pageIndex;
                        this.numberButtons[i].text = (pagingBarIndex * buttonCount + i + 1).toString();
                        this.numberButtons[i].visible = true;
                        this.numberButtons[i].active = pageIndex == this.pageIndex;
                    } else {
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
        }], [{
            key: 'on_buttonClick',
            value: function on_buttonClick(button, pagingBar) {
                var pageIndex = button.pageIndex;
                if (!pageIndex == null) {
                    return;
                }
                var args = pagingBar.selectArguments;
                args.maximumRows = pagingBar.pageSize;
                args.startRowIndex = pageIndex * pagingBar.pageSize;
                pagingBar.pageIndex = pageIndex;
                pagingBar.dataSource.select(pagingBar.selectArguments);
            }
        }]);

        return NumberPagingBar;
    }(PagingBar);

    wuzhui.NumberPagingBar = NumberPagingBar;
})(wuzhui || (wuzhui = {}));
var wuzhui;
(function (wuzhui) {
    var ElementHelper = function () {
        function ElementHelper() {
            _classCallCheck(this, ElementHelper);
        }

        _createClass(ElementHelper, null, [{
            key: 'showElement',
            value: function showElement(element) {
                if (!element) throw wuzhui.Errors.argumentNull('element');
                element.style.removeProperty('display');
            }
        }, {
            key: 'hideElement',
            value: function hideElement(element) {
                if (!element) throw wuzhui.Errors.argumentNull('element');
                element.style.display = 'none';
            }
        }, {
            key: 'isVisible',
            value: function isVisible(element) {
                var display = element.style.display;

                return !display || display != 'none';
            }
        }, {
            key: 'data',
            value: function data(element, name, value) {
                element['data'] = element['data'] || {};
                if (value == null) return element['data'].name;
                element['data'].name = value;
            }
        }, {
            key: 'findFirstParentByTagName',
            value: function findFirstParentByTagName(element, tagName) {
                if (element == null) throw wuzhui.Errors.argumentNull("element");
                if (!tagName) throw wuzhui.Errors.argumentNull('tagName');
                var parent = element.parentElement;
                while (parent != null) {
                    if (parent.tagName.toLowerCase() == tagName.toLowerCase()) {
                        return parent;
                    }
                    parent = parent.parentElement;
                }
                return null;
            }
        }]);

        return ElementHelper;
    }();

    wuzhui.ElementHelper = ElementHelper;
    function applyStyle(element, value) {
        var style = value || '';
        if (typeof style == 'string') {
            element.setAttribute('style', style);
        } else {
            for (var key in style) {
                element.style[key] = style[key];
            }
        }
    }
    wuzhui.applyStyle = applyStyle;

    var Callback = function () {
        function Callback() {
            _classCallCheck(this, Callback);

            this.funcs = new Array();
        }

        _createClass(Callback, [{
            key: 'add',
            value: function add(func) {
                this.funcs.push(func);
            }
        }, {
            key: 'remove',
            value: function remove(func) {
                this.funcs = this.funcs.filter(function (o) {
                    return o != func;
                });
            }
        }, {
            key: 'fire',
            value: function fire() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                this.funcs.forEach(function (o) {
                    return o.apply(undefined, args);
                });
            }
        }]);

        return Callback;
    }();

    wuzhui.Callback = Callback;
    function callbacks() {
        return new Callback();
    }
    wuzhui.callbacks = callbacks;
    function callbacks1() {
        return new Callback();
    }
    wuzhui.callbacks1 = callbacks1;
    function fireCallback(callback) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
        }

        callback.fire.apply(callback, args);
    }
    wuzhui.fireCallback = fireCallback;
})(wuzhui || (wuzhui = {}));
/// <reference path="../Control.ts"/>
var wuzhui;
(function (wuzhui) {
    var GridViewCell = function (_wuzhui$Control3) {
        _inherits(GridViewCell, _wuzhui$Control3);

        function GridViewCell() {
            _classCallCheck(this, GridViewCell);

            return _possibleConstructorReturn(this, (GridViewCell.__proto__ || Object.getPrototypeOf(GridViewCell)).call(this, document.createElement('td')));
        }

        return GridViewCell;
    }(wuzhui.Control);

    wuzhui.GridViewCell = GridViewCell;

    var GridViewDataCell = function (_GridViewCell) {
        _inherits(GridViewDataCell, _GridViewCell);

        function GridViewDataCell(params) {
            _classCallCheck(this, GridViewDataCell);

            var _this13 = _possibleConstructorReturn(this, (GridViewDataCell.__proto__ || Object.getPrototypeOf(GridViewDataCell)).call(this));

            params = params || {};
            _this13.nullText = params.nullText != null ? params.nullText : '';
            _this13.dataFormatString = params.dataFormatString;
            _this13.dataField = params.dataField;
            if (params.render) {
                _this13.render = function (value) {
                    return params.render(value, _this13.element);
                };
            }
            return _this13;
        }

        _createClass(GridViewDataCell, [{
            key: 'render',
            value: function render(value) {
                var text;
                if (value == null) text = this.nullText;else if (this.dataFormatString) text = this.formatValue(this.dataFormatString, value);else text = value;
                this.element.innerHTML = text;
            }
        }, {
            key: 'formatValue',
            value: function formatValue(format, arg) {
                var result = '';
                for (var i = 0;;) {
                    var open = format.indexOf('{', i);
                    var close = format.indexOf('}', i);
                    if (open < 0 && close < 0) {
                        result += format.slice(i);
                        break;
                    }
                    if (close > 0 && (close < open || open < 0)) {
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
                    if (close < 0) throw new Error('Sys.Res.stringFormatBraceMismatch');
                    var brace = format.substring(i, close);
                    var argFormat = brace;
                    if (typeof arg === "undefined" || arg === null) {
                        arg = '';
                    }
                    if (arg instanceof Date) result = result + this.formatDate(arg, argFormat);else if (arg instanceof Number || typeof arg == 'number') result = result + this.formatNumber(arg, argFormat);else result = result + arg.toString();
                    i = close + 1;
                }
                return result;
            }
        }, {
            key: 'formatDate',
            value: function formatDate(value, format) {
                var TEN = 10;
                var y = value.getFullYear();
                var m = value.getMonth() + 1;
                var d = value.getDate();
                var h = value.getHours();
                var M = value.getMinutes();
                var s = value.getSeconds();
                var twoDigit = function twoDigit(value) {
                    if (value < 10) return '0' + value;
                    return value.toString();
                };
                switch (format) {
                    case 'd':
                        return y + '-' + m + '-' + d;
                    case 'g':
                        return y + '-' + m + '-' + d + ' ' + h + ':' + M;
                    case 'gg':
                        return y + '-' + twoDigit(m) + '-' + twoDigit(d) + ' ' + twoDigit(h) + ':' + twoDigit(M);
                    case 'G':
                        return y + '-' + m + '-' + d + ' ' + h + ':' + M + ':' + s;
                    case 'GG':
                        return y + '-' + twoDigit(m) + '-' + twoDigit(d) + ' ' + twoDigit(h) + ':' + twoDigit(M) + ':' + twoDigit(s);
                    case 't':
                        return h + ':' + M;
                    case 'T':
                        return h + ':' + M + ':' + s;
                }
                return value.toString();
            }
        }, {
            key: 'formatNumber',
            value: function formatNumber(value, format) {
                var reg = new RegExp('^C[0-9]+');
                if (reg.test(format)) {
                    var num = format.substr(1);
                    return value.toFixed(num);
                }
                return value.toString();
            }
        }]);

        return GridViewDataCell;
    }(GridViewCell);

    wuzhui.GridViewDataCell = GridViewDataCell;

    var GridViewHeaderCell = function (_wuzhui$Control4) {
        _inherits(GridViewHeaderCell, _wuzhui$Control4);

        function GridViewHeaderCell(field) {
            _classCallCheck(this, GridViewHeaderCell);

            var _this14 = _possibleConstructorReturn(this, (GridViewHeaderCell.__proto__ || Object.getPrototypeOf(GridViewHeaderCell)).call(this, document.createElement('th')));

            _this14.ascHTML = '↑';
            _this14.descHTML = '↓';
            _this14.sortingHTML = '...';
            _this14.field = field;
            _this14.sorting = wuzhui.callbacks();
            _this14.sorted = wuzhui.callbacks();
            if (field.sortExpression) {
                var labelElement = document.createElement('a');
                labelElement.href = 'javascript:';
                labelElement.innerHTML = _this14.defaultHeaderText();
                labelElement.onclick = function () {
                    return _this14.handleSort();
                };
                _this14._iconElement = document.createElement('span');
                _this14.appendChild(labelElement);
                _this14.appendChild(_this14._iconElement);
                _this14.sorting.add(function () {
                    return _this14._iconElement.innerHTML = _this14.sortingHTML;
                });
                _this14.sorted.add(function () {
                    return _this14.updateSortIcon();
                });
            } else {
                _this14.element.innerHTML = _this14.defaultHeaderText();
            }
            _this14.style(field.headerStyle);
            return _this14;
        }

        _createClass(GridViewHeaderCell, [{
            key: 'handleSort',
            value: function handleSort() {
                var _this15 = this;

                var selectArguments = this.field.gridView.selectArguments;
                var sortType = this.sortType == 'asc' ? 'desc' : 'asc';
                wuzhui.fireCallback(this.sorting, this, { sortType: sortType });
                selectArguments.sortExpression = this.field.sortExpression + ' ' + sortType;
                return this.field.gridView.dataSource.select(selectArguments).then(function () {
                    _this15.sortType = sortType;
                    wuzhui.fireCallback(_this15.sorted, _this15, { sortType: sortType });
                });
            }
        }, {
            key: 'defaultHeaderText',
            value: function defaultHeaderText() {
                return this.field.headerText || this.field.dataField || '';
            }
        }, {
            key: 'clearSortIcon',
            value: function clearSortIcon() {
                this._iconElement.innerHTML = '';
            }
        }, {
            key: 'updateSortIcon',
            value: function updateSortIcon() {
                if (this.sortType == 'asc') {
                    this._iconElement.innerHTML = '↑';
                } else if (this.sortType == 'desc') {
                    this._iconElement.innerHTML = '↓';
                } else {
                    this._iconElement.innerHTML = '';
                }
            }
        }, {
            key: 'sortType',
            get: function get() {
                return this._sortType;
            },
            set: function set(value) {
                this._sortType = value;
            }
        }]);

        return GridViewHeaderCell;
    }(wuzhui.Control);

    wuzhui.GridViewHeaderCell = GridViewHeaderCell;

    var DataControlField = function () {
        function DataControlField(params) {
            _classCallCheck(this, DataControlField);

            if (params.visible == null) params.visible = true;
            this._params = params;
        }
        /**
         * Gets the text that is displayed in the footer item of a data control field.
         */


        _createClass(DataControlField, [{
            key: 'createHeaderCell',
            value: function createHeaderCell() {
                var cell = new GridViewHeaderCell(this);
                return cell;
            }
        }, {
            key: 'createFooterCell',
            value: function createFooterCell() {
                var cell = new GridViewCell();
                cell.element.innerHTML = this.footerText || '';
                cell.style(this.footerStyle);
                return cell;
            }
        }, {
            key: 'createItemCell',
            value: function createItemCell(dataItem) {
                if (!dataItem) throw wuzhui.Errors.argumentNull('dataItem');
                var cell = new GridViewCell();
                cell.style(this.itemStyle);
                return cell;
            }
        }, {
            key: 'footerText',
            get: function get() {
                return this._params.footerText;
            }
            /**
             * Sets the text that is displayed in the footer item of a data control field.
             */
            ,
            set: function set(value) {
                this._params.footerText = value;
            }
            /**
             * Gets the text that is displayed in the header item of a data control field.
             */

        }, {
            key: 'headerText',
            get: function get() {
                return this._params.headerText;
            }
            /**
            * Sets the text that is displayed in the header item of a data control field.
            */
            ,
            set: function set(value) {
                this._params.headerText = value;
            }
        }, {
            key: 'itemStyle',
            get: function get() {
                return this._params.itemStyle;
            },
            set: function set(value) {
                this._params.itemStyle = value;
            }
        }, {
            key: 'footerStyle',
            get: function get() {
                return this._params.footerStyle;
            },
            set: function set(value) {
                this._params.footerStyle = value;
            }
        }, {
            key: 'headerStyle',
            get: function get() {
                return this._params.headerStyle;
            },
            set: function set(value) {
                this._params.headerStyle = value;
            }
        }, {
            key: 'visible',
            get: function get() {
                return this._params.visible;
            }
        }, {
            key: 'gridView',
            get: function get() {
                return this._gridView;
            },
            set: function set(value) {
                this._gridView = value;
            }
            /**
             * Gets a sort expression that is used by a data source control to sort data.
             */

        }, {
            key: 'sortExpression',
            get: function get() {
                return this._params.sortExpression;
            }
            /**
             * Sets a sort expression that is used by a data source control to sort data.
             */
            ,
            set: function set(value) {
                this._params.sortExpression = value;
            }
        }]);

        return DataControlField;
    }();

    wuzhui.DataControlField = DataControlField;
})(wuzhui || (wuzhui = {}));
/// <reference path="DataControlField.ts"/>
var wuzhui;
(function (wuzhui) {
    var GridViewEditableCell = function (_wuzhui$GridViewDataC) {
        _inherits(GridViewEditableCell, _wuzhui$GridViewDataC);

        function GridViewEditableCell(field, dataItem, valueType) {
            _classCallCheck(this, GridViewEditableCell);

            if (field == null) throw wuzhui.Errors.argumentNull('field');
            if (dataItem == null) throw wuzhui.Errors.argumentNull('dataItem');

            var _this16 = _possibleConstructorReturn(this, (GridViewEditableCell.__proto__ || Object.getPrototypeOf(GridViewEditableCell)).call(this, {
                dataField: field.dataField,
                nullText: field.nullText, dataFormatString: field.dataFormatString
            }));

            _this16._field = field;
            _this16._dataItem = dataItem;
            _this16._valueType = valueType;
            _this16._mode = 'read';
            if (!_this16._valueType) {
                var value = dataItem[field.dataField];
                if (value instanceof Date) _this16._valueType = 'date';else _this16._valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
            }
            return _this16;
        }

        _createClass(GridViewEditableCell, [{
            key: 'beginEdit',
            value: function beginEdit() {
                if (this._field.readOnly) {
                    return;
                }
                this._mode = 'edit';
                var value = this._dataItem[this.field.dataField];
                this.render(value);
            }
        }, {
            key: 'endEdit',
            value: function endEdit() {
                if (this._field.readOnly) {
                    return;
                }
                this._mode = 'read';
                var value = this.controlValue;
                this._dataItem[this.field.dataField] = value;
                this.render(value);
            }
        }, {
            key: 'cancelEdit',
            value: function cancelEdit() {
                if (this._field.readOnly) {
                    return;
                }
                this._mode = 'read';
                var value = this._dataItem[this.field.dataField];
                this.render(value);
            }
        }, {
            key: 'render',
            value: function render(value) {
                if (this._mode == 'edit') {
                    this.element.innerHTML = '<input type="text" />';
                    wuzhui.applyStyle(this.element.querySelector('input'), this._field.controlStyle);
                    this.element.querySelector('input').value = value === undefined ? null : value;
                    return;
                }
                _get(GridViewEditableCell.prototype.__proto__ || Object.getPrototypeOf(GridViewEditableCell.prototype), 'render', this).call(this, value);
            }
            //==============================================
            // Virtual Methods

        }, {
            key: 'field',
            get: function get() {
                return this._field;
            }
        }, {
            key: 'mode',
            get: function get() {
                return this._mode;
            }
        }, {
            key: 'controlValue',
            get: function get() {
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
        }]);

        return GridViewEditableCell;
    }(wuzhui.GridViewDataCell);

    wuzhui.GridViewEditableCell = GridViewEditableCell;

    var BoundField = function (_wuzhui$DataControlFi) {
        _inherits(BoundField, _wuzhui$DataControlFi);

        function BoundField(params) {
            _classCallCheck(this, BoundField);

            var _this17 = _possibleConstructorReturn(this, (BoundField.__proto__ || Object.getPrototypeOf(BoundField)).call(this, params));

            _this17._params = params;
            _this17._valueElement = document.createElement('span');
            return _this17;
        }

        _createClass(BoundField, [{
            key: 'params',
            value: function params() {
                return this._params;
            }
            /**
             * Gets the caption displayed for a field when the field's value is null.
             */

        }, {
            key: 'createItemCell',
            value: function createItemCell(dataItem) {
                var cell = new GridViewEditableCell(this, dataItem);
                cell.style(this.itemStyle);
                return cell;
            }
            /**
             * Gets the field for the value.
             */

        }, {
            key: 'nullText',
            get: function get() {
                return this.params().nullText;
            }
        }, {
            key: 'dataField',
            get: function get() {
                return this.params().dataField;
            }
            /**
             * Gets the string that specifies the display format for the value of the field.
             */

        }, {
            key: 'dataFormatString',
            get: function get() {
                return this.params().dataFormatString;
            }
        }, {
            key: 'controlStyle',
            get: function get() {
                return this.params().controlStyle;
            }
        }, {
            key: 'readOnly',
            get: function get() {
                return this.params().readOnly;
            }
        }]);

        return BoundField;
    }(wuzhui.DataControlField);

    wuzhui.BoundField = BoundField;
})(wuzhui || (wuzhui = {}));
/// <reference path="DataControlField.ts"/>
var wuzhui;
(function (wuzhui) {
    var GridViewCommandCell = function (_wuzhui$GridViewCell) {
        _inherits(GridViewCommandCell, _wuzhui$GridViewCell);

        // cancelAddButton: HTMLElement;
        function GridViewCommandCell(field) {
            _classCallCheck(this, GridViewCommandCell);

            return _possibleConstructorReturn(this, (GridViewCommandCell.__proto__ || Object.getPrototypeOf(GridViewCommandCell)).call(this));
        }

        return GridViewCommandCell;
    }(wuzhui.GridViewCell);

    var CommandField = function (_wuzhui$DataControlFi2) {
        _inherits(CommandField, _wuzhui$DataControlFi2);

        function CommandField(params) {
            _classCallCheck(this, CommandField);

            // private _updating = false;
            // private _deleting = false;
            var _this19 = _possibleConstructorReturn(this, (CommandField.__proto__ || Object.getPrototypeOf(CommandField)).call(this, params));

            _this19.currentMode = 'read';
            if (!_this19.params().cancelButtonHTML) _this19.params().cancelButtonHTML = '取消';
            if (!_this19.params().deleteButtonHTML) _this19.params().deleteButtonHTML = '删除';
            if (!_this19.params().editButtonHTML) _this19.params().editButtonHTML = '编辑';
            if (!_this19.params().updateButtonHTML) _this19.params().updateButtonHTML = '更新';
            if (!_this19.params().newButtonHTML) _this19.params().newButtonHTML = '新增';
            if (!_this19.params().insertButtonHTML) _this19.params().insertButtonHTML = '添加';
            return _this19;
        }

        _createClass(CommandField, [{
            key: 'params',
            value: function params() {
                return this._params;
            }
        }, {
            key: 'createItemCell',
            value: function createItemCell(dataItem) {
                var _this20 = this;

                var cell = new GridViewCommandCell(this);
                cell.style(this.itemStyle);
                if (this.params().showEditButton) {
                    var editButton = this.createEditButton();
                    editButton.style.marginRight = '4px';
                    if (this.editButtonClass) editButton.className = this.editButtonClass;
                    cell.editButton = editButton;
                    editButton.addEventListener('click', function (e) {
                        return _this20.on_editButtonClick(e);
                    });
                    cell.appendChild(editButton);
                    var updateButton = this.createUpdateButton();
                    updateButton.style.display = 'none';
                    updateButton.style.marginRight = '4px';
                    if (this.updateButtonClass) updateButton.className = this.updateButtonClass;
                    cell.updateButton = updateButton;
                    updateButton.addEventListener('click', function (e) {
                        return _this20.on_insertOrUpdateButtonClick(e);
                    });
                    cell.appendChild(updateButton);
                    var cancelButton = this.createCancelButton();
                    cancelButton.style.display = 'none';
                    cancelButton.style.marginRight = '4px';
                    if (this.cancelButtonClass) cancelButton.className = this.cancelButtonClass;
                    cell.cacelButton = cancelButton;
                    cancelButton.addEventListener('click', function (e) {
                        return _this20.on_cancelButtonClick(e);
                    });
                    cell.appendChild(cancelButton);
                }
                if (this.params().showDeleteButton) {
                    var deleteButton = this.createDeleteButton();
                    deleteButton.style.marginRight = '4px';
                    if (this.deleteButtonClass) deleteButton.className = this.deleteButtonClass;
                    cell.deleteButton = deleteButton;
                    deleteButton.onclick = function (e) {
                        return _this20.on_deleteButtonClick(e);
                    };
                    cell.appendChild(deleteButton);
                }
                if (this.params().showNewButton) {
                    var newButton = this.createNewButton();
                    newButton.style.marginRight = '4px';
                    if (this.newButtonClass) newButton.className = this.newButtonClass;
                    newButton.onclick = function (e) {
                        return _this20.on_newButtonClick(e);
                    };
                    cell.newButton = newButton;
                    cell.appendChild(newButton);
                    var insertButton = this.createInsertButton();
                    insertButton.style.display = 'none';
                    insertButton.style.marginRight = '4px';
                    insertButton.addEventListener('click', function (e) {
                        return _this20.on_insertOrUpdateButtonClick(e);
                    });
                    if (this.insertButtonClass) insertButton.className = this.updateButtonClass;
                    cell.insertButton = insertButton;
                    cell.appendChild(insertButton);
                    var _cancelButton = this.createCancelButton();
                    _cancelButton.style.display = 'none';
                    _cancelButton.style.marginRight = '4px';
                    _cancelButton.addEventListener('click', function (e) {
                        return _this20.on_cancelButtonClick(e);
                    });
                    if (this.cancelButtonClass) _cancelButton.className = this.cancelButtonClass;
                    cell.cacelButton = _cancelButton;
                    cell.appendChild(_cancelButton);
                }
                return cell;
            }
        }, {
            key: 'showReadStatusButtons',
            value: function showReadStatusButtons(cell) {
                if (cell.newButton) {
                    this.showButton(cell.newButton);
                    this.hideButton(cell.insertButton);
                }
                if (cell.editButton) {
                    this.showButton(cell.editButton);
                    this.hideButton(cell.updateButton);
                }
                if (cell.deleteButton) this.showButton(cell.deleteButton);
                this.hideButton(cell.cacelButton);
            }
        }, {
            key: 'createEditButton',
            value: function createEditButton() {
                var button = document.createElement('a');
                button.innerHTML = this.editButtonHTML;
                button.href = 'javascript:';
                return button;
            }
        }, {
            key: 'createDeleteButton',
            value: function createDeleteButton() {
                var button = document.createElement('a');
                button.innerHTML = this.deleteButtonHTML;
                button.href = 'javascript:';
                return button;
            }
        }, {
            key: 'createInsertButton',
            value: function createInsertButton() {
                var button = document.createElement('a');
                button.innerHTML = this.insertButtonHTML;
                button.href = 'javascript:';
                return button;
            }
        }, {
            key: 'createUpdateButton',
            value: function createUpdateButton() {
                var button = document.createElement('a');
                button.innerHTML = this.updateButtonHTML;
                button.href = 'javascript:';
                return button;
            }
        }, {
            key: 'createCancelButton',
            value: function createCancelButton() {
                var button = document.createElement('a');
                button.innerHTML = this.cancelButtonHTML;
                button.href = 'javascript:';
                return button;
            }
        }, {
            key: 'createNewButton',
            value: function createNewButton() {
                var button = document.createElement('a');
                button.innerHTML = this.newButtonHTML;
                button.href = 'javascript:';
                return button;
            }
        }, {
            key: 'hideButton',
            value: function hideButton(button) {
                button.style.display = 'none';
            }
        }, {
            key: 'showButton',
            value: function showButton(button) {
                button.style.removeProperty('display');
            }
        }, {
            key: 'findParentCell',
            value: function findParentCell(element) {
                var cellElement = void 0;
                var p = element.parentElement;
                while (p) {
                    if (p.tagName == 'TD') {
                        cellElement = p;
                        break;
                    }
                    p = p.parentElement;
                }
                return cellElement;
            }
        }, {
            key: 'on_editButtonClick',
            value: function on_editButtonClick(e) {
                var cellElement = this.findParentCell(e.target);
                console.assert(cellElement != null);
                var rowElement = cellElement.parentElement;
                for (var i = 0; i < rowElement.cells.length; i++) {
                    var _cell = wuzhui.Control.getControlByElement(rowElement.cells[i]);
                    if (_cell instanceof wuzhui.GridViewEditableCell) {
                        _cell.beginEdit();
                    }
                }
                var cell = wuzhui.Control.getControlByElement(cellElement);
                this.showButton(cell.cacelButton);
                this.showButton(cell.updateButton);
                this.hideButton(cell.editButton);
                if (cell.deleteButton) this.hideButton(cell.deleteButton);
                if (cell.newButton) this.hideButton(cell.newButton);
            }
        }, {
            key: 'on_cancelButtonClick',
            value: function on_cancelButtonClick(e) {
                var cellElement = this.findParentCell(e.target);
                console.assert(cellElement != null);
                var rowElement = cellElement.parentElement;
                var row = wuzhui.Control.getControlByElement(rowElement);
                if (row["isNew"] == true) {
                    rowElement.remove();
                    return;
                }
                for (var i = 0; i < rowElement.cells.length; i++) {
                    var _cell2 = wuzhui.Control.getControlByElement(rowElement.cells[i]);
                    if (_cell2 instanceof wuzhui.GridViewEditableCell) {
                        _cell2.cancelEdit();
                    }
                }
                var cell = wuzhui.Control.getControlByElement(cellElement);
                this.hideButton(cell.cacelButton);
                this.hideButton(cell.updateButton);
                this.showButton(cell.editButton);
                if (cell.deleteButton) this.showButton(cell.deleteButton);
                if (cell.newButton) this.showButton(cell.newButton);
            }
        }, {
            key: 'on_insertOrUpdateButtonClick',
            value: function on_insertOrUpdateButtonClick(e) {
                var _this21 = this;

                if (e.target['_updating']) e.target['_updating'] = true;
                var cellElement = wuzhui.ElementHelper.findFirstParentByTagName(e.target, 'td');
                var rowElement = cellElement.parentElement;
                var cell = wuzhui.Control.getControlByElement(cellElement);
                var row = wuzhui.Control.getControlByElement(rowElement);
                //==========================================================
                // 复制 dataItem 副本
                var dataItem = Object.assign({}, row.dataItem || {});
                //==========================================================
                var dataSource = row.gridView.dataSource;
                var editableCells = new Array();
                for (var i = 0; i < rowElement.cells.length; i++) {
                    var _cell3 = wuzhui.Control.getControlByElement(rowElement.cells[i]);
                    if (_cell3 instanceof wuzhui.GridViewEditableCell && _cell3.mode == 'edit') {
                        dataItem[_cell3.field.dataField] = _cell3.controlValue;
                        editableCells.push(_cell3);
                    }
                }
                var isInsert = e.target == cell.insertButton;
                var p = isInsert ? dataSource.insert(dataItem, rowElement.rowIndex) : dataSource.update(dataItem);
                return p.then(function () {
                    if (isInsert) {
                        rowElement.remove();
                        return;
                    }
                    editableCells.forEach(function (item) {
                        return item.endEdit();
                    });
                    var cell = wuzhui.Control.getControlByElement(cellElement);
                    _this21.showReadStatusButtons(cell);
                    e.target['_updating'] = false;
                }).catch(function () {
                    return e.target['_updating'] = false;
                });
            }
        }, {
            key: 'on_deleteButtonClick',
            value: function on_deleteButtonClick(e) {
                var rowElement = wuzhui.ElementHelper.findFirstParentByTagName(e.target, "tr");
                var row = wuzhui.Control.getControlByElement(rowElement);
                var dataSource = row.gridView.dataSource;
                dataSource.delete(row.dataItem).then(function () {
                    rowElement.remove();
                });
            }
        }, {
            key: 'on_newButtonClick',
            value: function on_newButtonClick(e) {
                var _this22 = this;

                var rowElement = wuzhui.ElementHelper.findFirstParentByTagName(e.target, "tr"); //cellElement.parentElement as HTMLTableRowElement;
                var row = wuzhui.Control.getControlByElement(rowElement);
                var gridView = row.gridView;
                var newRow = gridView.appendDataRow({}, rowElement.rowIndex);
                newRow["isNew"] = true;
                var commandCells = newRow.cells.filter(function (o) {
                    return o instanceof GridViewCommandCell;
                });
                newRow.cells.filter(function (o) {
                    return o instanceof wuzhui.GridViewEditableCell;
                }).forEach(function (c) {
                    return c.beginEdit();
                });
                commandCells.forEach(function (cell) {
                    if (cell.deleteButton) _this22.hideButton(cell.deleteButton);
                    if (cell.editButton) _this22.hideButton(cell.editButton);
                    _this22.hideButton(cell.newButton);
                    _this22.showButton(cell.insertButton);
                    _this22.showButton(cell.cacelButton);
                });
            }
        }, {
            key: 'cancelButtonHTML',
            get: function get() {
                return this.params().cancelButtonHTML;
            }
        }, {
            key: 'deleteButtonHTML',
            get: function get() {
                return this.params().deleteButtonHTML;
            }
        }, {
            key: 'editButtonHTML',
            get: function get() {
                return this.params().editButtonHTML;
            }
        }, {
            key: 'updateButtonHTML',
            get: function get() {
                return this.params().updateButtonHTML;
            }
        }, {
            key: 'newButtonHTML',
            get: function get() {
                return this.params().newButtonHTML;
            }
        }, {
            key: 'insertButtonHTML',
            get: function get() {
                return this.params().insertButtonHTML;
            }
        }, {
            key: 'cancelButtonClass',
            get: function get() {
                return this.params().cancelButtonClass;
            }
        }, {
            key: 'deleteButtonClass',
            get: function get() {
                return this.params().deleteButtonClass;
            }
        }, {
            key: 'editButtonClass',
            get: function get() {
                return this.params().editButtonClass;
            }
        }, {
            key: 'newButtonClass',
            get: function get() {
                return this.params().newButtonClass;
            }
        }, {
            key: 'updateButtonClass',
            get: function get() {
                return this.params().updateButtonClass;
            }
        }, {
            key: 'insertButtonClass',
            get: function get() {
                return this.params().insertButtonClass;
            }
        }]);

        return CommandField;
    }(wuzhui.DataControlField);

    wuzhui.CommandField = CommandField;
})(wuzhui || (wuzhui = {}));
/// <reference path="DataControlField.ts"/>
var wuzhui;
(function (wuzhui) {
    var CustomField = function (_wuzhui$DataControlFi3) {
        _inherits(CustomField, _wuzhui$DataControlFi3);

        function CustomField(params) {
            _classCallCheck(this, CustomField);

            return _possibleConstructorReturn(this, (CustomField.__proto__ || Object.getPrototypeOf(CustomField)).call(this, params));
        }

        _createClass(CustomField, [{
            key: 'params',
            value: function params() {
                return this._params;
            }
        }, {
            key: 'createHeaderCell',
            value: function createHeaderCell() {
                if (this.params().createHeaderCell) {
                    var cell = this.params().createHeaderCell();
                    cell.style(this.headerStyle);
                    return cell;
                }
                return _get(CustomField.prototype.__proto__ || Object.getPrototypeOf(CustomField.prototype), 'createHeaderCell', this).call(this);
            }
        }, {
            key: 'createFooterCell',
            value: function createFooterCell() {
                if (this.params().createFooterCell) {
                    var cell = this.params().createFooterCell();
                    cell.style(this.params().footerStyle);
                    return cell;
                }
                return _get(CustomField.prototype.__proto__ || Object.getPrototypeOf(CustomField.prototype), 'createFooterCell', this).call(this);
            }
        }, {
            key: 'createItemCell',
            value: function createItemCell(dataItem) {
                if (this.params().createItemCell) {
                    var cell = this.params().createItemCell(dataItem);
                    cell.style(this.params().itemStyle);
                    return cell;
                }
                return _get(CustomField.prototype.__proto__ || Object.getPrototypeOf(CustomField.prototype), 'createItemCell', this).call(this, dataItem);
            }
        }]);

        return CustomField;
    }(wuzhui.DataControlField);

    wuzhui.CustomField = CustomField;
})(wuzhui || (wuzhui = {}));
