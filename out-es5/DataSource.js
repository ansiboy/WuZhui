"use strict";

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

define(["require", "exports", "./Errors", "./Utility"], function (require, exports, Errors_1, Utility_1) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var DataSource =
  /*#__PURE__*/
  function () {
    function DataSource(args) {
      _classCallCheck(this, DataSource);

      this.inserting = Utility_1.callbacks1();
      this.inserted = Utility_1.callbacks1();
      this.deleting = Utility_1.callbacks();
      this.deleted = Utility_1.callbacks();
      this.updating = Utility_1.callbacks();
      this.updated = Utility_1.callbacks();
      this.selecting = Utility_1.callbacks();
      this.selected = Utility_1.callbacks();
      this.error = Utility_1.callbacks();
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
        return this.args.select(args);
      }
    }, {
      key: "insert",
      value: function insert(item, args, index) {
        var _this = this;

        if (!this.canInsert) throw Errors_1.Errors.dataSourceCanntInsert();
        if (!item) throw Errors_1.Errors.argumentNull("item");

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

        if (!this.canDelete) throw Errors_1.Errors.dataSourceCanntDelete();
        if (!item) throw Errors_1.Errors.argumentNull("item");
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

        if (!this.canUpdate) throw Errors_1.Errors.dataSourceCanntUpdate();
        if (!item) throw Errors_1.Errors.argumentNull("item");
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
        if (theItem == null) throw Errors_1.Errors.argumentNull('theItem');
        if (otherItem == null) throw Errors_1.Errors.argumentNull('otherItem');
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
          if (item[key] == null && this.primaryKeys.indexOf(key) >= 0) throw Errors_1.Errors.primaryKeyNull(key);
        }
      }
    }, {
      key: "select",
      value: function select(args) {
        var _this4 = this;

        args = args || {};
        Utility_1.fireCallback(this.selecting, this, args);
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
            throw Errors_1.Errors.queryResultTypeError();
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
  }(DataSource);

  exports.ArrayDataSource = ArrayDataSource;
}); // }
//# sourceMappingURL=DataSource.js.map
