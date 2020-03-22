"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberPagingBar = exports.DataSourcePagingBar = exports.PagingBar = exports.PagerPosition = void 0;

var _Errors = require("./Errors");

var _DataSource = require("./DataSource");

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
