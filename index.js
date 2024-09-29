import { generateSecretKey, getPublicKey, getEventHash, finalizeEvent } from "nostr-tools";
import { bytesToHex, hexToBytes } from '@noble/hashes/utils'
import fs from "fs";
import 'dotenv/config'

export function createNostrEvent() {
    const privateKey = process.env.BOT_NSEC;

    const publicKey = getPublicKey(privateKey);

    const eventData = {
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: 'Hello, Nostr!',
        pubkey: publicKey
    };

    const id = getEventHash(eventData);

    const event = {
        ...eventData,
        id: id,
        sig: finalizeEvent({ ...eventData, id }, privateKey)
    };

    console.log('Private Key:', privateKey.toString('hex'));
    console.log('Public Key:', publicKey);
    console.log('Signed Event:', event);

    fs.writeFileSync(`./export/${event.id}.json`, JSON.stringify(event, null, 2));
};

createNostrEvent();