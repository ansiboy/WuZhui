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

define(["require", "exports", "./DataControlField", "./GridViewEditableCell"], function (require, exports, DataControlField_1, GridViewEditableCell_1) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var BoundField =
  /*#__PURE__*/
  function (_DataControlField_1$D) {
    _inherits(BoundField, _DataControlField_1$D);

    function BoundField() {
      _classCallCheck(this, BoundField);

      return _possibleConstructorReturn(this, _getPrototypeOf(BoundField).apply(this, arguments));
    }

    _createClass(BoundField, [{
      key: "createItemCell",
      value: function createItemCell(dataItem) {
        var cell = new GridViewEditableCell_1.GridViewEditableCell(this, dataItem);
        cell.style(this.itemStyle);
        return cell;
      }
      /**
       * Gets the field for the value.
       */

    }, {
      key: "createControl",
      //===============================================
      // Virutal Methods
      value: function createControl() {
        // let control = document.createElement("input");
        // control.name = this.dataField as string;
        // return control;
        var element = document.createElement("input");
        var control = {
          element: element,
          valueType: this.params.valueType,

          get value() {
            var it = this;
            var input = it.element;
            var text = input.value;

            switch (it.valueType) {
              case 'number':
                return new Number(text).valueOf();

              case 'date':
                return new Date(text);

              default:
                return text;
            }
          },

          set value(value) {
            var it = this;
            var input = it.element;
            input.value = value == null ? "" : value;
          }

        };
        return control;
      }
    }, {
      key: "nullText",

      /**
       * Gets the caption displayed for a field when the field's value is null.
       */
      get: function get() {
        return this.params.nullText || "";
      }
    }, {
      key: "dataField",
      get: function get() {
        return this.params.dataField;
      }
      /**
       * Gets the string that specifies the display format for the value of the field.
       */

    }, {
      key: "dataFormatString",
      get: function get() {
        return this.params.dataFormatString;
      }
    }, {
      key: "controlStyle",
      get: function get() {
        return this.params.controlStyle;
      }
    }, {
      key: "readOnly",
      get: function get() {
        return this.params.readOnly;
      }
    }]);

    return BoundField;
  }(DataControlField_1.DataControlField);

  exports.BoundField = BoundField;
});
//# sourceMappingURL=BoundField.js.map
