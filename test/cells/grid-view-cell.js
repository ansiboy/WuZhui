const { GridViewCell } = require("../../out/index");
const { mocks } = require("mock-browser");

it("create grid view cell", function () {
    let b = new mocks.MockBrowser();
    let doc = b.getDocument();
    let cellElement = doc.createElement("div");
    let cell = new GridViewCell(cellElement);
})