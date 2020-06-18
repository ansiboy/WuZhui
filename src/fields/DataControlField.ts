import { Control } from "../Control";
import { BoundField } from "./BoundField";
import { GridView } from "../GridView";
import { Errors } from "../Errors";
import { Callback } from "maishu-toolkit";
import { CellType } from "../types";
import { GridViewCell } from "../cells/index";

export interface DataControlFieldParams {
    footerText?: string,
    headerText?: string,
    itemStyle?: Partial<CSSStyleDeclaration>;
    headerStyle?: Partial<CSSStyleDeclaration>;
    footerStyle?: Partial<CSSStyleDeclaration>;
    visible?: boolean,
    sortExpression?: string
}


export class GridViewHeaderCell<T> extends Control<HTMLElement> {
    private _sortType: 'asc' | 'desc';
    private _iconElement: HTMLElement;
    private field: DataControlField<T>;
    type: CellType = "GridViewHeaderCell";

    ascHTML = '↑';
    descHTML = '↓';
    sortingHTML = '...';
    toSortHTML = '↕'

    sorting: Callback<{ sortType: string }>;
    sorted: Callback<{ sortType: string }>;

    constructor(field: DataControlField<T>, cellElement: HTMLElement = document.createElement('th')) {
        super(cellElement);

        this.field = field;
        this.sorting = new Callback();
        this.sorted = new Callback();

        if (field.sortExpression) {
            let labelElement = document.createElement('a');
            labelElement.href = 'javascript:';

            labelElement.innerHTML = this.defaultHeaderText();
            labelElement.onclick = () => this.handleSort();

            this._iconElement = document.createElement('span');
            this._iconElement.innerHTML = this.toSortHTML

            this.appendChild(labelElement);
            this.appendChild(this._iconElement);

            this.sorting.add(() => this._iconElement.innerHTML = this.sortingHTML);
            this.sorted.add(() => this.updateSortIcon());
        }
        else {
            this.element.innerHTML = this.defaultHeaderText();
        }

        this.style(field.headerStyle);
    }

    handleSort() {
        let selectArguments = this.field.gridView.selectArguments;
        let sortType: 'asc' | 'desc' = this.sortType == 'asc' ? 'desc' : 'asc';

        // fireCallback(this.sorting, this, { sortType });
        this.sorting.fire({ sortType });
        selectArguments.sortExpression = (this.field as BoundField<T>).sortExpression + ' ' + sortType;
        return this.field.gridView.dataSource.select(selectArguments)
            .then(() => {
                this.sortType = sortType;
                // fireCallback(this.sorted, this, { sortType });
                this.sorted.fire({ sortType });
            });
    }

    private defaultHeaderText() {
        return this.field.headerText || (this.field as BoundField<T>).dataField as string || '';
    }

    get sortType() {
        return this._sortType;
    }
    set sortType(value) {
        this._sortType = value;
    }

    clearSortIcon() {
        this._iconElement.innerHTML = this.toSortHTML;
    }

    private updateSortIcon() {
        if (this.sortType == 'asc') {
            this._iconElement.innerHTML = this.ascHTML;
        }
        else if (this.sortType == 'desc') {
            this._iconElement.innerHTML = this.descHTML;
        }
        else {
            this._iconElement.innerHTML = this.toSortHTML;
        }
    }
}

export abstract class DataControlField<T, P extends DataControlFieldParams = DataControlFieldParams> {
    private _gridView: GridView<T>;

    protected params: P;

    constructor(params?: P) {
        if (params.visible == null)
            params.visible = true;

        this.params = params;
    }

    /**
     * Gets the text that is displayed in the footer item of a data control field.
     */
    public get footerText(): string {
        return this.params.footerText;
    }
    /**
     * Sets the text that is displayed in the footer item of a data control field.
     */
    public set footerText(value: string) {
        this.params.footerText = value;
    }
    /**
     * Gets the text that is displayed in the header item of a data control field.
     */
    public get headerText(): string {
        return this.params.headerText;
    }
    /**
    * Sets the text that is displayed in the header item of a data control field.
    */
    public set headerText(value: string) {
        this.params.headerText = value;
    }

    public get itemStyle(): string | Partial<CSSStyleDeclaration> {
        return this.params.itemStyle;
    }
    public set itemStyle(value: string | Partial<CSSStyleDeclaration>) {
        this.params.itemStyle = value;
    }
    public get footerStyle(): string | Partial<CSSStyleDeclaration> {
        return this.params.footerStyle;
    }
    public set footerStyle(value: string | Partial<CSSStyleDeclaration>) {
        this.params.footerStyle = value;
    }
    public get headerStyle(): string | Partial<CSSStyleDeclaration> {
        return this.params.headerStyle;
    }
    public set headerStyle(value: string | Partial<CSSStyleDeclaration>) {
        this.params.headerStyle = value;
    }
    get visible(): boolean {
        return this.params.visible;
    }
    get gridView(): GridView<any> {
        return this._gridView;
    }
    set gridView(value: GridView<any>) {
        this._gridView = value;
    }
    /**
     * Gets a sort expression that is used by a data source control to sort data.
     */
    get sortExpression(): string {
        return this.params.sortExpression;
    }
    /**
     * Sets a sort expression that is used by a data source control to sort data.
     */
    set sortExpression(value: string) {
        this.params.sortExpression = value;
    }

    createHeaderCell(cellElement?: HTMLElement): GridViewCell {
        let cell = new GridViewHeaderCell(this, cellElement);
        return cell;
    }


    createFooterCell(cellElement?: HTMLElement): GridViewCell {
        let cell = new GridViewCell(cellElement);
        cell.element.innerHTML = this.footerText || '';
        cell.style(this.footerStyle);

        return cell;
    }

    /**
     * 创建数据项单元格对象
     * @param dataItem 数据项
     * @param cellElement 单元格元素
     */
    createItemCell(dataItem: any, cellElement?: HTMLElement): GridViewCell {
        if (!dataItem)
            throw Errors.argumentNull('dataItem');

        let cell = new GridViewCell(cellElement);
        cell.style(this.itemStyle);

        return cell;
    }
}