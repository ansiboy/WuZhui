declare namespace chitu {
    interface SiteMapNode {
        pageName: string;
        children?: this[];
    }
    interface SiteMap<T extends SiteMapNode> {
        root: T;
    }
    class RouteData {
        private _parameters;
        private path_string;
        private path_spliter_char;
        private path_contact_char;
        private param_spliter;
        private name_spliter_char;
        private _pathBase;
        private _pageName;
        private _actionPath;
        private _routeString;
        constructor(basePath: string, routeString: string, pathSpliterChar?: string);
        parseRouteString(): void;
        private pareeUrlQuery(query);
        readonly basePath: string;
        values: any;
        readonly pageName: string;
        readonly routeString: string;
        readonly actionPath: string;
    }
    class Application {
        static skipStateName: string;
        pageCreated: Callback1<Application, Page>;
        protected pageType: PageConstructor;
        protected pageDisplayType: PageDisplayConstructor;
        private _runned;
        private zindex;
        private page_stack;
        private cachePages;
        private _siteMap;
        fileBasePath: string;
        backFail: Callback1<Application, null>;
        error: Callback2<Application, Error, Page>;
        constructor(args?: {
            siteMap?: SiteMap<SiteMapNode>;
        });
        private setChildrenParent(parent);
        protected parseRouteString(routeString: string): RouteData;
        private on_pageCreated(page);
        readonly currentPage: Page;
        readonly pages: Array<Page>;
        protected createPage(routeData: RouteData): Page;
        protected createPageElement(routeData: chitu.RouteData): HTMLElement;
        protected hashchange(): void;
        run(): void;
        getPage(name: string): Page;
        private getPageByRouteString(routeString);
        showPage(routeString: string, args?: any): Page;
        private pushPage(page);
        private findSiteMapNode(pageName);
        setLocationHash(routeString: string): void;
        closeCurrentPage(): void;
        private clearPageStack();
        redirect(routeString: string, args?: any): Page;
        back(): void;
    }
}

declare class Errors {
    static argumentNull(paramName: string): Error;
    static modelFileExpecteFunction(script: any): Error;
    static paramTypeError(paramName: string, expectedType: string): Error;
    static paramError(msg: string): Error;
    static viewNodeNotExists(name: any): Error;
    static pathPairRequireView(index: any): Error;
    static notImplemented(name: any): Error;
    static routeExists(name: any): Error;
    static noneRouteMatched(url: any): Error;
    static emptyStack(): Error;
    static canntParseUrl(url: string): Error;
    static canntParseRouteString(routeString: string): Error;
    static routeDataRequireController(): Error;
    static routeDataRequireAction(): Error;
    static viewCanntNull(): Error;
    static createPageFail(pageName: string): Error;
    static actionTypeError(pageName: string): Error;
    static canntFindAction(pageName: any): Error;
    static exportsCanntNull(pageName: string): Error;
    static scrollerElementNotExists(): Error;
    static resourceExists(resourceName: string, pageName: string): Error;
    static siteMapRootCanntNull(): Error;
}

declare namespace chitu {
    class Callback {
        private funcs;
        constructor();
        add(func: (...args: Array<any>) => any): void;
        remove(func: (...args: Array<any>) => any): void;
        fire(...args: Array<any>): void;
    }
    interface Callback1<S, A> extends Callback {
        add(func: (sender: S, arg: A) => any): any;
        remove(func: (sender: S, arg: A) => any): any;
        fire(sender: S, arg: A): any;
    }
    interface Callback2<S, A, A1> extends Callback {
        add(func: (sender: S, arg: A, arg1: A1) => any): any;
        remove(func: (sender: S, arg: A, arg1: A1) => any): any;
        fire(sender: S, arg: A, arg1: A1): any;
    }
    function Callbacks<S, A>(): Callback1<S, A>;
    function Callbacks1<S, A, A1>(): Callback2<S, A, A1>;
    type ValueChangedCallback<T> = (args: T, sender: any) => void;
    class ValueStore<T> {
        private items;
        private _value;
        constructor(value?: T);
        add(func: ValueChangedCallback<T>, sender?: any): ValueChangedCallback<T>;
        remove(func: ValueChangedCallback<T>): void;
        fire(value: T): void;
        value: T;
    }
}

