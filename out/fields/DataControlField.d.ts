import { Control } from "../Control";
import { Callback1 } from "../Utility";
import { GridView } from "../GridView";
export declare class GridViewCell extends Control<HTMLTableCellElement> {
    constructor();
}
declare type GridViewDataCellArgument1<T> = {
    dataField: keyof T;
    nullText?: string;
    dataFormatString?: string;
};
declare type GridViewDataCellArgument2<T> = {
    render: (dataItem: T, element: HTMLElement) => void;
};
export declare class GridViewDataCell<T> extends GridViewCell {
    private nullText;
    private dataFormatString;
    dataField: keyof T;
    constructor(params: GridViewDataCellArgument1<T> | GridViewDataCellArgument2<T>);
    render(dataItem: T): void;
    private formatValue;
    private formatDate;
    private formatNumber;
}
export interface DataControlFieldParams {
    footerText?: string;
    headerText?: string;
    itemStyle?: string | Partial<CSSStyleDeclaration>;
    headerStyle?: string | Partial<CSSStyleDeclaration>;
    footerStyle?: string | Partial<CSSStyleDeclaration>;
    visible?: boolean;
    sortExpression?: string;
}
export declare class GridViewHeaderCell<T> extends Control<HTMLTableHeaderCellElement> {
    private _sortType;
    private _iconElement;
    private field;
    ascHTML: string;
    descHTML: string;
    sortingHTML: string;
    toSortHTML: string;
    sorting: Callback1<GridViewHeaderCell<T>, {
        sortType: string;
    }>;
    sorted: Callback1<GridViewHeaderCell<T>, {
        sortType: string;
    }>;
    constructor(field: DataControlField<T>);
    handleSort(): Promise<void>;
    private defaultHeaderText;
    sortType: "desc" | "asc";
    clearSortIcon(): void;
    private updateSortIcon;
}
export declare class DataControlField<T> {
    private _gridView;
    protected _params: DataControlFieldParams;
    constructor(params?: DataControlFieldParams);
    /**
     * Gets the text that is displayed in the footer item of a data control field.
     */
    /**
    * Sets the text that is displayed in the footer item of a data control field.
    */
    footerText: string;
    /**
     * Gets the text that is displayed in the header item of a data control field.
     */
    /**
    * Sets the text that is displayed in the header item of a data control field.
    */
    headerText: string;
    itemStyle: string | Partial<CSSStyleDeclaration>;
    footerStyle: string | Partial<CSSStyleDeclaration>;
    headerStyle: string | Partial<CSSStyleDeclaration>;
    readonly visible: boolean;
    gridView: GridView<any>;
    /**
     * Gets a sort expression that is used by a data source control to sort data.
     */
    /**
    * Sets a sort expression that is used by a data source control to sort data.
    */
    sortExpression: string;
    createHeaderCell(): GridViewCell;
    createFooterCell(): GridViewCell;
    createItemCell(dataItem: any): GridViewCell;
}
export {};
