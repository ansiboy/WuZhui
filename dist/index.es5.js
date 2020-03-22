/*!
 * 
 *  maishu-wuzhui v1.15.2
 *  https://github.com/ansiboy/wuzhui
 *  
 *  Copyright (c) 2016-2018, shu mai <ansiboy@163.com>
 *  Licensed under the MIT License.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["wuzhui"] = factory();
	else
		root["wuzhui"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./out-es5/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./out-es5/Control.js":
/*!****************************!*\
  !*** ./out-es5/Control.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Control = void 0;

var _Errors = __webpack_require__(/*! ./Errors */ "./out-es5/Errors.js");

var _Utility = __webpack_require__(/*! ./Utility */ "./out-es5/Utility.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// namespace wuzhui {
var CONTROL_DATA_NAME = 'Control';

var Control =
/*#__PURE__*/
function () {
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


/***/ }),

/***/ "./out-es5/DataSource.js":
/*!*******************************!*\
  !*** ./out-es5/DataSource.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayDataSource = exports.DataSourceSelectArguments = exports.DataSource = void 0;

var _Errors = __webpack_require__(/*! ./Errors */ "./out-es5/Errors.js");

var _Utility = __webpack_require__(/*! ./Utility */ "./out-es5/Utility.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

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
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var DataSource =
/*#__PURE__*/
function () {
  function DataSource(args) {
    _classCallCheck(this, DataSource);

    this.inserting = (0, _Utility.callbacks1)();
    this.inserted = (0, _Utility.callbacks1)();
    this.deleting = (0, _Utility.callbacks)();
    this.deleted = (0, _Utility.callbacks)();
    this.updating = (0, _Utility.callbacks)();
    this.updated = (0, _Utility.callbacks)();
    this.selecting = (0, _Utility.callbacks)();
    this.selected = (0, _Utility.callbacks)();
    this.error = (0, _Utility.callbacks)();
    this.args = args;
    this.primaryKeys = args.primaryKeys || [];
  }

  _createClass(DataSource, [{
    key: "executeInsert",
    value: function executeInsert(item, args) {
      return this.args.insert(item, args);
    }
  }, {
    key: "executeDelete",
    value: function executeDelete(item, args) {
      return this.args.delete(item, args);
    }
  }, {
    key: "executeUpdate",
    value: function executeUpdate(item, args) {
      return this.args.update(item, args);
    }
  }, {
    key: "executeSelect",
    value: function executeSelect(args) {
      args = args || {};
      return this.args.select(args);
    }
  }, {
    key: "insert",
    value: function insert(item, args, index) {
      var _this = this;

      if (!this.canInsert) throw _Errors.Errors.dataSourceCanntInsert();
      if (!item) throw _Errors.Errors.argumentNull("item");

      if (typeof args == 'number') {
        index = args;
        args = null;
      }

      this.inserting.fire(this, item, index);
      return this.executeInsert(item, args).then(function (data) {
        Object.assign(item, data);

        _this.inserted.fire(_this, item, index);

        return data;
      }).catch(function (exc) {
        _this.processError(exc, 'insert');

        throw exc;
      });
    }
  }, {
    key: "delete",
    value: function _delete(item, args) {
      var _this2 = this;

      if (!this.canDelete) throw _Errors.Errors.dataSourceCanntDelete();
      if (!item) throw _Errors.Errors.argumentNull("item");
      this.checkPrimaryKeys(item);
      this.deleting.fire(this, item);
      return this.executeDelete(item, args).then(function (data) {
        _this2.deleted.fire(_this2, item);

        return data;
      }).catch(function (exc) {
        _this2.processError(exc, 'delete');

        throw exc;
      });
    }
  }, {
    key: "update",
    value: function update(item, args) {
      var _this3 = this;

      if (!this.canUpdate) throw _Errors.Errors.dataSourceCanntUpdate();
      if (!item) throw _Errors.Errors.argumentNull("item");
      this.checkPrimaryKeys(item);
      this.updating.fire(this, item);
      return this.executeUpdate(item, args).then(function (data) {
        Object.assign(item, data);

        _this3.updated.fire(_this3, item);

        return data;
      }).catch(function (exc) {
        _this3.processError(exc, 'update');

        throw exc;
      });
    }
  }, {
    key: "isSameItem",
    value: function isSameItem(theItem, otherItem) {
      if (theItem == null) throw _Errors.Errors.argumentNull('theItem');
      if (otherItem == null) throw _Errors.Errors.argumentNull('otherItem');
      if (this.primaryKeys.length == 0) return theItem == otherItem;
      this.checkPrimaryKeys(theItem);
      this.checkPrimaryKeys(otherItem);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.primaryKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var pk = _step.value;
          if (theItem[pk] != otherItem[pk]) return false;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return true;
    }
  }, {
    key: "checkPrimaryKeys",
    value: function checkPrimaryKeys(item) {
      for (var key in item) {
        if (item[key] == null && this.primaryKeys.indexOf(key) >= 0) throw _Errors.Errors.primaryKeyNull(key);
      }
    }
  }, {
    key: "select",
    value: function select(args) {
      var _this4 = this;

      args = args || {};
      (0, _Utility.fireCallback)(this.selecting, this, args);
      return this.executeSelect(args).then(function (data) {
        var dataItems;
        var totalRowCount;

        if (Array.isArray(data)) {
          dataItems = data;
          totalRowCount = data.length;
        } else if (data.dataItems !== undefined && data.totalRowCount !== undefined) {
          dataItems = data.dataItems;
          totalRowCount = data.totalRowCount;
        } else {
          throw _Errors.Errors.queryResultTypeError();
        }

        _this4.selected.fire(_this4, {
          totalRowCount: totalRowCount,
          dataItems: dataItems
        });

        return {
          totalRowCount: totalRowCount,
          dataItems: dataItems
        };
      }).catch(function (exc) {
        _this4.processError(exc, 'select');

        throw exc;
      });
    }
  }, {
    key: "processError",
    value: function processError(exc, method) {
      exc.method = method;
      this.error.fire(this, exc);
      if (!exc.handled) throw exc;
    }
  }, {
    key: "canDelete",
    get: function get() {
      return this.args.delete != null && this.primaryKeys.length > 0;
    }
  }, {
    key: "canInsert",
    get: function get() {
      return this.args.insert != null && this.primaryKeys.length > 0;
    }
  }, {
    key: "canUpdate",
    get: function get() {
      return this.args.update != null && this.primaryKeys.length > 0;
    }
  }]);

  return DataSource;
}();

exports.DataSource = DataSource;

var DataSourceSelectArguments = function DataSourceSelectArguments() {
  _classCallCheck(this, DataSourceSelectArguments);

  this.startRowIndex = 0;
  this.maximumRows = 2147483647;
};

exports.DataSourceSelectArguments = DataSourceSelectArguments;

var ArrayDataSource =
/*#__PURE__*/
function (_DataSource) {
  _inherits(ArrayDataSource, _DataSource);

  function ArrayDataSource(items) {
    _classCallCheck(this, ArrayDataSource);

    return _possibleConstructorReturn(this, _getPrototypeOf(ArrayDataSource).call(this, {
      select: function select(args) {
        return __awaiter(this, void 0, void 0,
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var dataItems, result;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (args.sortExpression) {}

                  dataItems = items.slice(args.startRowIndex, args.startRowIndex + args.maximumRows);
                  result = {
                    dataItems: dataItems,
                    totalRowCount: items.length
                  };
                  return _context.abrupt("return", result);

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
      }
    }));
  }

  return ArrayDataSource;
}(DataSource); // }


exports.ArrayDataSource = ArrayDataSource;
//# sourceMappingURL=DataSource.js.map


/***/ }),

/***/ "./out-es5/DropDown.js":
/*!*****************************!*\
  !*** ./out-es5/DropDown.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropDown = void 0;

var _Control2 = __webpack_require__(/*! ./Control */ "./out-es5/Control.js");

