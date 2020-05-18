import { Errors } from "./Errors";
import { DataSourceSelectArguments, DataSource } from "maishu-toolkit";

// namespace wuzhui {
export enum PagerPosition {
    Bottom,
    Top,
    TopAndBottom
};

export interface PagerSettings {
    /** The text to display for the first-page button. */
    firstPageText: string,
    /** The text to display for the last-page button. */
    lastPageText: string,
    /** The text to display for the last-page button. */
    nextPageText: string,
    /** The number of page buttons to display in the pager when the Mode property is set to the Numeric or NumericFirstLast value. */
    pageButtonCount: number,
    /** The text to display for the previous-page button. */
    previousPageText: string,

    /** Class name of the number buttons. */
    buttonClassName?: string,

    /** Class name of the active number button. */
    activeButtonClassName?: string,

    buttonContainerWraper?: string,

    buttonContainerClassName?: string,

    buttonWrapper?: string,

    showTotal?: boolean,
}

export abstract class PagingBar {
    private _pageIndex: number;
    private _totalRowCount: number;
    private _pageSize: number;
    private _selectArguments: DataSourceSelectArguments;

    init(dataSource?: DataSource<any>) {
        this._pageIndex = 0;

        var pagingBar = this;
        pagingBar.totalRowCount = 1000000;
        if (dataSource) {
            dataSource.selected.add(args => {
                this._selectArguments = args.selectArguments;

                pagingBar.pageSize = args.selectArguments.maximumRows;
                var totalRowCount = args.selectResult.totalRowCount;
                if (totalRowCount != null && totalRowCount >= 0) {
                    pagingBar.totalRowCount = totalRowCount;
                }

                var startRowIndex = this._selectArguments.startRowIndex;
                if (startRowIndex == null || startRowIndex <= 0)
                    startRowIndex = 0;

                pagingBar.pageIndex = Math.floor(startRowIndex / pagingBar.pageSize);

                pagingBar.render();
            })
            dataSource.deleted.add(function () {
                pagingBar.totalRowCount = pagingBar.totalRowCount - 1;
                pagingBar.render();
            })
            dataSource.inserted.add(function () {
                pagingBar.totalRowCount = pagingBar.totalRowCount + 1;
                pagingBar.render();
            })
        }
    }
    protected get selectArguments() {
        console.assert(this._selectArguments != null);
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
    set totalRowCount(value: number) {
        this._totalRowCount = value;
    }
    // Virtual Method
    render() {
        throw Errors.notImplemented('The table-row render method is not implemented.');
    }
}

export interface NumberPagingButton<T extends PagingBar> {
    // show: () => void,
    // hide: () => void,
    visible: boolean,
    pageIndex: number,
    text: string,
    active: boolean,
    onclick: NumberPagingButtonClickEvent<T>;
}

export interface PagingTotalLabel {
    text: string,
    visible: boolean,
}

export type NumberPagingButtonClickEvent<T extends PagingBar> = (sender: NumberPagingButton<T>, pagingBar: T) => void;

export type PagingBarElementType = 'firstButton' | 'lastButton' | 'previousButton' | 'nextButton' | 'numberButton' | 'totalLabel';
export class DataSourcePagingBar extends PagingBar {
    private dataSource: DataSource<{}>;
    private pagerSettings: PagerSettings;
    private element: HTMLElement;
    private totalElement: PagingTotalLabel;

    private numberButtons: Array<NumberPagingButton<DataSourcePagingBar>>;
    private firstPageButton: NumberPagingButton<DataSourcePagingBar>;
    private previousPageButton: NumberPagingButton<DataSourcePagingBar>;
    private nextPageButton: NumberPagingButton<DataSourcePagingBar>;
    private lastPageButton: NumberPagingButton<DataSourcePagingBar>;
    private createLabel: () => PagingTotalLabel;
    private createButton: (container: HTMLElement) => NumberPagingButton<DataSourcePagingBar>;

