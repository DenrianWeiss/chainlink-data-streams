import { expect } from "chai";
import { FeedVersion, ID } from "../feed";

describe("Feed Version", () => {
    it("should successfully get version for v1 ID", () => {
        const preimageId: Uint8Array = new Uint8Array([
            0, 1, 107, 74, 167, 229, 124, 167, 182, 138, 225, 191, 69, 101, 63, 86, 182, 86, 253, 58, 163, 53, 239, 127, 174, 105, 107, 102, 63, 27, 132, 114
        ]);
        const idV1 = new ID(preimageId);
        expect(idV1.version()).to.equal(FeedVersion.FeedVersion1);
    });
    it("should successfully get version for v2 ID", () => {
        const preimageId: Uint8Array = new Uint8Array([
            0, 2, 107, 74, 167, 229, 124, 167, 182, 138, 225, 191, 69, 101, 63, 86, 182, 86, 253, 58, 163, 53, 239, 127, 174, 105, 107, 102, 63, 27, 132, 114
        ]);
        const idV2 = new ID(preimageId);
        expect(idV2.version()).to.equal(FeedVersion.FeedVersion2);
    });
    it("should successfully get version for v3 ID", () => {
        const preimageId: Uint8Array = new Uint8Array([
            0, 3, 107, 74, 167, 229, 124, 167, 182, 138, 225, 191, 69, 101, 63, 86, 182, 86, 253, 58, 163, 53, 239, 127, 174, 105, 107, 102, 63, 27, 132, 114
        ]);
        const idV3 = new ID(preimageId);
        expect(idV3.version()).to.equal(FeedVersion.FeedVersion3);
    });
    it("should successfully get version for v4 ID", () => {
        const preimageId: Uint8Array = new Uint8Array([
            0, 4, 107, 74, 167, 229, 124, 167, 182, 138, 225, 191, 69, 101, 63, 86, 182, 86, 253, 58, 163, 53, 239, 127, 174, 105, 107, 102, 63, 27, 132, 114
        ]);
        const idV4 = new ID(preimageId);
        expect(idV4.version()).to.equal(FeedVersion.FeedVersion4);
    });
});

describe("Feed Json", () => {
    it("should convert ID to JSON and back", () => {
        const preimageId: Uint8Array = new Uint8Array([
            0, 1, 107, 74, 167, 229, 124, 167, 182, 138, 225, 191, 69, 101, 63, 86, 182, 86, 253, 58, 163, 53, 239, 127, 174, 105, 107, 102, 63, 27, 132, 114
        ]);
        const id = new ID(preimageId);
        const json = ID.toJson(id);
        const idFromJson = ID.fromJson(json);
        expect(idFromJson.toString()).to.equal(id.toString());
        expect(json === "\"0x00016b4aa7e57ca7b68ae1bf45653f56b656fd3aa335ef7fae696b663f1b8472\"").to.be.true;
    })
})

