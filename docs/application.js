define(['chitu'], function () {
    class Application extends chitu.Application {
        constructor() {
            super({ allowCachePage: false })
        }
        createPageElement(routeData) {
            let element = super.createPageElement(routeData);
            let container = document.querySelector('.container')
            console.assert(container)
            container.appendChild(element)
            return element
        }
    }

    window['app'] = window['app'] || new Application()
    return window['app']
});