var _Errors = __webpack_require__(/*! ./Errors */ "./out-es5/Errors.js");

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
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

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
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var DropDown =
/*#__PURE__*/
function (_Control) {
  _inherits(DropDown, _Control);

  function DropDown(params) {
    var _this;

    _classCallCheck(this, DropDown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DropDown).call(this, params.element));
    if (params == null) throw _Errors.Errors.argumentNull('params');
    if (params.dataSource == null) throw _Errors.Errors.argumentFieldNull('params', 'dataSource');
    if (params.element == null) throw _Errors.Errors.argumentFieldNull('params', 'element');

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
}(_Control2.Control);

exports.DropDown = DropDown;
//# sourceMappingURL=DropDown.js.map


/***/ }),

/***/ "./out-es5/Errors.js":
/*!***************************!*\
  !*** ./out-es5/Errors.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Errors = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// namespace wuzhui {
var Errors =
/*#__PURE__*/
function () {
  function Errors() {
    _classCallCheck(this, Errors);
  }

  _createClass(Errors, null, [{
    key: "notImplemented",
    value: function notImplemented(message) {
      message = message || "Not implemented";
      return new Error(message);
    }
  }, {
    key: "argumentNull",
    value: function argumentNull(paramName) {
      return new Error("Argument '" + paramName + "' can not be null.");
    }
  }, {
    key: "controllBelonsAnother",
    value: function controllBelonsAnother() {
      return new Error("The control is belongs another control.");
    }
  }, {
    key: "columnsCanntEmpty",
    value: function columnsCanntEmpty() {
      return new Error("Columns cannt empty.");
    }
  }, {
    key: "dataSourceCanntInsert",
    value: function dataSourceCanntInsert() {
      return new Error("DataSource can not insert.");
    }
  }, {
    key: "dataSourceCanntUpdate",
    value: function dataSourceCanntUpdate() {
      return new Error("DataSource can not update.");
    }
  }, {
    key: "dataSourceCanntDelete",
    value: function dataSourceCanntDelete() {
      return new Error("DataSource can not delete.");
    }
  }, {
    key: "primaryKeyNull",
    value: function primaryKeyNull(key) {
      var msg = "Primary key named '".concat(key, "' value is null.");
      return new Error(msg);
    }
  }, {
    key: "queryResultTypeError",
    value: function queryResultTypeError() {
      var msg = 'Type of the query result is expected as Array or DataSourceSelectResult.';
      return new Error(msg);
    }
  }, {
    key: "argumentFieldNull",
    value: function argumentFieldNull(argumentName, fieldName) {
      var msg = "Argument ".concat(argumentName, " ").concat(fieldName, " field can not be null or empty.");
      return new Error(msg);
    }
  }]);

  return Errors;
}(); // }


exports.Errors = Errors;
//# sourceMappingURL=Errors.js.map


/***/ }),

/***/ "./out-es5/GridView.js":
/*!*****************************!*\
  !*** ./out-es5/GridView.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridView = exports.GridViewDataRow = exports.GridViewRow = exports.GridViewRowType = void 0;

var _Control3 = __webpack_require__(/*! ./Control */ "./out-es5/Control.js");

var _DataSource = __webpack_require__(/*! ./DataSource */ "./out-es5/DataSource.js");

var _DataControlField = __webpack_require__(/*! ./fields/DataControlField */ "./out-es5/fields/DataControlField.js");

var _NumberPagingBar = __webpack_require__(/*! ./NumberPagingBar */ "./out-es5/NumberPagingBar.js");

var _Utility = __webpack_require__(/*! ./Utility */ "./out-es5/Utility.js");