    static defaultPagerSettings: PagerSettings = {
        pageButtonCount: 10,
        firstPageText: '<<',
        lastPageText: '>>',
        nextPageText: '...',
        previousPageText: '...',
        showTotal: true,
    }

    constructor(params: {
        dataSource?: DataSource<any>, element: HTMLElement, pagerSettings?: Partial<PagerSettings>,
        // selectArguments?: DataSourceSelectArguments
    }) {
        if (!params.dataSource) throw Errors.argumentNull('dataSource');
        if (!params.element) throw Errors.argumentNull('element');
        let pagerSettings = Object.assign(DataSourcePagingBar.defaultPagerSettings, params.pagerSettings || {});


        super();

        this.dataSource = params.dataSource;
        this.pagerSettings = pagerSettings;
        this.element = params.element;
        this.numberButtons = new Array<NumberPagingButton<DataSourcePagingBar>>();
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

        this.init(params.dataSource);
    }

    private createPagingButton(container: HTMLElement): NumberPagingButton<DataSourcePagingBar> {
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
            get visible(): boolean {
                let button = this._button as HTMLAnchorElement;
                return button.style.display != 'none';
            },
            set visible(value: boolean) {
                let button = this._button as HTMLAnchorElement;
                let element = pagerSettings.buttonWrapper ? button.parentElement : button;
                if (value) {
                    element.style.removeProperty('display');
                }
                else {
                    element.style.display = 'none';
                }
            },
            get pageIndex(): number {
                let button = this._button as HTMLAnchorElement;
                return new Number(button.getAttribute('pageIndex')).valueOf();
            },
            set pageIndex(value: number) {
                let button = this._button as HTMLAnchorElement;
                button.setAttribute('pageIndex', value as any);
            },
            get text(): string {
                let button = this._button as HTMLAnchorElement;
                return button.innerHTML;
            },
            set text(value) {
                let button = this._button as HTMLAnchorElement;
                button.innerHTML = value;
            },
            get active(): boolean {
                let button = this._button as HTMLAnchorElement;
                return button.href != null;
            },
            set active(value: boolean) {
                let button = this._button as HTMLAnchorElement;
                if (value == true) {
                    button.removeAttribute('href');
                    if (pagerSettings.activeButtonClassName) {
                        // button.className = pagerSettings.activeButtonClassName;
                        this.setClassName(pagerSettings.activeButtonClassName)
                    }

                    return;
                }

                button.href = 'javascript:';
                if (pagerSettings.buttonClassName)
                    this.setClassName(pagerSettings.buttonClassName);
                else
                    this.setClassName(null);
            },
            setClassName(value: string) {
                let button = this._button as HTMLAnchorElement;
                let element = pagerSettings.buttonWrapper ? button.parentElement : button;
                if (value)
                    element.className = value;
                else
                    element.removeAttribute('class');

            },
            onclick: null as NumberPagingButtonClickEvent<DataSourcePagingBar>
        };
        button.onclick = () => {
            if (result.onclick) {
                result.onclick(result, this);
            }
        };
        return result;
    }

    private createTotalLabel() {
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

        return <PagingTotalLabel>{
            get text(): string {
                return numberElement.innerHTML;
            },
            set text(value: string) {
                numberElement.innerHTML = value;
            },
            get visible(): boolean {
                let display = totalElement.style.display;
                return display != 'none';
            },
            set visible(value: boolean) {
                if (value == true)
                    totalElement.style.display = 'block';
                else
                    totalElement.style.display = 'node';
            }
        }
    }

    private createPreviousButtons(buttonContainer: HTMLElement) {

        this.firstPageButton = this.createButton(buttonContainer);
        this.firstPageButton.onclick = DataSourcePagingBar.on_buttonClick;
        this.firstPageButton.text = this.pagerSettings.firstPageText;
        this.firstPageButton.visible = false;

        this.previousPageButton = this.createButton(buttonContainer);
        this.previousPageButton.onclick = DataSourcePagingBar.on_buttonClick;
        this.previousPageButton.text = this.pagerSettings.previousPageText;
        this.previousPageButton.visible = false;
    }

