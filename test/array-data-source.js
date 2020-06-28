const { ArrayDataSource } = require("../out/index");
const assert = require("assert");

describe("array data source", function () {

    let arr = [
        { id: 1, name: "China" },
        { id: 2, name: "America" },
    ]
    let dataSource = new ArrayDataSource(arr, ["id"]);

    it("create data source", async function () {
        let r = await dataSource.select();
        assert.equal(r.dataItems.length, arr.length);
    })

    it("update data item", async function () {
        await dataSource.update({ id: 1, name: "Japan" });
        let item = arr.filter(o => o.id == 1)[0];
        assert.notEqual(item, null);
        assert.equal(item.name, "Japan");
    })

    it("find data item", async function () {
        let item = await dataSource.findDataItem({ id: 1 });
        assert.notEqual(item, null);
        assert.equal(item.id, 1);
    })
})