var _Errors = __webpack_require__(/*! ./Errors */ "./out-es5/Errors.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// namespace wuzhui {
var GridViewRowType;
exports.GridViewRowType = GridViewRowType;

(function (GridViewRowType) {
  GridViewRowType[GridViewRowType["Header"] = 0] = "Header";
  GridViewRowType[GridViewRowType["Footer"] = 1] = "Footer";
  GridViewRowType[GridViewRowType["Data"] = 2] = "Data";
  GridViewRowType[GridViewRowType["Paging"] = 3] = "Paging";
  GridViewRowType[GridViewRowType["Empty"] = 4] = "Empty";
})(GridViewRowType || (exports.GridViewRowType = GridViewRowType = {}));

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
function (_Control) {
  _inherits(GridViewRow, _Control);

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
        this._gridView = _Control3.Control.getControlByElement(gridViewElement);
        console.assert(this._gridView != null);
      }

      return this._gridView;
    }
  }, {
    key: "cells",
    get: function get() {
      var cells = new Array();

      for (var i = 0; i < this.element.cells.length; i++) {
        var cell = _Control3.Control.getControlByElement(this.element.cells[i]);

        console.assert(cell != null);
        cells[i] = cell;
      }

      return cells;
    }
  }]);

  return GridViewRow;
}(_Control3.Control);

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
function (_Control2) {
  _inherits(GridView, _Control2);

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

    _this3.rowCreated = (0, _Utility.callbacks)();
    params = Object.assign({
      showHeader: true,
      showFooter: false,
      allowPaging: false
    }, params);
    _this3._params = params;
    _this3._columns = params.columns || [];
    if (_this3._columns.length == 0) throw _Errors.Errors.columnsCanntEmpty();

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
      _this3._header = new _Control3.Control(document.createElement('thead'));

      _this3.appendChild(_this3._header);

      _this3.appendHeaderRow();
    }

    _this3.emptyDataHTML = params.emptyDataHTML || _this3.emptyDataHTML;
    _this3.initDataHTML = params.initDataHTML || _this3.initDataHTML;
    _this3._body = new _Control3.Control(document.createElement('tbody'));

    _this3.appendChild(_this3._body);

    _this3.appendEmptyRow();

    var allowPaging = params.pageSize;

    if (params.showFooter || allowPaging) {
      _this3._footer = new _Control3.Control(document.createElement('tfoot'));

      _this3.appendChild(_this3._footer);

      if (params.showFooter) _this3.appendFooterRow();

      if (allowPaging) {
        _this3.createPagingBar(params.pagerSettings);

        _this3.pagingBar.selectArguments.maximumRows = params.pageSize;
      }
    }

    _this3.selectArguments = _this3.pagingBar ? _this3.pagingBar.selectArguments : new _DataSource.DataSourceSelectArguments();

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

      this.pagingBar = new _NumberPagingBar.DataSourcePagingBar({
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
      var cell = new _DataControlField.GridViewCell();
      cell.element.colSpan = this.columns.length;

      if (!this._params.emptyDataRowStyle) {
        (0, _Utility.applyStyle)(cell.element, this._params.emptyDataRowStyle);
      }

      this._emtpyRow.appendChild(cell);

      this._body.appendChild(this._emtpyRow);

      (0, _Utility.fireCallback)(this.rowCreated, this, {
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

        if (cell.render != null) {
          cell.render(dataItem);
        }
      }

      (0, _Utility.fireCallback)(this.rowCreated, this, {
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

        if (cell instanceof _DataControlField.GridViewHeaderCell) {
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

      if (this._params.translate) {
        dataItems = this._params.translate(dataItems);
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

        var row = _Control3.Control.getControlByElement(row_element);

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

          if (cell instanceof _DataControlField.GridViewDataCell) {
            cell.render(dataItem);
          }
        } // break;

      }

      if (this._params.translate) {
        dataItems = this._params.translate(dataItems);
        this.renderDataItems(dataItems);
      }
    }
  }, {
    key: "on_insertExecuted",
    value: function on_insertExecuted(item, index) {
      if (index == null) index = 0;

      if (!this._params.translate) {
        this.appendDataRow(item, index);
        return;
      }

      var dataItems = [item];

      for (var i = 0; i < this._body.element.rows.length; i++) {
        var row_element = this._body.element.rows[i];

        var row = _Control3.Control.getControlByElement(row_element);

        ;
        if (!(row instanceof GridViewDataRow)) continue;
        var dataItem = row.dataItem;
        dataItems.push(dataItem);
      }

      dataItems = this._params.translate(dataItems);
      this.renderDataItems(dataItems);
    }
  }, {
    key: "on_deleteExecuted",
    value: function on_deleteExecuted(item) {
      var _this5 = this;

      var rows = this._body.element.rows;
      var dataRows = new Array();

      for (var i = 0; i < rows.length; i++) {
        var row = _Control3.Control.getControlByElement(rows.item(i));

        if (row instanceof GridViewDataRow) dataRows.push(row);
      }

      if (this._params.translate) {
        var dataItems = dataRows.map(function (o) {
          return o.dataItem;
        }).filter(function (o) {
          return !_this5.dataSource.isSameItem(o, item);
        });
        dataItems = this._params.translate(dataItems);
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
}(_Control3.Control);

exports.GridView = GridView;
GridView.emptyRowClassName = 'empty';
GridView.dataRowClassName = 'data';
GridView.pagingBarClassName = 'pagingBar'; // }
//# sourceMappingURL=GridView.js.map


/***/ }),

/***/ "./out-es5/NumberPagingBar.js":
/*!************************************!*\
  !*** ./out-es5/NumberPagingBar.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberPagingBar = exports.DataSourcePagingBar = exports.PagingBar = exports.PagerPosition = void 0;

var _Errors = __webpack_require__(/*! ./Errors */ "./out-es5/Errors.js");

var _DataSource = __webpack_require__(/*! ./DataSource */ "./out-es5/DataSource.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// namespace wuzhui {
var PagerPosition;
exports.PagerPosition = PagerPosition;

(function (PagerPosition) {
  PagerPosition[PagerPosition["Bottom"] = 0] = "Bottom";
  PagerPosition[PagerPosition["Top"] = 1] = "Top";
  PagerPosition[PagerPosition["TopAndBottom"] = 2] = "TopAndBottom";
})(PagerPosition || (exports.PagerPosition = PagerPosition = {}));

;

var PagingBar =
/*#__PURE__*/
function () {
  function PagingBar() {
    _classCallCheck(this, PagingBar);
  }

  _createClass(PagingBar, [{
    key: "init",
    value: function init(dataSource, selectArguments) {
      var _this = this;

      // if (dataSource == null)
      //     throw Errors.argumentNull('dataSource');
      this._pageIndex = 0;
      this._selectArguments = selectArguments || new _DataSource.DataSourceSelectArguments();
      var pagingBar = this;
      pagingBar.totalRowCount = 1000000;

      if (dataSource) {
        dataSource.selected.add(function (source, args) {
          pagingBar.pageSize = _this._selectArguments.maximumRows;
          var totalRowCount = args.totalRowCount;

          if (totalRowCount != null && totalRowCount >= 0) {
            pagingBar.totalRowCount = totalRowCount;
          }

          var startRowIndex = _this._selectArguments.startRowIndex;
          if (startRowIndex == null || startRowIndex <= 0) startRowIndex = 0;
          pagingBar.pageIndex = Math.floor(startRowIndex / pagingBar.pageSize);
          pagingBar.render();
        });
        dataSource.deleted.add(function () {
          pagingBar.totalRowCount = pagingBar.totalRowCount - 1;
          pagingBar.render();
        });
        dataSource.inserted.add(function () {
          pagingBar.totalRowCount = pagingBar.totalRowCount + 1;
          pagingBar.render();
        });
      }
    }
  }, {
    key: "render",
    // Virtual Method
    value: function render() {
      throw _Errors.Errors.notImplemented('The table-row render method is not implemented.');
    }
  }, {
    key: "selectArguments",
    get: function get() {
      return this._selectArguments;
    }
  }, {
    key: "pageCount",
    get: function get() {
      var pageCount = Math.ceil(this.totalRowCount / this.pageSize);
      return pageCount;
    }
  }, {
    key: "pageSize",
    get: function get() {
      return this._pageSize;
    },
    set: function set(value) {
      this._pageSize = value;
    }
  }, {
    key: "pageIndex",
    get: function get() {
      return this._pageIndex;
    },
    set: function set(value) {
      this._pageIndex = value;
    }
  }, {
    key: "totalRowCount",
    get: function get() {
      return this._totalRowCount;
    },
    set: function set(value) {
      this._totalRowCount = value;
    }
  }]);

  return PagingBar;
}();

exports.PagingBar = PagingBar;

var DataSourcePagingBar =
/*#__PURE__*/
function (_PagingBar) {
  _inherits(DataSourcePagingBar, _PagingBar);

  function DataSourcePagingBar(params) {
    var _this2;

    _classCallCheck(this, DataSourcePagingBar);

    if (!params.dataSource) throw _Errors.Errors.argumentNull('dataSource');
    if (!params.element) throw _Errors.Errors.argumentNull('element');
    var pagerSettings = Object.assign({
      pageButtonCount: 10,
      firstPageText: '<<',
      lastPageText: '>>',
      nextPageText: '...',
      previousPageText: '...',
      showTotal: true
    }, params.pagerSettings || {});
    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(DataSourcePagingBar).call(this));
    _this2.dataSource = params.dataSource;
    _this2.pagerSettings = pagerSettings;
    _this2.element = params.element;
    _this2.numberButtons = new Array();
    _this2.createButton = _this2.createPagingButton;
    _this2.createLabel = _this2.createTotalLabel;
    var buttonContainer = pagerSettings.buttonContainerWraper ? document.createElement(pagerSettings.buttonContainerWraper) : document.createElement('div');
    buttonContainer.className = pagerSettings.buttonContainerClassName || "buttons";

    _this2.element.appendChild(buttonContainer);

    _this2.createPreviousButtons(buttonContainer);

    _this2.createNumberButtons(buttonContainer);

    _this2.createNextButtons(buttonContainer);

    if (_this2.pagerSettings.showTotal) {
      _this2.totalElement = _this2.createLabel();
      _this2.totalElement.visible = false;
    }

    _this2.init(params.dataSource, params.selectArguments);

    return _this2;
  }

  _createClass(DataSourcePagingBar, [{
    key: "createPagingButton",
    value: function createPagingButton(container) {
      var _this3 = this;

      var pagerSettings = this.pagerSettings;
      var button = document.createElement('a');
      button.href = 'javascript:';

      if (this.pagerSettings.buttonWrapper) {
        var w = document.createElement(this.pagerSettings.buttonWrapper);
        w.appendChild(button);
        container.appendChild(w);
      } else {
        container.appendChild(button);
      }

      var result = {
        _button: button,

        get visible() {
          var button = this._button;
          return button.style.display != 'none';
        },

        set visible(value) {
          var button = this._button;
          var element = pagerSettings.buttonWrapper ? button.parentElement : button;

          if (value) {
            element.style.removeProperty('display');
          } else {
            element.style.display = 'none';
          }
        },

        get pageIndex() {
          var button = this._button;
          return new Number(button.getAttribute('pageIndex')).valueOf();
        },

        set pageIndex(value) {
          var button = this._button;
          button.setAttribute('pageIndex', value);
        },

        get text() {
          var button = this._button;
          return button.innerHTML;
        },

        set text(value) {
          var button = this._button;
          button.innerHTML = value;
        },

        get active() {
          var button = this._button;
          return button.href != null;
        },

        set active(value) {
          var button = this._button;

          if (value == true) {
            button.removeAttribute('href');

            if (pagerSettings.activeButtonClassName) {
              // button.className = pagerSettings.activeButtonClassName;
              this.setClassName(pagerSettings.activeButtonClassName);
            }

            return;
          }

          button.href = 'javascript:';
          if (pagerSettings.buttonClassName) this.setClassName(pagerSettings.buttonClassName);else this.setClassName(null);
        },

        setClassName: function setClassName(value) {
          var button = this._button;
          var element = pagerSettings.buttonWrapper ? button.parentElement : button;
          if (value) element.className = value;else element.removeAttribute('class');
        },
        onclick: null
      };

      button.onclick = function () {
        if (result.onclick) {
          result.onclick(result, _this3);
        }
      };

      return result;
    }
  }, {
    key: "createTotalLabel",
    value: function createTotalLabel() {
      var totalElement = document.createElement('div');
      totalElement.className = 'total';
      var textElement = document.createElement('span');
      textElement.className = 'text';
      textElement.innerHTML = '总记录：';
      totalElement.appendChild(textElement);
      var numberElement = document.createElement('span');
      numberElement.className = 'number';
      totalElement.appendChild(numberElement);
      this.element.appendChild(totalElement);
      return {
        get text() {
          return numberElement.innerHTML;
        },

        set text(value) {
          numberElement.innerHTML = value;
        },

        get visible() {
          var display = totalElement.style.display;
          return display != 'none';
        },

        set visible(value) {
          if (value == true) totalElement.style.display = 'block';else totalElement.style.display = 'node';
        }

      };
    }
  }, {
    key: "createPreviousButtons",
    value: function createPreviousButtons(buttonContainer) {
      this.firstPageButton = this.createButton(buttonContainer);
      this.firstPageButton.onclick = DataSourcePagingBar.on_buttonClick;
      this.firstPageButton.text = this.pagerSettings.firstPageText;
      this.firstPageButton.visible = false;
      this.previousPageButton = this.createButton(buttonContainer);
      this.previousPageButton.onclick = DataSourcePagingBar.on_buttonClick;
      this.previousPageButton.text = this.pagerSettings.previousPageText;
      this.previousPageButton.visible = false;
    }
  }, {
    key: "createNextButtons",
    value: function createNextButtons(buttonContainer) {
      this.nextPageButton = this.createButton(buttonContainer);
      this.nextPageButton.onclick = DataSourcePagingBar.on_buttonClick;
      this.nextPageButton.text = this.pagerSettings.nextPageText;
      this.nextPageButton.visible = false;
      this.lastPageButton = this.createButton(buttonContainer);
      this.lastPageButton.onclick = DataSourcePagingBar.on_buttonClick;
      this.lastPageButton.text = this.pagerSettings.lastPageText;
      this.lastPageButton.visible = false;
    }
  }, {
    key: "createNumberButtons",
    value: function createNumberButtons(buttonContainer) {
      var pagingBar = this;
      var buttonCount = this.pagerSettings.pageButtonCount;

      for (var i = 0; i < buttonCount; i++) {
        var button = this.createButton(buttonContainer);
        button.onclick = DataSourcePagingBar.on_buttonClick;
        this.numberButtons[i] = button;
      }

      this.numberButtons.forEach(function (btn) {
        btn.onclick = function () {
          return DataSourcePagingBar.on_buttonClick(btn, pagingBar);
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var pagerSettings = this.pagerSettings;
      var buttonCount = pagerSettings.pageButtonCount;
      var pagingBarIndex = Math.floor(this.pageIndex / buttonCount);
      var pagingBarCount = Math.ceil(this.pageCount / buttonCount);
      this.previousPageButton.pageIndex = (pagingBarIndex - 1) * buttonCount;
      this.nextPageButton.pageIndex = (pagingBarIndex + 1) * buttonCount;
      this.firstPageButton.pageIndex = 0;
      this.lastPageButton.pageIndex = this.pageCount - 1;

      for (var i = 0; i < this.numberButtons.length; i++) {
        var pageIndex = pagingBarIndex * buttonCount + i;

        if (pageIndex < this.pageCount) {
          this.numberButtons[i].pageIndex = pageIndex;
          this.numberButtons[i].text = (pagingBarIndex * buttonCount + i + 1).toString();
          this.numberButtons[i].visible = true;
          this.numberButtons[i].active = pageIndex == this.pageIndex;
        } else {
          this.numberButtons[i].visible = false;
        }
      }

      if (this.totalElement) {
        this.totalElement.text = this.totalRowCount;
        this.totalElement.visible = true;
      }

      this.firstPageButton.visible = false;
      this.previousPageButton.visible = false;
      this.lastPageButton.visible = false;
      this.nextPageButton.visible = false;

      if (pagingBarIndex > 0) {
        this.firstPageButton.visible = true;
        this.previousPageButton.visible = true;
      }

      if (pagingBarIndex < pagingBarCount - 1) {
        this.lastPageButton.visible = true;
        this.nextPageButton.visible = true;
      }
    }
  }], [{
    key: "on_buttonClick",
    value: function on_buttonClick(button, pagingBar) {
      var pageIndex = button.pageIndex;

      if (!pageIndex == null) {
        return;
      }

      var args = pagingBar.selectArguments;
      args.maximumRows = pagingBar.pageSize;
      args.startRowIndex = pageIndex * pagingBar.pageSize;
      pagingBar.pageIndex = pageIndex;
      pagingBar.dataSource.select(pagingBar.selectArguments);
    }
  }]);

  return DataSourcePagingBar;
}(PagingBar);

exports.DataSourcePagingBar = DataSourcePagingBar;

var NumberPagingBar =
/*#__PURE__*/
function (_PagingBar2) {
  _inherits(NumberPagingBar, _PagingBar2);

  function NumberPagingBar(params) {
    var _this4;

    _classCallCheck(this, NumberPagingBar);

    if (!params.loadData) throw _Errors.Errors.argumentNull('loadData');
    if (!params.element) throw _Errors.Errors.argumentNull('element');
    var pagerSettings = Object.assign({
      pageButtonCount: 10,
      firstPageText: '<<',
      lastPageText: '>>',
      nextPageText: '...',
      previousPageText: '...',
      showTotal: true
    }, params.pagerSettings || {});
    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(NumberPagingBar).call(this));
    _this4.loadData = params.loadData;
    _this4.pagerSettings = pagerSettings;
    _this4.element = params.element;
    _this4.numberButtons = new Array();
    _this4.createButton = _this4.createPagingButton;
    _this4.createLabel = _this4.createTotalLabel;
    var buttonContainer = pagerSettings.buttonContainerWraper ? document.createElement(pagerSettings.buttonContainerWraper) : document.createElement('div');
    buttonContainer.className = pagerSettings.buttonContainerClassName || "buttons";

    _this4.element.appendChild(buttonContainer);

    _this4.createPreviousButtons(buttonContainer);

    _this4.createNumberButtons(buttonContainer);

    _this4.createNextButtons(buttonContainer);

    if (_this4.pagerSettings.showTotal) {
      _this4.totalElement = _this4.createLabel();
      _this4.totalElement.visible = false;
    }

    _this4.init(null, params.selectArguments);

    return _this4;
  }

  _createClass(NumberPagingBar, [{
    key: "createPagingButton",
    value: function createPagingButton(container) {
      var _this5 = this;

      var pagerSettings = this.pagerSettings;
      var button = document.createElement('a');
      button.href = 'javascript:';

      if (this.pagerSettings.buttonWrapper) {
        var w = document.createElement(this.pagerSettings.buttonWrapper);
        w.appendChild(button);
        container.appendChild(w);
      } else {
        container.appendChild(button);
      }

      var result = {
        _button: button,

        get visible() {
          var button = this._button;
          return button.style.display != 'none';
        },

        set visible(value) {
          var button = this._button;
          var element = pagerSettings.buttonWrapper ? button.parentElement : button;

          if (value) {
            element.style.removeProperty('display');
          } else {
            element.style.display = 'none';
          }
        },

        get pageIndex() {
          var button = this._button;
          return new Number(button.getAttribute('pageIndex')).valueOf();
        },

        set pageIndex(value) {
          var button = this._button;
          button.setAttribute('pageIndex', value);
        },

        get text() {
          var button = this._button;
          return button.innerHTML;
        },

        set text(value) {
          var button = this._button;
          button.innerHTML = value;
        },

        get active() {
          var button = this._button;
          return button.href != null;
        },

        set active(value) {
          var button = this._button;

          if (value == true) {
            button.removeAttribute('href');

            if (pagerSettings.activeButtonClassName) {
              // button.className = pagerSettings.activeButtonClassName;
              this.setClassName(pagerSettings.activeButtonClassName);
            }

            return;
          }

          button.href = 'javascript:';
          if (pagerSettings.buttonClassName) this.setClassName(pagerSettings.buttonClassName);else this.setClassName(null);
        },

        setClassName: function setClassName(value) {
          var button = this._button;
          var element = pagerSettings.buttonWrapper ? button.parentElement : button;
          if (value) element.className = value;else element.removeAttribute('class');
        },
        onclick: null
      };

      button.onclick = function () {
        if (result.onclick) {
          result.onclick(result, _this5);
        }
      };

      return result;
    }
  }, {
    key: "createTotalLabel",
    value: function createTotalLabel() {
      var totalElement = document.createElement('div');
      totalElement.className = 'total';
      var textElement = document.createElement('span');
      textElement.className = 'text';
      textElement.innerHTML = '总记录：';
      totalElement.appendChild(textElement);
      var numberElement = document.createElement('span');
      numberElement.className = 'number';
      totalElement.appendChild(numberElement);
      this.element.appendChild(totalElement);
      return {
        get text() {
          return numberElement.innerHTML;
        },

        set text(value) {
          numberElement.innerHTML = value;
        },

        get visible() {
          var display = totalElement.style.display;
          return display != 'none';
        },

        set visible(value) {
          if (value == true) totalElement.style.display = 'block';else totalElement.style.display = 'node';
        }

      };
    }
  }, {
    key: "createPreviousButtons",
    value: function createPreviousButtons(buttonContainer) {
      this.firstPageButton = this.createButton(buttonContainer);
      this.firstPageButton.onclick = NumberPagingBar.on_buttonClick;
      this.firstPageButton.text = this.pagerSettings.firstPageText;
      this.firstPageButton.visible = false;
      this.previousPageButton = this.createButton(buttonContainer);
      this.previousPageButton.onclick = NumberPagingBar.on_buttonClick;
      this.previousPageButton.text = this.pagerSettings.previousPageText;
      this.previousPageButton.visible = false;
    }
  }, {
    key: "createNextButtons",
    value: function createNextButtons(buttonContainer) {
      this.nextPageButton = this.createButton(buttonContainer);
      this.nextPageButton.onclick = NumberPagingBar.on_buttonClick;
      this.nextPageButton.text = this.pagerSettings.nextPageText;
      this.nextPageButton.visible = false;
      this.lastPageButton = this.createButton(buttonContainer);
      this.lastPageButton.onclick = NumberPagingBar.on_buttonClick;
      this.lastPageButton.text = this.pagerSettings.lastPageText;
      this.lastPageButton.visible = false;
    }
  }, {
    key: "createNumberButtons",
    value: function createNumberButtons(buttonContainer) {
      var pagingBar = this;
      var buttonCount = this.pagerSettings.pageButtonCount;

      for (var i = 0; i < buttonCount; i++) {
        var button = this.createButton(buttonContainer);
        button.onclick = NumberPagingBar.on_buttonClick;
        this.numberButtons[i] = button;
      }

      this.numberButtons.forEach(function (btn) {
        btn.onclick = function () {
          return NumberPagingBar.on_buttonClick(btn, pagingBar);
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var pagerSettings = this.pagerSettings;
      var buttonCount = pagerSettings.pageButtonCount;
      var pagingBarIndex = Math.floor(this.pageIndex / buttonCount);
      var pagingBarCount = Math.ceil(this.pageCount / buttonCount);
      this.previousPageButton.pageIndex = (pagingBarIndex - 1) * buttonCount;
      this.nextPageButton.pageIndex = (pagingBarIndex + 1) * buttonCount;
      this.firstPageButton.pageIndex = 0;
      this.lastPageButton.pageIndex = this.pageCount - 1;

      for (var i = 0; i < this.numberButtons.length; i++) {
        var pageIndex = pagingBarIndex * buttonCount + i;

        if (pageIndex < this.pageCount) {
          this.numberButtons[i].pageIndex = pageIndex;
          this.numberButtons[i].text = (pagingBarIndex * buttonCount + i + 1).toString();
          this.numberButtons[i].visible = true;
          this.numberButtons[i].active = pageIndex == this.pageIndex;
        } else {
          this.numberButtons[i].visible = false;
        }
      }

      if (this.totalElement) {
        this.totalElement.text = this.totalRowCount;
        this.totalElement.visible = true;
      }

      this.firstPageButton.visible = false;
      this.previousPageButton.visible = false;
      this.lastPageButton.visible = false;
      this.nextPageButton.visible = false;

      if (pagingBarIndex > 0) {
        this.firstPageButton.visible = true;
        this.previousPageButton.visible = true;
      }

      if (pagingBarIndex < pagingBarCount - 1) {
        this.lastPageButton.visible = true;
        this.nextPageButton.visible = true;
      }
    }
  }], [{
    key: "on_buttonClick",
    value: function on_buttonClick(button, pagingBar) {
      var pageIndex = button.pageIndex;

      if (!pageIndex == null) {
        return;
      }

      var args = pagingBar.selectArguments;
      args.maximumRows = pagingBar.pageSize;
      args.startRowIndex = pageIndex * pagingBar.pageSize;
      pagingBar.pageIndex = pageIndex; //pagingBar.dataSource.select(pagingBar.selectArguments);

      pagingBar.loadData(pageIndex);
    }
  }]);

  return NumberPagingBar;
}(PagingBar); // }


exports.NumberPagingBar = NumberPagingBar;
//# sourceMappingURL=NumberPagingBar.js.map


/***/ }),

/***/ "./out-es5/TextBox.js":
/*!****************************!*\
  !*** ./out-es5/TextBox.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextBox = void 0;

var _Control2 = __webpack_require__(/*! ./Control */ "./out-es5/Control.js");

var _Errors = __webpack_require__(/*! ./Errors */ "./out-es5/Errors.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TextBox =
/*#__PURE__*/
function (_Control) {
  _inherits(TextBox, _Control);

  function TextBox(params) {
    var _this;

    _classCallCheck(this, TextBox);

    if (params == null) throw _Errors.Errors.argumentNull("params");
    if (!params.element) throw _Errors.Errors.argumentFieldNull("params", "element");
    if (!params.dataField) throw _Errors.Errors.argumentFieldNull("params", "dataField");
    if (!params.dataItem) throw _Errors.Errors.argumentFieldNull("params", "dataItem");
    if (!params.valueType) throw _Errors.Errors.argumentFieldNull("params", "valuetype");
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
}(_Control2.Control);

exports.TextBox = TextBox;
//# sourceMappingURL=TextBox.js.map


/***/ }),

/***/ "./out-es5/Utility.js":
/*!****************************!*\
  !*** ./out-es5/Utility.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyStyle = applyStyle;
exports.callbacks = callbacks;
exports.callbacks1 = callbacks1;
exports.fireCallback = fireCallback;
exports.Callback = exports.ElementHelper = void 0;

var _Errors = __webpack_require__(/*! ./Errors */ "./out-es5/Errors.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ElementHelper =
/*#__PURE__*/
function () {
  function ElementHelper() {
    _classCallCheck(this, ElementHelper);
  }

  _createClass(ElementHelper, null, [{
    key: "showElement",
    value: function showElement(element) {
      if (!element) throw _Errors.Errors.argumentNull('element');
      element.style.removeProperty('display');
    }
  }, {
    key: "hideElement",
    value: function hideElement(element) {
      if (!element) throw _Errors.Errors.argumentNull('element');
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
      if (element == null) throw _Errors.Errors.argumentNull("element");
      if (!tagName) throw _Errors.Errors.argumentNull('tagName');
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

function callbacks1() {
  return new Callback();
}

function fireCallback(callback) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  callback.fire.apply(callback, args);
} // }
//# sourceMappingURL=Utility.js.map


/***/ }),

/***/ "./out-es5/fields/BoundField.js":
/*!**************************************!*\
  !*** ./out-es5/fields/BoundField.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoundField = void 0;

var _DataControlField2 = __webpack_require__(/*! ./DataControlField */ "./out-es5/fields/DataControlField.js");

var _GridViewEditableCell = __webpack_require__(/*! ./GridViewEditableCell */ "./out-es5/fields/GridViewEditableCell.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BoundField =
/*#__PURE__*/
function (_DataControlField) {
  _inherits(BoundField, _DataControlField);

  function BoundField() {
    _classCallCheck(this, BoundField);

    return _possibleConstructorReturn(this, _getPrototypeOf(BoundField).apply(this, arguments));
  }

  _createClass(BoundField, [{
    key: "createItemCell",
    value: function createItemCell(dataItem) {
      var cell = new _GridViewEditableCell.GridViewEditableCell(this, dataItem);
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
}(_DataControlField2.DataControlField);

exports.BoundField = BoundField;
//# sourceMappingURL=BoundField.js.map


/***/ }),

/***/ "./out-es5/fields/CommandField.js":
/*!****************************************!*\
  !*** ./out-es5/fields/CommandField.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommandField = void 0;

var _DataControlField2 = __webpack_require__(/*! ./DataControlField */ "./out-es5/fields/DataControlField.js");

var _Control = __webpack_require__(/*! ../Control */ "./out-es5/Control.js");

var _GridViewEditableCell = __webpack_require__(/*! ./GridViewEditableCell */ "./out-es5/fields/GridViewEditableCell.js");

var _Utility = __webpack_require__(/*! ../Utility */ "./out-es5/Utility.js");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GridViewCommandCell =
/*#__PURE__*/
function (_GridViewCell) {
  _inherits(GridViewCommandCell, _GridViewCell);

  function GridViewCommandCell(field) {
    _classCallCheck(this, GridViewCommandCell);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridViewCommandCell).call(this));
  }

  return GridViewCommandCell;
}(_DataControlField2.GridViewCell);

var CommandField =
/*#__PURE__*/
function (_DataControlField) {
  _inherits(CommandField, _DataControlField);

  function CommandField(params) {
    var _this;

    _classCallCheck(this, CommandField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CommandField).call(this, params));
    if (!_this.params.cancelButtonHTML) _this.params.cancelButtonHTML = '取消';
    if (!_this.params.deleteButtonHTML) _this.params.deleteButtonHTML = '删除';
    if (!_this.params.editButtonHTML) _this.params.editButtonHTML = '编辑';
    if (!_this.params.updateButtonHTML) _this.params.updateButtonHTML = '更新';
    if (!_this.params.newButtonHTML) _this.params.newButtonHTML = '新增';
    if (!_this.params.insertButtonHTML) _this.params.insertButtonHTML = '添加';
    return _this;
  } // private params(): CommandFieldParams {
  //     return this.params;
  // }


  _createClass(CommandField, [{
    key: "createItemCell",
    value: function createItemCell(dataItem) {
      var _this2 = this;

      var cell = new GridViewCommandCell(this);
      cell.style(this.itemStyle);

      if (this.params.showEditButton) {
        var editButton = this.createEditButton();
        editButton.style.marginRight = '4px';
        if (this.editButtonClass) editButton.className = this.editButtonClass;
        cell.editButton = editButton;
        editButton.addEventListener('click', function (e) {
          return _this2.on_editButtonClick(e);
        });
        cell.appendChild(editButton);
        var updateButton = this.createUpdateButton();
        updateButton.style.display = 'none';
        updateButton.style.marginRight = '4px';
        if (this.updateButtonClass) updateButton.className = this.updateButtonClass;
        cell.updateButton = updateButton;
        updateButton.addEventListener('click', function (e) {
          return _this2.on_insertOrUpdateButtonClick(e);
        });
        cell.appendChild(updateButton);
        var cancelButton = this.createCancelButton();
        cancelButton.style.display = 'none';
        cancelButton.style.marginRight = '4px';
        if (this.cancelButtonClass) cancelButton.className = this.cancelButtonClass;
        cell.cacelButton = cancelButton;
        cancelButton.addEventListener('click', function (e) {
          return _this2.on_cancelButtonClick(e);
        });
        cell.appendChild(cancelButton);
      }

      if (this.params.showDeleteButton) {
        var deleteButton = this.createDeleteButton();
        deleteButton.style.marginRight = '4px';
        if (this.deleteButtonClass) deleteButton.className = this.deleteButtonClass;
        cell.deleteButton = deleteButton;

        deleteButton.onclick = function (e) {
          return _this2.on_deleteButtonClick(e);
        };

        cell.appendChild(deleteButton);
      }

      if (this.params.showNewButton) {
        var newButton = this.createNewButton();
        newButton.style.marginRight = '4px';
        if (this.newButtonClass) newButton.className = this.newButtonClass;

        newButton.onclick = function (e) {
          return _this2.on_newButtonClick(e);
        };

        cell.newButton = newButton;
        cell.appendChild(newButton);
        var insertButton = this.createInsertButton();
        insertButton.style.display = 'none';
        insertButton.style.marginRight = '4px';
        insertButton.addEventListener('click', function (e) {
          return _this2.on_insertOrUpdateButtonClick(e);
        });
        if (this.insertButtonClass) insertButton.className = this.updateButtonClass;
        cell.insertButton = insertButton;
        cell.appendChild(insertButton);

        var _cancelButton = this.createCancelButton();

        _cancelButton.style.display = 'none';
        _cancelButton.style.marginRight = '4px';

        _cancelButton.addEventListener('click', function (e) {
          return _this2.on_cancelButtonClick(e);
        });

        if (this.cancelButtonClass) _cancelButton.className = this.cancelButtonClass;
        cell.cacelButton = _cancelButton;
        cell.appendChild(_cancelButton);
      }

      return cell;
    }
  }, {
    key: "showReadStatusButtons",
    value: function showReadStatusButtons(cell) {
      if (cell.newButton) {
        this.showButton(cell.newButton);
        this.hideButton(cell.insertButton);
      }

      if (cell.editButton) {
        this.showButton(cell.editButton);
        this.hideButton(cell.updateButton);
      }

      if (cell.deleteButton) this.showButton(cell.deleteButton);
      this.hideButton(cell.cacelButton);
    }
  }, {
    key: "createEditButton",
    value: function createEditButton() {
      var button = document.createElement('a');
      button.innerHTML = this.editButtonHTML;
      button.href = 'javascript:';
      return button;
    }
  }, {
    key: "createDeleteButton",
    value: function createDeleteButton() {
      var button = document.createElement('a');
      button.innerHTML = this.deleteButtonHTML;
      button.href = 'javascript:';
      return button;
    }
  }, {
    key: "createInsertButton",
    value: function createInsertButton() {
      var button = document.createElement('a');
      button.innerHTML = this.insertButtonHTML;
      button.href = 'javascript:';
      return button;
    }
  }, {
    key: "createUpdateButton",
    value: function createUpdateButton() {
      var button = document.createElement('a');
      button.innerHTML = this.updateButtonHTML;
      button.href = 'javascript:';
      return button;
    }
  }, {
    key: "createCancelButton",
    value: function createCancelButton() {
      var button = document.createElement('a');
      button.innerHTML = this.cancelButtonHTML;
      button.href = 'javascript:';
      return button;
    }
  }, {
    key: "createNewButton",
    value: function createNewButton() {
      var button = document.createElement('a');
      button.innerHTML = this.newButtonHTML;
      button.href = 'javascript:';
      return button;
    }
  }, {
    key: "hideButton",
    value: function hideButton(button) {
      button.style.display = 'none';
    }
  }, {
    key: "showButton",
    value: function showButton(button) {
      button.style.removeProperty('display');
    }
  }, {
    key: "findParentCell",
    value: function findParentCell(element) {
      var cellElement;
      var p = element.parentElement;

      while (p) {
        if (p.tagName == 'TD') {
          cellElement = p;
          break;
        }

        p = p.parentElement;
      }

      return cellElement;
    }
  }, {
    key: "on_editButtonClick",
    value: function on_editButtonClick(e) {
      var cellElement = this.findParentCell(e.target);
      console.assert(cellElement != null);
      var rowElement = cellElement.parentElement;

      for (var i = 0; i < rowElement.cells.length; i++) {
        var _cell = _Control.Control.getControlByElement(rowElement.cells[i]);

        if (_cell instanceof _GridViewEditableCell.GridViewEditableCell) {
          _cell.beginEdit();
        }
      }

      var cell = _Control.Control.getControlByElement(cellElement);

      this.showButton(cell.cacelButton);
      this.showButton(cell.updateButton);
      this.hideButton(cell.editButton);
      if (cell.deleteButton) this.hideButton(cell.deleteButton);
      if (cell.newButton) this.hideButton(cell.newButton);
    }
  }, {
    key: "on_cancelButtonClick",
    value: function on_cancelButtonClick(e) {
      var cellElement = this.findParentCell(e.target);
      console.assert(cellElement != null);
      var rowElement = cellElement.parentElement;

      var row = _Control.Control.getControlByElement(rowElement);

      if (row["isNew"] == true) {
        rowElement.remove();
        return;
      }

      for (var i = 0; i < rowElement.cells.length; i++) {
        var _cell2 = _Control.Control.getControlByElement(rowElement.cells[i]);

        if (_cell2 instanceof _GridViewEditableCell.GridViewEditableCell) {
          _cell2.cancelEdit();
        }
      }

      var cell = _Control.Control.getControlByElement(cellElement);

      this.hideButton(cell.cacelButton);
      this.hideButton(cell.updateButton);
      this.showButton(cell.editButton);
      if (cell.deleteButton) this.showButton(cell.deleteButton);
      if (cell.newButton) this.showButton(cell.newButton);
    }
  }, {
    key: "on_insertOrUpdateButtonClick",
    value: function on_insertOrUpdateButtonClick(e) {
      var _this3 = this;

      if (e.target['_updating']) e.target['_updating'] = true;

      var cellElement = _Utility.ElementHelper.findFirstParentByTagName(e.target, 'td');

      var rowElement = cellElement.parentElement;

      var cell = _Control.Control.getControlByElement(cellElement);

      var row = _Control.Control.getControlByElement(rowElement); //==========================================================
      // 复制 dataItem 副本


      var dataItem = Object.assign({}, row.dataItem || {}); //==========================================================

      var dataSource = row.gridView.dataSource;
      var editableCells = new Array();

      for (var i = 0; i < rowElement.cells.length; i++) {
        var _cell3 = _Control.Control.getControlByElement(rowElement.cells[i]);

        if (_cell3 instanceof _GridViewEditableCell.GridViewEditableCell && _cell3.mode == 'edit') {
          dataItem[_cell3.field.dataField] = _cell3.controlValue;
          editableCells.push(_cell3);
        }
      }

      var isInsert = e.target == cell.insertButton;
      var p = isInsert ? dataSource.insert(dataItem, rowElement.rowIndex) : dataSource.update(dataItem);
      return p.then(function () {
        if (isInsert) {
          rowElement.remove();
          return;
        }

        editableCells.forEach(function (item) {
          return item.endEdit();
        });

        var cell = _Control.Control.getControlByElement(cellElement);

        _this3.showReadStatusButtons(cell);

        e.target['_updating'] = false;
      }).catch(function () {
        return e.target['_updating'] = false;
      });
    }
  }, {
    key: "on_deleteButtonClick",
    value: function on_deleteButtonClick(e) {
      var rowElement = _Utility.ElementHelper.findFirstParentByTagName(e.target, "tr");

      var row = _Control.Control.getControlByElement(rowElement);

      var dataSource = row.gridView.dataSource;
      dataSource.delete(row.dataItem).then(function () {
        rowElement.remove();
      });
    }
  }, {
    key: "on_newButtonClick",
    value: function on_newButtonClick(e) {
      var _this4 = this;

      var rowElement = _Utility.ElementHelper.findFirstParentByTagName(e.target, "tr"); //cellElement.parentElement as HTMLTableRowElement;


      var row = _Control.Control.getControlByElement(rowElement);

      var gridView = row.gridView;
      var newRow = gridView.appendDataRow({}, rowElement.rowIndex);
      newRow["isNew"] = true;
      var commandCells = newRow.cells.filter(function (o) {
        return o instanceof GridViewCommandCell;
      });
      newRow.cells.filter(function (o) {
        return o instanceof _GridViewEditableCell.GridViewEditableCell;
      }).forEach(function (c) {
        return c.beginEdit();
      });
      commandCells.forEach(function (cell) {
        if (cell.deleteButton) _this4.hideButton(cell.deleteButton);
        if (cell.editButton) _this4.hideButton(cell.editButton);

        _this4.hideButton(cell.newButton);

        _this4.showButton(cell.insertButton);

        _this4.showButton(cell.cacelButton);
      });
    }
  }, {
    key: "cancelButtonHTML",
    get: function get() {
      return this.params.cancelButtonHTML;
    }
  }, {
    key: "deleteButtonHTML",
    get: function get() {
      return this.params.deleteButtonHTML;
    }
  }, {
    key: "editButtonHTML",
    get: function get() {
      return this.params.editButtonHTML;
    }
  }, {
    key: "updateButtonHTML",
    get: function get() {
      return this.params.updateButtonHTML;
    }
  }, {
    key: "newButtonHTML",
    get: function get() {
      return this.params.newButtonHTML;
    }
  }, {
    key: "insertButtonHTML",
    get: function get() {
      return this.params.insertButtonHTML;
    }
  }, {
    key: "cancelButtonClass",
    get: function get() {
      return this.params.cancelButtonClass;
    }
  }, {
    key: "deleteButtonClass",
    get: function get() {
      return this.params.deleteButtonClass;
    }
  }, {
    key: "editButtonClass",
    get: function get() {
      return this.params.editButtonClass;
    }
  }, {
    key: "newButtonClass",
    get: function get() {
      return this.params.newButtonClass;
    }
  }, {
    key: "updateButtonClass",
    get: function get() {
      return this.params.updateButtonClass;
    }
  }, {
    key: "insertButtonClass",
    get: function get() {
      return this.params.insertButtonClass;
    }
  }]);

  return CommandField;
}(_DataControlField2.DataControlField);

exports.CommandField = CommandField;
//# sourceMappingURL=CommandField.js.map


/***/ }),

/***/ "./out-es5/fields/CustomBoundField.js":
/*!********************************************!*\
  !*** ./out-es5/fields/CustomBoundField.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomBoundField = void 0;

var _BoundField2 = __webpack_require__(/*! ./BoundField */ "./out-es5/fields/BoundField.js");

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

var CustomBoundField =
/*#__PURE__*/
function (_BoundField) {
  _inherits(CustomBoundField, _BoundField);

  function CustomBoundField(params) {
    _classCallCheck(this, CustomBoundField);

    return _possibleConstructorReturn(this, _getPrototypeOf(CustomBoundField).call(this, params));
  }

  _createClass(CustomBoundField, [{
    key: "createItemCell",
    value: function createItemCell(dataItem) {
      var cell = _get(_getPrototypeOf(CustomBoundField.prototype), "createItemCell", this).call(this, dataItem);

      var cellRender = cell.render;

      cell.render = function (dataItem) {
        var it = this;
        var params = it.field.params;

        if (it.mode == "read" && params.cellRender != null) {
          params.cellRender.apply(cell, [dataItem, it.element]);
          return;
        }

        cellRender.apply(cell, [dataItem]);
      };

      return cell;
    }
  }]);

  return CustomBoundField;
}(_BoundField2.BoundField);

exports.CustomBoundField = CustomBoundField;
//# sourceMappingURL=CustomBoundField.js.map


/***/ }),

