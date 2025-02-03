const { checkPortsStatus } = require("../lib/common");

test("Testing checkPortStatus IN USE", async () => {
    const result = await checkPortsStatus("github.com", 443, "IN USE");
    expect(result).toStrictEqual({ STATUS: "IN USE", PORT: 443 });
});

test("Testing checkPortStatus NULL", async () => {
    const result = await checkPortsStatus("github.com", 3000, "IN USE");
    expect(result).toStrictEqual({ STATUS: null, PORT: null });
});
