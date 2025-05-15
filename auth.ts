import crypto from 'crypto';
import { CustomHeaders } from './constants';

fetch

export function generateHMAC(method: string, path: string, clientId: string, timestamp: number, userSecret: string, body?: Uint8Array): string {
    // SHA-256 hash the body
    if (!body) {
        body = new Uint8Array(0);
    }
    const bodyHash = crypto.createHash('sha256').update(body).digest('hex');
    const allPreImage = `${method} ${path} ${bodyHash} ${clientId} ${timestamp.toFixed(0)}`;
    // Create HMAC using SHA-256
    const hmac = crypto.createHmac('sha256', userSecret);
    hmac.update(allPreImage);
    return hmac.digest('hex'); 
}

export function generateAuthHeaders(method: string, path: string, clientId: string, userSecret: string, timestamp: number, body?: Uint8Array): { [key: string]: string } {
    const hmac = generateHMAC(method, path, clientId, timestamp, userSecret, body);
    console.log("HMAC: ", hmac);
    return {
        [CustomHeaders.authzHeader]: clientId,
        [CustomHeaders.authzTSHeader]: timestamp.toFixed(0),
        [CustomHeaders.authzSigHeader]: hmac,
    };
}