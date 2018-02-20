(function(factory) { 
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') { 
        // [1] CommonJS/Node.js 
        var target = module['exports'] || exports; 
        var chitu = factory(target, require);
        Object.assign(target,chitu);
    } else 
if (typeof define === 'function' && define['amd']) { 
    define(factory);  
} else { 
    factory(); 
} 
})(function() {var chitu;
(function (chitu) {
const DEFAULT_FILE_BASE_PATH = 'modules';
class RouteData {
constructor(basePath, routeString, pathSpliterChar) {
    this._parameters = {};
    this.path_string = '';
    this.path_spliter_char = '/';
    this.path_contact_char = '/';
    this.param_spliter = '?';
    this.name_spliter_char = '.';
    this._pathBase = '';
    if (!basePath)
        throw Errors.argumentNull('basePath');
    if (!routeString)
        throw Errors.argumentNull('routeString');
    if (pathSpliterChar)
        this.path_spliter_char = pathSpliterChar;
    this._routeString = routeString;
    this._pathBase = basePath;
    this.parseRouteString();
    let routeData = this;
}
parseRouteString() {
    let routeString = this.routeString;
    let routePath;
    let search;
    let param_spliter_index = routeString.indexOf(this.param_spliter);
    if (param_spliter_index > 0) {
        search = routeString.substr(param_spliter_index + 1);
        routePath = routeString.substring(0, param_spliter_index);
    }
    else {
        routePath = routeString;
    }
    if (!routePath)
        throw Errors.canntParseRouteString(routeString);
    if (search) {
        this._parameters = this.pareeUrlQuery(search);
    }
    let path_parts = routePath.split(this.path_spliter_char).map(o => o.trim()).filter(o => o != '');
    if (path_parts.length < 1) {
        throw Errors.canntParseRouteString(routeString);
    }
    let file_path = path_parts.join(this.path_contact_char);
    this._pageName = path_parts.join(this.name_spliter_char);
    this._actionPath = (this.basePath ? combinePath(this.basePath, file_path) : file_path);
}
pareeUrlQuery(query) {
    let match, pl = /\+/g, search = /([^&=]+)=?([^&]*)/g, decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
    let urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
    return urlParams;
}
get basePath() {
    return this._pathBase;
}
get values() {
    return this._parameters;
}
set values(value) {
    this._parameters = value;
}
get pageName() {
    return this._pageName;
}
get routeString() {
    return this._routeString;
}
get actionPath() {
    return this._actionPath;
}
}
chitu.RouteData = RouteData;
var PAGE_STACK_MAX_SIZE = 30;
var CACHE_PAGE_SIZE = 30;
var ACTION_LOCATION_FORMATER = '{controller}/{action}';
var VIEW_LOCATION_FORMATER = '{controller}/{action}';
class Application {
constructor(args) {
    this.pageCreated = chitu.Callbacks();
    this.pageType = chitu.Page;
    this.pageDisplayType = PageDisplayerImplement;
    this._runned = false;
    this.page_stack = new Array();
    this.cachePages = {};
    this.allowCachePage = true;
    this.fileBasePath = DEFAULT_FILE_BASE_PATH;
    this.backFail = chitu.Callbacks();
    this.error = chitu.Callbacks1();
    args = args || {};
    this._siteMap = args.siteMap;
    if (this._siteMap) {
        if (this._siteMap.root == null)
            throw Errors.siteMapRootCanntNull();
        this._siteMap.root.level = 0;
        this.setChildrenParent(this._siteMap.root);
    }
    if (args.allowCachePage != null)
        this.allowCachePage = args.allowCachePage;
}
setChildrenParent(parent) {
    if (parent == null)
        throw Errors.argumentNull('parent');
    let children = parent.children || [];
    for (let i = 0; i < children.length; i++) {
        children[i].parent = parent;
        children[i].level = parent.level + 1;
        this.setChildrenParent(children[i]);
    }
}
parseRouteString(routeString) {
    let routeData = new RouteData(this.fileBasePath, routeString);
    return routeData;
}
on_pageCreated(page) {
    return this.pageCreated.fire(this, page);
}
get currentPage() {
    if (this.page_stack.length > 0)
        return this.page_stack[this.page_stack.length - 1];
    return null;
}
get pages() {
    return this.page_stack;
}
createPage(routeData) {
    let data = this.cachePages[routeData.pageName];
    if (data) {
        data.hitCount = (data.hitCount || 0) + 1;
        data.page.routeData.values = routeData.values;
        return data.page;
    }
    let previous_page = this.pages[this.pages.length - 1];
    let element = this.createPageElement(routeData);
    let displayer = new this.pageDisplayType(this);
    console.assert(this.pageType != null);
    let page = new this.pageType({
        app: this,
        previous: previous_page,
        routeData: routeData,
        displayer,
        element
    });
    let keyes = Object.keys(this.cachePages);
    if (keyes.length > CACHE_PAGE_SIZE) {
        let key = keyes[0];
        for (let i = 1; i < keyes.length; i++) {
            let data0 = this.cachePages[key];
            let data1 = this.cachePages[keyes[i]];
            if (data1.hitCount < data0.hitCount) {
                key = keyes[i];
            }
        }
        this.cachePages[key].page.close();
        delete this.cachePages[key];
    }
    let page_onerror = (sender, error) => {
        this.error.fire(this, error, sender);
    };
    let page_onloadComplete = (sender, args) => {
        this.cachePages[sender.name] = { page: sender, hitCount: 1 };
    };
    let page_onclosed = (sender) => {
        this.page_stack = this.page_stack.filter(o => o != sender);
        page.closed.remove(page_onclosed);
        page.loadComplete.remove(page_onloadComplete);
        page.error.remove(page_onerror);
    };
    page.error.add(page_onerror);
    page.closed.add(page_onclosed);
    page.loadComplete.add(page_onloadComplete);
    this.on_pageCreated(page);
    return page;
}
createPageElement(routeData) {
    let element = document.createElement(chitu.Page.tagName);
    document.body.appendChild(element);
    return element;
}
hashchange() {
    var hash = window.location.hash;
    if (!hash) {
        console.log('The url is not contains hash.url is ' + window.location.href);
        return;
    }
    var routeString;
    if (location.hash.length > 1)
        routeString = location.hash.substr(1);
    var routeData = this.parseRouteString(routeString);
    var page = this.getPage(routeData.pageName);
    let previousPageIndex = this.page_stack.length - 2;
    this.showPage(routeString);
}
run() {
    if (this._runned)
        return;
    var app = this;
    this.hashchange();
    window.addEventListener('popstate', (event) => {
        if (event.state == Application.skipStateName)
            return;
        this.hashchange();
    });
    this._runned = true;
}
getPage(name) {
    for (var i = this.page_stack.length - 1; i >= 0; i--) {
        var page = this.page_stack[i];
        if (page != null && page.name == name)
            return page;
    }
    return null;
}
getPageByRouteString(routeString) {
    for (var i = this.page_stack.length - 1; i >= 0; i--) {
        var page = this.page_stack[i];
        if (page != null && page.routeData.routeString == routeString)
            return page;
    }
    return null;
}
showPage(routeString, args) {
    if (!routeString)
        throw Errors.argumentNull('routeString');
    if (this.currentPage != null && this.currentPage.routeData.routeString == routeString)
        return;
    var routeData = this.parseRouteString(routeString);
    if (routeData == null) {
        throw Errors.noneRouteMatched(routeString);
    }
    Object.assign(routeData.values, args || {});
    let oldCurrentPage = this.currentPage;
    var page = this.getPage(routeData.pageName);
    let previousPageIndex = this.page_stack.length - 2;
    if (page != null && this.page_stack.indexOf(page) == previousPageIndex) {
        this.closeCurrentPage();
    }
    else {
        let page = this.createPage(routeData);
        this.pushPage(page);
        page.show();
        console.assert(page == this.currentPage, "page is not current page");
    }
    if (oldCurrentPage)
        oldCurrentPage.deactive.fire(oldCurrentPage, null);
    console.assert(this.currentPage != null);
    this.currentPage.active.fire(this.currentPage, routeData.values);
    return this.currentPage;
}
pushPage(page) {
    if (this.currentPage != null) {
        let currentSiteNode = this.findSiteMapNode(this.currentPage.name);
        let pageNode = this.findSiteMapNode(page.name);
        if (currentSiteNode != null && pageNode != null && pageNode.level <= currentSiteNode.level) {
            this.clearPageStack();
        }
    }
    let previous = this.currentPage;
    this.page_stack.push(page);
    if (this.page_stack.length > PAGE_STACK_MAX_SIZE) {
        let c = this.page_stack.shift();
    }
    page.previous = previous;
}
findSiteMapNode(pageName) {
    if (this._siteMap == null)
        return;
    let stack = new Array();
    stack.push(this._siteMap.root);
    while (stack.length > 0) {
        let node = stack.pop();
        if (node.pageName == pageName) {
            return node;
        }
        let children = node.children || [];
        children.forEach(c => stack.push(c));
    }
    return null;
}
setLocationHash(routeString) {
    if (window.location.hash == '#' + routeString) {
        return;
    }
    history.pushState('chitu', "", `#${routeString}`);
}
closeCurrentPage() {
    if (this.page_stack.length <= 0)
        return;
    var page = this.page_stack.pop();
    if (this.allowCachePage) {
        page.previous = this.currentPage;
        page.hide();
    }
    else {
        delete this.cachePages[page.name];
        page.close();
    }
}
clearPageStack() {
    this.page_stack = [];
}
redirect(routeString, args) {
    let result = this.showPage(routeString, args);
    this.setLocationHash(routeString);
    return result;
}
back() {
    history.back();
}
}
Application.skipStateName = 'skip';
chitu.Application = Application;
})(chitu || (chitu = {}));

class Errors {
static argumentNull(paramName) {
var msg = `The argument "${paramName}" cannt be null.`;
return new Error(msg);
}
static modelFileExpecteFunction(script) {
var msg = `The eval result of script file "${script}" is expected a function.`;
return new Error(msg);
}
static paramTypeError(paramName, expectedType) {
var msg = `The param "${paramName}" is expected "${expectedType}" type.`;
return new Error(msg);
}
static paramError(msg) {
return new Error(msg);
}
static viewNodeNotExists(name) {
var msg = `The view node "${name}" is not exists.`;
return new Error(msg);
}
static pathPairRequireView(index) {
var msg = `The view value is required for path pair, but the item with index "${index}" is miss it.`;
return new Error(msg);
}
static notImplemented(name) {
var msg = `'The method "${name}" is not implemented.'`;
return new Error(msg);
}
static routeExists(name) {
var msg = `Route named "${name}" is exists.`;
return new Error(msg);
}
static noneRouteMatched(url) {
var msg = `None route matched with url "${url}".`;
var error = new Error(msg);
return error;
}
static emptyStack() {
return new Error('The stack is empty.');
}
static canntParseUrl(url) {
var msg = `Can not parse the url "${url}" to route data.`;
return new Error(msg);
}
static canntParseRouteString(routeString) {
var msg = `Can not parse the route string "${routeString}" to route data.;`;
return new Error(msg);
}
static routeDataRequireController() {
var msg = 'The route data does not contains a "controller" file.';
return new Error(msg);
}
static routeDataRequireAction() {
var msg = 'The route data does not contains a "action" file.';
return new Error(msg);
}
static viewCanntNull() {
var msg = 'The view or viewDeferred of the page cannt null.';
return new Error(msg);
}
static createPageFail(pageName) {
var msg = `Create page "${pageName}" fail.`;
return new Error(msg);
}
static actionTypeError(pageName) {
let msg = `The action in page '${pageName}' is expect as function.`;
return new Error(msg);
}
static canntFindAction(pageName) {
let msg = `Cannt find action in page '${pageName}', is the exports has default field?`;
return new Error(msg);
}
static exportsCanntNull(pageName) {
let msg = `Exports of page '${pageName}' is null.`;
return new Error(msg);
}
static scrollerElementNotExists() {
let msg = "Scroller element is not exists.";
return new Error(msg);
}
static resourceExists(resourceName, pageName) {
let msg = `Rosource '${resourceName}' is exists in the resources of page '${pageName}'.`;
return new Error(msg);
}
static siteMapRootCanntNull() {
let msg = `The site map root node can not be null.`;
return new Error(msg);
}
}

var chitu;
(function (chitu) {
class Callback {
constructor() {
    this.funcs = new Array();
}
add(func) {
    this.funcs.push(func);
}
remove(func) {
    this.funcs = this.funcs.filter(o => o != func);
}
fire(...args) {
    this.funcs.forEach(o => o(...args));
}
}
chitu.Callback = Callback;
function Callbacks() {
return new Callback();
}
chitu.Callbacks = Callbacks;
function Callbacks1() {
return new Callback();
}
chitu.Callbacks1 = Callbacks1;
class ValueStore {
constructor(value) {
    this.items = new Array();
    this._value = value;
}
add(func, sender) {
    this.items.push({ func, sender });
    return func;
}
remove(func) {
    this.items = this.items.filter(o => o.func != func);
}
fire(value) {
    this.items.forEach(o => o.func(value, o.sender));
}
get value() {
    return this._value;
}
set value(value) {
    this._value = value;
    this.fire(value);
}
}
chitu.ValueStore = ValueStore;
})(chitu || (chitu = {}));

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
return new (P || (P = Promise))(function (resolve, reject) {
function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
step((generator = generator.apply(thisArg, _arguments || [])).next());
});
};
var chitu;
(function (chitu) {
class Page {
constructor(params) {
    this.animationTime = 300;
    this.error = chitu.Callbacks();
    this.load = chitu.Callbacks();
    this.loadComplete = chitu.Callbacks();
    this.showing = chitu.Callbacks();
    this.shown = chitu.Callbacks();
    this.hiding = chitu.Callbacks();
    this.hidden = chitu.Callbacks();
    this.closing = chitu.Callbacks();
    this.closed = chitu.Callbacks();
    this.active = chitu.Callbacks();
    this.deactive = chitu.Callbacks();
    this._element = params.element;
    this._previous = params.previous;
    this._app = params.app;
    this._routeData = params.routeData;
    this._displayer = params.displayer;
    this.loadPageAction();
}
on_load() {
    return this.load.fire(this, this.routeData.values);
}
on_loadComplete() {
    return this.loadComplete.fire(this, this.routeData.values);
}
on_showing() {
    return this.showing.fire(this, this.routeData.values);
}
on_shown() {
    return this.shown.fire(this, this.routeData.values);
}
on_hiding() {
    return this.hiding.fire(this, this.routeData.values);
}
on_hidden() {
    return this.hidden.fire(this, this.routeData.values);
}
on_closing() {
    return this.closing.fire(this, this.routeData.values);
}
on_closed() {
    return this.closed.fire(this, this.routeData.values);
}
show() {
    this.on_showing();
    return this._displayer.show(this).then(o => {
        this.on_shown();
    });
}
hide() {
    this.on_hiding();
    return this._displayer.hide(this).then(o => {
        this.on_hidden();
    });
}
close() {
    return this.hide().then(() => {
        this.on_closing();
        this._element.remove();
        this.on_closed();
    });
}
createService(type) {
    let service = new type();
    service.error.add((ender, error) => {
        this.error.fire(this, error);
    });
    return service;
}
get element() {
    return this._element;
}
get previous() {
    return this._previous;
}
set previous(value) {
    this._previous = value;
}
get routeData() {
    return this._routeData;
}
get name() {
    return this.routeData.pageName;
}
loadPageAction() {
    return __awaiter(this, void 0, void 0, function* () {
        console.assert(this._routeData != null);
        let routeData = this._routeData;
        var url = routeData.actionPath;
        let actionResult;
        try {
            actionResult = yield loadjs(url);
        }
        catch (err) {
            this.error.fire(this, err);
            throw err;
        }
        if (!actionResult)
            throw Errors.exportsCanntNull(routeData.pageName);
        let actionName = 'default';
        let action = actionResult[actionName];
        if (action == null) {
            throw Errors.canntFindAction(routeData.pageName);
        }
        let actionExecuteResult;
        if (typeof action == 'function') {
            let actionResult = action(this);
            if (actionResult != null && actionResult.then != null && actionResult.catch != null) {
                actionResult.then(() => this.on_loadComplete());
            }
            else {
                this.on_loadComplete();
            }
        }
        else {
            throw Errors.actionTypeError(routeData.pageName);
        }
        this.on_load();
    });
}
reload() {
    return this.loadPageAction();
}
}
Page.tagName = 'div';
chitu.Page = Page;
})(chitu || (chitu = {}));
class PageDisplayerImplement {
show(page) {
page.element.style.display = 'block';
if (page.previous != null) {
    page.previous.element.style.display = 'none';
}
return Promise.resolve();
}
hide(page) {
page.element.style.display = 'none';
if (page.previous != null) {
    page.previous.element.style.display = 'block';
}
return Promise.resolve();
}
}

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
return new (P || (P = Promise))(function (resolve, reject) {
function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
step((generator = generator.apply(thisArg, _arguments || [])).next());
});
};
function ajax(url, options) {
return __awaiter(this, void 0, void 0, function* () {
let response = yield fetch(url, options);
let responseText = response.text();
let p;
if (typeof responseText == 'string') {
    p = new Promise((reslove, reject) => {
        reslove(responseText);
    });
}
else {
    p = responseText;
}
let text = yield responseText;
let textObject;
let isJSONContextType = (response.headers.get('content-type') || '').indexOf('json') >= 0;
if (isJSONContextType) {
    textObject = JSON.parse(text);
    textObject = travelJSON(textObject);
}
else {
    textObject = text;
}
if (response.status >= 300) {
    let err = new Error();
    err.method = options.method;
    err.name = `${response.status}`;
    err.message = isJSONContextType ? (textObject.Message || textObject.message) : textObject;
    err.message = err.message || response.statusText;
    throw err;
}
return textObject;
function travelJSON(obj) {
    const datePattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
    if (typeof obj === 'string' && obj.match(datePattern)) {
        return new Date(obj);
    }
    else if (typeof obj === 'string') {
        return obj;
    }
    var stack = new Array();
    stack.push(obj);
    while (stack.length > 0) {
        var item = stack.pop();
        for (var key in item) {
            var value = item[key];
            if (value == null)
                continue;
            if (value instanceof Array) {
                for (var i = 0; i < value.length; i++) {
                    stack.push(value[i]);
                }
                continue;
            }
            if (typeof value == 'object') {
                stack.push(value);
                continue;
            }
            if (typeof value == 'string' && value.match(datePattern)) {
                item[key] = new Date(value);
            }
        }
    }
    return obj;
}
});
}
var chitu;
(function (chitu) {
class Service {
constructor() {
    this.error = chitu.Callbacks();
}
ajax(url, options) {
    return new Promise((reslove, reject) => {
        let timeId;
        if (options.method == 'get') {
            timeId = setTimeout(() => {
                let err = new Error();
                err.name = 'timeout';
                err.message = '网络连接超时';
                reject(err);
                this.error.fire(this, err);
                clearTimeout(timeId);
            }, Service.settings.ajaxTimeout * 1000);
        }
        ajax(url, options)
            .then(data => {
            reslove(data);
            if (timeId)
                clearTimeout(timeId);
        })
            .catch(err => {
            reject(err);
            this.error.fire(this, err);
            if (timeId)
                clearTimeout(timeId);
        });
    });
}
getByJson(url, data) {
    console.assert(url.indexOf('?') < 0);
    if (data) {
        url = url + '?' + JSON.stringify(data);
    }
    return this.ajaxByJSON(url, null, 'get');
}
postByJson(url, data) {
    return this.ajaxByJSON(url, data, 'post');
}
deleteByJson(url, data) {
    return this.ajaxByJSON(url, data, 'delete');
}
putByJson(url, data) {
    return this.ajaxByJSON(url, data, 'put');
}
get(url, data) {
    data = data || {};
    let urlParams = '';
    for (let key in data) {
        urlParams = urlParams + `&${key}=${data[key]}`;
    }
    console.assert(url.indexOf('?') < 0);
    if (urlParams)
        url = url + '?' + urlParams.substr(1);
    let options = {
        method: 'get',
    };
    return this.ajax(url, options);
}
post(url, data) {
    return this.ajaxByForm(url, data, 'post');
}
put(url, data) {
    return this.ajaxByForm(url, data, 'put');
}
delete(url, data) {
    return this.ajaxByForm(url, data, 'delete');
}
ajaxByForm(url, data, method) {
    let headers = {};
    headers['content-type'] = 'application/x-www-form-urlencoded';
    let body = new URLSearchParams();
    for (let key in data) {
        body.append(key, data[key]);
    }
    return this.ajax(url, { headers, body, method });
}
ajaxByJSON(url, data, method) {
    let headers = {};
    headers['content-type'] = 'application/json';
    let body;
    if (data)
        body = JSON.stringify(data);
    let options = {
        headers,
        body,
        method
    };
    return this.ajax(url, options);
}
}
Service.settings = {
ajaxTimeout: 30,
};
chitu.Service = Service;
})(chitu || (chitu = {}));

function combinePath(path1, path2) {
if (!path1)
throw Errors.argumentNull('path1');
if (!path2)
throw Errors.argumentNull('path2');
path1 = path1.trim();
if (!path1.endsWith('/'))
path1 = path1 + '/';
return path1 + path2;
}
function loadjs(path) {
return new Promise((reslove, reject) => {
requirejs([path], function (result) {
    reslove(result);
}, function (err) {
    reject(err);
});
});
}

window['chitu'] = window['chitu'] || chitu 
                    
return chitu;
    });