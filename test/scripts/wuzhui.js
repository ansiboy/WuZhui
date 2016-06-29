var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var wuzhui;
(function (wuzhui) {
    var DataBoundTable = (function () {
        function DataBoundTable() {
        }
        return DataBoundTable;
    }());
})(wuzhui || (wuzhui = {}));
var wuzhui;
(function (wuzhui) {
    var DataSource = (function () {
        function DataSource() {
            this.inserting = $.Callbacks();
            this.inserted = $.Callbacks();
            this.deleting = $.Callbacks();
            this.deleted = $.Callbacks();
            this.updating = $.Callbacks();
            this.updated = $.Callbacks();
            this.selecting = $.Callbacks();
            this.selected = $.Callbacks();
        }
        DataSource.prototype.executeInsert = function (item) {
            throw wuzhui.Errors.notImplemented();
        };
        DataSource.prototype.executeDelete = function (item) {
            throw wuzhui.Errors.notImplemented();
        };
        DataSource.prototype.executeUpdate = function (item) {
            throw wuzhui.Errors.notImplemented();
        };
        DataSource.prototype.executeSelect = function (args) {
            throw wuzhui.Errors.notImplemented();
        };
        DataSource.prototype.insert = function (item) {
            var _this = this;
            this.inserting.fireWith(this, [this, { item: item }]);
            return this.executeInsert(item).done(function (data) {
                $.extend(item, data);
                _this.inserted.fireWith(_this, [_this, { item: item }]);
            });
        };
        DataSource.prototype.delete = function (item) {
            var _this = this;
            this.deleting.fireWith(this, [this, { item: item }]);
            return this.executeDelete(item).done(function () {
                _this.deleted.fireWith(_this, [_this, { item: item }]);
            });
        };
        DataSource.prototype.update = function (item) {
            this.updating.fireWith(this, [this, { item: item }]);
            return this.executeUpdate(item).done(function (data) {
                $.extend(item, data);
            });
        };
        DataSource.prototype.select = function (args) {
            var _this = this;
            if (!args)
                args = new DataSourceSelectArguments();
            this.selecting.fireWith(this, [this, { selectArguments: args }]);
            return this.executeSelect(args).done(function (data) {
                var data_items;
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
                _this.selected.fireWith(_this, [_this, { selectArguments: args, items: data_items }]);
            });
        };
        Object.defineProperty(DataSource.prototype, "canDelete", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataSource.prototype, "canInsert", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataSource.prototype, "canUpdate", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        return DataSource;
    }());
    wuzhui.DataSource = DataSource;
    var DataSourceSelectArguments = (function () {
        function DataSourceSelectArguments(params) {
            params = $.extend({
                startRowIndex: 0,
                maximumRows: 2147483647
            }, params || {});
            this._startRowIndex = params.startRowIndex;
            this._totalRowCount = null;
            this._maximumRows = params.maximumRows;
            this._sortExpression = null;
        }
        Object.defineProperty(DataSourceSelectArguments.prototype, "startRowIndex", {
            get: function () {
                return this._startRowIndex;
            },
            set: function (value) {
                this._startRowIndex = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataSourceSelectArguments.prototype, "totalRowCount", {
            get: function () {
                return this._totalRowCount;
            },
            set: function (value) {
                this._totalRowCount = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataSourceSelectArguments.prototype, "maximumRows", {
            get: function () {
                return this._maximumRows;
            },
            set: function (value) {
                this._maximumRows = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataSourceSelectArguments.prototype, "sortExpression", {
            get: function () {
                return this._sortExpression;
            },
            set: function (value) {
                this._sortExpression = value;
            },
            enumerable: true,
            configurable: true
        });
        return DataSourceSelectArguments;
    }());
    wuzhui.DataSourceSelectArguments = DataSourceSelectArguments;
    var WebDataSource = (function (_super) {
        __extends(WebDataSource, _super);
        function WebDataSource(args) {
            _super.call(this);
            this.args = args;
        }
        Object.defineProperty(WebDataSource.prototype, "canDelete", {
            get: function () {
                return this.args.deleteUrl != null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebDataSource.prototype, "canInsert", {
            get: function () {
                return this.args.insertUrl != null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebDataSource.prototype, "canUpdate", {
            get: function () {
                return this.args.updateUrl != null;
            },
            enumerable: true,
            configurable: true
        });
        WebDataSource.prototype.executeInsert = function (item) {
            if (!item)
                throw wuzhui.Errors.argumentNull("item");
            return wuzhui.ajax(this.args.selectUrl, this.formatData(item));
        };
        WebDataSource.prototype.executeDelete = function (item) {
            if (!item)
                throw wuzhui.Errors.argumentNull("item");
            return wuzhui.ajax(this.args.deleteUrl, this.formatData(item));
        };
        WebDataSource.prototype.executeUpdate = function (item) {
            if (!item)
                throw wuzhui.Errors.argumentNull("item");
            return wuzhui.ajax(this.args.updateUrl, this.formatData(item));
        };
        WebDataSource.prototype.executeSelect = function (args) {
            if (!args)
                throw wuzhui.Errors.argumentNull("args");
            return wuzhui.ajax(this.args.selectUrl, args);
        };
        WebDataSource.prototype.formatData = function (data) {
            var obj = $.extend({}, data);
            for (var name_1 in obj) {
                if (data[name_1] instanceof Date) {
                    var date = obj[name_1];
                    var y = date.getFullYear();
                    var m = date.getMonth() + 1;
                    var d = date.getDate();
                    var h = date.getHours();
                    var M = date.getMinutes();
                    var s = date.getSeconds();
                    obj[name_1] = y + "-" + m + "-" + d + " " + h + ":" + M + ":" + s;
                }
            }
            return obj;
        };
        return WebDataSource;
    }(DataSource));
    wuzhui.WebDataSource = WebDataSource;
})(wuzhui || (wuzhui = {}));
var wuzhui;
(function (wuzhui) {
    var Errors = (function () {
        function Errors(parameters) {
        }
        Errors.notImplemented = function (message) {
            message = message || "Not implemented";
            return new Error(message);
        };
        Errors.argumentNull = function (paramName) {
            return new Error("Argument '" + paramName + "' can not be null.");
        };
        Errors.controllBelonsAnother = function () {
            return new Error("The control is belongs another control.");
        };
        return Errors;
    }());
    wuzhui.Errors = Errors;
})(wuzhui || (wuzhui = {}));
var wuzhui;
(function (wuzhui) {
    var DataControlField = (function () {
        function DataControlField(params) {
            params = $.extend({
                cellHtml: function () { return ""; },
                visible: true
            }, params);
            this._footerText = params.footerText;
            this._headerText = params.headerText;
            this._nullText = params.nullText;
            this._cellHtml = params.cellHtml;
            this._itemStyle = params.itemStyle;
            this._headerStyle = params.headerStyle;
            this._footerStyle = params.footerStyle;
            this._visible = params.visible;
        }
        Object.defineProperty(DataControlField.prototype, "footerText", {
            get: function () {
                return this._footerText;
            },
            set: function (value) {
                this._footerText = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataControlField.prototype, "headerText", {
            get: function () {
                return this._headerText;
            },
            set: function (value) {
                this._headerText = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataControlField.prototype, "nullText", {
            get: function () {
                return this._nullText;
            },
            set: function (value) {
                this._nullText = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataControlField.prototype, "cellHtml", {
            get: function () {
                return this._cellHtml;
            },
            set: function (value) {
                this._cellHtml = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataControlField.prototype, "itemStyle", {
            get: function () {
                return this._itemStyle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataControlField.prototype, "footerStyle", {
            get: function () {
                return this._footerStyle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataControlField.prototype, "headerStyle", {
            get: function () {
                return this._headerStyle;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataControlField.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            enumerable: true,
            configurable: true
        });
        return DataControlField;
    }());
    wuzhui.DataControlField = DataControlField;
    var BoundField = (function (_super) {
        __extends(BoundField, _super);
        function BoundField(params) {
            var _this = this;
            params = $.extend({
                cellHtml: function (dataItem) { return _this.getCellHtml(dataItem); }
            }, params);
            _super.call(this, params);
            this.sortExpression = params.sortExpression;
            this.dataField = params.dataField;
            this.dataFormatString = params.dataFormatString;
        }
        BoundField.prototype.getCellHtml = function (dataItem) {
            if (!dataItem)
                throw wuzhui.Errors.argumentNull("dataItem");
            var value = dataItem[this.dataField];
            if (value == null)
                return this.nullText;
            if (this.dataFormatString)
                return this.formatValue(this.dataFormatString, value);
            return value;
        };
        BoundField.prototype.formatValue = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var result = '';
            var format = args[0];
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
                var colonIndex = brace.indexOf(':');
                var argNumber = parseInt((colonIndex < 0) ? brace : brace.substring(0, colonIndex), 10) + 1;
                if (isNaN(argNumber))
                    throw new Error('Sys.Res.stringFormatInvalid');
                var argFormat = (colonIndex < 0) ? '' : brace.substring(colonIndex + 1);
                var arg = args[argNumber];
                if (typeof (arg) === "undefined" || arg === null) {
                    arg = '';
                }
                if (arg instanceof Date)
                    result = result + this.formatDate(arg, argFormat);
                else if (typeof arg == 'number')
                    result = result + this.formatNumber(arg, argFormat);
                else
                    result = result + arg.toString();
                i = close + 1;
            }
            return result;
        };
        BoundField.prototype.formatDate = function (value, format) {
            switch (format) {
                case 'd':
                    return value.getFullYear() + "-" + (value.getMonth() + 1) + "-" + value.getDate();
                case 'g':
                    return value.getFullYear() + "-" + (value.getMonth() + 1) + "-" + value.getDate() + " " + value.getHours() + ":" + value.getMinutes();
                case 'G':
                    return value.getFullYear() + "-" + (value.getMonth() + 1) + "-" + value.getDate() + " " + value.getHours() + ":" + value.getMinutes() + ":" + value.getSeconds();
                case 't':
                    return value.getHours() + ":" + value.getMinutes();
                case 'T':
                    return value.getHours() + ":" + value.getMinutes() + ":" + value.getSeconds();
            }
            return value.toString();
        };
        BoundField.prototype.formatNumber = function (value, format) {
            var reg = new RegExp('^C[0-9]+');
            if (reg.test(format)) {
                var num = format.substr(1);
                return value.toFixed(num);
            }
            return value.toString();
        };
        Object.defineProperty(BoundField.prototype, "sortExpression", {
            get: function () {
                return this._sortExpression;
            },
            set: function (value) {
                this._sortExpression = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoundField.prototype, "dataField", {
            get: function () {
                return this._dataField;
            },
            set: function (value) {
                this._dataField = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoundField.prototype, "dataFormatString", {
            get: function () {
                return this._dataFormatString;
            },
            set: function (value) {
                this._dataFormatString = value;
            },
            enumerable: true,
            configurable: true
        });
        return BoundField;
    }(DataControlField));
    wuzhui.BoundField = BoundField;
})(wuzhui || (wuzhui = {}));
var wuzhui;
(function (wuzhui) {
    var CONTROL_DATA_NAME = 'Control';
    var Control = (function () {
        function Control(element) {
            if (!element)
                throw wuzhui.Errors.argumentNull('element');
            this._element = element;
            $(element).data(CONTROL_DATA_NAME, this);
        }
        Object.defineProperty(Control.prototype, "html", {
            get: function () {
                return $(this.element).html();
            },
            set: function (value) {
                $(this.element).html(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Control.prototype, "visible", {
            get: function () {
                return $(this.element).is(':visible');
            },
            set: function (value) {
                if (value)
                    $(this._element).show();
                else
                    $(this._element).hide();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Control.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Control.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Control.prototype.appendChild = function (child) {
            if (child == null)
                throw wuzhui.Errors.argumentNull('child');
            if (child.parent != null)
                throw wuzhui.Errors.controllBelonsAnother();
            child._parent = this;
            this.element.appendChild(child.element);
        };
        Control.prototype.style = function (value) {
            var style = value || '';
            if (typeof style == 'string')
                $(this.element).attr('style', style);
            else {
                for (var key in style) {
                    this.element.style[key] = style[key];
                }
            }
        };
        Control.getControlByElement = function (element) {
            return $(element).data(CONTROL_DATA_NAME);
        };
        return Control;
    }());
    wuzhui.Control = Control;
})(wuzhui || (wuzhui = {}));
var wuzhui;
(function (wuzhui) {
    (function (GridViewRowType) {
        GridViewRowType[GridViewRowType["Header"] = 0] = "Header";
        GridViewRowType[GridViewRowType["Footer"] = 1] = "Footer";
        GridViewRowType[GridViewRowType["Data"] = 2] = "Data";
        GridViewRowType[GridViewRowType["Paging"] = 3] = "Paging";
    })(wuzhui.GridViewRowType || (wuzhui.GridViewRowType = {}));
    var GridViewRowType = wuzhui.GridViewRowType;
    var GridViewRow = (function (_super) {
        __extends(GridViewRow, _super);
        function GridViewRow(rowType) {
            var element = document.createElement('TR');
            _super.call(this, element);
            this._rowType = rowType;
        }
        GridViewRow.prototype.createCell = function () {
            var cell = new wuzhui.Control(document.createElement('TD'));
            return cell;
        };
        Object.defineProperty(GridViewRow.prototype, "rowType", {
            get: function () {
                return this._rowType;
            },
            enumerable: true,
            configurable: true
        });
        return GridViewRow;
    }(wuzhui.Control));
    wuzhui.GridViewRow = GridViewRow;
    var GridViewDataRow = (function (_super) {
        __extends(GridViewDataRow, _super);
        function GridViewDataRow(gridView, dataItem) {
            _super.call(this, GridViewRowType.Data);
            for (var i = 0; i < gridView.columns.length; i++) {
                var column = gridView.columns[i];
                var cell = this.createCell();
                this.appendChild(cell);
                cell.html = column.cellHtml(dataItem);
                if (column.itemStyle)
                    cell.style(column.itemStyle);
            }
        }
        return GridViewDataRow;
    }(GridViewRow));
    var GridView = (function (_super) {
        __extends(GridView, _super);
        function GridView(params) {
            var _this = this;
            _super.call(this, document.createElement('TABLE'));
            this.rowCreated = wuzhui.callbacks();
            params = $.extend({
                showHeader: true, showFooter: false,
                allowPaging: false
            }, params);
            this._columns = params.columns;
            this.dataSource = params.dataSource;
            this.dataSource.selected.add(function (sender, e) { return _this.on_selectExecuted(e.items, e.selectArguments); });
            if (params.showHeader) {
                this._header = new wuzhui.Control(document.createElement('THEAD'));
                this.appendChild(this._header);
                this.appendHeaderRow();
            }
            this._body = new wuzhui.Control(document.createElement('TBODY'));
            this.appendChild(this._body);
            if (params.showFooter) {
                this._footer = new wuzhui.Control(document.createElement('TFOOT'));
                this.appendChild(this._footer);
                if (params.showFooter)
                    this.appendFooterRow();
            }
        }
        Object.defineProperty(GridView.prototype, "pageSize", {
            get: function () {
                return this._pageSize;
            },
            set: function (value) {
                this._pageSize = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridView.prototype, "columns", {
            get: function () {
                return this._columns;
            },
            enumerable: true,
            configurable: true
        });
        GridView.prototype.handleEdit = function (row) {
        };
        GridView.prototype.handleInsert = function (row) {
        };
        GridView.prototype.handlePage = function (pageIndex) {
        };
        GridView.prototype.handleSelect = function (row) {
        };
        GridView.prototype.handleSort = function (sortExpression, sortDirection) {
        };
        GridView.prototype.handleUpdate = function (row) {
        };
        GridView.prototype.appendDataRow = function (dataItem) {
            var row = new GridViewDataRow(this, dataItem);
            this._body.appendChild(row);
            wuzhui.fireCallback(this.rowCreated, this, { row: row });
        };
        GridView.prototype.appendHeaderRow = function () {
            var row = new GridViewRow(GridViewRowType.Header);
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                var cell = this.createCell();
                cell.html = column.headerText;
                if (this.columns[i].headerStyle)
                    cell.style(this.columns[i].headerStyle);
                row.appendChild(cell);
                cell.visible = this.columns[i].visible;
            }
            this._header.appendChild(row);
        };
        GridView.prototype.appendFooterRow = function () {
            var row = new GridViewRow(GridViewRowType.Footer);
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                var cell = this.createCell();
                cell.html = column.footerText;
                if (this.columns[i].footerStyle)
                    cell.style(this.columns[i].footerStyle);
                row.appendChild(cell);
            }
            this._footer.appendChild(row);
        };
        GridView.prototype.createCell = function () {
            var cell = new wuzhui.Control(document.createElement('TD'));
            return cell;
        };
        GridView.prototype.on_selectExecuted = function (items, args) {
            this._body.element.innerHTML = "";
            for (var i = 0; i < items.length; i++) {
                this.appendDataRow(items[i]);
            }
        };
        return GridView;
    }(wuzhui.Control));
    wuzhui.GridView = GridView;
})(wuzhui || (wuzhui = {}));
var wuzhui;
(function (wuzhui) {
    (function (PagerPosition) {
        PagerPosition[PagerPosition["Bottom"] = 0] = "Bottom";
        PagerPosition[PagerPosition["Top"] = 1] = "Top";
        PagerPosition[PagerPosition["TopAndBottom"] = 2] = "TopAndBottom";
    })(wuzhui.PagerPosition || (wuzhui.PagerPosition = {}));
    var PagerPosition = wuzhui.PagerPosition;
    ;
    (function (PagerButtons) {
        PagerButtons[PagerButtons["NextPrevious"] = 0] = "NextPrevious";
        PagerButtons[PagerButtons["Numeric"] = 1] = "Numeric";
        PagerButtons[PagerButtons["NextPreviousFirstLast"] = 2] = "NextPreviousFirstLast";
        PagerButtons[PagerButtons["NumericFirstLast"] = 3] = "NumericFirstLast";
    })(wuzhui.PagerButtons || (wuzhui.PagerButtons = {}));
    var PagerButtons = wuzhui.PagerButtons;
    ;
    var PagerSettings = (function () {
        function PagerSettings() {
            this._pageButtonCount = 10;
            this._Mode = PagerButtons.NextPreviousFirstLast;
        }
        Object.defineProperty(PagerSettings.prototype, "firstPageText", {
            get: function () {
                return this._FirstPageText;
            },
            set: function (value) {
                this._FirstPageText = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PagerSettings.prototype, "lastPageText", {
            get: function () {
                return this._LastPageText;
            },
            set: function (value) {
                this._LastPageText = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PagerSettings.prototype, "mode", {
            get: function () {
                return this._Mode;
            },
            set: function (value) {
                this._Mode = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PagerSettings.prototype, "nextPageText", {
            get: function () {
                return this._NextPageText;
            },
            set: function (value) {
                this._NextPageText = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PagerSettings.prototype, "pageButtonCount", {
            get: function () {
                return this._pageButtonCount;
            },
            set: function (value) {
                this._pageButtonCount = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PagerSettings.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (value) {
                this._position = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PagerSettings.prototype, "previousPageText", {
            get: function () {
                return this._PreviousPageText;
            },
            set: function (value) {
                this._PreviousPageText = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PagerSettings.prototype, "visible", {
            get: function () {
                return this._Visible;
            },
            set: function (value) {
                this._Visible = value;
            },
            enumerable: true,
            configurable: true
        });
        return PagerSettings;
    }());
    wuzhui.PagerSettings = PagerSettings;
    var PagingBar = (function () {
        function PagingBar() {
        }
        PagingBar.prototype.init = function (dataSource) {
            if (dataSource == null)
                throw wuzhui.Errors.argumentNull('dataSource');
            this._pageIndex = 0;
            this._dataSource = dataSource;
            var pagingBar = this;
            pagingBar.totalRowCount = 1000000;
            dataSource.selected.add(function (source, args) {
                pagingBar._pageSize = args.selectArguments.maximumRows;
                var totalRowCount = args.selectArguments.totalRowCount;
                if (totalRowCount != null && totalRowCount >= 0) {
                    pagingBar.totalRowCount = totalRowCount;
                }
                var startRowIndex = args.selectArguments.startRowIndex;
                if (startRowIndex <= 0)
                    startRowIndex = 0;
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
        };
        Object.defineProperty(PagingBar.prototype, "pageCount", {
            get: function () {
                var pageCount = Math.ceil(this.totalRowCount / this.pageSize);
                return pageCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PagingBar.prototype, "pageSize", {
            get: function () {
                return this._pageSize;
            },
            set: function (value) {
                this._pageSize = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PagingBar.prototype, "pageIndex", {
            get: function () {
                return this._pageIndex;
            },
            set: function (value) {
                this._pageIndex = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PagingBar.prototype, "totalRowCount", {
            get: function () {
                return this._totalRowCount;
            },
            set: function (value) {
                this._totalRowCount = value;
            },
            enumerable: true,
            configurable: true
        });
        PagingBar.prototype.render = function () {
            throw wuzhui.Errors.notImplemented('The table-row render method is not implemented.');
        };
        return PagingBar;
    }());
    wuzhui.PagingBar = PagingBar;
    var NumberPagingBar = (function (_super) {
        __extends(NumberPagingBar, _super);
        function NumberPagingBar(dataSource, pagerSettings, element, selectArgument) {
            _super.call(this);
            this.dataSource = dataSource;
            this.pagerSettings = pagerSettings;
            this.element = element;
            this._buttons = new Array();
            this._selectArgument = selectArgument;
            this.init(dataSource);
        }
        NumberPagingBar.prototype.init = function (dataSource) {
            _super.prototype.init.call(this, dataSource);
            var pagingBar = this;
            pagingBar.dataSource.selected.add(function (sender, args) {
                if (args.selectArguments.totalRowCount != null)
                    $(pagingBar.totalElement).text(args.selectArguments.totalRowCount);
            });
        };
        NumberPagingBar.prototype.selectArgument = function () {
            if (!this._selectArgument)
                this._selectArgument = new wuzhui.DataSourceSelectArguments();
            return this._selectArgument;
        };
        NumberPagingBar.prototype.render = function () {
            var pagerSettings = this.pagerSettings;
            var pagingBar = this;
            pagingBar.cell = this.element;
            var buttonCount = pagerSettings.pageButtonCount;
            var FIRST_BUTTON = 0;
            var PREVIOUS_PAGING_BUTTON = 1;
            var NEXT_PAGING_BUTTON = pagerSettings.pageButtonCount + 2;
            var LAST_BUTTON = pagerSettings.pageButtonCount + 3;
            var OTHER_BUTTONS_COUNT = 4;
            for (var i = 0; i < buttonCount + OTHER_BUTTONS_COUNT; i++) {
                if (pagingBar._buttons[i] != null) {
                    pagingBar.cell.removeChild(pagingBar._buttons[i]);
                }
                var url = document.createElement('a');
                pagingBar.cell.appendChild(url);
                pagingBar._buttons[i] = url;
                url.style.paddingLeft = '4px';
                url.href = 'javascript:';
                url['pageIndex'] = i;
                $(url).click(function () {
                    var buttonIndex = pagingBar._buttons.indexOf(this);
                    var index;
                    var args = pagingBar.selectArgument();
                    args.maximumRows = pagingBar.pageSize;
                    args.startRowIndex = this.pageIndex * pagingBar.pageSize;
                    if (pagingBar.sortExpression) {
                        args.sortExpression = pagingBar.sortExpression;
                    }
                    pagingBar.dataSource.select(args);
                });
            }
            if (pagingBar.totalElement == null) {
                pagingBar.totalElement = document.createElement('span');
                $('<div style="float:right;margin-right:4px;">').text('总记录：').append(pagingBar.totalElement).appendTo(pagingBar.cell);
            }
            var pagingBarIndex = Math.floor(pagingBar.pageIndex / buttonCount);
            for (var i = 0; i < buttonCount + OTHER_BUTTONS_COUNT; i++) {
                var pageCount = pagingBar.pageCount;
                var start = pagingBarIndex * buttonCount;
                var index;
                var url_1 = pagingBar._buttons[i];
                if (i == PREVIOUS_PAGING_BUTTON) {
                    url_1.innerHTML = '...';
                    url_1['pageIndex'] = (pagingBarIndex - 1) * buttonCount;
                }
                else if (i == NEXT_PAGING_BUTTON) {
                    url_1.innerHTML = '...';
                    url_1['pageIndex'] = (pagingBarIndex + 1) * buttonCount;
                }
                else if (i == FIRST_BUTTON) {
                    url_1.innerHTML = pagerSettings.firstPageText;
                    url_1['pageIndex'] = 0;
                }
                else if (i == LAST_BUTTON) {
                    url_1.innerHTML = pagerSettings.lastPageText;
                    url_1['pageIndex'] = pageCount - 1;
                }
                else {
                    url_1.innerHTML = (start + i - PREVIOUS_PAGING_BUTTON);
                    url_1['pageIndex'] = start + i - PREVIOUS_PAGING_BUTTON - 1;
                    if (url_1['pageIndex'] == this.pageIndex)
                        url_1.style.color = 'red';
                }
                if (pageCount != null && url_1['pageIndex'] > pageCount - 1)
                    url_1.style.display = 'none';
            }
            if (pagingBarIndex > 0 && pagerSettings.mode == PagerButtons.NumericFirstLast)
                pagingBar._buttons[LAST_BUTTON].style.removeProperty('display');
            else
                pagingBar._buttons[FIRST_BUTTON].style.display = 'none';
            if (pageCount > 0 && pagingBar.pageIndex < pageCount - 1 && pagerSettings.mode == PagerButtons.NumericFirstLast)
                pagingBar._buttons[LAST_BUTTON].style.removeProperty('display');
            else
                pagingBar._buttons[LAST_BUTTON].style.display = 'none';
            if (pagingBarIndex == 0)
                pagingBar._buttons[PREVIOUS_PAGING_BUTTON].style.display = 'none';
        };
        return NumberPagingBar;
    }(PagingBar));
    wuzhui.NumberPagingBar = NumberPagingBar;
})(wuzhui || (wuzhui = {}));
var wuzhui;
(function (wuzhui) {
    function ajax(url, data) {
        var result = $.Deferred();
        $.ajax({
            url: url,
            data: data,
            method: 'post',
            traditional: true
        }).done(function (data, textStatus, jqXHR) {
            if (data.Type == 'ErrorObject' && data.Code != 'Success') {
                result.reject(data, textStatus, jqXHR);
            }
            else {
                result.resolve(data, textStatus, jqXHR);
            }
        }).fail(function (jqXHR, textStatus) {
            var err = { Code: textStatus, status: jqXHR.status, Message: jqXHR.statusText };
            result.reject(err);
        });
        return result;
    }
    wuzhui.ajax = ajax;
    function callbacks() {
        return $.Callbacks();
    }
    wuzhui.callbacks = callbacks;
    function fireCallback(callback, sender, args) {
        return callback.fireWith(this, [sender, args]);
    }
    wuzhui.fireCallback = fireCallback;
    (function () {
        var prefix = '/Date(';
        function parseStringToDate(value) {
            var star = prefix.length;
            var len = value.length - prefix.length - ')/'.length;
            var str = value.substr(star, len);
            var num = parseInt(str);
            var date = new Date(num);
            return date;
        }
        $.ajaxSettings.converters['text json'] = function (json) {
            var result = $.parseJSON(json);
            if (typeof result === 'string') {
                if (result.substr(0, prefix.length) == prefix)
                    result = parseStringToDate(result);
                return result;
            }
            var stack = new Array();
            stack.push(result);
            while (stack.length > 0) {
                var item = stack.pop();
                for (var key in item) {
                    var value = item[key];
                    if (value == null)
                        continue;
                    if ($.isArray(value)) {
                        for (var i = 0; i < value.length; i++) {
                            stack.push(value[i]);
                        }
                        continue;
                    }
                    if ($.isPlainObject(value)) {
                        stack.push(value);
                        continue;
                    }
                    if (typeof value == 'string' && value.substr(0, prefix.length) == prefix) {
                        item[key] = parseStringToDate(value);
                    }
                }
            }
            return result;
        };
    })();
})(wuzhui || (wuzhui = {}));
