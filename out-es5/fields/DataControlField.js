"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

define(["require", "exports", "../Control", "../Utility", "../Errors"], function (require, exports, Control_1, Utility_1, Errors_1) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var GridViewCell =
  /*#__PURE__*/
  function (_Control_1$Control) {
    _inherits(GridViewCell, _Control_1$Control);

    function GridViewCell() {
      _classCallCheck(this, GridViewCell);

      return _possibleConstructorReturn(this, _getPrototypeOf(GridViewCell).call(this, document.createElement('td')));
    }

    return GridViewCell;
  }(Control_1.Control);

  exports.GridViewCell = GridViewCell;

  var GridViewDataCell =
  /*#__PURE__*/
  function (_GridViewCell) {
    _inherits(GridViewDataCell, _GridViewCell);

    function GridViewDataCell(params) {
      var _this;

      _classCallCheck(this, GridViewDataCell);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(GridViewDataCell).call(this));
      var p = params;
      _this.nullText = p.nullText != null ? p.nullText : '';
      _this.dataFormatString = p.dataFormatString;
      _this.dataField = p.dataField;

      if (p.render) {
        _this.render = function (dataItem) {
          return p.render.apply(_assertThisInitialized(_this), [dataItem, _this.element]);
        };
      }

      return _this;
    }

    _createClass(GridViewDataCell, [{
      key: "render",
      value: function render(dataItem) {
        var value = dataItem[this.dataField];
        var text;
        if (value == null) text = this.nullText;else if (this.dataFormatString) text = this.formatValue(this.dataFormatString, value);else text = "".concat(value);
        this.element.innerHTML = text;
      }
    }, {
      key: "formatValue",
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
      key: "formatDate",
      value: function formatDate(value, format) {
        var y = value.getFullYear();
        var m = value.getMonth() + 1;
        var d = value.getDate();
        var h = value.getHours();
        var M = value.getMinutes();
        var s = value.getSeconds();

        var twoDigit = function twoDigit(value) {
          var TEN = 10;
          if (value < TEN) return "0" + value;
          return value.toString();
        };

        switch (format) {
          case 'd':
            return "".concat(y, "-").concat(m, "-").concat(d);

          case 'g':
            return "".concat(y, "-").concat(m, "-").concat(d, " ").concat(h, ":").concat(M);

          case 'gg':
            return "".concat(y, "-").concat(twoDigit(m), "-").concat(twoDigit(d), " ").concat(twoDigit(h), ":").concat(twoDigit(M));

          case 'G':
            return "".concat(y, "-").concat(m, "-").concat(d, " ").concat(h, ":").concat(M, ":").concat(s);

          case 'GG':
            return "".concat(y, "-").concat(twoDigit(m), "-").concat(twoDigit(d), " ").concat(twoDigit(h), ":").concat(twoDigit(M), ":").concat(twoDigit(s));

          case 't':
            return "".concat(h, ":").concat(M);

          case 'T':
            return "".concat(h, ":").concat(M, ":").concat(s);
        }

        return value.toString();
      }
    }, {
      key: "formatNumber",
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

  exports.GridViewDataCell = GridViewDataCell;

  var GridViewHeaderCell =
  /*#__PURE__*/
  function (_Control_1$Control2) {
    _inherits(GridViewHeaderCell, _Control_1$Control2);

    function GridViewHeaderCell(field) {
      var _this2;

      _classCallCheck(this, GridViewHeaderCell);

      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(GridViewHeaderCell).call(this, document.createElement('th')));
      _this2.ascHTML = '↑';
      _this2.descHTML = '↓';
      _this2.sortingHTML = '...';
      _this2.toSortHTML = '↕';
      _this2.field = field;
      _this2.sorting = Utility_1.callbacks();
      _this2.sorted = Utility_1.callbacks();

      if (field.sortExpression) {
        var labelElement = document.createElement('a');
        labelElement.href = 'javascript:';
        labelElement.innerHTML = _this2.defaultHeaderText();

        labelElement.onclick = function () {
          return _this2.handleSort();
        };

        _this2._iconElement = document.createElement('span');
        _this2._iconElement.innerHTML = _this2.toSortHTML;

        _this2.appendChild(labelElement);

        _this2.appendChild(_this2._iconElement);

        _this2.sorting.add(function () {
          return _this2._iconElement.innerHTML = _this2.sortingHTML;
        });

        _this2.sorted.add(function () {
          return _this2.updateSortIcon();
        });
      } else {
        _this2.element.innerHTML = _this2.defaultHeaderText();
      }

      _this2.style(field.headerStyle);

      return _this2;
    }

    _createClass(GridViewHeaderCell, [{
      key: "handleSort",
      value: function handleSort() {
        var _this3 = this;

        var selectArguments = this.field.gridView.selectArguments;
        var sortType = this.sortType == 'asc' ? 'desc' : 'asc';
        Utility_1.fireCallback(this.sorting, this, {
          sortType: sortType
        });
        selectArguments.sortExpression = this.field.sortExpression + ' ' + sortType;
        return this.field.gridView.dataSource.select(selectArguments).then(function () {
          _this3.sortType = sortType;
          Utility_1.fireCallback(_this3.sorted, _this3, {
            sortType: sortType
          });
        });
      }
    }, {
      key: "defaultHeaderText",
      value: function defaultHeaderText() {
        return this.field.headerText || this.field.dataField || '';
      }
    }, {
      key: "clearSortIcon",
      value: function clearSortIcon() {
        this._iconElement.innerHTML = this.toSortHTML;
      }
    }, {
      key: "updateSortIcon",
      value: function updateSortIcon() {
        if (this.sortType == 'asc') {
          this._iconElement.innerHTML = this.ascHTML;
        } else if (this.sortType == 'desc') {
          this._iconElement.innerHTML = this.descHTML;
        } else {
          this._iconElement.innerHTML = this.toSortHTML;
        }
      }
    }, {
      key: "sortType",
      get: function get() {
        return this._sortType;
      },
      set: function set(value) {
        this._sortType = value;
      }
    }]);

    return GridViewHeaderCell;
  }(Control_1.Control);

  exports.GridViewHeaderCell = GridViewHeaderCell;

  var DataControlField =
  /*#__PURE__*/
  function () {
    function DataControlField(params) {
      _classCallCheck(this, DataControlField);

      if (params.visible == null) params.visible = true;
      this.params = params;
    }
    /**
     * Gets the text that is displayed in the footer item of a data control field.
     */


    _createClass(DataControlField, [{
      key: "createHeaderCell",
      value: function createHeaderCell() {
        var cell = new GridViewHeaderCell(this);
        return cell;
      }
    }, {
      key: "createFooterCell",
      value: function createFooterCell() {
        var cell = new GridViewCell();
        cell.element.innerHTML = this.footerText || '';
        cell.style(this.footerStyle);
        return cell;
      }
    }, {
      key: "createItemCell",
      value: function createItemCell(dataItem) {
        if (!dataItem) throw Errors_1.Errors.argumentNull('dataItem');
        var cell = new GridViewCell();
        cell.style(this.itemStyle);
        return cell;
      }
    }, {
      key: "footerText",
      get: function get() {
        return this.params.footerText;
      }
      /**
       * Sets the text that is displayed in the footer item of a data control field.
       */
      ,
      set: function set(value) {
        this.params.footerText = value;
      }
      /**
       * Gets the text that is displayed in the header item of a data control field.
       */

    }, {
      key: "headerText",
      get: function get() {
        return this.params.headerText;
      }
      /**
      * Sets the text that is displayed in the header item of a data control field.
      */
      ,
      set: function set(value) {
        this.params.headerText = value;
      }
    }, {
      key: "itemStyle",
      get: function get() {
        return this.params.itemStyle;
      },
      set: function set(value) {
        this.params.itemStyle = value;
      }
    }, {
      key: "footerStyle",
      get: function get() {
        return this.params.footerStyle;
      },
      set: function set(value) {
        this.params.footerStyle = value;
      }
    }, {
      key: "headerStyle",
      get: function get() {
        return this.params.headerStyle;
      },
      set: function set(value) {
        this.params.headerStyle = value;
      }
    }, {
      key: "visible",
      get: function get() {
        return this.params.visible;
      }
    }, {
      key: "gridView",
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
      key: "sortExpression",
      get: function get() {
        return this.params.sortExpression;
      }
      /**
       * Sets a sort expression that is used by a data source control to sort data.
       */
      ,
      set: function set(value) {
        this.params.sortExpression = value;
      }
    }]);

    return DataControlField;
  }();

  exports.DataControlField = DataControlField;
});
//# sourceMappingURL=DataControlField.js.map
