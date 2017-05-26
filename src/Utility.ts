
namespace wuzhui {
    /** 
     * 判断服务端返回的数据是否为错误信息 
     * @param responseData 服务端返回的数据
     */
    function isError(responseData: any): Error {
        if (responseData.Type == 'ErrorObject') {
            if (responseData.Code == 'Success') {
                return null;
            }
            let err = new Error(responseData.Message);
            err.name = responseData.Code;
            return err;
        }

        let err: Error = responseData;
        if (err.name !== undefined && err.message !== undefined && err['stack'] !== undefined) {
            return err;
        }

        return null;
    }

    export interface FetchOptions {
        method?: string,
        headers?: any,
        body?: any,
    }

    export class AjaxError implements Error {
        name: string;
        message: string;
        method: 'get' | 'post';

        constructor(method) {
            this.name = 'ajaxError';
            this.message = 'Ajax Error';
            this.method = method;
        }
    }

    export function applyStyle(element: HTMLElement, value: CSSStyleDeclaration | string) {
        let style = value || '';
        if (typeof style == 'string')
            $(element).attr('style', <string>style);
        else {
            for (let key in <any>style) {
                element.style[key] = style[key];
            }
        }
    }


    export class Callback<S, A> {
        private funcs = new Array<(ender: S, args: A) => void>();

        constructor() {
        }
        add(func: (sender: S, args: A) => any) {
            this.funcs.push(func);
        }
        remove(func: (sender: S, args: A) => any) {
            this.funcs = this.funcs.filter(o => o != func);
        }
        fire(sender: S, args: A) {
            this.funcs.forEach(o => o(sender, args));
        }
    }


    export function callbacks<S, A>(): Callback<S, A> {
        return new Callback<S, A>();
    }

    export function fireCallback<S, A>(callback: Callback<S, A>, sender: S, args: A) {
        callback.fire(sender, args);
    }


}