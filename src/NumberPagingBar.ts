namespace wuzhui {
    export enum PagerPosition {
        Bottom,
        Top,
        TopAndBottom
    };

    // export enum PagerButtons {
    //     NextPrevious,
    //     Numeric,
    //     NextPreviousFirstLast,
    //     NumericFirstLast
    // };

    export interface PagerSettings {
        /** The text to display for the first-page button. */
        firstPageText?: string,
        /** The text to display for the last-page button. */
        lastPageText?: string,
        /** The text to display for the last-page button. */
        nextPageText?: string,
        /** The number of page buttons to display in the pager when the Mode property is set to the Numeric or NumericFirstLast value. */
        pageButtonCount?: number,
        /** The text to display for the previous-page button. */
        previousPageText?: string,
        /** The mode in which to display the pager controls in a control that supports pagination. */
        //mode?: PagerButtons
    }

    export class PagingBar {
        private _pageIndex: number;
        private _dataSource: DataSource<any>;
        private _totalRowCount: number;
        private _pageSize: number;

        init(dataSource: DataSource<any>) {
            if (dataSource == null)
                throw Errors.argumentNull('dataSource');

            this._pageIndex = 0;
            this._dataSource = dataSource;

            var pagingBar = this;
            pagingBar.totalRowCount = 1000000;
            dataSource.selected.add((source, args) => {
                pagingBar._pageSize = args.selectArguments.maximumRows;

                var totalRowCount = args.selectArguments.totalRowCount;
                if (totalRowCount != null && totalRowCount >= 0) {
                    pagingBar.totalRowCount = totalRowCount;
                }

                var startRowIndex = args.selectArguments.startRowIndex;
                if (startRowIndex <= 0)
                    startRowIndex = 0;

                pagingBar._pageIndex = Math.floor(startRowIndex / pagingBar._pageSize);

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

    export type PagingBarElementType = 'firstButton' | 'lastButton' | 'previousButton' | 'nextButton' | 'numberButton' | 'totalLabel';
    export class NumberPagingBar extends PagingBar {
        private dataSource: DataSource<any>;
        private pagerSettings: PagerSettings;
        private element: HTMLElement;
        //private _buttons: Array<HTMLElement>;
        private totalElement: HTMLElement;
        private appendElement: (btn: HTMLElement, type: PagingBarElementType) => void;

        private numberButtons: Array<HTMLElement>;
        private firstPageButton: HTMLElement;
        private previousPageButton: HTMLElement;
        private nextPageButton: HTMLElement;
        private lastPageButton: HTMLElement;

        constructor(params: {
            dataSource: DataSource<any>, element: HTMLElement, pagerSettings?: PagerSettings,
            appendElement?: (element: HTMLElement, type: PagingBarElementType) => void
        }) {
            if (!params.dataSource) throw Errors.argumentNull('dataSource');
            if (!params.element) throw Errors.argumentNull('element');
            let pagerSettings = $.extend(<PagerSettings>{
                pageButtonCount: 10,
                firstPageText: '<<',
                lastPageText: '>>',
                nextPageText: '...',
                previousPageText: '...',
                //mode: PagerButtons.NextPreviousFirstLast
            }, params.pagerSettings || {});


            super();

            if (params.appendElement != null) {
                this.appendElement = params.appendElement;
            }
            else {
                this.appendElement = (element: HTMLElement, type: PagingBarElementType) => {
                    this.element.appendChild(element);
                }
            }

            this.dataSource = params.dataSource;
            this.pagerSettings = pagerSettings;
            this.element = params.element;
            this.numberButtons = new Array<HTMLElement>();

            this.createPreviousButtons();
            this.createNumberButtons();
            this.createNextButtons();

            this.createTotalLabel();

            this.init(params.dataSource);
        }


        private createTotalLabel() {
            this.totalElement = document.createElement('div');
            this.totalElement.className = 'total';

            let textElement = document.createElement('span');
            textElement.className = 'text';
            textElement.innerHTML = '总记录：';
            this.totalElement.appendChild(textElement);

            let numberElement = document.createElement('span');
            numberElement.className = 'number';
            this.totalElement.appendChild(numberElement);

            this.appendElement(this.totalElement, 'totalLabel');
        }

        private createPreviousButtons() {
            this.firstPageButton = document.createElement('a');
            this.firstPageButton.innerHTML = this.pagerSettings.firstPageText;
            (this.firstPageButton as HTMLAnchorElement).href = 'javascript:';
            this.appendElement(this.firstPageButton, 'firstButton');

            this.previousPageButton = document.createElement('a');
            this.previousPageButton.innerHTML = this.pagerSettings.previousPageText;
            (this.previousPageButton as HTMLAnchorElement).href = 'javascript:';
            this.appendElement(this.previousPageButton, 'previousButton');

            let pagingBar = this;
            $([this.firstPageButton, this.previousPageButton]).click(function () {
                NumberPagingBar.on_buttonClick(this, pagingBar);
            });
        }

        private createNextButtons() {
            this.nextPageButton = document.createElement('a');
            (this.nextPageButton as HTMLAnchorElement).href = 'javascript:'
            this.nextPageButton.innerHTML = this.pagerSettings.nextPageText;
            this.appendElement(this.nextPageButton, 'nextButton');

            this.lastPageButton = document.createElement('a');
            (this.lastPageButton as HTMLAnchorElement).href = 'javascript:';
            this.lastPageButton.innerHTML = this.pagerSettings.lastPageText;
            this.appendElement(this.lastPageButton, 'lastButton');

            let pagingBar = this;
            $([this.nextPageButton, this.lastPageButton]).click(function () {
                NumberPagingBar.on_buttonClick(this, pagingBar);
            });
        }

        private createNumberButtons() {
            let pagingBar = this;
            let buttonCount = this.pagerSettings.pageButtonCount;
            for (let i = 0; i < buttonCount; i++) {
                var button = document.createElement('a');
                button.href = 'javascript:';
                this.appendElement(button, 'numberButton');
                this.numberButtons[i] = button;
            }
            $(this.numberButtons).click(function () {
                NumberPagingBar.on_buttonClick(this, pagingBar);
            });
        }

        private static on_buttonClick(button: HTMLElement, pagingBar: NumberPagingBar) {
            let pageIndex = (<any>button).pageIndex;
            if (!pageIndex == null) {
                return;
            }

            let args = pagingBar.dataSource.selectArguments;

            args.maximumRows = pagingBar.pageSize;
            args.startRowIndex = pageIndex * pagingBar.pageSize;

            pagingBar.dataSource.select();
        }

        render() {
            var pagerSettings = this.pagerSettings;
            //var pagingBar = this;
            var buttonCount = pagerSettings.pageButtonCount;

            let pagingBarIndex = Math.floor(this.pageIndex / buttonCount);
            let pagingBarCount = Math.floor(this.pageCount / buttonCount) + 1;

            this.previousPageButton['pageIndex'] = (pagingBarIndex - 1) * buttonCount
            this.nextPageButton['pageIndex'] = (pagingBarIndex + 1) * buttonCount;
            this.firstPageButton['pageIndex'] = 0;
            this.lastPageButton['pageIndex'] = this.pageCount - 1;

            for (let i = 0; i < this.numberButtons.length; i++) {
                let pageIndex = pagingBarIndex * buttonCount + i;
                if (pageIndex < this.pageCount) {
                    this.numberButtons[i]['pageIndex'] = pageIndex;
                    this.numberButtons[i].innerHTML = (pagingBarIndex * buttonCount + i + 1).toString();
                    $(this.numberButtons[i]).show();
                }
                else {
                    $(this.numberButtons[i]).hide();
                }
            }

            $(this.totalElement).find('.number').html(<any>this.totalRowCount);


            this.firstPageButton.style.display = 'none';
            this.previousPageButton.style.display = 'none';
            this.lastPageButton.style.display = 'none';
            this.nextPageButton.style.display = 'none'

            if (pagingBarIndex > 0) {
                $(this.firstPageButton).show();
                $(this.previousPageButton).show();
            }

            if (pagingBarIndex < pagingBarCount - 1) {
                $(this.lastPageButton).show();
                $(this.nextPageButton).show();
            }

            //if()

            // if (pagingBarIndex > 0)// && pagerSettings.mode == PagerButtons.NumericFirstLast)
            //     this.lastPageButton.style.removeProperty('display');
            // else
            //     this.firstPageButton.style.display = 'none';

            // if (this.pageCount > 0)// && this.pageIndex < this.pageCount - 1 && pagerSettings.mode == PagerButtons.NumericFirstLast)
            //     this.lastPageButton.style.removeProperty('display');
            // else
            //     this.lastPageButton.style.display = 'none';

            // if (pagingBarIndex == 0)
            //     this.previousPageButton.style.display = 'none';
        }
    }
}