/***/ "./out-es5/fields/CustomField.js":
/*!***************************************!*\
  !*** ./out-es5/fields/CustomField.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomField = void 0;

var _DataControlField2 = __webpack_require__(/*! ./DataControlField */ "./out-es5/fields/DataControlField.js");

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

var CustomField =
/*#__PURE__*/
function (_DataControlField) {
  _inherits(CustomField, _DataControlField);

  function CustomField() {
    _classCallCheck(this, CustomField);

    return _possibleConstructorReturn(this, _getPrototypeOf(CustomField).apply(this, arguments));
  }

  _createClass(CustomField, [{
    key: "createHeaderCell",
    value: function createHeaderCell() {
      if (this.params.createHeaderCell) {
        var cell = this.params.createHeaderCell();
        cell.style(this.headerStyle);
        return cell;
      }

      return _get(_getPrototypeOf(CustomField.prototype), "createHeaderCell", this).call(this);
    }
  }, {
    key: "createFooterCell",
    value: function createFooterCell() {
      if (this.params.createFooterCell) {
        var cell = this.params.createFooterCell();
        cell.style(this.params.footerStyle);
        return cell;
      }

      return _get(_getPrototypeOf(CustomField.prototype), "createFooterCell", this).call(this);
    }
  }, {
    key: "createItemCell",
    value: function createItemCell(dataItem) {
      if (this.params.createItemCell) {
        var cell = this.params.createItemCell.apply(this, [dataItem]);
        cell.style(this.params.itemStyle);
        return cell;
      }

      return _get(_getPrototypeOf(CustomField.prototype), "createItemCell", this).call(this, dataItem);
    }
  }]);

  return CustomField;
}(_DataControlField2.DataControlField);

