export function validator(hash: string, difficulty: number) {
    return hash
        .substring(0, difficulty) !== Array(difficulty + 1)
        .join('0');
}
