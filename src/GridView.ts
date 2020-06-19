import { Control } from "./Control";
import { DataSource, DataSourceSelectArguments, DataSourceSelectResult, Callback } from "maishu-toolkit";
import { DataControlField, } from "./fields/DataControlField";
import { PagerSettings, DataSourcePagingBar } from "./NumberPagingBar";
import { applyStyle } from "./Utility";
import { Errors as errors } from "./Errors";
import { GridViewEditableCell } from "./cells/GridViewEditableCell";
import { GridViewCell, GridViewDataCell, GridViewHeaderCell } from "./cells/index";
import { GridViewRow, GridViewRowType, GridViewDataRow } from "./rows/index";
import { ElementProvider, defaultElementProvider } from "./ElementProvider";

export interface GridViewArguments<T> {
    dataSource: DataSource<T>,
    columns: Array<DataControlField<T>>,
    showHeader?: boolean,
    showFooter?: boolean,
    element: HTMLTableElement,
    emptyDataRowStyle?: string,
    // allowPaging?: boolean,
    pageSize?: number,
    pagerSettings?: PagerSettings,
    emptyDataHTML?: string,
    initDataHTML?: string,
    translate?: (items: T[]) => T[],
}

export class GridView<T> extends Control<HTMLElement> {
    private _columns: Array<DataControlField<T>>;
    private _dataSource: DataSource<T>;
    private _header: Control<HTMLElement>;
    private _footer: Control<HTMLElement>;
    private _body: Control<HTMLElement>;
    private _emtpyRow: GridViewRow;
    private _currentSortCell: GridViewHeaderCell<T>;
    private _params: GridViewArguments<T>;
    static emptyRowClassName = 'empty';
    static dataRowClassName = 'data';
    static pagingBarClassName = 'pagingBar';

    private emptyDataHTML = '暂无记录';
    private initDataHTML = '数据正在加载中...';
    private loadFailHTML = '加载数据失败，点击重新加载。';
    private pagingBar: DataSourcePagingBar;

    elementProvider: ElementProvider;
    //========================================================
    // 样式
    // headerStyle: string;
    // footerStyle: string;
    // rowStyle: string;
    // alternatingRowStyle: string;
    //private emptyDataRowStyle: string;
    //========================================================

    rowCreated = new Callback<{ row: GridViewRow }>(); //callbacks<GridView<T>, { row: GridViewRow }>();
    selectArguments: DataSourceSelectArguments;

    constructor(params: GridViewArguments<T>, elementProvider = defaultElementProvider) {

        super(params.element || elementProvider.createViewElement());


        this.elementProvider = elementProvider;
        params = Object.assign({
            showHeader: true, showFooter: false,
            allowPaging: false
        }, params);

        this.selectArguments = new DataSourceSelectArguments();
        if (params.pageSize)
            this.selectArguments.maximumRows = params.pageSize;

        this._params = params;
        this._columns = params.columns || [];
        if (this._columns.length == 0)
            throw errors.columnsCanntEmpty();

        for (var i = 0; i < this._columns.length; i++) {
            var column = this._columns[i];
            column.gridView = this;
        }

        this._dataSource = params.dataSource;
        this._dataSource.selected.add(args => this.on_selectedExecuted(args.selectResult));
        this._dataSource.updated.add(args => this.on_updateExecuted(args.dataItem));
        this._dataSource.inserted.add(args => this.on_insertExecuted(args.dataItem, args.index));
        this._dataSource.deleted.add(args => this.on_deleteExecuted(args.dataItem));
        this._dataSource.selecting.add(args => {
            let display = this._emtpyRow.element.style.display;
            if (display != 'none') {
                this._emtpyRow.element.children[0].innerHTML = this.initDataHTML;
            }
        });
        this._dataSource.error.add(args => {
            if (args.error.method == 'select') {
                this.renderDataItems([]);
                var element = this._emtpyRow.cells[0].element;
                element.innerHTML = this.loadFailHTML;
                element.onclick = () => {
                    this._dataSource.select(this.selectArguments);
                }
                args.error.handled = true;
                console.error(args.error.message);
                console.log(args.error.stack)
            }
        })

        if (params.showHeader) {
            this._header = new Control(this.elementProvider.createHeaderElement());
            this.appendChild(this._header);
            this.appendHeaderRow();
        }

        this.emptyDataHTML = params.emptyDataHTML || this.emptyDataHTML;
        this.initDataHTML = params.initDataHTML || this.initDataHTML;

        this._body = new Control(this.elementProvider.createBodyElement());
        this.appendChild(this._body);

        this.appendEmptyRow();

        let allowPaging = params.pageSize;
        if (params.showFooter || allowPaging) {
            this._footer = new Control(this.elementProvider.createFooterElement());
            this.appendChild(this._footer);

            if (params.showFooter)
                this.appendFooterRow();

            if (allowPaging) {
                this.createPagingBar(params.pagerSettings);
                // this.pagingBar.selectArguments.maximumRows = params.pageSize;
            }
        }

        // this.selectArguments = this.pagingBar ? this.pagingBar.selectArguments : new DataSourceSelectArguments();
        // if (params.pageSize)
        //     this.selectArguments.maximumRows = params.pageSize;

        this.dataSource.select(this.selectArguments);
    }

