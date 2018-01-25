

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
            document.getElementsByClassName('container')[0].innerHTML = html_content;
        })
}

loadContent();