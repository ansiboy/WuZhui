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

define(["require", "exports", "./DataControlField", "../Errors", "../Utility"], function (require, exports, DataControlField_1, Errors_1, Utility_1) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var GridViewEditableCell =
  /*#__PURE__*/
  function (_DataControlField_1$G) {
    _inherits(GridViewEditableCell, _DataControlField_1$G);

    function GridViewEditableCell(field, dataItem) {
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
      _this._mode = 'read';
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
        this.render(this._dataItem);
      }
    }, {
      key: "cancelEdit",
      value: function cancelEdit() {
        if (this._field.readOnly) {
          return;
        }

        this._mode = 'read';
        this.render(this._dataItem);
      }
    }, {
      key: "render",
      value: function render(dataItem) {
        if (this._mode == 'edit') {
          this.element.innerHTML = "";
          this.createControl();
          console.assert(this.control != null);
          var value = dataItem[this.field.dataField];
          this.control.value = value;
          Utility_1.applyStyle(this.control.element, this._field.controlStyle);
          this.element.appendChild(this.control.element);
          return;
        } // this.control = null;


        _get(_getPrototypeOf(GridViewEditableCell.prototype), "render", this).call(this, dataItem);
      }
    }, {
      key: "createControl",
      value: function createControl() {
        this.control = this.field.createControl();
        return this.control.element;
      }
    }, {
      key: "dataItem",
      get: function get() {
        return this._dataItem;
      }
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
        if (this.control == null) return null;
        return this.control.value;
      }
    }]);

    return GridViewEditableCell;
  }(DataControlField_1.GridViewDataCell);

  exports.GridViewEditableCell = GridViewEditableCell;
});
//# sourceMappingURL=GridViewEditableCell.js.map
