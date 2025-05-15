import { Feed, ID } from "./feed";
import { generateAuthHeaders } from "./auth";
import { APIEndPoints } from "./constants";

export type ReportResponse = {
	feedID                : ID
	fullReport            : Uint8Array
	validFromTimestamp    : number
	observationsTimestamp : number
}

export type ReportPage = {
	Reports    : ReportResponse[]
	NextPageTS : number
}

export class Config {
    /**
        ApiKey             string                        // Client Api key
        ApiSecret          string                        // Client Api secret
        RestURL            string                        // Rest Api url
        restURL            *url.URL                      // Rest Api url
        WsURL              string                        // Websocket Api url
        wsURL              *url.URL                      // Websocket Api url
        WsHA               bool                          // Use concurrent connections to multiple Streams servers
        WsMaxReconnect     int                           // Maximum number of reconnection attempts for Stream underlying connections
        LogDebug           bool                          // Log debug information
        InsecureSkipVerify bool                          // Skip server certificate chain and host name verification
        Logger             func(format string, a ...any) // Logger function
     */
    ApiKey: string;
    ApiSecret: string;
    RestURL: string;
    WsURL: string;
    WsHA: boolean;
    WsMaxReconnect: number;
    LogDebug: boolean;
    InsecureSkipVerify: boolean;
    Logger: (format: string, ...args: any[]) => void;

    constructor(
        ApiKey: string,
        ApiSecret: string,
        RestURL: string,
        WsURL: string,
        WsHA: boolean,
        WsMaxReconnect: number,
        LogDebug: boolean = false,
        InsecureSkipVerify: boolean = false,
        Logger: (format: string, ...args: any[]) => void = (format: string, ...args: any[]) => {
            console.log(format, ...args);
        }
    ) {
        this.ApiKey = ApiKey;
        this.ApiSecret = ApiSecret;
        this.RestURL = RestURL;
        this.WsURL = WsURL;
        this.WsHA = WsHA;
        this.WsMaxReconnect = WsMaxReconnect;
        this.LogDebug = LogDebug;
        this.InsecureSkipVerify = InsecureSkipVerify;
        this.Logger = Logger;
    }

    public logInfo(format: string, ...args: any[]) {
        if (this.LogDebug) {
            this.Logger(format, ...args);
        }
    }

    public logError(format: string, ...args: any[]) {
        this.Logger(format, ...args);
    }
}

export class Client {
    config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    public getConfig(): Config {
        return this.config;
    }

    public async getFeeds(): Promise<Feed[]> {
        // call req
        const resp = await req(this, "GET", APIEndPoints.v1feeds);
        if (resp?.feeds) {
            return resp.feeds.map((feed: any) => {
                return new Feed(new ID(feed?.feedID));
            });
        }
        throw new Error("Invalid response from server");
    }

    public async getLatestReport(feed: ID): Promise<ReportResponse> {
        const resp = await req(this, "GET", APIEndPoints.v1reportsLatest, {"feedID": feed.toString()});
        if (resp?.report) {
            // Manually dump the report to ReportResponse
            const report = resp.report;
            if (report?.feedID && report?.fullReport && report?.validFromTimestamp && report?.observationsTimestamp) {
                return {
                    feedID: new ID(report.feedID),
                    fullReport: report.fullReport.startsWith("0x") ?
                        new Uint8Array(report.fullReport.slice(2).match(/.{1,2}/g)!.map((byte: any) => parseInt(byte, 16))) :
                        new Uint8Array(report.fullReport.match(/.{1,2}/g)!.map((byte: any) => parseInt(byte, 16))),
                    validFromTimestamp: report.validFromTimestamp,
                    observationsTimestamp: report.observationsTimestamp,
                };
            }
            throw new Error("Invalid response from server");
        }
        throw new Error("Invalid response from server");
    }

    public async getReports(feeds: ID[], timestamp: number): Promise<ReportResponse[]> {
        const resp = await req(this, "GET", APIEndPoints.v1reports, {"feedID": feeds.map(feed => feed.toString()), "timestamp": [timestamp.toString()]});
        if (resp?.reports) {
            return resp.reports.map((report: any) => {
                return {
                    feedID: new ID(report.feedID),
                    fullReport: // Decode hex from the report.fullReport without the 0x prefix
                        report.fullReport.startsWith("0x") ?
                            new Uint8Array(report.fullReport.slice(2).match(/.{1,2}/g)!.map((byte: any) => parseInt(byte, 16))) :
                            new Uint8Array(report.fullReport.match(/.{1,2}/g)!.map((byte: any) => parseInt(byte, 16))),
                    validFromTimestamp: report.validFromTimestamp,
                    observationsTimestamp: report.observationsTimestamp,
                };
            });
        }
        throw new Error("Invalid response from server");
    }

    public async getReportsPage(feed: ID, startTS: number): Promise<ReportPage> {
        const resp = await req(this, "GET", APIEndPoints.v1reportsPage, {"feedID": feed.toString(), "startTimestamp": [startTS.toString()]});
        if (resp?.reports) {
            let r: ReportPage = {
                Reports: resp.reports.map((report: any) => {
                    return {
                        feedID: new ID(report.feedID),
                        fullReport: // Decode hex from the report.fullReport without the 0x prefix
                            report.fullReport.startsWith("0x") ?
                                new Uint8Array(report.fullReport.slice(2).match(/.{1,2}/g)!.map((byte: any) => parseInt(byte, 16))) :
                                new Uint8Array(report.fullReport.match(/.{1,2}/g)!.map((byte: any) => parseInt(byte, 16))),
                        validFromTimestamp: report.validFromTimestamp,
                        observationsTimestamp: report.observationsTimestamp,
                    };
                }),
                NextPageTS: 0,
            };
            r.NextPageTS = 0;
	        if (r.Reports.length > 0) {
		        r.NextPageTS = r.Reports[r.Reports.length-1].observationsTimestamp + 1
	        }
        }
        throw new Error("Invalid response from server");
    }
}

async function req(client: Client, method: string, path: string, params?: { [key: string]: string | string[] } , body?: Uint8Array): Promise<any> {
    const reqUrl = new URL(path, client.config.RestURL);
    if (params) {
        // Add query parameters to the URL
        Object.keys(params).forEach(key => {
            if (Array.isArray(params[key])) {
                params[key].forEach(value => {
                    reqUrl.searchParams.append(key, value);
                });
            } else {
                reqUrl.searchParams.append(key, params[key]);
            }
        });
    }
    let httpReq = new Request(reqUrl, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: body,
    })
    // Generate header
    /// Time: from current unix milli
    const timestamp = Date.now();
    const headers = generateAuthHeaders(method, path, client.config.ApiKey, client.config.ApiSecret, timestamp, body);
    // Add headers to the request
    Object.keys(headers).forEach(key => {
        httpReq.headers.append(key, headers[key]);
    });
    client.config.logInfo("Request: %s", httpReq);
    // Send the request
    return await (await fetch(httpReq)).json();
}