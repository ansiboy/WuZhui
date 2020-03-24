"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Errors = void 0;

var _maishuToolkit = require("maishu-toolkit");

// namespace wuzhui {
// export class Errors {
//     static notImplemented(message?: string) {
//         message = message || "Not implemented";
//         return new Error(message);
//     }
//     static argumentNull(paramName) {
//         return new Error("Argument '" + paramName + "' can not be null.");
//     }
//     static controllBelonsAnother() {
//         return new Error("The control is belongs another control.");
//     }
//     static columnsCanntEmpty() {
//         return new Error("Columns cannt empty.");
//     }
//     static dataSourceCanntInsert() {
//         return new Error("DataSource can not insert.");
//     }
//     static dataSourceCanntUpdate() {
//         return new Error("DataSource can not update.");
//     }
//     static dataSourceCanntDelete() {
//         return new Error("DataSource can not delete.");
//     }
//     static primaryKeyNull(key: string) {
//         let msg = `Primary key named '${key}' value is null.`;
//         return new Error(msg);
//     }
//     static queryResultTypeError() {
//         let msg = 'Type of the query result is expected as Array or DataSourceSelectResult.';
//         return new Error(msg);
//     }
//     static argumentFieldNull(argumentName: string, fieldName: string) {
//         let msg = `Argument ${argumentName} ${fieldName} field can not be null or empty.`
//         return new Error(msg);
//     }
// }
// }
var Errors = Object.assign(_maishuToolkit.errors, {
  columnsCanntEmpty: function columnsCanntEmpty() {
    return new Error("Columns cannt empty.");
  },
  notImplemented: function notImplemented(message) {
    message = message || "Not implemented";
    return new Error(message);
  }
});
exports.Errors = Errors;
//# sourceMappingURL=Errors.js.map
