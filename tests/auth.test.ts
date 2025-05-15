import { expect } from "chai";
import { generateHMAC, generateAuthHeaders } from "../auth";
import { APIEndPoints, CustomHeaders } from "../constants";

describe("Generate HMAC", () => {
    it("should generate valid HMAC for case 1", () => {
        const generated = generateHMAC("GET", APIEndPoints.v1feeds, "clientId", 1718885772, "userSecret", undefined);
        const expectedHMAC = "e9b2aa1deb13b2abd078353a5e335b2f50307159ad28b433157d2c74dbab2072";
        expect(generated).to.equal(expectedHMAC);
    })
    /** 
		{
			name: "valid2",
			want: "31b48ebdb13802b58978cd89eca0c3c68ddccf85392e703b55942544e7203d3d",
			args: args{
				method:     http.MethodPost,
				path:       apiV1Feeds,
				clientId:   "clientId1",
				userSecret: "secret1",
				timestamp:  12000,
			},
		},*/
    it("should generate valid HMAC for case 2", () => {
        const generated = generateHMAC("POST", APIEndPoints.v1feeds, "clientId1", 12000, "secret1", undefined);
        const expectedHMAC = "31b48ebdb13802b58978cd89eca0c3c68ddccf85392e703b55942544e7203d3d";
        expect(generated).to.equal(expectedHMAC);
    });
        /*
		{
			name: "valid3",
			want: "37190febe20b6f3662f6abbfa3a7085ad705ac64e88bde8c1a01a635859e6cf7",
			args: args{
				method:     http.MethodPost,
				path:       apiV1ReportsBulk,
				clientId:   "clientId2",
				userSecret: "secret2",
				timestamp:  1718885772,
				body:       []byte(`{"attr1": "value1","attr2": [1,2,3]}`),
			},
		},
     */
    it("should generate valid HMAC for case 3", () => {
        const body = new Uint8Array([0x7b,0x22,0x61,0x74,0x74,0x72,0x31,0x22,0x3a,0x20,0x22,0x76,0x61,0x6c,0x75,0x65,0x31,0x22,0x2c,0x22,0x61,0x74,0x74,0x72,0x32,0x22,0x3a,0x20,0x5b,0x31,0x2c,0x32,0x2c,0x33,0x5d,0x7d]);
        const generated = generateHMAC("POST", APIEndPoints.v1reportsBulk, "clientId2", 1718885772,"secret2", body);
        const expectedHMAC = "37190febe20b6f3662f6abbfa3a7085ad705ac64e88bde8c1a01a635859e6cf7";
        expect(generated).to.equal(expectedHMAC);
    });
});

describe("Generate Auth Headers", () => {
    it("should generate valid auth headers for case 1", () => {
        let headers = generateAuthHeaders("GET", APIEndPoints.v1feeds, "authzHeader", "userSecret", 1718885772, undefined);
        expect(headers[CustomHeaders.authzHeader]).to.equal("authzHeader");
        expect(headers[CustomHeaders.authzTSHeader]).to.equal("1718885772");
        expect(headers[CustomHeaders.authzSigHeader]).to.equal("53373f7564f6c53905a3943ef3f3491709fac1b864a2991b63d0d3048b47317c");
    });
    it("should generate valid auth headers for case 2", () => {
        let headers = generateAuthHeaders("POST", APIEndPoints.v1feeds, "authzHeader", "userSecret", 12000, undefined);
        expect(headers[CustomHeaders.authzHeader]).to.equal("authzHeader");
        expect(headers[CustomHeaders.authzTSHeader]).to.equal("12000");
        expect(headers[CustomHeaders.authzSigHeader]).to.equal("4bb71f74be80aba504107893b90324858bea82189c600e336e219702c15f2660");
    });
    it("should generate valid auth headers for case 3", () => {
        const body = new Uint8Array([0x7b,0x22,0x61,0x74,0x74,0x72,0x31,0x22,0x3a,0x20,0x22,0x76,0x61,0x6c,0x75,0x65,0x31,0x22,0x2c,0x22,0x61,0x74,0x74,0x72,0x32,0x22,0x3a,0x20,0x5b,0x31,0x2c,0x32,0x2c,0x33,0x5d,0x7d]);
        let headers = generateAuthHeaders("POST", APIEndPoints.v1reportsBulk,"authzHeader", "userSecret", 1718885772 , body);
        expect(headers[CustomHeaders.authzHeader]).to.equal("authzHeader");
        expect(headers[CustomHeaders.authzTSHeader]).to.equal("1718885772");
        expect(headers[CustomHeaders.authzSigHeader]).to.equal("adfdba180f94d4e1445f08e7a65d3c3cc34d9885aa67527a68789661147897ed");
    });
});