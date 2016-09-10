namespace wuzhui {
    export enum PagerPosition {
        Bottom,
        Top,
        TopAndBottom
    };

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

    export interface NumberPagingButton {
        show: () => void,
        hide: () => void,
        pageIndex: number,
        text: string,
        active: boolean,
        onclick: NumberPagingButtonClickEvent
    }

    export interface PagingTotalLabel {
        text: string
    }

    export type NumberPagingButtonClickEvent = (sender: NumberPagingButton, pagingBar: NumberPagingBar) => void;

    export type PagingBarElementType = 'firstButton' | 'lastButton' | 'previousButton' | 'nextButton' | 'numberButton' | 'totalLabel';
    export class NumberPagingBar extends PagingBar {
        private dataSource: DataSource<any>;
        private pagerSettings: PagerSettings;
        private element: HTMLElement;
        private totalElement: PagingTotalLabel;

        private numberButtons: Array<NumberPagingButton>;
        private firstPageButton: NumberPagingButton;
        private previousPageButton: NumberPagingButton;
        private nextPageButton: NumberPagingButton;
        private lastPageButton: NumberPagingButton;
        private createLabel: () => PagingTotalLabel;
        private createButton: () => NumberPagingButton;

        constructor(params: {
            dataSource: DataSource<any>, element: HTMLElement, pagerSettings?: PagerSettings,
            //appendElement?: (element: HTMLElement, type: PagingBarElementType) => void,
            createTotal?: () => PagingTotalLabel,
            createButton?: () => NumberPagingButton
        }) {
            if (!params.dataSource) throw Errors.argumentNull('dataSource');
            if (!params.element) throw Errors.argumentNull('element');
            let pagerSettings = $.extend(<PagerSettings>{
                pageButtonCount: 10,
                firstPageText: '<<',
                lastPageText: '>>',
                nextPageText: '...',        //private _buttons: Array<HTMLElement>;
                previousPageText: '...',
                //mode: PagerButtons.NextPreviousFirstLast
            }, params.pagerSettings || {});


            super();

            this.dataSource = params.dataSource;
            this.pagerSettings = pagerSettings;
            this.element = params.element;
            this.numberButtons = new Array<NumberPagingButton>();

            this.createButton = params.createButton || this.createPagingButton;
            this.createLabel = params.createTotal || this.createTotalLabel;

            this.createPreviousButtons();
            this.createNumberButtons();
            this.createNextButtons();

            this.totalElement = this.createLabel();

            this.init(params.dataSource);


        }

        private createPagingButton(): NumberPagingButton {
            let button = document.createElement('a');
            button.href = 'javascript:';
            this.element.appendChild(button);
            let result = <NumberPagingButton>{
                show: () => {
                    $(button).show()
                },
                hide: () => {
                    $(button).hide();
                },
                get pageIndex(): number {
                    return new Number($(button).attr('pageIndex')).valueOf();
                },
                set pageIndex(value: number) {
                    $(button).attr('pageIndex', value);
                },
                get text(): string {
                    return button.innerHTML;
                },
                set text(value) {
                    button.innerHTML = value;
                },
                get active(): boolean {
                    return button.href != null;
                },
                set active(value: boolean) {
                    if (value == true) {
                        $(button).removeAttr('href');
                        return;
                    }
                    button.href = 'javascript:';
                }
            };
            $(button).click(() => {
                if (result.onclick) {
                    result.onclick(result, this);
                }
            })
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
                }
            }
        }

        private createPreviousButtons() {

            this.firstPageButton = this.createButton();
            this.firstPageButton.onclick = NumberPagingBar.on_buttonClick;
            this.firstPageButton.text = this.pagerSettings.firstPageText;

            this.previousPageButton = this.createButton();
            this.previousPageButton.onclick = NumberPagingBar.on_buttonClick;
            this.previousPageButton.text = this.pagerSettings.previousPageText;
        }

        private createNextButtons() {
            this.nextPageButton = this.createButton();
            this.nextPageButton.onclick = NumberPagingBar.on_buttonClick;
            this.nextPageButton.text = this.pagerSettings.nextPageText;
            // (sender, pagingBar) => {
            //     NumberPagingBar.on_buttonClick(sender, pagingBar);
            // });

            this.lastPageButton = this.createButton();
            this.lastPageButton.onclick = NumberPagingBar.on_buttonClick;
            this.lastPageButton.text = this.pagerSettings.lastPageText;
        }

        private createNumberButtons() {
            let pagingBar = this;
            let buttonCount = this.pagerSettings.pageButtonCount;
            for (let i = 0; i < buttonCount; i++) {
                let button = this.createButton();//NumberPagingBar.on_buttonClick)
                button.onclick = NumberPagingBar.on_buttonClick;
                this.numberButtons[i] = button;
            }
            $(this.numberButtons).click(function () {
                NumberPagingBar.on_buttonClick(this, pagingBar);
            });
        }

        private static on_buttonClick(button: NumberPagingButton, pagingBar: NumberPagingBar) {
            let pageIndex = button.pageIndex;
            if (!pageIndex == null) {
                return;
            }

            let args = pagingBar.dataSource.selectArguments;

            args.maximumRows = pagingBar.pageSize;
            args.startRowIndex = pageIndex * pagingBar.pageSize;
            pagingBar.pageIndex = pageIndex;
            pagingBar.dataSource.select();
        }

        render() {
            var pagerSettings = this.pagerSettings;
            var buttonCount = pagerSettings.pageButtonCount;

            let pagingBarIndex = Math.floor(this.pageIndex / buttonCount);
            let pagingBarCount = Math.floor(this.pageCount / buttonCount) + 1;

            this.previousPageButton.pageIndex = (pagingBarIndex - 1) * buttonCount
            this.nextPageButton.pageIndex = (pagingBarIndex + 1) * buttonCount;
            this.firstPageButton.pageIndex = 0;
            this.lastPageButton.pageIndex = this.pageCount - 1;

            for (let i = 0; i < this.numberButtons.length; i++) {
                let pageIndex = pagingBarIndex * buttonCount + i;
                if (pageIndex < this.pageCount) {
                    this.numberButtons[i].pageIndex = pageIndex;
                    this.numberButtons[i].text = (pagingBarIndex * buttonCount + i + 1).toString();
                    this.numberButtons[i].show();
                    this.numberButtons[i].active = pageIndex == this.pageIndex;
                }
                else {
                    this.numberButtons[i].hide();
                }
            }

            this.totalElement.text = <any>this.totalRowCount;

            this.firstPageButton.hide();//.style.display = 'none';
            this.previousPageButton.hide();//.style.display = 'none';
            this.lastPageButton.hide();//.style.display = 'none';
            this.nextPageButton.hide();//.style.display = 'none'

            if (pagingBarIndex > 0) {
                this.firstPageButton.show();
                this.previousPageButton.show();
            }

            if (pagingBarIndex < pagingBarCount - 1) {
                this.lastPageButton.show();
                this.nextPageButton.show();
            }
        }
    }
}