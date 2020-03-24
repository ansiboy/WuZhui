"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Control = void 0;

var _Errors = require("./Errors");

var _Utility = require("./Utility");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// namespace wuzhui {
var CONTROL_DATA_NAME = 'Control';

var Control = /*#__PURE__*/function () {
  function Control(element) {
    _classCallCheck(this, Control);

    if (!element) throw _Errors.Errors.argumentNull('element');
    this._element = element;

    _Utility.ElementHelper.data(element, CONTROL_DATA_NAME, this);
  }

  _createClass(Control, [{
    key: "appendChild",
    value: function appendChild(child, index) {
      if (child == null) throw _Errors.Errors.argumentNull('child');
      var childElement;
      if (child instanceof HTMLElement) childElement = child;else childElement = child.element;
      var placeChild;

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
    key: "style",
    value: function style(value) {
      (0, _Utility.applyStyle)(this.element, value);
    }
  }, {
    key: "visible",
    get: function get() {
      return _Utility.ElementHelper.isVisible(this._element);
    },
    set: function set(value) {
      if (value) {
        _Utility.ElementHelper.showElement(this._element);
      } else {
        _Utility.ElementHelper.hideElement(this._element);
      }
    }
  }, {
    key: "element",
    get: function get() {
      return this._element;
    }
  }], [{
    key: "getControlByElement",
    value: function getControlByElement(element) {
      return _Utility.ElementHelper.data(element, CONTROL_DATA_NAME);
    }
  }]);

  return Control;
}(); // }


exports.Control = Control;
//# sourceMappingURL=Control.js.map
