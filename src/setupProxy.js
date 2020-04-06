
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
app.use(proxy('/api/**', { target: 'http://34.206.72.199:3001' }));
};