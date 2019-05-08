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

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

define(["require", "exports", "./Control", "./Errors"], function (require, exports, Control_1, Errors_1) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var DropDown =
  /*#__PURE__*/
  function (_Control_1$Control) {
    _inherits(DropDown, _Control_1$Control);

    function DropDown(params) {
      var _this;

      _classCallCheck(this, DropDown);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(DropDown).call(this, params.element));
      if (params == null) throw Errors_1.Errors.argumentNull('params');
      if (params.dataSource == null) throw Errors_1.Errors.argumentFieldNull('params', 'dataSource');
      if (params.element == null) throw Errors_1.Errors.argumentFieldNull('params', 'element');

      _this.init(params);

      return _this;
    }

    _createClass(DropDown, [{
      key: "init",
      value: function init(params) {
        return __awaiter(this, void 0, void 0,
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var _this2 = this;

          var r;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return params.dataSource.select({});

                case 2:
                  r = _context.sent;
                  r.dataItems.forEach(function (dataItem) {
                    var option = document.createElement('option');
                    var name = params.nameField ? dataItem[params.nameField] : dataItem;
                    var value = params.valueField ? dataItem[params.valueField] : dataItem;
                    if (name == null) name = '';
                    if (value == null) value = '';
                    option.innerHTML = name;
                    option.value = value;

                    _this2.element.appendChild(option);
                  });

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
      }
    }]);

    return DropDown;
  }(Control_1.Control);

  exports.DropDown = DropDown;
});
//# sourceMappingURL=DropDown.js.map
