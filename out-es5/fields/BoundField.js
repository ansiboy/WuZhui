"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/// <reference path="DataControlField.ts"/>
define(["require", "exports", "./DataControlField", "../Errors", "../Utility"], function (require, exports, DataControlField_1, Errors_1, Utility_1) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var GridViewEditableCell =
  /*#__PURE__*/
  function (_DataControlField_1$G) {
    _inherits(GridViewEditableCell, _DataControlField_1$G);

    function GridViewEditableCell(field, dataItem, valueType) {
      var _this;

      _classCallCheck(this, GridViewEditableCell);

      if (field == null) throw Errors_1.Errors.argumentNull('field');
      if (dataItem == null) throw Errors_1.Errors.argumentNull('dataItem');
      _this = _possibleConstructorReturn(this, _getPrototypeOf(GridViewEditableCell).call(this, {
        dataField: field.dataField,
        nullText: field.nullText,
        dataFormatString: field.dataFormatString
      }));
      _this._field = field;
      _this._dataItem = dataItem;
      _this._valueType = valueType;
      _this._mode = 'read';

      if (!_this._valueType) {
        var value = dataItem[field.dataField];
        if (value instanceof Date) _this._valueType = 'date';else _this._valueType = _typeof(value);
      }

      return _this;
    }

    _createClass(GridViewEditableCell, [{
      key: "beginEdit",
      value: function beginEdit() {
        if (this._field.readOnly) {
          return;
        }

        this._mode = 'edit';
        this.render(this._dataItem);
      }
    }, {
      key: "endEdit",
      value: function endEdit() {
        if (this._field.readOnly) {
          return;
        }

        this._mode = 'read';
        var value = this.controlValue;
        this.render(this._dataItem);
      }
    }, {
      key: "cancelEdit",
      value: function cancelEdit() {
        if (this._field.readOnly) {
          return;
        }

        this._mode = 'read'; // let value = this._dataItem[this.field.dataField];

        this.render(this._dataItem);
      }
    }, {
      key: "render",
      value: function render(dataItem) {
        //value
        var value = dataItem[this.field.dataField];

        if (this._mode == 'edit') {
          this.element.innerHTML = "<input type=\"text\" />";
          Utility_1.applyStyle(this.element.querySelector('input'), this._field.controlStyle);
          this.element.querySelector('input').value = value === undefined ? null : "".concat(value);
          return;
        }

        _get(_getPrototypeOf(GridViewEditableCell.prototype), "render", this).call(this, dataItem);
      } //==============================================
      // Virtual Methods

    }, {
      key: "field",
      get: function get() {
        return this._field;
      }
    }, {
      key: "mode",
      get: function get() {
        return this._mode;
      }
    }, {
      key: "controlValue",
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
  }(DataControlField_1.GridViewDataCell);

  exports.GridViewEditableCell = GridViewEditableCell;

  var BoundField =
  /*#__PURE__*/
  function (_DataControlField_1$D) {
    _inherits(BoundField, _DataControlField_1$D);

    function BoundField(params) {
      var _this2;

      _classCallCheck(this, BoundField);

      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(BoundField).call(this, params));
      _this2._params = params;
      _this2._valueElement = document.createElement('span');
      return _this2;
    }

    _createClass(BoundField, [{
      key: "params",
      value: function params() {
        return this._params;
      }
      /**
       * Gets the caption displayed for a field when the field's value is null.
       */

    }, {
      key: "createItemCell",
      value: function createItemCell(dataItem) {
        var cell = new GridViewEditableCell(this, dataItem);
        cell.style(this.itemStyle);
        return cell;
      }
      /**
       * Gets the field for the value.
       */

    }, {
      key: "nullText",
      get: function get() {
        return this.params().nullText;
      }
    }, {
      key: "dataField",
      get: function get() {
        return this.params().dataField;
      }
      /**
       * Gets the string that specifies the display format for the value of the field.
       */

    }, {
      key: "dataFormatString",
      get: function get() {
        return this.params().dataFormatString;
      }
    }, {
      key: "controlStyle",
      get: function get() {
        return this.params().controlStyle;
      }
    }, {
      key: "readOnly",
      get: function get() {
        return this.params().readOnly;
      }
    }]);

    return BoundField;
  }(DataControlField_1.DataControlField);

  exports.BoundField = BoundField;
});
//# sourceMappingURL=BoundField.js.map