declare namespace chitu {
    interface PageDisplayConstructor {
        new (app: Application): PageDisplayer;
    }
    interface PageDisplayer {
        show(page: Page): Promise<any>;
        hide(page: Page): Promise<any>;
    }
    interface PageParams {
        app: Application;
        routeData: RouteData;
        element: HTMLElement;
        displayer: PageDisplayer;
        previous?: Page;
    }
    class Page {
        private animationTime;
        private num;
        private _element;
        private _previous;
        private _app;
        private _routeData;
        private _displayer;
        static tagName: string;
        error: Callback1<Page, Error>;
        load: Callback1<this, any>;
        loadComplete: Callback1<this, any>;
        showing: Callback1<this, any>;
        shown: Callback1<this, any>;
        hiding: Callback1<this, any>;
        hidden: Callback1<this, any>;
        closing: Callback1<this, any>;
        closed: Callback1<this, any>;
        active: Callback1<this, any>;
        deactive: Callback1<this, any>;
        constructor(params: PageParams);
        private on_load();
        private on_loadComplete();
        private on_showing();
        private on_shown();
        private on_hiding();
        private on_hidden();
        private on_closing();
        private on_closed();
        show(): Promise<any>;
        hide(): Promise<any>;
        close(): Promise<any>;
        createService<T extends Service>(type: ServiceConstructor<T>): T;
        readonly element: HTMLElement;
        previous: Page;
        readonly routeData: RouteData;
        readonly name: string;
        private loadPageAction();
        reload(): Promise<void>;
    }
}
interface PageActionConstructor {
    new (page: chitu.Page): any;
}
interface PageConstructor {
    new (args: chitu.PageParams): chitu.Page;
}
declare class PageDisplayerImplement implements chitu.PageDisplayer {
    show(page: chitu.Page): Promise<void>;
    hide(page: chitu.Page): Promise<void>;
}

interface ServiceError extends Error {
    method?: string;
}
declare function ajax<T>(url: string, options: RequestInit): Promise<T>;
declare namespace chitu {
    interface ServiceConstructor<T> {
        new (): T;
    }
    abstract class Service {
        error: Callback1<Service, Error>;
        static settings: {
            ajaxTimeout: number;
        };
        constructor();
        ajax<T>(url: string, options: RequestInit): Promise<T>;
        protected getByJson<T>(url: string, data?: any): Promise<T>;
        protected postByJson<T>(url: string, data?: Object): Promise<T>;
        protected deleteByJson<T>(url: string, data?: Object): Promise<T>;
        protected putByJson<T>(url: string, data?: Object): Promise<T>;
        protected get<T>(url: string, data?: any): Promise<T>;
        protected post<T>(url: string, data?: any): Promise<T>;
        protected put<T>(url: string, data?: any): Promise<T>;
        protected delete<T>(url: string, data?: any): Promise<T>;
        protected ajaxByForm<T>(url: string, data: Object, method: string): Promise<T>;
        protected ajaxByJSON<T>(url: string, data: Object, method: string): Promise<T>;
    }
}

declare function combinePath(path1: string, path2: string): string;
declare function loadjs(path: any): Promise<any>;
declare module "maishu-chitu" { 
            export = chitu; 
        }

declare namespace chitu {
    interface SiteMapNode {
        pageName: string;
        children?: this[];
    }
    interface SiteMap<T extends SiteMapNode> {
        root: T;
    }
    class RouteData {
        private _parameters;
        private path_string;
        private path_spliter_char;
        private path_contact_char;
        private param_spliter;
        private name_spliter_char;
        private _pathBase;
        private _pageName;
        private _actionPath;
        private _routeString;
        constructor(basePath: string, routeString: string, pathSpliterChar?: string);
        parseRouteString(): void;
        private pareeUrlQuery(query);
        readonly basePath: string;
        values: any;
        readonly pageName: string;
        readonly routeString: string;
        readonly actionPath: string;
    }
    class Application {
        static skipStateName: string;
        pageCreated: Callback1<Application, Page>;
        protected pageType: PageConstructor;
        protected pageDisplayType: PageDisplayConstructor;
        private _runned;
        private zindex;
        private page_stack;
        private cachePages;
        private _siteMap;
        fileBasePath: string;
        backFail: Callback1<Application, null>;
        error: Callback2<Application, Error, Page>;
        constructor(args?: {
            siteMap?: SiteMap<SiteMapNode>;
        });
        private setChildrenParent(parent);
        protected parseRouteString(routeString: string): RouteData;
        private on_pageCreated(page);
        readonly currentPage: Page;
        readonly pages: Array<Page>;
        protected createPage(routeData: RouteData): Page;
        protected createPageElement(routeData: chitu.RouteData): HTMLElement;
        protected hashchange(): void;
        run(): void;
        getPage(name: string): Page;
        private getPageByRouteString(routeString);
        showPage(routeString: string, args?: any): Page;
        private pushPage(page);
        private findSiteMapNode(pageName);
        setLocationHash(routeString: string): void;
        closeCurrentPage(): void;
        private clearPageStack();
        redirect(routeString: string, args?: any): Page;
        back(): void;
    }
}