    private createPagingBar(pagerSettings?: PagerSettings) {
        var pagingBarContainer = this.elementProvider.createRowElement(); //document.createElement('tr');
        var pagingBarElement = this.elementProvider.createCellElement("footer");//document.createElement('td');
        pagingBarElement.className = GridView.pagingBarClassName;
        if (pagingBarElement.tagName == "td")
            pagingBarElement.setAttribute("colspan", `${this.columns.length}`);// pagingBarElement.colSpan = this.columns.length;

        pagingBarContainer.appendChild(pagingBarElement);
        console.assert(this._footer != null);
        this._footer.appendChild(pagingBarContainer);
        this.pagingBar = new DataSourcePagingBar({ dataSource: this.dataSource, element: pagingBarElement, pagerSettings });
    }

    get columns() {
        return this._columns;
    }

    get dataSource() {
        return this._dataSource;
    }

    private appendEmptyRow() {
        this._emtpyRow = new GridViewRow(GridViewRowType.Empty, this.elementProvider.createRowElement());
        this._emtpyRow.element.className = GridView.emptyRowClassName;

        let cell = new GridViewCell(this.elementProvider.createCellElement("body"));
        cell.element.setAttribute("colspan", this.columns.length.toString());
        if (!this._params.emptyDataRowStyle) {
            applyStyle(cell.element, this._params.emptyDataRowStyle);
        }
        this._emtpyRow.appendChild(cell);
        this._body.appendChild(this._emtpyRow);
        // fireCallback(this.rowCreated, this, { row: this._emtpyRow });
        this.rowCreated.fire({ row: this._emtpyRow });
    }

    public appendDataRow(dataItem: any, index?: number) {
        var row = new GridViewDataRow(this, dataItem, this.elementProvider.createRowElement());
        row.element.className = GridView.dataRowClassName;
        this._body.appendChild(row, index);

        let cells = row.cells;
        for (let j = 0; j < cells.length; j++) {
            let cell = cells[j];
            if ((cell as GridViewDataCell<any>).render != null) {
                (cell as GridViewDataCell<any>).render(dataItem);
            }
        }

        // fireCallback(this.rowCreated, this, { row });
        this.rowCreated.fire({ row });
        if (this._emtpyRow.element.style.display != 'none')
            this.hideEmptyRow();

        return row;
    }

    private on_sort(sender: GridViewHeaderCell<T>, args: any) {
        if (this._currentSortCell != null && this._currentSortCell != sender) {
            this._currentSortCell.clearSortIcon();
        }
        this._currentSortCell = sender;
    }

    private appendHeaderRow() {
        var row = new GridViewRow(GridViewRowType.Header, this.elementProvider.createRowElement());
        for (var i = 0; i < this.columns.length; i++) {
            var column = this.columns[i];
            let cell = column.createHeaderCell(this.elementProvider.createCellElement("header")) as GridViewHeaderCell<T>;
            if (cell.type == "GridViewHeaderCell") {
                cell.sorting.add(a => this.on_sort(cell, a));
            }

            row.appendChild(cell);
            cell.visible = this.columns[i].visible;
        }
        this._header.appendChild(row);
    }

