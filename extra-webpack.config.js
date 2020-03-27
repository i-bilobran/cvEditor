const Dotenv = require("dotenv-webpack");

module.exports = config => {
	config.plugins.push(
		new Dotenv({
			systemvars: true // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
		})
	);

	return config;
};
