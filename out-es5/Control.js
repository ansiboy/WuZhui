"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(["require", "exports", "./Errors", "./Utility"], function (require, exports, Errors_1, Utility_1) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  }); // namespace wuzhui {

  var CONTROL_DATA_NAME = 'Control';

  var Control =
  /*#__PURE__*/
  function () {
    function Control(element) {
      _classCallCheck(this, Control);

      if (!element) throw Errors_1.Errors.argumentNull('element');
      this._element = element;
      Utility_1.ElementHelper.data(element, CONTROL_DATA_NAME, this);
    }

    _createClass(Control, [{
      key: "appendChild",
      value: function appendChild(child, index) {
        if (child == null) throw Errors_1.Errors.argumentNull('child');
        var childElement;
        if (child instanceof Control) childElement = child.element;else childElement = child;
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
        Utility_1.applyStyle(this.element, value);
      }
    }, {
      key: "visible",
      get: function get() {
        return Utility_1.ElementHelper.isVisible(this._element);
      },
      set: function set(value) {
        if (value) {
          Utility_1.ElementHelper.showElement(this._element);
        } else {
          Utility_1.ElementHelper.hideElement(this._element);
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
        return Utility_1.ElementHelper.data(element, CONTROL_DATA_NAME);
      }
    }]);

    return Control;
  }();

  exports.Control = Control;
}); // }
//# sourceMappingURL=Control.js.map
