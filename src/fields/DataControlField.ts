import { Control } from "../Control";
import { BoundField } from "./BoundField";
import { GridView } from "../GridView";
import { Errors } from "../Errors";
import { Callback } from "maishu-toolkit";

export class GridViewCell extends Control<HTMLTableCellElement> {

    constructor() {
        super(document.createElement('td'));
    }
}


type GridViewDataCellArgument1<T> = {
    dataField: keyof T,
    nullText?: string, dataFormatString?: string
}

type GridViewDataCellArgument2<T> = {
    render: (dataItem: T, element: HTMLElement) => void
}

export class GridViewDataCell<T> extends GridViewCell {
    private nullText: string;
    private dataFormatString?: string;

    dataField: keyof T;

    constructor(params: GridViewDataCellArgument1<T> | GridViewDataCellArgument2<T>) {
        super();


        let p = params as (GridViewDataCellArgument1<T> & GridViewDataCellArgument2<T>)
        this.nullText = p.nullText != null ? p.nullText : '';
        this.dataFormatString = p.dataFormatString;
        this.dataField = p.dataField;
        if (p.render) {
            this.render = (dataItem) => p.render.apply(this, [dataItem, this.element]);
        }
    }

    render(dataItem: T) {
        let value = dataItem[this.dataField];
        var text: string;
        if (value == null)
            text = this.nullText;
        else
            text = this.formatValue(value, this.dataFormatString);

        this.element.innerHTML = text;
    }

    formatValue(value: any, format?: string): string {//...args
        if (!format)
            return `${value}`;

        var result = '';

        for (var i = 0; ;) {
            var open = format.indexOf('{', i);
            var close = format.indexOf('}', i);
            if ((open < 0) && (close < 0)) {
                result += format.slice(i);
                break;
            }
            if ((close > 0) && ((close < open) || (open < 0))) {
                if (format.charAt(close + 1) !== '}') {
                    throw new Error('Sys.Res.stringFormatBraceMismatch');
                }
                result += format.slice(i, close + 1);
                i = close + 2;
                continue;
            }

            result += format.slice(i, open);
            i = open + 1;

            if (format.charAt(i) === '{') {
                result += '{';
                i++;
                continue;
            }

            if (close < 0)
                throw new Error('Sys.Res.stringFormatBraceMismatch');


            var brace = format.substring(i, close);
            var argFormat = brace;
            if (typeof (value) === "undefined" || value === null) {
                value = '';
            }

            if (value instanceof Date)
                result = result + this.formatDate(value, argFormat);
            else if (value instanceof Number || typeof value == 'number')
                result = result + this.formatNumber(value, argFormat);
            else
                result = result + value.toString();

            i = close + 1;
        }

        return result;
    }

    private formatDate(value: Date, format: string): string {
        let y = value.getFullYear()
        let m = value.getMonth() + 1
        let d = value.getDate()
        let h = value.getHours()
        let M = value.getMinutes()
        let s = value.getSeconds()

        let twoDigit = function (value: number): string {
            const TEN = 10
            if (value < TEN)
                return `0` + value

            return value.toString()
        }

        switch (format) {
            case 'd':
                return `${y}-${m}-${d}`;
            case 'g':
                return `${y}-${m}-${d} ${h}:${M}`;
            case 'gg':
                return `${y}-${twoDigit(m)}-${twoDigit(d)} ${twoDigit(h)}:${twoDigit(M)}`;
            case 'G':
                return `${y}-${m}-${d} ${h}:${M}:${s}`;
            case 'GG':
                return `${y}-${twoDigit(m)}-${twoDigit(d)} ${twoDigit(h)}:${twoDigit(M)}:${twoDigit(s)}`;
            case 't':
                return `${h}:${M}`;
            case 'T':
                return `${h}:${M}:${s}`;
        }

        return value.toString();
    }

    private formatNumber(value: Number, format: string): string {
        let reg = new RegExp('^C[0-9]+');
        if (reg.test(format)) {
            let num: any = format.substr(1);
            return value.toFixed(num);
        }
        return value.toString();
    }
}

export interface DataControlFieldParams {
    footerText?: string,
    headerText?: string,
    itemStyle?: Partial<CSSStyleDeclaration>;
    headerStyle?: Partial<CSSStyleDeclaration>;
    footerStyle?: Partial<CSSStyleDeclaration>;
    visible?: boolean,
    sortExpression?: string
}

export class GridViewHeaderCell<T> extends Control<HTMLTableHeaderCellElement> {
    private _sortType: 'asc' | 'desc';
    private _iconElement: HTMLElement;
    private field: DataControlField<T>;

    ascHTML = '↑';
    descHTML = '↓';
    sortingHTML = '...';
    toSortHTML = '↕'

    sorting: Callback<{ sortType: string }>;
    sorted: Callback<{ sortType: string }>;

    constructor(field: DataControlField<T>) {
        super(document.createElement('th'));

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

    createHeaderCell(): GridViewCell {
        let cell = new GridViewHeaderCell(this);
        return cell;
    }
    createFooterCell(): GridViewCell {
        let cell = new GridViewCell();
        cell.element.innerHTML = this.footerText || '';
        cell.style(this.footerStyle);

        return cell;
    }
    createItemCell(dataItem: any): GridViewCell {
        if (!dataItem)
            throw Errors.argumentNull('dataItem');

        let cell = new GridViewCell();
        cell.style(this.itemStyle);

        return cell;
    }
}