"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

define(["require", "exports", "./Control", "./DataSource", "./fields/DataControlField", "./NumberPagingBar", "./Utility", "./Errors"], function (require, exports, Control_1, DataSource_1, DataControlField_1, NumberPagingBar_1, Utility_1, Errors_1) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  }); // namespace wuzhui {

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
    var p = element.parentElement;

    while (p) {
      if (p.tagName == parentTagName) return p;
      p = p.parentElement;
    }
  }

  var GridViewRow =
  /*#__PURE__*/
  function (_Control_1$Control) {
    _inherits(GridViewRow, _Control_1$Control);

    function GridViewRow(rowType) {
      var _this;

      _classCallCheck(this, GridViewRow);

      var element = document.createElement('tr');
      _this = _possibleConstructorReturn(this, _getPrototypeOf(GridViewRow).call(this, element));
      _this._rowType = rowType;
      return _this;
    }

    _createClass(GridViewRow, [{
      key: "rowType",
      get: function get() {
        return this._rowType;
      }
    }, {
      key: "gridView",
      get: function get() {
        if (this._gridView == null) {
          var gridViewElement = findParentElement(this.element, 'table');
          console.assert(gridViewElement != null);
          this._gridView = Control_1.Control.getControlByElement(gridViewElement);
          console.assert(this._gridView != null);
        }

        return this._gridView;
      }
    }, {
      key: "cells",
      get: function get() {
        var cells = new Array();

        for (var i = 0; i < this.element.cells.length; i++) {
          var cell = Control_1.Control.getControlByElement(this.element.cells[i]);
          console.assert(cell != null);
          cells[i] = cell;
        }

        return cells;
      }
    }]);

    return GridViewRow;
  }(Control_1.Control);

  exports.GridViewRow = GridViewRow;

  var GridViewDataRow =
  /*#__PURE__*/
  function (_GridViewRow) {
    _inherits(GridViewDataRow, _GridViewRow);

    function GridViewDataRow(gridView, dataItem) {
      var _this2;

      _classCallCheck(this, GridViewDataRow);

      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(GridViewDataRow).call(this, GridViewRowType.Data));
      _this2._dataItem = dataItem;

      for (var i = 0; i < gridView.columns.length; i++) {
        var column = gridView.columns[i];
        var cell = column.createItemCell(dataItem);
        cell.visible = column.visible;

        _this2.appendChild(cell);
      }

      return _this2;
    }

    _createClass(GridViewDataRow, [{
      key: "dataItem",
      get: function get() {
        return this._dataItem;
      }
    }]);

    return GridViewDataRow;
  }(GridViewRow);

  exports.GridViewDataRow = GridViewDataRow;

  var GridView =
  /*#__PURE__*/
  function (_Control_1$Control2) {
    _inherits(GridView, _Control_1$Control2);

    function GridView(params) {
      var _this3;

      _classCallCheck(this, GridView);

      _this3 = _possibleConstructorReturn(this, _getPrototypeOf(GridView).call(this, params.element || document.createElement('table')));
      _this3.emptyDataHTML = '暂无记录';
      _this3.initDataHTML = '数据正在加载中...';
      _this3.loadFailHTML = '加载数据失败，点击重新加载。'; //========================================================
      // 样式
      // headerStyle: string;
      // footerStyle: string;
      // rowStyle: string;
      // alternatingRowStyle: string;
      //private emptyDataRowStyle: string;
      //========================================================

      _this3.rowCreated = Utility_1.callbacks();
      params = Object.assign({
        showHeader: true,
        showFooter: false,
        allowPaging: false
      }, params);
      _this3._params = params;
      _this3._columns = params.columns || [];
      if (_this3._columns.length == 0) throw Errors_1.Errors.columnsCanntEmpty();

      for (var i = 0; i < _this3._columns.length; i++) {
        var column = _this3._columns[i];
        column.gridView = _assertThisInitialized(_this3);
      }

      _this3._dataSource = params.dataSource;

      _this3._dataSource.selected.add(function (sender, e) {
        return _this3.on_selectedExecuted(e);
      });

      _this3._dataSource.updated.add(function (sender, item) {
        return _this3.on_updateExecuted(item);
      });

      _this3._dataSource.inserted.add(function (sender, item, index) {
        return _this3.on_insertExecuted(item, index);
      });

      _this3._dataSource.deleted.add(function (sender, item) {
        return _this3.on_deleteExecuted(item);
      });

      _this3._dataSource.selecting.add(function (sender, e) {
        var display = _this3._emtpyRow.element.style.display;

        if (display != 'none') {
          _this3._emtpyRow.element.cells[0].innerHTML = _this3.initDataHTML;
        }
      });

      _this3._dataSource.error.add(function (sender, e) {
        if (e.method == 'select') {
          _this3.renderDataItems([]);

          var element = _this3._emtpyRow.cells[0].element;
          element.innerHTML = _this3.loadFailHTML;

          element.onclick = function () {
            _this3._dataSource.select(_this3.selectArguments);
          };

          e.handled = true;
          console.error(e.message);
          console.log(e.stack);
        }
      });

      if (params.showHeader) {
        _this3._header = new Control_1.Control(document.createElement('thead'));

        _this3.appendChild(_this3._header);

        _this3.appendHeaderRow();
      }

      _this3.emptyDataHTML = params.emptyDataHTML || _this3.emptyDataHTML;
      _this3.initDataHTML = params.initDataHTML || _this3.initDataHTML;
      _this3._body = new Control_1.Control(document.createElement('tbody'));

      _this3.appendChild(_this3._body);

      _this3.appendEmptyRow();

      var allowPaging = params.pageSize;

      if (params.showFooter || allowPaging) {
        _this3._footer = new Control_1.Control(document.createElement('tfoot'));

        _this3.appendChild(_this3._footer);

        if (params.showFooter) _this3.appendFooterRow();

        if (allowPaging) {
          _this3.createPagingBar(params.pagerSettings);

          _this3.pagingBar.selectArguments.maximumRows = params.pageSize;
        }
      }

      _this3.selectArguments = _this3.pagingBar ? _this3.pagingBar.selectArguments : new DataSource_1.DataSourceSelectArguments();

      _this3.dataSource.select(_this3.selectArguments);

      return _this3;
    }

    _createClass(GridView, [{
      key: "createPagingBar",
      value: function createPagingBar(pagerSettings) {
        var pagingBarContainer = document.createElement('tr');
        var pagingBarElement = document.createElement('td');
        pagingBarElement.className = GridView.pagingBarClassName;
        pagingBarElement.colSpan = this.columns.length;
        pagingBarContainer.appendChild(pagingBarElement);
        console.assert(this._footer != null);

        this._footer.appendChild(pagingBarContainer);

        this.pagingBar = new NumberPagingBar_1.DataSourcePagingBar({
          dataSource: this.dataSource,
          element: pagingBarElement,
          pagerSettings: pagerSettings
        });
      }
    }, {
      key: "appendEmptyRow",
      value: function appendEmptyRow() {
        this._emtpyRow = new GridViewRow(GridViewRowType.Empty);
        this._emtpyRow.element.className = GridView.emptyRowClassName;
        var cell = new DataControlField_1.GridViewCell();
        cell.element.colSpan = this.columns.length;

        if (!this._params.emptyDataRowStyle) {
          Utility_1.applyStyle(cell.element, this._params.emptyDataRowStyle);
        }

        this._emtpyRow.appendChild(cell);

        this._body.appendChild(this._emtpyRow);

        Utility_1.fireCallback(this.rowCreated, this, {
          row: this._emtpyRow
        });
      }
    }, {
      key: "appendDataRow",
      value: function appendDataRow(dataItem, index) {
        var row = new GridViewDataRow(this, dataItem);
        row.element.className = GridView.dataRowClassName;

        this._body.appendChild(row, index);

        var cells = row.cells;

        for (var j = 0; j < cells.length; j++) {
          var cell = cells[j];

          if (cell instanceof DataControlField_1.GridViewDataCell) {
            //
            cell.render(dataItem);
          }
        }

        Utility_1.fireCallback(this.rowCreated, this, {
          row: row
        });
        if (this._emtpyRow.element.style.display != 'none') this.hideEmptyRow();
        return row;
      }
    }, {
      key: "on_sort",
      value: function on_sort(sender, args) {
        if (this._currentSortCell != null && this._currentSortCell != sender) {
          this._currentSortCell.clearSortIcon();
        }

        this._currentSortCell = sender;
      }
    }, {
      key: "appendHeaderRow",
      value: function appendHeaderRow() {
        var _this4 = this;

        var row = new GridViewRow(GridViewRowType.Header);

        for (var i = 0; i < this.columns.length; i++) {
          var column = this.columns[i];
          var cell = column.createHeaderCell();

          if (cell instanceof DataControlField_1.GridViewHeaderCell) {
            cell.sorting.add(function (e, a) {
              return _this4.on_sort(e, a);
            });
          }

          row.appendChild(cell);
          cell.visible = this.columns[i].visible;
        }

        this._header.appendChild(row);
      }
    }, {
      key: "appendFooterRow",
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
      key: "renderDataItems",
      value: function renderDataItems(items) {
        var rows = this._body.element.querySelectorAll(".".concat(GridView.dataRowClassName));

        for (var i = 0; i < rows.length; i++) {
          this._body.element.removeChild(rows[i]);
        }

        if (items.length == 0) {
          this.showEmptyRow();
          return;
        }

        for (var _i = 0; _i < items.length; _i++) {
          this.appendDataRow(items[_i]);
        }
      }
    }, {
      key: "on_selectedExecuted",
      value: function on_selectedExecuted(e) {
        var dataItems = e.dataItems;

        if (this._params.sort) {
          dataItems = this._params.sort(dataItems);
        }

        this.renderDataItems(dataItems);
      }
    }, {
      key: "on_updateExecuted",
      value: function on_updateExecuted(item) {
        console.assert(item != null);
        var dataItems = [];

        for (var i = 0; i < this._body.element.rows.length; i++) {
          var row_element = this._body.element.rows[i];
          var row = Control_1.Control.getControlByElement(row_element);
          ;
          if (!(row instanceof GridViewDataRow)) continue;
          var dataItem = row.dataItem;
          dataItems.push(dataItem);
          if (!this.dataSource.isSameItem(dataItem, item)) continue;

          if (dataItem != item) {
            Object.assign(dataItem, item);
          }

          var cells = row.cells;

          for (var j = 0; j < cells.length; j++) {
            var cell = cells[j];

            if (cell instanceof DataControlField_1.GridViewDataCell) {
              cell.render(dataItem);
            }
          } // break;

        }

        if (this._params.sort) {
          dataItems = this._params.sort(dataItems);
          this.renderDataItems(dataItems);
        }
      }
    }, {
      key: "on_insertExecuted",
      value: function on_insertExecuted(item, index) {
        if (index == null) index = 0;

        if (!this._params.sort) {
          this.appendDataRow(item, index);
          return;
        }

        var dataItems = [item];

        for (var i = 0; i < this._body.element.rows.length; i++) {
          var row_element = this._body.element.rows[i];
          var row = Control_1.Control.getControlByElement(row_element);
          ;
          if (!(row instanceof GridViewDataRow)) continue;
          var dataItem = row.dataItem;
          dataItems.push(dataItem);
        }

        dataItems = this._params.sort(dataItems);
        this.renderDataItems(dataItems);
      }
    }, {
      key: "on_deleteExecuted",
      value: function on_deleteExecuted(item) {
        var _this5 = this;

        var rows = this._body.element.rows;
        var dataRows = new Array();

        for (var i = 0; i < rows.length; i++) {
          var row = Control_1.Control.getControlByElement(rows.item(i));
          if (row instanceof GridViewDataRow) dataRows.push(row);
        }

        if (this._params.sort) {
          var dataItems = dataRows.map(function (o) {
            return o.dataItem;
          }).filter(function (o) {
            return !_this5.dataSource.isSameItem(o, item);
          });
          dataItems = this._params.sort(dataItems);
          this.renderDataItems(dataItems);
          return;
        }

        for (var _i2 = 0; _i2 < dataRows.length; _i2++) {
          var dataRow = dataRows[_i2];
          if (!this.dataSource.isSameItem(item, dataRow.dataItem)) continue;
          dataRow.element.remove();
          if (dataRows.length == 1) this.showEmptyRow();
        }
      }
    }, {
      key: "showEmptyRow",
      value: function showEmptyRow() {
        this._emtpyRow.element.cells[0].innerHTML = this.emptyDataHTML;

        this._emtpyRow.element.style.removeProperty('display');
      }
    }, {
      key: "hideEmptyRow",
      value: function hideEmptyRow() {
        this._emtpyRow.element.style.display = 'none';
      }
    }, {
      key: "columns",
      get: function get() {
        return this._columns;
      }
    }, {
      key: "dataSource",
      get: function get() {
        return this._dataSource;
      }
    }]);

    return GridView;
  }(Control_1.Control);

  exports.GridView = GridView;
  GridView.emptyRowClassName = 'empty';
  GridView.dataRowClassName = 'data';
  GridView.pagingBarClassName = 'pagingBar';
}); // }
//# sourceMappingURL=GridView.js.map
