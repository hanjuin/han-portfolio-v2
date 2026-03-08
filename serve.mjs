import { createServer } from 'vite';

const server = await createServer({ server: { port: 3000 } });
await server.listen();
console.log('Dev server running at http://localhost:3000');
