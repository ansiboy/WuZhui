"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/// <reference path="DataControlField.ts"/>
define(["require", "exports", "./DataControlField", "../Control", "./BoundField", "../Utility"], function (require, exports, DataControlField_1, Control_1, BoundField_1, Utility_1) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var GridViewCommandCell =
  /*#__PURE__*/
  function (_DataControlField_1$G) {
    _inherits(GridViewCommandCell, _DataControlField_1$G);

    function GridViewCommandCell(field) {
      _classCallCheck(this, GridViewCommandCell);

      return _possibleConstructorReturn(this, _getPrototypeOf(GridViewCommandCell).call(this));
    }

    return GridViewCommandCell;
  }(DataControlField_1.GridViewCell);

  var CommandField =
  /*#__PURE__*/
  function (_DataControlField_1$D) {
    _inherits(CommandField, _DataControlField_1$D);

    function CommandField(params) {
      var _this;

      _classCallCheck(this, CommandField);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(CommandField).call(this, params));
      if (!_this.params().cancelButtonHTML) _this.params().cancelButtonHTML = '取消';
      if (!_this.params().deleteButtonHTML) _this.params().deleteButtonHTML = '删除';
      if (!_this.params().editButtonHTML) _this.params().editButtonHTML = '编辑';
      if (!_this.params().updateButtonHTML) _this.params().updateButtonHTML = '更新';
      if (!_this.params().newButtonHTML) _this.params().newButtonHTML = '新增';
      if (!_this.params().insertButtonHTML) _this.params().insertButtonHTML = '添加';
      return _this;
    }

    _createClass(CommandField, [{
      key: "params",
      value: function params() {
        return this._params;
      }
    }, {
      key: "createItemCell",
      value: function createItemCell(dataItem) {
        var _this2 = this;

        var cell = new GridViewCommandCell(this);
        cell.style(this.itemStyle);

        if (this.params().showEditButton) {
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

        if (this.params().showDeleteButton) {
          var deleteButton = this.createDeleteButton();
          deleteButton.style.marginRight = '4px';
          if (this.deleteButtonClass) deleteButton.className = this.deleteButtonClass;
          cell.deleteButton = deleteButton;

          deleteButton.onclick = function (e) {
            return _this2.on_deleteButtonClick(e);
          };

          cell.appendChild(deleteButton);
        }

        if (this.params().showNewButton) {
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
          var _cell = Control_1.Control.getControlByElement(rowElement.cells[i]);

          if (_cell instanceof BoundField_1.GridViewEditableCell) {
            _cell.beginEdit();
          }
        }

        var cell = Control_1.Control.getControlByElement(cellElement);
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
        var row = Control_1.Control.getControlByElement(rowElement);

        if (row["isNew"] == true) {
          rowElement.remove();
          return;
        }

        for (var i = 0; i < rowElement.cells.length; i++) {
          var _cell2 = Control_1.Control.getControlByElement(rowElement.cells[i]);

          if (_cell2 instanceof BoundField_1.GridViewEditableCell) {
            _cell2.cancelEdit();
          }
        }

        var cell = Control_1.Control.getControlByElement(cellElement);
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
        var cellElement = Utility_1.ElementHelper.findFirstParentByTagName(e.target, 'td');
        var rowElement = cellElement.parentElement;
        var cell = Control_1.Control.getControlByElement(cellElement);
        var row = Control_1.Control.getControlByElement(rowElement); //==========================================================
        // 复制 dataItem 副本

        var dataItem = Object.assign({}, row.dataItem || {}); //==========================================================

        var dataSource = row.gridView.dataSource;
        var editableCells = new Array();

        for (var i = 0; i < rowElement.cells.length; i++) {
          var _cell3 = Control_1.Control.getControlByElement(rowElement.cells[i]);

          if (_cell3 instanceof BoundField_1.GridViewEditableCell && _cell3.mode == 'edit') {
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
          var cell = Control_1.Control.getControlByElement(cellElement);

          _this3.showReadStatusButtons(cell);

          e.target['_updating'] = false;
        }).catch(function () {
          return e.target['_updating'] = false;
        });
      }
    }, {
      key: "on_deleteButtonClick",
      value: function on_deleteButtonClick(e) {
        var rowElement = Utility_1.ElementHelper.findFirstParentByTagName(e.target, "tr");
        var row = Control_1.Control.getControlByElement(rowElement);
        var dataSource = row.gridView.dataSource;
        dataSource.delete(row.dataItem).then(function () {
          rowElement.remove();
        });
      }
    }, {
      key: "on_newButtonClick",
      value: function on_newButtonClick(e) {
        var _this4 = this;

        var rowElement = Utility_1.ElementHelper.findFirstParentByTagName(e.target, "tr"); //cellElement.parentElement as HTMLTableRowElement;

        var row = Control_1.Control.getControlByElement(rowElement);
        var gridView = row.gridView;
        var newRow = gridView.appendDataRow({}, rowElement.rowIndex);
        newRow["isNew"] = true;
        var commandCells = newRow.cells.filter(function (o) {
          return o instanceof GridViewCommandCell;
        });
        newRow.cells.filter(function (o) {
          return o instanceof BoundField_1.GridViewEditableCell;
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
        return this.params().cancelButtonHTML;
      }
    }, {
      key: "deleteButtonHTML",
      get: function get() {
        return this.params().deleteButtonHTML;
      }
    }, {
      key: "editButtonHTML",
      get: function get() {
        return this.params().editButtonHTML;
      }
    }, {
      key: "updateButtonHTML",
      get: function get() {
        return this.params().updateButtonHTML;
      }
    }, {
      key: "newButtonHTML",
      get: function get() {
        return this.params().newButtonHTML;
      }
    }, {
      key: "insertButtonHTML",
      get: function get() {
        return this.params().insertButtonHTML;
      }
    }, {
      key: "cancelButtonClass",
      get: function get() {
        return this.params().cancelButtonClass;
      }
    }, {
      key: "deleteButtonClass",
      get: function get() {
        return this.params().deleteButtonClass;
      }
    }, {
      key: "editButtonClass",
      get: function get() {
        return this.params().editButtonClass;
      }
    }, {
      key: "newButtonClass",
      get: function get() {
        return this.params().newButtonClass;
      }
    }, {
      key: "updateButtonClass",
      get: function get() {
        return this.params().updateButtonClass;
      }
    }, {
      key: "insertButtonClass",
      get: function get() {
        return this.params().insertButtonClass;
      }
    }]);

    return CommandField;
  }(DataControlField_1.DataControlField);

  exports.CommandField = CommandField;
});
//# sourceMappingURL=CommandField.js.map
