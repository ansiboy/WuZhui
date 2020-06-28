const { mocks } = require("mock-browser");
const { GridView, ArrayDataSource, BoundField } = require("../out/index");

let b = new mocks.MockBrowser();
let document = b.getDocument();
let defaultElementProvider = {
    createRowElement: () => document.createElement("tr"),
    createCellElement: () => document.createElement('td'),
    createViewElement: () => document.createElement("table"),
    createHeaderElement: () => document.createElement("thead"),
    createFooterElement: () => document.createElement("tfoot"),
    createBodyElement: () => document.createElement("tbody"),
}


let divElementProvider = {
    createRowElement() {
        let e = document.createElement("div");
        e.className = "tr";
        return e;
    },
    createCellElement() {
        let e = document.createElement('div');
        e.className = "td";
        return e;
    },
    createViewElement() {
        let e = document.createElement("div");
        e.className = "table";
        return e;
    },
    createHeaderElement() {
        let e = document.createElement("div");
        e.className = "thead";
        return e;
    },
    createFooterElement() {
        let e = document.createElement("div");
        e.className = "tfoot";
        return e;
    },
    createBodyElement() {
        let e = document.createElement("div");
        e.className = "tbody";
        return e;
    },
}

exports.elementProvider = defaultElementProvider;
exports.divElementProvider = divElementProvider;
exports.createGridView = async function (elementProvider) {
    elementProvider = elementProvider || defaultElementProvider;
    let dataSource = new ArrayDataSource([
        { name: 'tom', age: 8 },
        { name: 'may', age: 10 }
    ]);

    let gridView = new GridView({
        element: elementProvider.createViewElement(),
        dataSource,
        columns: [
            new BoundField({ dataField: 'name' }),
            new BoundField({ dataField: 'age' })
        ]
    }, elementProvider);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gridView);
        }, 10)
    })

}