import { GridViewCell } from "./GridViewCell";
import { CellType } from "../types";

type GridViewDataCellArgument1<T> = {
    dataField: keyof T,
    nullText?: string, dataFormatString?: string
}

type GridViewDataCellArgument2<T> = {
    render: (dataItem: T, element: HTMLElement) => void
}

/**
 * 表格视图数据单元格
 * 用于渲染数据
 */
export class GridViewDataCell<T> extends GridViewCell {
    private nullText: string;
    private dataFormatString?: string;

    type: CellType = "GridViewDataCell";

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

    /** 渲染数据 */
    render(dataItem: T) {
        let value = dataItem[this.dataField];
        var text: string;
        if (value == null)
            text = this.nullText;
        else
            text = this.formatValue(value, this.dataFormatString);

        this.element.innerHTML = text;
    }

    /** 格式化数据 */
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
