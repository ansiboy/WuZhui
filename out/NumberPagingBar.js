import { Errors } from "./Errors";
import { DataSourceSelectArguments } from "./DataSource";
// namespace wuzhui {
export var PagerPosition;
(function (PagerPosition) {
    PagerPosition[PagerPosition["Bottom"] = 0] = "Bottom";
    PagerPosition[PagerPosition["Top"] = 1] = "Top";
    PagerPosition[PagerPosition["TopAndBottom"] = 2] = "TopAndBottom";
})(PagerPosition || (PagerPosition = {}));
;
export class PagingBar {
    init(dataSource, selectArguments) {
        // if (dataSource == null)
        //     throw Errors.argumentNull('dataSource');
        this._pageIndex = 0;
        this._selectArguments = selectArguments || new DataSourceSelectArguments();
        var pagingBar = this;
        pagingBar.totalRowCount = 1000000;
        if (dataSource) {
            dataSource.selected.add((source, args) => {
                pagingBar.pageSize = this._selectArguments.maximumRows;
                var totalRowCount = args.totalRowCount;
                if (totalRowCount != null && totalRowCount >= 0) {
                    pagingBar.totalRowCount = totalRowCount;
                }
                var startRowIndex = this._selectArguments.startRowIndex;
                if (startRowIndex == null || startRowIndex <= 0)
                    startRowIndex = 0;
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
    get selectArguments() {
        return this._selectArguments;
    }
    get pageCount() {
        var pageCount = Math.ceil(this.totalRowCount / this.pageSize);
        return pageCount;
    }
    get pageSize() {
        return this._pageSize;
    }
    set pageSize(value) {
        this._pageSize = value;
    }
    get pageIndex() {
        return this._pageIndex;
    }
    set pageIndex(value) {
        this._pageIndex = value;
    }
    get totalRowCount() {
        return this._totalRowCount;
    }
    set totalRowCount(value) {
        this._totalRowCount = value;
    }
    // Virtual Method
    render() {
        throw Errors.notImplemented('The table-row render method is not implemented.');
    }
}
export class DataSourcePagingBar extends PagingBar {
    constructor(params) {
        if (!params.dataSource)
            throw Errors.argumentNull('dataSource');
        if (!params.element)
            throw Errors.argumentNull('element');
        let pagerSettings = Object.assign({
            pageButtonCount: 10,
            firstPageText: '<<',
            lastPageText: '>>',
            nextPageText: '...',
            previousPageText: '...',
            showTotal: true,
        }, params.pagerSettings || {});
        super();
        this.dataSource = params.dataSource;
        this.pagerSettings = pagerSettings;
        this.element = params.element;
        this.numberButtons = new Array();
        this.createButton = this.createPagingButton;
        this.createLabel = this.createTotalLabel;
        let buttonContainer = pagerSettings.buttonContainerWraper ?
            document.createElement(pagerSettings.buttonContainerWraper) :
            document.createElement('div');
        buttonContainer.className = pagerSettings.buttonContainerClassName || "buttons";
        this.element.appendChild(buttonContainer);
        this.createPreviousButtons(buttonContainer);
        this.createNumberButtons(buttonContainer);
        this.createNextButtons(buttonContainer);
        if (this.pagerSettings.showTotal) {
            this.totalElement = this.createLabel();
            this.totalElement.visible = false;
        }
        this.init(params.dataSource, params.selectArguments);
    }
    createPagingButton(container) {
        var pagerSettings = this.pagerSettings;
        let button = document.createElement('a');
        button.href = 'javascript:';
        if (this.pagerSettings.buttonWrapper) {
            let w = document.createElement(this.pagerSettings.buttonWrapper);
            w.appendChild(button);
            container.appendChild(w);
        }
        else {
            container.appendChild(button);
        }
        let result = {
            _button: button,
            get visible() {
                let button = this._button;
                return button.style.display != 'none';
            },
            set visible(value) {
                let button = this._button;
                let element = pagerSettings.buttonWrapper ? button.parentElement : button;
                if (value) {
                    element.style.removeProperty('display');
                }
                else {
                    element.style.display = 'none';
                }
            },
            get pageIndex() {
                let button = this._button;
                return new Number(button.getAttribute('pageIndex')).valueOf();
            },
            set pageIndex(value) {
                let button = this._button;
                button.setAttribute('pageIndex', value);
            },
            get text() {
                let button = this._button;
                return button.innerHTML;
            },
            set text(value) {
                let button = this._button;
                button.innerHTML = value;
            },
            get active() {
                let button = this._button;
                return button.href != null;
            },
            set active(value) {
                let button = this._button;
                if (value == true) {
                    button.removeAttribute('href');
                    if (pagerSettings.activeButtonClassName) {
                        // button.className = pagerSettings.activeButtonClassName;
                        this.setClassName(pagerSettings.activeButtonClassName);
                    }
                    return;
                }
                button.href = 'javascript:';
                if (pagerSettings.buttonClassName)
                    this.setClassName(pagerSettings.buttonClassName);
                else
                    this.setClassName(null);
            },
            setClassName(value) {
                let button = this._button;
                let element = pagerSettings.buttonWrapper ? button.parentElement : button;
                if (value)
                    element.className = value;
                else
                    element.removeAttribute('class');
            },
            onclick: null
        };
        button.onclick = () => {
            if (result.onclick) {
                result.onclick(result, this);
            }
        };
        return result;
    }
    createTotalLabel() {
        let totalElement = document.createElement('div');
        totalElement.className = 'total';
        let textElement = document.createElement('span');
        textElement.className = 'text';
        textElement.innerHTML = '总记录：';
        totalElement.appendChild(textElement);
        let numberElement = document.createElement('span');
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
                let display = totalElement.style.display;
                return display != 'none';
            },
            set visible(value) {
                if (value == true)
                    totalElement.style.display = 'block';
                else
                    totalElement.style.display = 'node';
            }
        };
    }
    createPreviousButtons(buttonContainer) {
        this.firstPageButton = this.createButton(buttonContainer);
        this.firstPageButton.onclick = DataSourcePagingBar.on_buttonClick;
        this.firstPageButton.text = this.pagerSettings.firstPageText;
        this.firstPageButton.visible = false;
        this.previousPageButton = this.createButton(buttonContainer);
        this.previousPageButton.onclick = DataSourcePagingBar.on_buttonClick;
        this.previousPageButton.text = this.pagerSettings.previousPageText;
        this.previousPageButton.visible = false;
    }
    createNextButtons(buttonContainer) {
        this.nextPageButton = this.createButton(buttonContainer);
        this.nextPageButton.onclick = DataSourcePagingBar.on_buttonClick;
        this.nextPageButton.text = this.pagerSettings.nextPageText;
        this.nextPageButton.visible = false;
        this.lastPageButton = this.createButton(buttonContainer);
        this.lastPageButton.onclick = DataSourcePagingBar.on_buttonClick;
        this.lastPageButton.text = this.pagerSettings.lastPageText;
        this.lastPageButton.visible = false;
    }
    createNumberButtons(buttonContainer) {
        let pagingBar = this;
        let buttonCount = this.pagerSettings.pageButtonCount;
        for (let i = 0; i < buttonCount; i++) {
            let button = this.createButton(buttonContainer);
            button.onclick = DataSourcePagingBar.on_buttonClick;
            this.numberButtons[i] = button;
        }
        this.numberButtons.forEach(btn => {
            btn.onclick = () => DataSourcePagingBar.on_buttonClick(btn, pagingBar);
        });
    }
    static on_buttonClick(button, pagingBar) {
        let pageIndex = button.pageIndex;
        if (!pageIndex == null) {
            return;
        }
        let args = pagingBar.selectArguments;
        args.maximumRows = pagingBar.pageSize;
        args.startRowIndex = pageIndex * pagingBar.pageSize;
        pagingBar.pageIndex = pageIndex;
        pagingBar.dataSource.select(pagingBar.selectArguments);
    }
    render() {
        var pagerSettings = this.pagerSettings;
        var buttonCount = pagerSettings.pageButtonCount;
        let pagingBarIndex = Math.floor(this.pageIndex / buttonCount);
        let pagingBarCount = Math.ceil(this.pageCount / buttonCount);
        this.previousPageButton.pageIndex = (pagingBarIndex - 1) * buttonCount;
        this.nextPageButton.pageIndex = (pagingBarIndex + 1) * buttonCount;
        this.firstPageButton.pageIndex = 0;
        this.lastPageButton.pageIndex = this.pageCount - 1;
        for (let i = 0; i < this.numberButtons.length; i++) {
            let pageIndex = pagingBarIndex * buttonCount + i;
            if (pageIndex < this.pageCount) {
                this.numberButtons[i].pageIndex = pageIndex;
                this.numberButtons[i].text = (pagingBarIndex * buttonCount + i + 1).toString();
                this.numberButtons[i].visible = true;
                this.numberButtons[i].active = pageIndex == this.pageIndex;
            }
            else {
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
}
export class NumberPagingBar extends PagingBar {
    constructor(params) {
        if (!params.loadData)
            throw Errors.argumentNull('loadData');
        if (!params.element)
            throw Errors.argumentNull('element');
        let pagerSettings = Object.assign({
            pageButtonCount: 10,
            firstPageText: '<<',
            lastPageText: '>>',
            nextPageText: '...',
            previousPageText: '...',
            showTotal: true,
        }, params.pagerSettings || {});
        super();
        this.loadData = params.loadData;
        this.pagerSettings = pagerSettings;
        this.element = params.element;
        this.numberButtons = new Array();
        this.createButton = this.createPagingButton;
        this.createLabel = this.createTotalLabel;
        let buttonContainer = pagerSettings.buttonContainerWraper ?
            document.createElement(pagerSettings.buttonContainerWraper) :
            document.createElement('div');
        buttonContainer.className = pagerSettings.buttonContainerClassName || "buttons";
        this.element.appendChild(buttonContainer);
        this.createPreviousButtons(buttonContainer);
        this.createNumberButtons(buttonContainer);
        this.createNextButtons(buttonContainer);
        if (this.pagerSettings.showTotal) {
            this.totalElement = this.createLabel();
            this.totalElement.visible = false;
        }
        this.init(null, params.selectArguments);
    }
    createPagingButton(container) {
        var pagerSettings = this.pagerSettings;
        let button = document.createElement('a');
        button.href = 'javascript:';
        if (this.pagerSettings.buttonWrapper) {
            let w = document.createElement(this.pagerSettings.buttonWrapper);
            w.appendChild(button);
            container.appendChild(w);
        }
        else {
            container.appendChild(button);
        }
        let result = {
            _button: button,
            get visible() {
                let button = this._button;
                return button.style.display != 'none';
            },
            set visible(value) {
                let button = this._button;
                let element = pagerSettings.buttonWrapper ? button.parentElement : button;
                if (value) {
                    element.style.removeProperty('display');
                }
                else {
                    element.style.display = 'none';
                }
            },
            get pageIndex() {
                let button = this._button;
                return new Number(button.getAttribute('pageIndex')).valueOf();
            },
            set pageIndex(value) {
                let button = this._button;
                button.setAttribute('pageIndex', value);
            },
            get text() {
                let button = this._button;
                return button.innerHTML;
            },
            set text(value) {
                let button = this._button;
                button.innerHTML = value;
            },
            get active() {
                let button = this._button;
                return button.href != null;
            },
            set active(value) {
                let button = this._button;
                if (value == true) {
                    button.removeAttribute('href');
                    if (pagerSettings.activeButtonClassName) {
                        // button.className = pagerSettings.activeButtonClassName;
                        this.setClassName(pagerSettings.activeButtonClassName);
                    }
                    return;
                }
                button.href = 'javascript:';
                if (pagerSettings.buttonClassName)
                    this.setClassName(pagerSettings.buttonClassName);
                else
                    this.setClassName(null);
            },
            setClassName(value) {
                let button = this._button;
                let element = pagerSettings.buttonWrapper ? button.parentElement : button;
                if (value)
                    element.className = value;
                else
                    element.removeAttribute('class');
            },
            onclick: null
        };
        button.onclick = () => {
            if (result.onclick) {
                result.onclick(result, this);
            }
        };
        return result;
    }
    createTotalLabel() {
        let totalElement = document.createElement('div');
        totalElement.className = 'total';
        let textElement = document.createElement('span');
        textElement.className = 'text';
        textElement.innerHTML = '总记录：';
        totalElement.appendChild(textElement);
        let numberElement = document.createElement('span');
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
                let display = totalElement.style.display;
                return display != 'none';
            },
            set visible(value) {
                if (value == true)
                    totalElement.style.display = 'block';
                else
                    totalElement.style.display = 'node';
            }
        };
    }
    createPreviousButtons(buttonContainer) {
        this.firstPageButton = this.createButton(buttonContainer);
        this.firstPageButton.onclick = NumberPagingBar.on_buttonClick;
        this.firstPageButton.text = this.pagerSettings.firstPageText;
        this.firstPageButton.visible = false;
        this.previousPageButton = this.createButton(buttonContainer);
        this.previousPageButton.onclick = NumberPagingBar.on_buttonClick;
        this.previousPageButton.text = this.pagerSettings.previousPageText;
        this.previousPageButton.visible = false;
    }
    createNextButtons(buttonContainer) {
        this.nextPageButton = this.createButton(buttonContainer);
        this.nextPageButton.onclick = NumberPagingBar.on_buttonClick;
        this.nextPageButton.text = this.pagerSettings.nextPageText;
        this.nextPageButton.visible = false;
        this.lastPageButton = this.createButton(buttonContainer);
        this.lastPageButton.onclick = NumberPagingBar.on_buttonClick;
        this.lastPageButton.text = this.pagerSettings.lastPageText;
        this.lastPageButton.visible = false;
    }
    createNumberButtons(buttonContainer) {
        let pagingBar = this;
        let buttonCount = this.pagerSettings.pageButtonCount;
        for (let i = 0; i < buttonCount; i++) {
            let button = this.createButton(buttonContainer);
            button.onclick = NumberPagingBar.on_buttonClick;
            this.numberButtons[i] = button;
        }
        this.numberButtons.forEach(btn => {
            btn.onclick = () => NumberPagingBar.on_buttonClick(btn, pagingBar);
        });
    }
    static on_buttonClick(button, pagingBar) {
        let pageIndex = button.pageIndex;
        if (!pageIndex == null) {
            return;
        }
        let args = pagingBar.selectArguments;
        args.maximumRows = pagingBar.pageSize;
        args.startRowIndex = pageIndex * pagingBar.pageSize;
        pagingBar.pageIndex = pageIndex;
        //pagingBar.dataSource.select(pagingBar.selectArguments);
        pagingBar.loadData(pageIndex);
    }
    render() {
        var pagerSettings = this.pagerSettings;
        var buttonCount = pagerSettings.pageButtonCount;
        let pagingBarIndex = Math.floor(this.pageIndex / buttonCount);
        let pagingBarCount = Math.ceil(this.pageCount / buttonCount);
        this.previousPageButton.pageIndex = (pagingBarIndex - 1) * buttonCount;
        this.nextPageButton.pageIndex = (pagingBarIndex + 1) * buttonCount;
        this.firstPageButton.pageIndex = 0;
        this.lastPageButton.pageIndex = this.pageCount - 1;
        for (let i = 0; i < this.numberButtons.length; i++) {
            let pageIndex = pagingBarIndex * buttonCount + i;
            if (pageIndex < this.pageCount) {
                this.numberButtons[i].pageIndex = pageIndex;
                this.numberButtons[i].text = (pagingBarIndex * buttonCount + i + 1).toString();
                this.numberButtons[i].visible = true;
                this.numberButtons[i].active = pageIndex == this.pageIndex;
            }
            else {
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
}
// }
