import { DataSourceSelectArguments, DataSource } from "./DataSource";
export declare enum PagerPosition {
    Bottom = 0,
    Top = 1,
    TopAndBottom = 2
}
export interface PagerSettings {
    /** The text to display for the first-page button. */
    firstPageText?: string;
    /** The text to display for the last-page button. */
    lastPageText?: string;
    /** The text to display for the last-page button. */
    nextPageText?: string;
    /** The number of page buttons to display in the pager when the Mode property is set to the Numeric or NumericFirstLast value. */
    pageButtonCount?: number;
    /** The text to display for the previous-page button. */
    previousPageText?: string;
    /** Class name of the number buttons. */
    buttonClassName?: string;
    /** Class name of the active number button. */
    activeButtonClassName?: string;
    buttonContainerWraper?: string;
    buttonContainerClassName?: string;
    buttonWrapper?: string;
    showTotal?: boolean;
}
export declare abstract class PagingBar {
    private _pageIndex;
    private _totalRowCount;
    private _pageSize;
    private _selectArguments;
    init(dataSource?: DataSource<any>, selectArguments?: DataSourceSelectArguments): void;
    readonly selectArguments: DataSourceSelectArguments;
    readonly pageCount: number;
    pageSize: number;
    pageIndex: number;
    totalRowCount: number;
    render(): void;
}
export interface NumberPagingButton<T extends PagingBar> {
    visible: boolean;
    pageIndex: number;
    text: string;
    active: boolean;
    onclick: NumberPagingButtonClickEvent<T>;
}
export interface PagingTotalLabel {
    text: string;
    visible: boolean;
}
export declare type NumberPagingButtonClickEvent<T extends PagingBar> = (sender: NumberPagingButton<T>, pagingBar: T) => void;
export declare type PagingBarElementType = 'firstButton' | 'lastButton' | 'previousButton' | 'nextButton' | 'numberButton' | 'totalLabel';
export declare class DataSourcePagingBar extends PagingBar {
    private dataSource;
    private pagerSettings;
    private element;
    private totalElement;
    private numberButtons;
    private firstPageButton;
    private previousPageButton;
    private nextPageButton;
    private lastPageButton;
    private createLabel;
    private createButton;
    constructor(params: {
        dataSource?: DataSource<any>;
        element: HTMLElement;
        pagerSettings?: PagerSettings;
        selectArguments?: DataSourceSelectArguments;
    });
    private createPagingButton;
    private createTotalLabel;
    private createPreviousButtons;
    private createNextButtons;
    private createNumberButtons;
    private static on_buttonClick;
    render(): void;
}
export declare class NumberPagingBar extends PagingBar {
    private pagerSettings;
    private element;
    private totalElement;
    private numberButtons;
    private firstPageButton;
    private previousPageButton;
    private nextPageButton;
    private lastPageButton;
    private createLabel;
    private createButton;
    private loadData;
    constructor(params: {
        loadData: (pageIndex: number) => void;
        element: HTMLElement;
        pagerSettings?: PagerSettings;
        selectArguments?: DataSourceSelectArguments;
    });
    private createPagingButton;
    private createTotalLabel;
    private createPreviousButtons;
    private createNextButtons;
    private createNumberButtons;
    private static on_buttonClick;
    render(): void;
}
