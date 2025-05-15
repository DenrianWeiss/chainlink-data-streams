import { expect } from "chai";
import { ReportV1, ReportV2, ReportV3, ReportV4 } from "../report";


describe("Report", () => {
    it("should work with v1 report", () => {
        const v1ReportTemplates = "00016b4aa7e57ca7b68ae1bf45653f56b656fd3aa335e" + 
        "f7fae696b663f1b84720000000000000000000000000000000000000000000000000000" + 
        "00006825906a00000000000000000000000000000000000000000000000000000000000" + 
        "00064000000000000000000000000000000000000000000000000000000000000006400" + 
        "00000000000000000000000000000000000000000000000000000000000064000000000" + 
        "00000000000000000000000000000000000000000000000000000640000070407020401" +
        "522602090605060802080505a335ef7fae696b663f1b840100000000000000000000000" + 
        "000000000000000000000000000000000000bbbda000000000000000000000000000000" + 
        "000000000000000000000000006825906a"
        const v1ReportDes = ReportV1.fromBytes(Buffer.from(v1ReportTemplates, "hex"));
        const v1Report = ReportV1.fromBytes(v1ReportDes.toBytes());
        expect(v1Report.toString()).to.equal(v1ReportTemplates);
        // Check inner details
        // feedID: 00, 01, 107, 74, 167, 229, 124, 167, 182, 138, 225, 191, 69, 101, 63, 86, 182, 86, 253, 58, 163, 53, 239, 127, 174, 105, 107, 102, 63, 27, 132, 114
        expect(v1Report.FeedID.toString()).to.equal("0x00016b4aa7e57ca7b68ae1bf45653f56b656fd3aa335ef7fae696b663f1b8472");
        // Benchmark price, bid, ask, current block: 100
        expect(v1Report.BenchmarkPrice.toString()).to.equal("100");
        expect(v1Report.Bid.toString()).to.equal("100");
        expect(v1Report.Ask.toString()).to.equal("100");
        expect(v1Report.CurrentBlockNum.toString()).to.equal("100");
        // Current block hash: 0, 0, 7, 4, 7, 2, 4, 1, 82, 38, 2, 9, 6, 5, 6, 8, 2, 8, 5, 5, 163, 53, 239, 127, 174, 105, 107, 102, 63, 27, 132, 1
        const blockHash = new Uint8Array([0, 0, 7, 4, 7, 2, 4, 1, 82, 38, 2, 9, 6, 5, 6, 8, 2, 8, 5, 5, 163, 53, 239, 127, 174, 105, 107, 102, 63, 27, 132, 1])
        expect(v1Report.CurrentBlockHash).to.be.deep.equal(blockHash);
        // Valid from blocknum: 768986
        expect(v1Report.ValidFromBlockNum.toString()).to.equal("768986");
    });
    it("should work with v2 report", () => {
        const v2ReportTemplates = "00026b4aa7e57ca7b68ae1bf45653f56b656fd3aa335ef7fae696b663f1b847200000000000000000000000000000000000000000000000000000000682593510000000000000000000000000000000000000000000000000000000068259351000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000682593b50000000000000000000000000000000000000000000000000000000000000064";
        const v2ReportDes = ReportV2.fromBytes(Buffer.from(v2ReportTemplates, "hex"));
        const v2Report = ReportV2.fromBytes(v2ReportDes.toBytes());
        expect(v2Report.toString()).to.equal(v2ReportTemplates);
        // Check inner details
        expect(v2Report.FeedID.toString()).to.equal("0x00026b4aa7e57ca7b68ae1bf45653f56b656fd3aa335ef7fae696b663f1b8472");
        // BenchmarkPrice: 100, linkFee, nativeFee: 10
        expect(v2Report.BenchmarkPrice.toString()).to.equal("100");
        expect(v2Report.LinkFee.toString()).to.equal("10");
        expect(v2Report.NativeFee.toString()).to.equal("10");
    });
    it("should work with v3 report", () => {
        const v3ReportTemplates = "00036b4aa7e57ca7b68ae1bf45653f56b656fd3aa335ef7fae696b663f1b847200000000000000000000000000000000000000000000000000000000682593c600000000000000000000000000000000000000000000000000000000682593c6000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000006825942a000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000640000000000000000000000000000000000000000000000000000000000000064";
        const v3ReportDes = ReportV3.fromBytes(Buffer.from(v3ReportTemplates, "hex"));
        const v3Report = ReportV3.fromBytes(v3ReportDes.toBytes());
        expect(v3Report.toString()).to.equal(v3ReportTemplates);
    });
    it("should work with v4 report", () => {
        const v4ReportTemplates = "00046b4aa7e57ca7b68ae1bf45653f56b656fd3aa335ef7fae696b663f1b847200000000000000000000000000000000000000000000000000000000682594610000000000000000000000000000000000000000000000000000000068259461000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000682594c500000000000000000000000000000000000000000000000000000000000000640000000000000000000000000000000000000000000000000000000000000002";
        const v4ReportDes = ReportV4.fromBytes(Buffer.from(v4ReportTemplates, "hex"));
        const v4Report = ReportV4.fromBytes(v4ReportDes.toBytes());
        expect(v4Report.toString()).to.equal(v4ReportTemplates);
        // Check inner details
        expect(v4Report.FeedID.toString()).to.equal("0x00046b4aa7e57ca7b68ae1bf45653f56b656fd3aa335ef7fae696b663f1b8472");
        expect(v4Report.BenchmarkPrice.toString()).to.equal("100");
        expect(v4Report.LinkFee.toString()).to.equal("10");
        expect(v4Report.NativeFee.toString()).to.equal("10");
        expect(v4Report.MarketStatus.toString()).to.equal('2');
    });
})