"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

define(["require", "exports", "./Control", "./Errors"], function (require, exports, Control_1, Errors_1) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var TextBox =
  /*#__PURE__*/
  function (_Control_1$Control) {
    _inherits(TextBox, _Control_1$Control);

    function TextBox(params) {
      var _this;

      _classCallCheck(this, TextBox);

      if (params == null) throw Errors_1.Errors.argumentNull("params");
      if (!params.element) throw Errors_1.Errors.argumentFieldNull("params", "element");
      if (!params.dataField) throw Errors_1.Errors.argumentFieldNull("params", "dataField");
      if (!params.dataItem) throw Errors_1.Errors.argumentFieldNull("params", "dataItem");
      if (!params.valueType) throw Errors_1.Errors.argumentFieldNull("params", "valuetype");
      _this = _possibleConstructorReturn(this, _getPrototypeOf(TextBox).call(this, params.element));
      var element = params.element,
          dataField = params.dataField,
          dataItem = params.dataItem,
          valueType = params.valueType;
      var value = dataItem[dataField];
      element.value = "".concat(value);

      element.onchange = function () {
        if (valueType == 'int') {
          dataItem[dataField] = Number.parseInt(element.value);
        } else if (valueType == 'float') {
          dataItem[dataField] = Number.parseFloat(element.value);
        } else {
          dataItem[dataField] = element.value || "";
        }
      };

      return _this;
    }

    return TextBox;
  }(Control_1.Control);

  exports.TextBox = TextBox;
});
//# sourceMappingURL=TextBox.js.map
