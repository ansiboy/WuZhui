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
        mode?: PagerButtons
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
        private sortExpression: string;
        private cell: HTMLElement;
        private totalElement: HTMLElement;

        constructor(dataSource: DataSource, pagerSettings: PagerSettings, element) {
            if (!dataSource) throw Errors.argumentNull('dataSource');
            if (!pagerSettings) throw Errors.argumentNull('pagerSettings');
            if (!element) throw Errors.argumentNull('element');

            pagerSettings = $.extend(<PagerSettings>{
                pageButtonCount: 10,
                firstPageText: '<<',
                lastPageText: '>>',
                nextPageText: '>',
                previousPageText: '<',
                mode: PagerButtons.NextPreviousFirstLast
            }, pagerSettings);


            super();
            this.dataSource = dataSource;
            this.pagerSettings = pagerSettings;
            this.element = element;
            this._buttons = new Array();

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
        // selectArgument(): DataSourceSelectArguments {
        //     if (!this._selectArgument)
        //         this._selectArgument = new DataSourceSelectArguments();

        //     return this._selectArgument;
        // }
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
                    let args = pagingBar.dataSource.currentSelectArguments; //pagingBar.selectArgument();
                    if (args == null)
                        args = new DataSourceSelectArguments();

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