export const APIEndPoints = {
    v1ws: "/api/v1/ws",
    v1feeds: "/api/v1/feeds",
    v1reports: "/api/v1/reports",
    v1reportsBulk: "/api/v1/reports/bulk",
    v1reportsPage: "/api/v1/reports/page",
    v1reportsLatest: "/api/v1/reports/latest",
}

export const CustomHeaders = {
    cllAvailOriginsHeader: "X-Cll-Available-Origins",
	cllOriginHeader      : "X-Cll-Origin",
	cllIntHeader         : "X-Cll-Eng-Int",
	authzHeader          : "Authorization",
	authzTSHeader        : "X-Authorization-Timestamp",
	authzSigHeader       : "X-Authorization-Signature-SHA256",
	hostHeader           : "Host"
}