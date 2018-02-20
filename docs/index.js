
requirejs.config({
    shim: {
        highlight_javascript: {
            deps: ['highlight']
        }
    },
    paths: {
        chitu: 'js/chitu',
        css: 'js/css',
        highlight: 'js/highlight.js/highlight.pack',
        highlight_javascript: 'js/highlight.js/languages/javascript',
        highlight_css: 'js/highlight.js/styles/rainbow'
    }
})
// window.onhashchange = function () {
//     loadContent();
// }

// function loadContent() {
//     let file_name = !location.hash ? 'index' : location.hash.substr(1);
//     let url = 'md_files/' + file_name + '.md';
//     fetch(url)
//         .then(res => {
//             return res.text();
//         })
//         .then(text => {
//             var html_content = marked(text);
//             var container = document.getElementsByClassName('container')[0];
//             container.innerHTML = html_content;

//             if (file_name != 'index') {
//                 let js_path = 'md_files/' + file_name + '.js';
//                 require(['highlight', 'highlight_javascript', js_path], function (hljs, n, exports) {
//                     exports.default();
//                     document.querySelectorAll('code').forEach(block => {
//                         hljs.highlightBlock(block);
//                     })
//                 });
//             }
//         })
// }

// loadContent();

requirejs(['application'], function (app) {
    app.run()
})
requirejs(['css!highlight_css'])

/**
 * @param {()=>void} func 
 */
function action(func) {

    /**
     * @param {chitu.Page} page 
     */
    function actionFunction(page) {
        let url = `modules/${page.routeData.routeString}.md`
        fetch(url)
            .then(res => {
                return res.text();
            })
            .then(text => {
                var html_content = marked(text);
                // var container = document.getElementsByClassName('container')[0];
                page.element.innerHTML = html_content;

                // if (file_name != 'index') {
                //     let js_path = 'md_files/' + file_name + '.js';
                require(['highlight', 'highlight_javascript'], function (hljs, n) {
                    func();
                    page.element.querySelectorAll('code').forEach(block => {
                        hljs.highlightBlock(block);
                    })
                });
                // }
            })
    }

    define(['exports'], function (exports) {
        exports.default = actionFunction
    });
}