exports.CustomField = CustomField;
//# sourceMappingURL=CustomField.js.map


/***/ }),

/***/ "./out-es5/fields/DataControlField.js":
/*!********************************************!*\
  !*** ./out-es5/fields/DataControlField.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataControlField = exports.GridViewHeaderCell = exports.GridViewDataCell = exports.GridViewCell = void 0;

var _Control3 = __webpack_require__(/*! ../Control */ "./out-es5/Control.js");

var _Utility = __webpack_require__(/*! ../Utility */ "./out-es5/Utility.js");

var _Errors = __webpack_require__(/*! ../Errors */ "./out-es5/Errors.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GridViewCell =
/*#__PURE__*/
function (_Control) {
  _inherits(GridViewCell, _Control);

  function GridViewCell() {
    _classCallCheck(this, GridViewCell);

    return _possibleConstructorReturn(this, _getPrototypeOf(GridViewCell).call(this, document.createElement('td')));
  }

  return GridViewCell;
}(_Control3.Control);

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
      if (value == null) text = this.nullText;else text = this.formatValue(value, this.dataFormatString);
      this.element.innerHTML = text;
    }
  }, {
    key: "formatValue",
    value: function formatValue(value, format) {
      if (!format) return "".concat(value);
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

        if (typeof value === "undefined" || value === null) {
          value = '';
        }

        if (value instanceof Date) result = result + this.formatDate(value, argFormat);else if (value instanceof Number || typeof value == 'number') result = result + this.formatNumber(value, argFormat);else result = result + value.toString();
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
function (_Control2) {
  _inherits(GridViewHeaderCell, _Control2);

  function GridViewHeaderCell(field) {
    var _this2;

    _classCallCheck(this, GridViewHeaderCell);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(GridViewHeaderCell).call(this, document.createElement('th')));
    _this2.ascHTML = '↑';
    _this2.descHTML = '↓';
    _this2.sortingHTML = '...';
    _this2.toSortHTML = '↕';
    _this2.field = field;
    _this2.sorting = (0, _Utility.callbacks)();
    _this2.sorted = (0, _Utility.callbacks)();

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
      (0, _Utility.fireCallback)(this.sorting, this, {
        sortType: sortType
      });
      selectArguments.sortExpression = this.field.sortExpression + ' ' + sortType;
      return this.field.gridView.dataSource.select(selectArguments).then(function () {
        _this3.sortType = sortType;
        (0, _Utility.fireCallback)(_this3.sorted, _this3, {
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
}(_Control3.Control);

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
      if (!dataItem) throw _Errors.Errors.argumentNull('dataItem');
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
//# sourceMappingURL=DataControlField.js.map


/***/ }),

/***/ "./out-es5/fields/GridViewEditableCell.js":
/*!************************************************!*\
  !*** ./out-es5/fields/GridViewEditableCell.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridViewEditableCell = void 0;

var _DataControlField = __webpack_require__(/*! ./DataControlField */ "./out-es5/fields/DataControlField.js");

var _Errors = __webpack_require__(/*! ../Errors */ "./out-es5/Errors.js");

var _Utility = __webpack_require__(/*! ../Utility */ "./out-es5/Utility.js");

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

var GridViewEditableCell =
/*#__PURE__*/
function (_GridViewDataCell) {
  _inherits(GridViewEditableCell, _GridViewDataCell);

  function GridViewEditableCell(field, dataItem) {
    var _this;

    _classCallCheck(this, GridViewEditableCell);

    if (field == null) throw _Errors.Errors.argumentNull('field');
    if (dataItem == null) throw _Errors.Errors.argumentNull('dataItem');
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
        (0, _Utility.applyStyle)(this.control.element, this._field.controlStyle);
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
}(_DataControlField.GridViewDataCell);

exports.GridViewEditableCell = GridViewEditableCell;
//# sourceMappingURL=GridViewEditableCell.js.map


/***/ }),

/***/ "./out-es5/index.js":
/*!**************************!*\
  !*** ./out-es5/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GridView", {
  enumerable: true,
  get: function get() {
    return _GridView.GridView;
  }
});
Object.defineProperty(exports, "GridViewDataRow", {
  enumerable: true,
  get: function get() {
    return _GridView.GridViewDataRow;
  }
});
Object.defineProperty(exports, "GridViewRowType", {
  enumerable: true,
  get: function get() {
    return _GridView.GridViewRowType;
  }
});
Object.defineProperty(exports, "BoundField", {
  enumerable: true,
  get: function get() {
    return _BoundField.BoundField;
  }
});
Object.defineProperty(exports, "CommandField", {
  enumerable: true,
  get: function get() {
    return _CommandField.CommandField;
  }
});
Object.defineProperty(exports, "CustomField", {
  enumerable: true,
  get: function get() {
    return _CustomField.CustomField;
  }
});
Object.defineProperty(exports, "CustomBoundField", {
  enumerable: true,
  get: function get() {
    return _CustomBoundField.CustomBoundField;
  }
});
Object.defineProperty(exports, "GridViewCell", {
  enumerable: true,
  get: function get() {
    return _DataControlField.GridViewCell;
  }
});
Object.defineProperty(exports, "DataControlField", {
  enumerable: true,
  get: function get() {
    return _DataControlField.DataControlField;
  }
});
Object.defineProperty(exports, "GridViewDataCell", {
  enumerable: true,
  get: function get() {
    return _DataControlField.GridViewDataCell;
  }
});
Object.defineProperty(exports, "GridViewEditableCell", {
  enumerable: true,
  get: function get() {
    return _GridViewEditableCell.GridViewEditableCell;
  }
});
Object.defineProperty(exports, "DropDown", {
  enumerable: true,
  get: function get() {
    return _DropDown.DropDown;
  }
});
Object.defineProperty(exports, "TextBox", {
  enumerable: true,
  get: function get() {
    return _TextBox.TextBox;
  }
});
Object.defineProperty(exports, "DataSource", {
  enumerable: true,
  get: function get() {
    return _DataSource.DataSource;
  }
});
Object.defineProperty(exports, "DataSourceSelectArguments", {
  enumerable: true,
  get: function get() {
    return _DataSource.DataSourceSelectArguments;
  }
});
Object.defineProperty(exports, "ArrayDataSource", {
  enumerable: true,
  get: function get() {
    return _DataSource.ArrayDataSource;
  }
});
Object.defineProperty(exports, "NumberPagingBar", {
  enumerable: true,
  get: function get() {
    return _NumberPagingBar.NumberPagingBar;
  }
});
Object.defineProperty(exports, "DataSourcePagingBar", {
  enumerable: true,
  get: function get() {
    return _NumberPagingBar.DataSourcePagingBar;
  }
});
Object.defineProperty(exports, "Control", {
  enumerable: true,
  get: function get() {
    return _Control.Control;
  }
});

var _GridView = __webpack_require__(/*! ./GridView */ "./out-es5/GridView.js");

var _BoundField = __webpack_require__(/*! ./fields/BoundField */ "./out-es5/fields/BoundField.js");

var _CommandField = __webpack_require__(/*! ./fields/CommandField */ "./out-es5/fields/CommandField.js");

var _CustomField = __webpack_require__(/*! ./fields/CustomField */ "./out-es5/fields/CustomField.js");

var _CustomBoundField = __webpack_require__(/*! ./fields/CustomBoundField */ "./out-es5/fields/CustomBoundField.js");

var _DataControlField = __webpack_require__(/*! ./fields/DataControlField */ "./out-es5/fields/DataControlField.js");

var _GridViewEditableCell = __webpack_require__(/*! ./fields/GridViewEditableCell */ "./out-es5/fields/GridViewEditableCell.js");

var _DropDown = __webpack_require__(/*! ./DropDown */ "./out-es5/DropDown.js");

var _TextBox = __webpack_require__(/*! ./TextBox */ "./out-es5/TextBox.js");

var _DataSource = __webpack_require__(/*! ./DataSource */ "./out-es5/DataSource.js");

var _NumberPagingBar = __webpack_require__(/*! ./NumberPagingBar */ "./out-es5/NumberPagingBar.js");

var _Control = __webpack_require__(/*! ./Control */ "./out-es5/Control.js");
//# sourceMappingURL=index.js.map


/***/ })

/******/ });
});
//# sourceMappingURL=index.es5.js.map