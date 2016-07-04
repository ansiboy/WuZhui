
namespace wuzhui {
    export interface Callback<S, A> {
        /**
         * Add a callback or a collection of callbacks to a callback list.
         * 
         * @param callbacks A function, or array of functions, that are to be added to the callback list.
         */
        add(callbacks: (sender: S, args: A) => any): Callback<S, A>;

        /**
         * Disable a callback list from doing anything more.
         */
        disable(): Callback<S, A>;

        /**
         * Determine if the callbacks list has been disabled.
         */
        disabled(): boolean;

        /**
         * Remove all of the callbacks from a list.
         */
        empty(): Callback<S, A>;

        /**
         * Call all of the callbacks with the given arguments
         * 
         * @param arguments The argument or list of arguments to pass back to the callback list.
         */
        fire(sender: S, args: A): Callback<S, A>;

        /**
         * Determine if the callbacks have already been called at least once.
         */
        fired(): boolean;

        /**
         * Call all callbacks in a list with the given context and arguments.
         * 
         * @param context A reference to the context in which the callbacks in the list should be fired.
         * @param arguments An argument, or array of arguments, to pass to the callbacks in the list.
         */
        fireWith(context: any, [S, A]): Callback<S, A>;

        /**
         * Determine whether a supplied callback is in a list
         * 
         * @param callback The callback to search for.
         */
        has(callback: Function): boolean;

        /**
         * Lock a callback list in its current state.
         */
        lock(): Callback<S, A>;

        /**
         * Determine if the callbacks list has been locked.
         */
        locked(): boolean;

        /**
         * Remove a callback or a collection of callbacks from a callback list.
         * 
         * @param callbacks A function, or array of functions, that are to be removed from the callback list.
         */
        remove(callbacks: Function): Callback<S, A>;
        /**
         * Remove a callback or a collection of callbacks from a callback list.
         * 
         * @param callbacks A function, or array of functions, that are to be removed from the callback list.
         */
        remove(callbacks: Function[]): Callback<S, A>;
    }

    export var ajaxTimeout = 5000;
    export function ajax(url: string, data) {
        var result = $.Deferred();
        $.ajax({
            url: url,
            data: data,
            method: 'post',
            traditional: true
        }).done((data, textStatus, jqXHR) => {
            if (data.Type == 'ErrorObject' && data.Code != 'Success') {
                result.reject(data, textStatus, jqXHR);
            }
            else {
                result.resolve(data, textStatus, jqXHR);
            }
        }).fail((jqXHR, textStatus) => {
            var err = { Code: textStatus, status: jqXHR.status, Message: jqXHR.statusText };
            result.reject(err);
        });

        //超时处理
        setTimeout(() => {
            if (result.state() == 'pending') {
                result.reject({ Code: 'Timeout', Message: 'Ajax call timemout.' });
            }
        }, ajaxTimeout);
        return result;
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

    export function callbacks<S, A>(): Callback<S, A> {
        return $.Callbacks();
    }

    export function fireCallback<S, A>(callback: Callback<S, A>, sender: S, args: A) {
        return callback.fireWith(this, [sender, args]);
    }

    //============================================================
    //这一部份可能需要移入 JData
    //var parseStringToDate
    (function () {
        var prefix = '/Date(';
        function parseStringToDate(value) {
            var star = prefix.length;
            var len = value.length - prefix.length - ')/'.length;
            var str = value.substr(star, len);
            var num = parseInt(str);
            var date = new Date(num);
            return date;
        }

        $.ajaxSettings.converters['text json'] = function (json) {
            var result = $.parseJSON(json);
            if (typeof result === 'string') {
                if (result.substr(0, prefix.length) == prefix)
                    result = parseStringToDate(result);

                return result;
            }

            var stack = new Array();
            stack.push(result);
            while (stack.length > 0) {
                var item = stack.pop();
                //Sys.Debug.assert(item != null);

                for (var key in item) {
                    var value = item[key];
                    if (value == null)
                        continue;

                    if ($.isArray(value)) {
                        for (var i = 0; i < value.length; i++) {
                            stack.push(value[i]);
                        }
                        continue;
                    }

                    if ($.isPlainObject(value)) {
                        stack.push(value);
                        continue;
                    }

                    if (typeof value == 'string' && value.substr(0, prefix.length) == prefix) {
                        item[key] = parseStringToDate(value);
                    }
                }
            }
            return result;
        };
    })();
    //================================================================
}