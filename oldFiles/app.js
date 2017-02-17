const Hapi = require('hapi');
const server = new Hapi.Server();

server
    .connection({host: 'locahost', port: 3000})
    .start(() => console.log(`Server running at: ${server.info.url}`));
