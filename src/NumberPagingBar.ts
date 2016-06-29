namespace wuzhui {
    export enum PagerPosition {
        Bottom,
        Top,
        TopAndBottom
    };

    export enum PagerButtons {
        NextPrevious,
        Numeric,
        NextPreviousFirstLast,
        NumericFirstLast
    };

    export class PagerSettings {
        private _FirstPageText: string;
        private _LastPageText: string;
        private _Mode: PagerButtons;
        private _NextPageText: string;
        private _pageButtonCount: number;
        private _position: any;
        private _PreviousPageText: string;
        private _Visible: boolean;

        constructor() {
            this._pageButtonCount = 10;
            this._Mode = PagerButtons.NextPreviousFirstLast;
        }

        /**
         * Gets the text to display for the first-page button.
         */
        get firstPageText(): string {
            return this._FirstPageText;
        }
        /**
         * Sets the text to display for the first-page button.
         */
        set firstPageText(value) {
            this._FirstPageText = value;
        }
        /**
         * Gets the text to display for the last-page button.
         */
        get lastPageText() {
            return this._LastPageText;
        }
        /**
         * Sets the text to display for the last-page button.
         */
        set lastPageText(value: string) {
            this._LastPageText = value;
        }
        /**
         * Gets the mode in which to display the pager controls in a control that supports pagination.
         */
        get mode(): PagerButtons {
            return this._Mode;
        }
        /**
         * Sets the mode in which to display the pager controls in a control that supports pagination.
         */
        set mode(value: PagerButtons) {
            this._Mode = value;
        }
        /**
         * Gets the text to display for the next-page button.
         */
        get nextPageText() {
            return this._NextPageText;
        }
        /**
         * Sets the text to display for the next-page button.
         */
        set nextPageText(value: string) {
            this._NextPageText = value;
        }
        /**
         * Gets the number of page buttons to display in the pager when the Mode property is set to the Numeric or NumericFirstLast value.
         */
        get pageButtonCount() {
            return this._pageButtonCount;
        }
        /**
         * Sets the number of page buttons to display in the pager when the Mode property is set to the Numeric or NumericFirstLast value.
         */
        set pageButtonCount(value: number) {
            this._pageButtonCount = value;
        }
        /**
         * Gets a value that specifies the location where the pager is displayed.
         */
        get position(): PagerPosition {
            return this._position;
        }
        /**
         * Sets a value that specifies the location where the pager is displayed.
         */
        set position(value: PagerPosition) {
            this._position = value;
        }
        /**
         * Gets the text to display for the previous page button.
         */
        get previousPageText(): string {
            return this._PreviousPageText;
        }
        /**
         * Sets the text to display for the previous page button.
         */
        set previousPageText(value: string) {
            this._PreviousPageText = value;
        }
        /**
         * Gets a value indicating whether the paging controls are displayed in a control that supports pagination.
         */
        get visible(): boolean {
            return this._Visible;
        }
        /**
         * Sets a value indicating whether the paging controls are displayed in a control that supports pagination.
         */
        set visible(value: boolean) {
            this._Visible = value;
        }
    }

    export class PagingBar {
        private _pageIndex: number;
        private _dataSource: DataSource;
        private _totalRowCount: number;
        private _pageSize: number;

        init(dataSource: DataSource) {
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
    export class NumberPagingBar extends PagingBar {
        private dataSource: DataSource;
        private pagerSettings: PagerSettings;
        private element: HTMLElement;
        private _buttons: Array<HTMLElement>;
        private _selectArgument: DataSourceSelectArguments;
        private sortExpression: string;
        private cell: HTMLElement;
        private totalElement: HTMLElement;

        constructor(dataSource: DataSource, pagerSettings: PagerSettings, element, selectArgument?: DataSourceSelectArguments) {
            super();

            this.dataSource = dataSource;
            this.pagerSettings = pagerSettings;
            this.element = element;
            this._buttons = new Array();
            this._selectArgument = selectArgument;

            this.init(dataSource);
        }
        init(dataSource) {
            super.init(dataSource);

            var pagingBar = this;
            pagingBar.dataSource.selected.add((sender, args) => {
                if (args.selectArguments.totalRowCount != null)
                    $(pagingBar.totalElement).text(args.selectArguments.totalRowCount);
            });
        }
        selectArgument(): DataSourceSelectArguments {
            if (!this._selectArgument)
                this._selectArgument = new DataSourceSelectArguments();

            return this._selectArgument;
        }
        render() {
            var pagerSettings = this.pagerSettings;
            var pagingBar = this;
            pagingBar.cell = this.element;

            var buttonCount = pagerSettings.pageButtonCount;
            var FIRST_BUTTON = 0
            var PREVIOUS_PAGING_BUTTON = 1;
            var NEXT_PAGING_BUTTON = pagerSettings.pageButtonCount + 2;
            var LAST_BUTTON = pagerSettings.pageButtonCount + 3
            var OTHER_BUTTONS_COUNT = 4;


            for (var i = 0; i < buttonCount + OTHER_BUTTONS_COUNT; i++) {
                if (pagingBar._buttons[i] != null) {
                    pagingBar.cell.removeChild(pagingBar._buttons[i]);
                }
                var url = document.createElement('a');
                pagingBar.cell.appendChild(url);
                pagingBar._buttons[i] = url;
                url.style.paddingLeft = '4px';
                url.href = 'javascript:';
                url['pageIndex'] = i;

                $(url).click(function () {
                    var buttonIndex = pagingBar._buttons.indexOf(this);
                    var index;
                    let args = pagingBar.selectArgument();
                    args.maximumRows = pagingBar.pageSize;
                    args.startRowIndex = this.pageIndex * pagingBar.pageSize;
                    if (pagingBar.sortExpression) {
                        args.sortExpression = pagingBar.sortExpression;
                    }
                    pagingBar.dataSource.select(args);

                });
            }

            if (pagingBar.totalElement == null) {
                pagingBar.totalElement = document.createElement('span');
                $('<div style="float:right;margin-right:4px;">').text('总记录：').append(pagingBar.totalElement).appendTo(pagingBar.cell);
            }

            var pagingBarIndex = Math.floor(pagingBar.pageIndex / buttonCount);
            for (var i = 0; i < buttonCount + OTHER_BUTTONS_COUNT; i++) {
                var pageCount = pagingBar.pageCount;
                var start = pagingBarIndex * buttonCount;
                var index;
                let url = pagingBar._buttons[i];
                if (i == PREVIOUS_PAGING_BUTTON) {
                    url.innerHTML = '...';
                    url['pageIndex'] = (pagingBarIndex - 1) * buttonCount;
                }
                else if (i == NEXT_PAGING_BUTTON) {
                    url.innerHTML = '...';
                    url['pageIndex'] = (pagingBarIndex + 1) * buttonCount;
                }
                else if (i == FIRST_BUTTON) {
                    url.innerHTML = pagerSettings.firstPageText;
                    url['pageIndex'] = 0;
                }
                else if (i == LAST_BUTTON) {
                    url.innerHTML = pagerSettings.lastPageText;
                    url['pageIndex'] = pageCount - 1;
                }
                else {
                    url.innerHTML = <any>(start + i - PREVIOUS_PAGING_BUTTON);
                    url['pageIndex'] = start + i - PREVIOUS_PAGING_BUTTON - 1;
                    if (url['pageIndex'] == this.pageIndex)
                        url.style.color = 'red';
                }

                if (pageCount != null && url['pageIndex'] > pageCount - 1)
                    url.style.display = 'none';
            }

            if (pagingBarIndex > 0 && pagerSettings.mode == PagerButtons.NumericFirstLast)
                pagingBar._buttons[LAST_BUTTON].style.removeProperty('display');
            else
                pagingBar._buttons[FIRST_BUTTON].style.display = 'none';

            if (pageCount > 0 && pagingBar.pageIndex < pageCount - 1 && pagerSettings.mode == PagerButtons.NumericFirstLast)
                pagingBar._buttons[LAST_BUTTON].style.removeProperty('display');// = 'block';
            else
                pagingBar._buttons[LAST_BUTTON].style.display = 'none';

            if (pagingBarIndex == 0)
                pagingBar._buttons[PREVIOUS_PAGING_BUTTON].style.display = 'none';
        }
    }
}