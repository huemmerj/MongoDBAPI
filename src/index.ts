const http = require('http');
const App = require('./app');
const port = process.env.PORT || 3001;
const server = http.createServer(App);

server.listen(port);

// Here HMR story begins
declare const module: any;
if (module.hot) {
    module.hot.accept();
 module.hot.dispose(() => server.close());
}
