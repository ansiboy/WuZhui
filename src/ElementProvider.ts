export interface ElementProvider {
    createRowElement: () => HTMLElement,
    createCellElement: (type: "header" | "body" | "footer") => HTMLElement,
    // createViewElement: () => HTMLElement,
    createHeaderElement: () => HTMLElement,
    createFooterElement: () => HTMLElement,
    createBodyElement: () => HTMLElement,
}

export let defaultElementProvider: ElementProvider = {
    createRowElement: () => document.createElement("tr"),
    createCellElement: (type: "header" | "body" | "footer" = "body") => type == "header" ? document.createElement("th") : document.createElement('td'),
    // createViewElement: () => document.createElement("table"),
    createHeaderElement: () => document.createElement("thead"),
    createFooterElement: () => document.createElement("tfoot"),
    createBodyElement: () => document.createElement("tbody"),
}
