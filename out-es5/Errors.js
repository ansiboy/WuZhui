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
