export function normalizedAddress(address: string) {
    return String(address).replace('0x', '').toLowerCase();
}
