
requirejs.config({
    shim: {
        highlight_javascript: {
            deps: ['highlight']
        }
    },
    paths: {
        highlight: 'js/highlight.js/highlight.pack',
        highlight_javascript: 'js/highlight.js/languages/javascript',
    }
})
window.onhashchange = function () {
    loadContent();
}

function loadContent() {
    let file_name = !location.hash ? 'index' : location.hash.substr(1);
    let url = 'md_files/' + file_name + '.md';
    fetch(url)
        .then(res => {
            return res.text();
        })
        .then(text => {
            var html_content = marked(text);
            var container = document.getElementsByClassName('container')[0];
            container.innerHTML = html_content;

            if (file_name != 'index') {
                let js_path = 'md_files/' + file_name + '.js';
                require(['highlight', 'highlight_javascript', js_path], function (hljs, n, exports) {
                    exports.default();
                    document.querySelectorAll('code').forEach(block => {
                        hljs.highlightBlock(block);
                    })
                });
            }
        })
}

loadContent();