    private appendFooterRow() {
        var row = new GridViewRow(GridViewRowType.Footer, this.elementProvider.createRowElement());
        for (var i = 0; i < this.columns.length; i++) {
            var column = this.columns[i];
            let cell = column.createFooterCell(this.elementProvider.createCellElement("footer"));

            row.appendChild(cell);
            cell.visible = column.visible;
        }
        this._footer.appendChild(row);
    }

    private renderDataItems(items: Array<any>) {
        var rows = this._body.element.querySelectorAll(`.${GridView.dataRowClassName}`);
        for (let i = 0; i < rows.length; i++)
            this._body.element.removeChild(rows[i]);

        if (items.length == 0) {
            this.showEmptyRow();
            return;
        }

        for (let i = 0; i < items.length; i++) {
            this.appendDataRow(items[i]);
        }
    }

    private on_selectedExecuted(e: DataSourceSelectResult<T>) {
        let dataItems = e.dataItems;
        if (this._params.translate) {
            dataItems = this._params.translate(dataItems);
        }
        this.renderDataItems(dataItems);
    }

    private on_updateExecuted(item: T) {
        console.assert(item != null);
        let dataItems: T[] = [];
        for (let i = 0; i < this._body.element.children.length; i++) {
            let row_element = this._body.element.children[i] as HTMLElement;
            let row = Control.getControlByElement(row_element) as GridViewRow;;
            if ((<GridViewDataRow>row).rowType != GridViewRowType.Data)
                continue;


            let dataItem = (row as GridViewDataRow).dataItem;
            dataItems.push(dataItem);
            if (!this.dataSource.isSameItem(dataItem, item))
                continue;

            if (dataItem != item) {
                Object.assign(dataItem, item)
            }

            let cells = row.cells;
            for (let j = 0; j < cells.length; j++) {
                let cell = cells[j];
                if ((<GridViewDataCell<T>>cell).type == "GridViewDataCell") {
                    (<GridViewDataCell<T>>cell).render(dataItem);
                }
                else if ((<GridViewEditableCell<T>>cell).type == "GridViewEditableCell") {
                    (<GridViewEditableCell<T>>cell).render(dataItem);
                }
            }

        }

        if (this._params.translate) {
            dataItems = this._params.translate(dataItems);
            this.renderDataItems(dataItems);
        }
    }

    private on_insertExecuted(item: any, index?: number) {
        if (index == null)
            index = 0;

        if (!this._params.translate) {
            this.appendDataRow(item, index);
            return;
        }

        let dataItems: T[] = [item];
        for (let i = 0; i < this._body.element.children.length; i++) {
            let row_element = this._body.element.children[i] as HTMLElement;
            let row = Control.getControlByElement(row_element) as GridViewRow;;
            if (row.rowType != GridViewRowType.Data)
                continue;

            let dataItem = (row as GridViewDataRow).dataItem;
            dataItems.push(dataItem);
        }
        dataItems = this._params.translate(dataItems);
        this.renderDataItems(dataItems);
    }

    private on_deleteExecuted(item: T) {

        let rows = this._body.element.children;
        let dataRows = new Array<GridViewDataRow>();
        for (let i = 0; i < rows.length; i++) {
            let row = Control.getControlByElement(rows[i] as HTMLElement) as GridViewRow;
            if ((row.rowType == GridViewRowType.Data))
                dataRows.push(<GridViewDataRow>row);
        }

        if (this._params.translate) {
            let dataItems = dataRows.map(o => o.dataItem)
                .filter(o => !this.dataSource.isSameItem(o, item));

            dataItems = this._params.translate(dataItems);
            this.renderDataItems(dataItems);
            return;
        }

        for (let i = 0; i < dataRows.length; i++) {
            let dataRow = dataRows[i];
            if (!this.dataSource.isSameItem(item, dataRow.dataItem))
                continue;

            dataRow.element.remove();
            if (dataRows.length == 1)
                this.showEmptyRow();
        }
    }

    private showEmptyRow() {
        this._emtpyRow.element.children[0].innerHTML = this.emptyDataHTML;
        this._emtpyRow.element.style.removeProperty('display');
    }

    private hideEmptyRow() {
        this._emtpyRow.element.style.display = 'none';
    }
}
// }