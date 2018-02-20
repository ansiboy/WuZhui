define([
    'require',
    'chitu',
    'exports'
], function (require, c, exports) {
    'use strict';

    class Application extends chitu.Application {
        /**
         * @param {chitu.RouteData} routeData 
         */
        createPageElement(routeData) {
            let container = document.querySelector('.container')
            console.assert(container)
            let page_element = document.createElement('div')
            page_element.className = routeData.pageName
            container.appendChild(page_element)
            return page_element
        }
    }

    window['app'] = window['app'] || new Application()
    return window['app']
});