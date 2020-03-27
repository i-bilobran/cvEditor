const webpack = require("webpack");

module.exports = {
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				GOOGLE_PROVIDER_ID: JSON.stringify(
					process.env.GOOGLE_PROVIDER_ID
				)
			}
		})
	]
};
