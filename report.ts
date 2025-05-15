import ethers from 'ethers';
import { ID } from './feed';

export class ReportV1 {
    // Members: 
    //   feedId bytes32
    //   observationsTimestamp uint32
    //   benchmarkPrice int192
    //   bid int192
    //   ask int192
    //   currentBlockNum uint64
    //   currentBlockHash bytes32
    //   validFromBlockNum uint64
    //   currentBlockTimestamp uint64
    FeedID: ID
    ObservationsTimestamp: number
    BenchmarkPrice: BigInt
    Bid: BigInt
    Ask: BigInt
    CurrentBlockNum: number
    CurrentBlockHash: Uint8Array
    ValidFromBlockNum: number
    CurrentBlockTimestamp: number

    constructor(
        feedId: ID,
        observationsTimestamp: number,
        benchmarkPrice: BigInt,
        bid: BigInt,
        ask: BigInt,
        currentBlockNum: number,
        currentBlockHash: Uint8Array,
        validFromBlockNum: number,
        currentBlockTimestamp: number
    ) {
        this.FeedID = feedId;
        this.ObservationsTimestamp = observationsTimestamp;
        this.BenchmarkPrice = benchmarkPrice;
        this.Bid = bid;
        this.Ask = ask;
        this.CurrentBlockNum = currentBlockNum;
        this.CurrentBlockHash = currentBlockHash;
        this.ValidFromBlockNum = validFromBlockNum;
        this.CurrentBlockTimestamp = currentBlockTimestamp;
    }

    public static fromBytes(bytes: Uint8Array): ReportV1 {
        // Use ethers to unpack the bytes
        let decoded = ethers.utils.defaultAbiCoder.decode(
            [
                'bytes32', // feedId
                'uint32', // observationsTimestamp
                'int192', // benchmarkPrice
                'int192', // bid
                'int192', // ask
                'uint64', // currentBlockNum
                'bytes32', // currentBlockHash
                'uint64', // validFromBlockNum
                'uint64'  // currentBlockTimestamp
            ],
            bytes
        )
        return new ReportV1(
            decoded[0] as ID,
            decoded[1] as number,
            decoded[2] as BigInt,
            decoded[3] as BigInt,
            decoded[4] as BigInt,
            decoded[5] as number,
            ethers.utils.arrayify(decoded[6]) as Uint8Array,
            decoded[7] as number,
            decoded[8] as number
        );
    }

    public toBytes(): Uint8Array {
        // Use ethers to pack the bytes
        let packed = ethers.utils.defaultAbiCoder.encode(
            [
                'bytes32', // feedId
                'uint32', // observationsTimestamp
                'int192', // benchmarkPrice
                'int192', // bid
                'int192', // ask
                'uint64', // currentBlockNum
                'bytes32', // currentBlockHash
                'uint64', // validFromBlockNum
                'uint64'  // currentBlockTimestamp
            ],
            [
                this.FeedID,
                this.ObservationsTimestamp,
                this.BenchmarkPrice,
                this.Bid,
                this.Ask,
                this.CurrentBlockNum,
                this.CurrentBlockHash,
                this.ValidFromBlockNum,
                this.CurrentBlockTimestamp
            ]
        )
        return ethers.utils.arrayify(packed);
    }

    public toString(): string {
        return ethers.utils.hexlify(this.toBytes()).slice(2);
    }
}

export class ReportV2 {
    // Members:
    //   feedId bytes32
    //   validFromTimestamp uint32
    //   observationsTimestamp uint32
    //   nativeFee uint192
    //   linkFee uint192
    //   expiresAt uint32
    //   benchmarkPrice int192

    FeedID: ID
    ValidFromTimestamp: number
    ObservationsTimestamp: number
    NativeFee: BigInt
    LinkFee: BigInt
    ExpiresAt: number
    BenchmarkPrice: BigInt


    constructor(
        feedId: ID,
        validFromTimestamp: number,
        observationsTimestamp: number,
        nativeFee: BigInt,
        linkFee: BigInt,
        expiresAt: number,
        benchmarkPrice: BigInt
    ) {
        this.FeedID = feedId;
        this.ValidFromTimestamp = validFromTimestamp;
        this.ObservationsTimestamp = observationsTimestamp;
        this.NativeFee = nativeFee;
        this.LinkFee = linkFee;
        this.ExpiresAt = expiresAt;
        this.BenchmarkPrice = benchmarkPrice;
    }

    public static fromBytes(bytes: Uint8Array): ReportV2 {
        // Use ethers to unpack the bytes
        let decoded = ethers.utils.defaultAbiCoder.decode(
            [
                'bytes32', // feedId
                'uint32', // validFromTimestamp
                'uint32', // observationsTimestamp
                'int192', // nativeFee
                'int192', // linkFee
                'uint32', // expiresAt
                'int192'  // benchmarkPrice
            ],
            bytes
        )
        return new ReportV2(
            decoded[0] as ID,
            decoded[1] as number,
            decoded[2] as number,
            decoded[3] as BigInt,
            decoded[4] as BigInt,
            decoded[5] as number,
            decoded[6] as BigInt
        );
    }

