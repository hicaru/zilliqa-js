import { BlockChain } from './common';
import App from './server';
import { PORT } from './config';

export function main() {
    // new BlockChain();
    App.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
}