declare class Errors {
    static argumentNull(paramName: string): Error;
    static modelFileExpecteFunction(script: any): Error;
    static paramTypeError(paramName: string, expectedType: string): Error;
    static paramError(msg: string): Error;
    static viewNodeNotExists(name: any): Error;
    static pathPairRequireView(index: any): Error;
    static notImplemented(name: any): Error;
    static routeExists(name: any): Error;
    static noneRouteMatched(url: any): Error;
    static emptyStack(): Error;
    static canntParseUrl(url: string): Error;
    static canntParseRouteString(routeString: string): Error;
    static routeDataRequireController(): Error;
    static routeDataRequireAction(): Error;
    static viewCanntNull(): Error;
    static createPageFail(pageName: string): Error;
    static actionTypeError(pageName: string): Error;
    static canntFindAction(pageName: any): Error;
    static exportsCanntNull(pageName: string): Error;
    static scrollerElementNotExists(): Error;
    static resourceExists(resourceName: string, pageName: string): Error;
    static siteMapRootCanntNull(): Error;
}

declare namespace chitu {
    class Callback {
        private funcs;
        constructor();
        add(func: (...args: Array<any>) => any): void;
        remove(func: (...args: Array<any>) => any): void;
        fire(...args: Array<any>): void;
    }
    interface Callback1<S, A> extends Callback {
        add(func: (sender: S, arg: A) => any): any;
        remove(func: (sender: S, arg: A) => any): any;
        fire(sender: S, arg: A): any;
    }
    interface Callback2<S, A, A1> extends Callback {
        add(func: (sender: S, arg: A, arg1: A1) => any): any;
        remove(func: (sender: S, arg: A, arg1: A1) => any): any;
        fire(sender: S, arg: A, arg1: A1): any;
    }
    function Callbacks<S, A>(): Callback1<S, A>;
    function Callbacks1<S, A, A1>(): Callback2<S, A, A1>;
    type ValueChangedCallback<T> = (args: T, sender: any) => void;
    class ValueStore<T> {
        private items;
        private _value;
        constructor(value?: T);
        add(func: ValueChangedCallback<T>, sender?: any): ValueChangedCallback<T>;
        remove(func: ValueChangedCallback<T>): void;
        fire(value: T): void;
        value: T;
    }
}

declare namespace chitu {
    interface PageDisplayConstructor {
        new (app: Application): PageDisplayer;
    }
    interface PageDisplayer {
        show(page: Page): Promise<any>;
        hide(page: Page): Promise<any>;
    }
    interface PageParams {
        app: Application;
        routeData: RouteData;
        element: HTMLElement;
        displayer: PageDisplayer;
        previous?: Page;
    }
    class Page {
        private animationTime;
        private num;
        private _element;
        private _previous;
        private _app;
        private _routeData;
        private _displayer;
        static tagName: string;
        error: Callback1<Page, Error>;
        load: Callback1<this, any>;
        loadComplete: Callback1<this, any>;
        showing: Callback1<this, any>;
        shown: Callback1<this, any>;
        hiding: Callback1<this, any>;
        hidden: Callback1<this, any>;
        closing: Callback1<this, any>;
        closed: Callback1<this, any>;
        active: Callback1<this, any>;
        deactive: Callback1<this, any>;
        constructor(params: PageParams);
        private on_load();
        private on_loadComplete();
        private on_showing();
        private on_shown();
        private on_hiding();
        private on_hidden();
        private on_closing();
        private on_closed();
        show(): Promise<any>;
        hide(): Promise<any>;
        close(): Promise<any>;
        createService<T extends Service>(type: ServiceConstructor<T>): T;
        readonly element: HTMLElement;
        previous: Page;
        readonly routeData: RouteData;
        readonly name: string;
        private loadPageAction();
        reload(): Promise<void>;
    }
}
interface PageActionConstructor {
    new (page: chitu.Page): any;
}
interface PageConstructor {
    new (args: chitu.PageParams): chitu.Page;
}
declare class PageDisplayerImplement implements chitu.PageDisplayer {
    show(page: chitu.Page): Promise<void>;
    hide(page: chitu.Page): Promise<void>;
}

interface ServiceError extends Error {
    method?: string;
}
declare function ajax<T>(url: string, options: RequestInit): Promise<T>;
declare namespace chitu {
    interface ServiceConstructor<T> {
        new (): T;
    }
    abstract class Service {
        error: Callback1<Service, Error>;
        static settings: {
            ajaxTimeout: number;
        };
        constructor();
        ajax<T>(url: string, options: RequestInit): Promise<T>;
        protected getByJson<T>(url: string, data?: any): Promise<T>;
        protected postByJson<T>(url: string, data?: Object): Promise<T>;
        protected deleteByJson<T>(url: string, data?: Object): Promise<T>;
        protected putByJson<T>(url: string, data?: Object): Promise<T>;
        protected get<T>(url: string, data?: any): Promise<T>;
        protected post<T>(url: string, data?: any): Promise<T>;
        protected put<T>(url: string, data?: any): Promise<T>;
        protected delete<T>(url: string, data?: any): Promise<T>;
        protected ajaxByForm<T>(url: string, data: Object, method: string): Promise<T>;
        protected ajaxByJSON<T>(url: string, data: Object, method: string): Promise<T>;
    }
}

declare function combinePath(path1: string, path2: string): string;
declare function loadjs(path: any): Promise<any>;
declare module "maishu-chitu" { 
            export = chitu; 
        }