    public toBytes(): Uint8Array {
        // Use ethers to pack the bytes
        let packed = ethers.utils.defaultAbiCoder.encode(
            [
                'bytes32', // feedId
                'uint32', // validFromTimestamp
                'uint32', // observationsTimestamp
                'int192', // nativeFee
                'int192', // linkFee
                'uint32', // expiresAt
                'int192'  // benchmarkPrice
            ],
            [
                this.FeedID,
                this.ValidFromTimestamp,
                this.ObservationsTimestamp,
                this.NativeFee,
                this.LinkFee,
                this.ExpiresAt,
                this.BenchmarkPrice
            ]
        )
        return ethers.utils.arrayify(packed);
    }
    public toString(): string {
        return ethers.utils.hexlify(this.toBytes()).slice(2);
    }
}

export class ReportV3 {
    // Members:
    //   feedId bytes32
    //   validFromTimestamp uint32
    //   observationsTimestamp uint32
    //   nativeFee uint192
    //   linkFee uint192
    //   expiresAt uint32
    //   benchmarkPrice int192
    //   bid int192
    //   ask int192

    FeedID: ID
    ValidFromTimestamp: number
    ObservationsTimestamp: number
    NativeFee: BigInt
    LinkFee: BigInt
    ExpiresAt: number
    BenchmarkPrice: BigInt
    Bid: BigInt
    Ask: BigInt
    
    constructor(
        feedId: ID,
        validFromTimestamp: number,
        observationsTimestamp: number,
        nativeFee: BigInt,
        linkFee: BigInt,
        expiresAt: number,
        benchmarkPrice: BigInt,
        bid: BigInt,
        ask: BigInt
    ) {
        this.FeedID = feedId;
        this.ValidFromTimestamp = validFromTimestamp;
        this.ObservationsTimestamp = observationsTimestamp;
        this.NativeFee = nativeFee;
        this.LinkFee = linkFee;
        this.ExpiresAt = expiresAt;
        this.BenchmarkPrice = benchmarkPrice;
        this.Bid = bid;
        this.Ask = ask;
    }

    public static fromBytes(bytes: Uint8Array): ReportV3 {
        // Use ethers to unpack the bytes
        let decoded = ethers.utils.defaultAbiCoder.decode(
            [
                'bytes32', // feedId
                'uint32', // validFromTimestamp
                'uint32', // observationsTimestamp
                'int192', // nativeFee
                'int192', // linkFee
                'uint32', // expiresAt
                'int192', // benchmarkPrice
                'int192', // bid
                'int192'  // ask
            ],
            bytes
        )
        return new ReportV3(
            decoded[0] as ID,
            decoded[1] as number,
            decoded[2] as number,
            decoded[3] as BigInt,
            decoded[4] as BigInt,
            decoded[5] as number,
            decoded[6] as BigInt,
            decoded[7] as BigInt,
            decoded[8] as BigInt
        );
    }

    public toBytes(): Uint8Array {
        // Use ethers to pack the bytes
        let packed = ethers.utils.defaultAbiCoder.encode(
            [
                'bytes32', // feedId
                'uint32', // validFromTimestamp
                'uint32', // observationsTimestamp
                'int192', // nativeFee
                'int192', // linkFee
                'uint32', // expiresAt
                'int192', // benchmarkPrice
                'int192', // bid
                'int192'  // ask
            ],
            [
                this.FeedID,
                this.ValidFromTimestamp,
                this.ObservationsTimestamp,
                this.NativeFee,
                this.LinkFee,
                this.ExpiresAt,
                this.BenchmarkPrice,
                this.Bid,
                this.Ask
            ]
        )
        return ethers.utils.arrayify(packed);
    }

    public toString(): string {
        return ethers.utils.hexlify(this.toBytes()).slice(2);
    }
}

export enum ReportV4MarketStatus {
    MarketStatusUnknown = 0,
    MarketStatusClosed = 1,
    MarketStatusOpen = 2,
}

export class ReportV4 {
    // Members:
    //   feedId bytes32
    //   validFromTimestamp uint32
    //   observationsTimestamp uint32
    //   nativeFee uint192
    //   linkFee uint192
    //   expiresAt uint32
    //   benchmarkPrice int192
    //   marketStatus uint32
    FeedID: ID
    ValidFromTimestamp: number
    ObservationsTimestamp: number
    NativeFee: BigInt
    LinkFee: BigInt
    ExpiresAt: number
    BenchmarkPrice: BigInt
    MarketStatus: ReportV4MarketStatus

