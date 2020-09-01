export function normalizedHex(address: string) {
    return String(address).replace('0x', '').toLowerCase();
}
