import { DataControlField } from "../fields/DataControlField";
import { Callback } from "maishu-toolkit";
import { Errors } from "../Errors";
import { BoundField } from "../fields/BoundField";
import { GridViewCell } from "./GridViewCell";

export class GridViewHeaderCell<T> extends GridViewCell {
    private _sortType: 'asc' | 'desc';
    private _iconElement: HTMLElement;
    private field: DataControlField<T>;

    ascHTML = '↑';
    descHTML = '↓';
    sortingHTML = '...';
    toSortHTML = '↕'

    sorting: Callback<{ sortType: string }>;
    sorted: Callback<{ sortType: string }>;

    constructor(field: DataControlField<T>, cellElement: HTMLElement) {
        super(cellElement, "GridViewHeaderCell");

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

    async handleSort() {
        let selectArguments = this.field.gridView.selectArguments;
        if (this.field.gridView == null)
            throw Errors.gridViewNull();

        let sortType: 'asc' | 'desc' = this.sortType == 'asc' ? 'desc' : 'asc';

        // fireCallback(this.sorting, this, { sortType });
        this.sorting.fire({ sortType });
        selectArguments.sortExpression = (this.field as BoundField<T>).sortExpression + ' ' + sortType;
        await this.field.gridView.dataSource.select(selectArguments);
        this.sortType = sortType;
        // fireCallback(this.sorted, this, { sortType });
        this.sorted.fire({ sortType });
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
