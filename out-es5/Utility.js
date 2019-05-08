"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

define(["require", "exports", "./Errors"], function (require, exports, Errors_1) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var ElementHelper =
  /*#__PURE__*/
  function () {
    function ElementHelper() {
      _classCallCheck(this, ElementHelper);
    }

    _createClass(ElementHelper, null, [{
      key: "showElement",
      value: function showElement(element) {
        if (!element) throw Errors_1.Errors.argumentNull('element');
        element.style.removeProperty('display');
      }
    }, {
      key: "hideElement",
      value: function hideElement(element) {
        if (!element) throw Errors_1.Errors.argumentNull('element');
        element.style.display = 'none';
      }
    }, {
      key: "isVisible",
      value: function isVisible(element) {
        var display = element.style.display;
        return !display || display != 'none';
      }
    }, {
      key: "data",
      value: function data(element, name, value) {
        element['data'] = element['data'] || {};
        if (value == null) return element['data'].name;
        element['data'].name = value;
      }
    }, {
      key: "findFirstParentByTagName",
      value: function findFirstParentByTagName(element, tagName) {
        if (element == null) throw Errors_1.Errors.argumentNull("element");
        if (!tagName) throw Errors_1.Errors.argumentNull('tagName');
        var parent = element.parentElement;

        while (parent != null) {
          if (parent.tagName.toLowerCase() == tagName.toLowerCase()) {
            return parent;
          }

          parent = parent.parentElement;
        }

        return null;
      }
    }]);

    return ElementHelper;
  }();

  exports.ElementHelper = ElementHelper;

  function applyStyle(element, value) {
    var style = value || '';

    if (typeof style == 'string') {
      element.setAttribute('style', style);
    } else {
      for (var key in style) {
        element.style[key] = style[key];
      }
    }
  }

  exports.applyStyle = applyStyle;

  var Callback =
  /*#__PURE__*/
  function () {
    function Callback() {
      _classCallCheck(this, Callback);

      this.funcs = new Array();
    }

    _createClass(Callback, [{
      key: "add",
      value: function add(func) {
        this.funcs.push(func);
      }
    }, {
      key: "remove",
      value: function remove(func) {
        this.funcs = this.funcs.filter(function (o) {
          return o != func;
        });
      }
    }, {
      key: "fire",
      value: function fire() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        this.funcs.forEach(function (o) {
          return o.apply(void 0, args);
        });
      }
    }]);

    return Callback;
  }();

  exports.Callback = Callback;

  function callbacks() {
    return new Callback();
  }

  exports.callbacks = callbacks;

  function callbacks1() {
    return new Callback();
  }

  exports.callbacks1 = callbacks1;

  function fireCallback(callback) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    callback.fire.apply(callback, args);
  }

  exports.fireCallback = fireCallback;
}); // }
//# sourceMappingURL=Utility.js.map
