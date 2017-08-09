
// keys.js

if (process.env.NODE_ENV === 'production') {
	//we are in PRODUCTION
	module.exports = require('./prod')
} else {
	//we are in development
	module.exports = require('./dev')
}