    private createNextButtons(buttonContainer: HTMLElement) {
        this.nextPageButton = this.createButton(buttonContainer);
        this.nextPageButton.onclick = DataSourcePagingBar.on_buttonClick;
        this.nextPageButton.text = this.pagerSettings.nextPageText;
        this.nextPageButton.visible = false;

        this.lastPageButton = this.createButton(buttonContainer);
        this.lastPageButton.onclick = DataSourcePagingBar.on_buttonClick;
        this.lastPageButton.text = this.pagerSettings.lastPageText;
        this.lastPageButton.visible = false;
    }

    private createNumberButtons(buttonContainer: HTMLElement) {
        let pagingBar = this;
        let buttonCount = this.pagerSettings.pageButtonCount;
        for (let i = 0; i < buttonCount; i++) {
            let button = this.createButton(buttonContainer);
            button.onclick = DataSourcePagingBar.on_buttonClick;
            this.numberButtons[i] = button;
        }

        this.numberButtons.forEach(btn => {
            btn.onclick = () => DataSourcePagingBar.on_buttonClick(btn, pagingBar);
        })

    }

    private static on_buttonClick(button: NumberPagingButton<DataSourcePagingBar>, pagingBar: DataSourcePagingBar) {
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

        this.previousPageButton.pageIndex = (pagingBarIndex - 1) * buttonCount
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
            this.totalElement.text = this.totalRowCount as any;
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

// export class NumberPagingBar extends PagingBar {
//     // private dataSource: DataSource<{}>;
//     private pagerSettings: PagerSettings;
//     private element: HTMLElement;
//     private totalElement: PagingTotalLabel;

//     private numberButtons: Array<NumberPagingButton<NumberPagingBar>>;
//     private firstPageButton: NumberPagingButton<NumberPagingBar>;
//     private previousPageButton: NumberPagingButton<NumberPagingBar>;
//     private nextPageButton: NumberPagingButton<NumberPagingBar>;
//     private lastPageButton: NumberPagingButton<NumberPagingBar>;
//     private createLabel: () => PagingTotalLabel;
//     private createButton: (container: HTMLElement) => NumberPagingButton<NumberPagingBar>;
//     private loadData: (pageIndex: number) => void;

//     constructor(params: {
//         loadData: (pageIndex: number) => void, element: HTMLElement, pagerSettings?: PagerSettings,
//         selectArguments?: DataSourceSelectArguments
//     }) {
//         if (!params.loadData) throw Errors.argumentNull('loadData');
//         if (!params.element) throw Errors.argumentNull('element');
//         let pagerSettings = Object.assign(<PagerSettings>{
//             pageButtonCount: 10,
//             firstPageText: '<<',
//             lastPageText: '>>',
//             nextPageText: '...',
//             previousPageText: '...',
//             showTotal: true,
//         }, params.pagerSettings || {});


//         super();

//         this.loadData = params.loadData;
//         this.pagerSettings = pagerSettings;
//         this.element = params.element;
//         this.numberButtons = new Array<NumberPagingButton<NumberPagingBar>>();
//         this.createButton = this.createPagingButton;
//         this.createLabel = this.createTotalLabel;

//         let buttonContainer = pagerSettings.buttonContainerWraper ?
//             document.createElement(pagerSettings.buttonContainerWraper) :
//             document.createElement('div');


//         buttonContainer.className = pagerSettings.buttonContainerClassName || "buttons";
//         this.element.appendChild(buttonContainer);

//         this.createPreviousButtons(buttonContainer);
//         this.createNumberButtons(buttonContainer);
//         this.createNextButtons(buttonContainer);

//         if (this.pagerSettings.showTotal) {
//             this.totalElement = this.createLabel();
//             this.totalElement.visible = false;
//         }

//         this.init(null, params.selectArguments);
//     }

//     private createPagingButton(container: HTMLElement): NumberPagingButton<NumberPagingBar> {
//         var pagerSettings = this.pagerSettings;
//         let button = document.createElement('a');
//         button.href = 'javascript:';

//         if (this.pagerSettings.buttonWrapper) {
//             let w = document.createElement(this.pagerSettings.buttonWrapper);
//             w.appendChild(button);
//             container.appendChild(w);
//         }
//         else {
//             container.appendChild(button);
//         }

//         let result = {
//             _button: button,
//             get visible(): boolean {
//                 let button = this._button as HTMLAnchorElement;
//                 return button.style.display != 'none';
//             },
//             set visible(value: boolean) {
//                 let button = this._button as HTMLAnchorElement;
//                 let element = pagerSettings.buttonWrapper ? button.parentElement : button;
//                 if (value) {
//                     element.style.removeProperty('display');
//                 }
//                 else {
//                     element.style.display = 'none';
//                 }
//             },
//             get pageIndex(): number {
//                 let button = this._button as HTMLAnchorElement;
//                 return new Number(button.getAttribute('pageIndex')).valueOf();
//             },
//             set pageIndex(value: number) {
//                 let button = this._button as HTMLAnchorElement;
//                 button.setAttribute('pageIndex', value as any);
//             },
//             get text(): string {
//                 let button = this._button as HTMLAnchorElement;
//                 return button.innerHTML;
//             },
//             set text(value) {
//                 let button = this._button as HTMLAnchorElement;
//                 button.innerHTML = value;
//             },
//             get active(): boolean {
//                 let button = this._button as HTMLAnchorElement;
//                 return button.href != null;
//             },
//             set active(value: boolean) {
//                 let button = this._button as HTMLAnchorElement;
//                 if (value == true) {
//                     button.removeAttribute('href');
//                     if (pagerSettings.activeButtonClassName) {
//                         // button.className = pagerSettings.activeButtonClassName;
//                         this.setClassName(pagerSettings.activeButtonClassName)
//                     }

//                     return;
//                 }

//                 button.href = 'javascript:';
//                 if (pagerSettings.buttonClassName)
//                     this.setClassName(pagerSettings.buttonClassName);
//                 else
//                     this.setClassName(null);
//             },
//             setClassName(value: string) {
//                 let button = this._button as HTMLAnchorElement;
//                 let element = pagerSettings.buttonWrapper ? button.parentElement : button;
//                 if (value)
//                     element.className = value;
//                 else
//                     element.removeAttribute('class');

//             },
//             onclick: null as NumberPagingButtonClickEvent<NumberPagingBar> | null
//         };
//         button.onclick = () => {
//             if (result.onclick) {
//                 result.onclick(result, this);
//             }
//         };
//         return result;
//     }

//     private createTotalLabel() {
//         let totalElement = document.createElement('div');
//         totalElement.className = 'total';

//         let textElement = document.createElement('span');
//         textElement.className = 'text';
//         textElement.innerHTML = '总记录：';
//         totalElement.appendChild(textElement);

//         let numberElement = document.createElement('span');
//         numberElement.className = 'number';
//         totalElement.appendChild(numberElement);

//         this.element.appendChild(totalElement);

//         return <PagingTotalLabel>{
//             get text(): string {
//                 return numberElement.innerHTML;
//             },
//             set text(value: string) {
//                 numberElement.innerHTML = value;
//             },
//             get visible(): boolean {
//                 let display = totalElement.style.display;
//                 return display != 'none';
//             },
//             set visible(value: boolean) {
//                 if (value == true)
//                     totalElement.style.display = 'block';
//                 else
//                     totalElement.style.display = 'node';
//             }
//         }
//     }

//     private createPreviousButtons(buttonContainer: HTMLElement) {

//         this.firstPageButton = this.createButton(buttonContainer);
//         this.firstPageButton.onclick = NumberPagingBar.on_buttonClick;
//         this.firstPageButton.text = this.pagerSettings.firstPageText;
//         this.firstPageButton.visible = false;

//         this.previousPageButton = this.createButton(buttonContainer);
//         this.previousPageButton.onclick = NumberPagingBar.on_buttonClick;
//         this.previousPageButton.text = this.pagerSettings.previousPageText;
//         this.previousPageButton.visible = false;
//     }

//     private createNextButtons(buttonContainer: HTMLElement) {
//         this.nextPageButton = this.createButton(buttonContainer);
//         this.nextPageButton.onclick = NumberPagingBar.on_buttonClick;
//         this.nextPageButton.text = this.pagerSettings.nextPageText;
//         this.nextPageButton.visible = false;

//         this.lastPageButton = this.createButton(buttonContainer);
//         this.lastPageButton.onclick = NumberPagingBar.on_buttonClick;
//         this.lastPageButton.text = this.pagerSettings.lastPageText;
//         this.lastPageButton.visible = false;
//     }

//     private createNumberButtons(buttonContainer: HTMLElement) {
//         let pagingBar = this;
//         let buttonCount = this.pagerSettings.pageButtonCount;
//         for (let i = 0; i < buttonCount; i++) {
//             let button = this.createButton(buttonContainer);
//             button.onclick = NumberPagingBar.on_buttonClick;
//             this.numberButtons[i] = button;
//         }

//         this.numberButtons.forEach(btn => {
//             btn.onclick = () => NumberPagingBar.on_buttonClick(btn, pagingBar);
//         })

//     }

//     private static on_buttonClick(button: NumberPagingButton<NumberPagingBar>, pagingBar: NumberPagingBar) {
//         let pageIndex = button.pageIndex;
//         if (!pageIndex == null) {
//             return;
//         }

//         let args = pagingBar.selectArguments;

//         args.maximumRows = pagingBar.pageSize;
//         args.startRowIndex = pageIndex * pagingBar.pageSize;
//         pagingBar.pageIndex = pageIndex;

//         //pagingBar.dataSource.select(pagingBar.selectArguments);
//         pagingBar.loadData(pageIndex)
//     }

//     render() {
//         var pagerSettings = this.pagerSettings;
//         var buttonCount = pagerSettings.pageButtonCount;

//         let pagingBarIndex = Math.floor(this.pageIndex / buttonCount);
//         let pagingBarCount = Math.ceil(this.pageCount / buttonCount);

//         this.previousPageButton.pageIndex = (pagingBarIndex - 1) * buttonCount
//         this.nextPageButton.pageIndex = (pagingBarIndex + 1) * buttonCount;
//         this.firstPageButton.pageIndex = 0;
//         this.lastPageButton.pageIndex = this.pageCount - 1;

//         for (let i = 0; i < this.numberButtons.length; i++) {
//             let pageIndex = pagingBarIndex * buttonCount + i;
//             if (pageIndex < this.pageCount) {
//                 this.numberButtons[i].pageIndex = pageIndex;
//                 this.numberButtons[i].text = (pagingBarIndex * buttonCount + i + 1).toString();
//                 this.numberButtons[i].visible = true;
//                 this.numberButtons[i].active = pageIndex == this.pageIndex;
//             }
//             else {
//                 this.numberButtons[i].visible = false;
//             }
//         }

//         if (this.totalElement) {
//             this.totalElement.text = this.totalRowCount as any;
//             this.totalElement.visible = true;
//         }


//         this.firstPageButton.visible = false;
//         this.previousPageButton.visible = false;
//         this.lastPageButton.visible = false;
//         this.nextPageButton.visible = false;

//         if (pagingBarIndex > 0) {
//             this.firstPageButton.visible = true;
//             this.previousPageButton.visible = true;
//         }

//         if (pagingBarIndex < pagingBarCount - 1) {
//             this.lastPageButton.visible = true;
//             this.nextPageButton.visible = true;
//         }
//     }
// }
// }