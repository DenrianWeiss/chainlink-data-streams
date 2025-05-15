export enum FeedVersion {
    FeedVersionEmpty = 0,
    FeedVersion1,
    FeedVersion2,
    FeedVersion3,
    FeedVersion4,
}

export class ID {
    id: Uint8Array;

    constructor(id: Uint8Array) {
        if (id.length !== 32) {
            throw new Error("ID must be 32 bytes long");
        }
        this.id = id;
    }

    public toString(): string {
        return "0x" + Array.from(this.id)
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");
    }

    public static fromString(id: string): ID {
        // Check if the string is a valid hex string
        if (!/^0x[0-9a-fA-F]{64}$/.test(id)) {
            throw new Error("ID string must be a hex string of length 64");
        }
        // Convert the hex string to Uint8Array
        const idArray = new Uint8Array(id.slice(2).match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));
        return new ID(idArray);
    }

    public static toJson(id: ID): string {
        // Convert the ID to a hex string
        return "\"" + id.toString() + "\"";
    }

    public static fromJson(json: string | Uint8Array): ID {
        // If json is a string, convert it to Uint8Array using hex
        let jsonArray: Uint8Array;
        if (typeof json === "string") {
            if (json.length !== 68) {
                throw new Error("ID string must be 64 characters long");
            }
            // Remove the "\"0x" prefix and convert to Uint8Array
            json = json.slice(3);
            // Remove the trailing "\""
            json = json.slice(0, -1);
            jsonArray = new Uint8Array(json.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));
        } else {
            jsonArray = json;
        }
        if (jsonArray.length !== 32) {
            throw new Error("ID must be 32 bytes long");
        }
        // Decode [3:length] bytes, and get [:32] as id
        const id = jsonArray;
        return new ID(id);
    }

    public version(): FeedVersion {
        // Decode first 2 bytes
        const version = this.id[0] << 8 | this.id[1];
        // Check if version is valid
        if (version <= 0 || version > 4) {
            return FeedVersion.FeedVersionEmpty;
        }
        // Return the version as an enum
        return version as FeedVersion;
    }
}

export class Feed {
    FeedID: ID; // Json serialized as key "feedID"

    constructor(feedID: ID) {
        if (feedID.version() === FeedVersion.FeedVersionEmpty) {
            throw new Error("FeedID must be a valid ID");
        }
        this.FeedID = feedID;
    }

    public toJson(): string {
        return JSON.stringify({
            feedID: this.FeedID.toString(),
        });
    }

    public static fromJson(json: string): Feed {
        const obj = JSON.parse(json);
        if (!obj.feedID) {
            throw new Error("FeedID not found in JSON");
        }
        return new Feed(ID.fromJson(obj.feedID));
    }
}

