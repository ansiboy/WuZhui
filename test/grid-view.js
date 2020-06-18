const assert = require("assert");
const { createGridView } = require("./common");

describe("crate grid view", function () {

    it("create grid view", async function () {
        let gridView = await createGridView()

        let gridViewHTML = gridView.element.outerHTML;
        // console.log(gridViewHTML);
        assert.ok(gridViewHTML.indexOf("tom") > 0);

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

        let gridView = await createGridView(elementProvider);
    })
})