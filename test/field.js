const { BoundField } = require("../out/index");
const { elementProvider } = require("./common");

describe("field", function () {
    it("createItemCell", function () {

        const { mocks } = require("mock-browser");
        let b = new mocks.MockBrowser();
        global.document = b.getDocument();
        let dataItem = { name: 'tom', age: 8 };
        let field = new BoundField({ dataField: "name" }, elementProvider);
        let cell = field.createItemCell(dataItem);
        if (cell.render != null) {
            cell.render(dataItem, "edit");
        }
        let outerHTML = cell.element.outerHTML;
        console.log(outerHTML);
    })
})