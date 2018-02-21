define(['chitu'], function () {
    class Application extends chitu.Application {
        constructor() {
            super({
                allowCachePage: false,
                siteMap: {
                    root: {
                        pageName: 'index',
                        children: [
                            { pageName: 'gridView.data_paging' }
                        ]
                    }
                }
            })
        }
        /**
         * 
         * @param {chitu.RouteData} routeData 
         */
        createPageElement(routeData) {
            let element = super.createPageElement(routeData);
            element.className = routeData.pageName
            let container = document.querySelector('.container')
            console.assert(container)
            container.appendChild(element)
            return element
        }
    }

    window['app'] = window['app'] || new Application()
    return window['app']
});