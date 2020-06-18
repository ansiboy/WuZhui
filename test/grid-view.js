const { GridView, ArrayDataSource, BoundField } = require("../out/index");
const { elementProvider } = require("./element-provider");
const assert = require("assert");

let dataSource = new ArrayDataSource([
    { name: 'tom', age: 8 },
    { name: 'may', age: 10 }
]);


it("create grid view", async function () {
    let gridView = new GridView({
        dataSource: dataSource,
        columns: [
            new BoundField({ dataField: 'name' }),
            new BoundField({ dataField: 'age' })
        ]
    }, elementProvider);


    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let gridViewHTML = gridView.element.outerHTML;
            console.log(gridViewHTML);
            assert.ok(gridViewHTML.indexOf("tom") > 0);
            resolve();
        }, 10)
    })
})

it("grid view element provider", async function () {
    const { mocks } = require("mock-browser");
    let b = new mocks.MockBrowser();
    let document = b.getDocument();

    let elementProvider = {
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

    let gridView = new GridView({
        dataSource: dataSource,
        columns: [
            new BoundField({ dataField: 'name' }),
            new BoundField({ dataField: 'age' })
        ]
    }, elementProvider);


    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let gridViewHTML = gridView.element.outerHTML;
            // console.log(gridViewHTML);
            // assert.ok(gridViewHTML.indexOf("tom") > 0);
            resolve();
        }, 10)
    })
})

