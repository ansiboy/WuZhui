let ajax = wuzhui.ajax;
const appToken = '7F0B6740588DCFA7E1C29C627B8C87379F1C98D5962FAB01D0D604307C04BFF0182BAE0B98307143'
wuzhui.ajax = function (url: string, data: any) {
    $.extend(data = data || {}, { appToken });
    return ajax.apply(wuzhui, [url, data]);
}

requirejs(['dataSource', 'gridView']);//