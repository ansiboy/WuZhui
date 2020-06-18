const { mocks } = require("mock-browser");
let b = new mocks.MockBrowser();
let document = b.getDocument();
exports.elementProvider = {
    createRowElement: () => document.createElement("tr"),
    createCellElement: () => document.createElement('td'),
    createViewElement: () => document.createElement("table"),
    createHeaderElement: () => document.createElement("thead"),
    createFooterElement: () => document.createElement("tfoot"),
    createBodyElement: () => document.createElement("tbody"),
}