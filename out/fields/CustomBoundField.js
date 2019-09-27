define(["require", "exports", "./BoundField"], function (require, exports, BoundField_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CustomBoundField extends BoundField_1.BoundField {
        constructor(params) {
            super(params);
        }
        createItemCell(dataItem) {
            let cell = super.createItemCell(dataItem);
            let cellRender = cell.render;
            cell.render = function (dataItem) {
                let it = this;
                let params = it.field.params;
                if (it.mode == "read" && params.cellRender != null) {
                    params.cellRender.apply(cell, [dataItem, it.element]);
                    return;
                }
                cellRender.apply(cell, [dataItem]);
            };
            return cell;
        }
    }
    exports.CustomBoundField = CustomBoundField;
});
