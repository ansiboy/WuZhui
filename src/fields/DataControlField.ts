import { GridView } from "../GridView";
import { Errors } from "../Errors";
import { GridViewCell, GridViewHeaderCell } from "../cells/index";
import { ElementProvider } from "../ElementProvider";
import { FieldValidation } from "./BoundField";
import { ValidateField } from "maishu-dilu";

export interface DataControlFieldParams {
    footerText?: string,
    headerText?: string,
    itemStyle?: Partial<CSSStyleDeclaration>;
    headerStyle?: Partial<CSSStyleDeclaration>;
    footerStyle?: Partial<CSSStyleDeclaration>;
    visible?: boolean,
    sortExpression?: string,
    validation?: FieldValidation["validation"],
}

export abstract class DataControlField<T, P extends DataControlFieldParams = DataControlFieldParams> implements FieldValidation {
    #gridView: GridView<T>;
    #elementProvider: ElementProvider;
    protected params: P;

    constructor(params?: P, elementProvider?: ElementProvider) {
        params = params || {} as P;
        if (params.visible == null)
            params.visible = true;

        this.params = params;
        this.#elementProvider = elementProvider;
    }

    get validation(): Omit<ValidateField, "name"> {
        return this.params.validation;
    }
    set validation(value) {
        this.params.validation = value;
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

    protected get elementProvider(): ElementProvider {
        if (this.#elementProvider != null)
            return this.#elementProvider;

        if (this.gridView != null)
            return this.gridView.elementProvider;

        return null;
    }

    public get itemStyle(): Partial<CSSStyleDeclaration> {
        return this.params.itemStyle;
    }
    public set itemStyle(value: Partial<CSSStyleDeclaration>) {
        this.params.itemStyle = value;
    }
    public get footerStyle(): Partial<CSSStyleDeclaration> {
        return this.params.footerStyle;
    }
    public set footerStyle(value: Partial<CSSStyleDeclaration>) {
        this.params.footerStyle = value;
    }
    public get headerStyle(): Partial<CSSStyleDeclaration> {
        return this.params.headerStyle;
    }
    public set headerStyle(value: Partial<CSSStyleDeclaration>) {
        this.params.headerStyle = value;
    }
    get visible(): boolean {
        return this.params.visible;
    }
    get gridView(): GridView<T> {
        return this.#gridView;
    }
    set gridView(value: GridView<T>) {
        this.#gridView = value;
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

    createHeaderCell(cellElement: HTMLElement): GridViewCell {
        let cell = new GridViewHeaderCell(this, cellElement);
        return cell;
    }

    createFooterCell(cellElement: HTMLElement): GridViewCell {
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
    createItemCell(dataItem: T, cellElement: HTMLElement): GridViewCell {
        if (!dataItem)
            throw Errors.argumentNull('dataItem');

        let cell = new GridViewCell(cellElement);
        cell.style(this.itemStyle);

        return cell;
    }
}