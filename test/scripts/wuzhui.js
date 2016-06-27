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
            this.selecting.fireWith(this, [this, { arguments: args }]);
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
                _this.selected.fireWith(_this, [_this, { arguments: args, items: data_items }]);
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
        function DataSourceSelectArguments() {
            this._startRowIndex = 0;
            this._totalRowCount = null;
            this._maximumRows = 2147483647;
            this._retrieveTotalRowCount = false;
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
        Errors.notImplemented = function () {
            return new Error("Not implemented");
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
    var WebControl = (function () {
        function WebControl(element) {
            if (!element)
                throw wuzhui.Errors.argumentNull('element');
            this._element = element;
        }
        Object.defineProperty(WebControl.prototype, "text", {
            get: function () {
                return $(this.element).text();
            },
            set: function (value) {
                $(this.element).text(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebControl.prototype, "visible", {
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
        Object.defineProperty(WebControl.prototype, "element", {
            get: function () {
                return this._element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebControl.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        WebControl.prototype.appendChild = function (child) {
            if (child.parent != null)
                throw wuzhui.Errors.controllBelonsAnother();
            child._parent = this;
            this.element.appendChild(child.element);
        };
        return WebControl;
    }());
    wuzhui.WebControl = WebControl;
})(wuzhui || (wuzhui = {}));
var wuzhui;
(function (wuzhui) {
    var GridViewRow = (function (_super) {
        __extends(GridViewRow, _super);
        function GridViewRow() {
            var element = document.createElement('TR');
            _super.call(this, element);
        }
        GridViewRow.prototype.createCell = function () {
            var cell = new wuzhui.WebControl(document.createElement('TD'));
            return cell;
        };
        return GridViewRow;
    }(wuzhui.WebControl));
    var GridViewHeaderRow = (function (_super) {
        __extends(GridViewHeaderRow, _super);
        function GridViewHeaderRow() {
            _super.apply(this, arguments);
        }
        return GridViewHeaderRow;
    }(GridViewRow));
    var GridViewFooterRow = (function (_super) {
        __extends(GridViewFooterRow, _super);
        function GridViewFooterRow() {
            _super.apply(this, arguments);
        }
        return GridViewFooterRow;
    }(GridViewRow));
    var GridViewDataRow = (function (_super) {
        __extends(GridViewDataRow, _super);
        function GridViewDataRow(gridView, dataItem) {
            _super.call(this);
            for (var i = 0; i < gridView.columns.length; i++) {
                var column = gridView.columns[i];
                var cell = this.createCell();
                this.appendChild(cell);
                var cell_text = '';
                var bound_field = column;
                if (bound_field.dataField != null) {
                    cell_text = dataItem[bound_field.dataField];
                }
                cell.text = cell_text;
            }
        }
        return GridViewDataRow;
    }(GridViewRow));
    var GridView = (function (_super) {
        __extends(GridView, _super);
        function GridView(dataSource, columns) {
            var _this = this;
            var element = document.createElement('TABLE');
            _super.call(this, element);
            this.dataSource = dataSource;
            this.dataSource.selected.add(function (sender, e) { return _this.on_select_executed(e.items, e.arguments); });
            this._columns = columns;
            this._header = new wuzhui.WebControl(document.createElement('THEAD'));
            this._footer = new wuzhui.WebControl(document.createElement('TFOOT'));
            this._body = new wuzhui.WebControl(document.createElement('TBODY'));
            this.appendChild(this._header);
            this.appendChild(this._body);
            this.appendChild(this._footer);
            this.appendHeaderRow();
            this.appendFooterRow();
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
        Object.defineProperty(GridView.prototype, "selectedRowStyle", {
            get: function () {
                return this._selectedRowStyle;
            },
            set: function (value) {
                this._selectedRowStyle = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridView.prototype, "showFooter", {
            get: function () {
                return this._showFooter;
            },
            set: function (value) {
                this._showFooter = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridView.prototype, "showHeader", {
            get: function () {
                return this._showHeader;
            },
            set: function (value) {
                this._showHeader = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GridView.prototype, "columns", {
            get: function () {
                return this._columns;
            },
            set: function (value) {
                this._columns = value;
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
        GridView.prototype.createDataRow = function (dataItem) {
            var row = new GridViewDataRow(this, dataItem);
            return row;
        };
        GridView.prototype.appendHeaderRow = function () {
            var row = new GridViewHeaderRow();
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                var cell = this.createCell();
                cell.text = column.headerText;
                row.appendChild(cell);
            }
            this._header.appendChild(row);
        };
        GridView.prototype.appendFooterRow = function () {
            var row = new GridViewFooterRow();
            this._footer.appendChild(row);
        };
        GridView.prototype.createCell = function () {
            var cell = new wuzhui.WebControl(document.createElement('TD'));
            return cell;
        };
        GridView.prototype.on_select_executed = function (items, args) {
            this._body.element.innerHTML = "";
            for (var i = 0; i < items.length; i++) {
                var dataRow = this.createDataRow(items[i]);
                this.appendChild(dataRow);
            }
        };
        return GridView;
    }(wuzhui.WebControl));
    wuzhui.GridView = GridView;
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
