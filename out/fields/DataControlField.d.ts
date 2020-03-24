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
    private dataFormatString?;
    dataField: keyof T;
    constructor(params: GridViewDataCellArgument1<T> | GridViewDataCellArgument2<T>);
    render(dataItem: T): void;
    formatValue(value: any, format?: string): string;
    private formatDate;
    private formatNumber;
}
export interface DataControlFieldParams {
    footerText?: string;
    headerText?: string;
    itemStyle?: Partial<CSSStyleDeclaration>;
    headerStyle?: Partial<CSSStyleDeclaration>;
    footerStyle?: Partial<CSSStyleDeclaration>;
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
    get sortType(): "desc" | "asc";
    set sortType(value: "desc" | "asc");
    clearSortIcon(): void;
    private updateSortIcon;
}
export declare abstract class DataControlField<T, P extends DataControlFieldParams = DataControlFieldParams> {
    private _gridView;
    protected params: P;
    constructor(params?: P);
    /**
     * Gets the text that is displayed in the footer item of a data control field.
     */
    get footerText(): string;
    /**
     * Sets the text that is displayed in the footer item of a data control field.
     */
    set footerText(value: string);
    /**
     * Gets the text that is displayed in the header item of a data control field.
     */
    get headerText(): string;
    /**
    * Sets the text that is displayed in the header item of a data control field.
    */
    set headerText(value: string);
    get itemStyle(): string | Partial<CSSStyleDeclaration>;
    set itemStyle(value: string | Partial<CSSStyleDeclaration>);
    get footerStyle(): string | Partial<CSSStyleDeclaration>;
    set footerStyle(value: string | Partial<CSSStyleDeclaration>);
    get headerStyle(): string | Partial<CSSStyleDeclaration>;
    set headerStyle(value: string | Partial<CSSStyleDeclaration>);
    get visible(): boolean;
    get gridView(): GridView<any>;
    set gridView(value: GridView<any>);
    /**
     * Gets a sort expression that is used by a data source control to sort data.
     */
    get sortExpression(): string;
    /**
     * Sets a sort expression that is used by a data source control to sort data.
     */
    set sortExpression(value: string);
    createHeaderCell(): GridViewCell;
    createFooterCell(): GridViewCell;
    createItemCell(dataItem: any): GridViewCell;
}
export {};