    constructor(
        feedId: ID,
        validFromTimestamp: number,
        observationsTimestamp: number,
        nativeFee: BigInt,
        linkFee: BigInt,
        expiresAt: number,
        benchmarkPrice: BigInt,
        marketStatus: number
    ) {
        this.FeedID = feedId;
        this.ValidFromTimestamp = validFromTimestamp;
        this.ObservationsTimestamp = observationsTimestamp;
        this.NativeFee = nativeFee;
        this.LinkFee = linkFee;
        this.ExpiresAt = expiresAt;
        this.BenchmarkPrice = benchmarkPrice;
        this.MarketStatus = marketStatus;
    }

    public static fromBytes(bytes: Uint8Array): ReportV4 {
        // Use ethers to unpack the bytes
        let decoded = ethers.utils.defaultAbiCoder.decode(
            [
                'bytes32', // feedId
                'uint32', // validFromTimestamp
                'uint32', // observationsTimestamp
                'int192', // nativeFee
                'int192', // linkFee
                'uint32', // expiresAt
                'int192', // benchmarkPrice
                'uint32'  // marketStatus
            ],
            bytes
        )
        return new ReportV4(
            decoded[0] as ID,
            decoded[1] as number,
            decoded[2] as number,
            decoded[3] as BigInt,
            decoded[4] as BigInt,
            decoded[5] as number,
            decoded[6] as BigInt,
            decoded[7] as number
        );
    }

    public toBytes(): Uint8Array {
        // Use ethers to pack the bytes
        let packed = ethers.utils.defaultAbiCoder.encode(
            [
                'bytes32', // feedId
                'uint32', // validFromTimestamp
                'uint32', // observationsTimestamp
                'int192', // nativeFee
                'int192', // linkFee
                'uint32', // expiresAt
                'int192', // benchmarkPrice
                'uint32'  // marketStatus
            ],
            [
                this.FeedID,
                this.ValidFromTimestamp,
                this.ObservationsTimestamp,
                this.NativeFee,
                this.LinkFee,
                this.ExpiresAt,
                this.BenchmarkPrice,
                this.MarketStatus
            ]
        )
        return ethers.utils.arrayify(packed);
    }

    public toString(): string {
        return ethers.utils.hexlify(this.toBytes()).slice(2);
    }
}

type ReportData = ReportV1 | ReportV2 | ReportV3 | ReportV4;

class Report {
    Data: ReportData
    ReportContext: [Uint8Array, Uint8Array, Uint8Array]
    ReportBlob: Uint8Array
    RawRs: Array<Uint8Array>
    RawSs: Array<Uint8Array>
    RawVs: Uint8Array

    constructor(
        data: ReportData,
        reportContext: [Uint8Array, Uint8Array, Uint8Array],
        reportBlob: Uint8Array,
        rawRs: Array<Uint8Array>,
        rawSs: Array<Uint8Array>,
        rawVs: Uint8Array
    ) {
        this.Data = data;
        this.ReportContext = reportContext;
        this.ReportBlob = reportBlob;
        this.RawRs = rawRs;
        this.RawSs = rawSs;
        this.RawVs = rawVs;
    }

    public static fromBytes(bytes: Uint8Array): Report {
        // Members:
        //   reportContext bytes32[3]
        //   reportBlob bytes
        //   rawRs bytes32[]
        //   rawSs bytes32[]
        //   rawVs bytes32
        
        // Use ethers to unpack the bytes
        let decoded = ethers.utils.defaultAbiCoder.decode(
            [
                'bytes32[3]', // reportContext
                'bytes',      // reportBlob
                'bytes32[]',  // rawRs
                'bytes32[]',  // rawSs
                'bytes32'     // rawVs
            ],
            bytes
        )
        let reportContext: [Uint8Array, Uint8Array, Uint8Array] = [
            ethers.utils.arrayify(decoded[0][0]),
            ethers.utils.arrayify(decoded[0][1]),
            ethers.utils.arrayify(decoded[0][2])
        ]
        let reportBlob = ethers.utils.arrayify(decoded[1]);
        let rawRs = decoded[2].map((r: Uint8Array) => ethers.utils.arrayify(r));
        let rawSs = decoded[3].map((s: Uint8Array) => ethers.utils.arrayify(s));
        let rawVs = ethers.utils.arrayify(decoded[4]);
        
        // Peek at the first byte of the reportBlob to determine the version
        let version = reportBlob[1];
        let data: ReportData;
        if (version === 1) {
            data = ReportV1.fromBytes(reportBlob);
        } else if (version === 2) {
            data = ReportV2.fromBytes(reportBlob);
        } else if (version === 3) {
            data = ReportV3.fromBytes(reportBlob);
        } else if (version === 4) {
            data = ReportV4.fromBytes(reportBlob);
        } else {
            throw new Error('Unknown report version');
        }

        return new Report(
            data,
            reportContext,
            reportBlob,
            rawRs,
            rawSs,
            rawVs
        );
    }
}