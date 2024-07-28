const path = require("path");
const withLess = require("next-with-less");

const allLanguages = require("./locales/_all_languages.json");
const allLangCodes = Object.keys(allLanguages);

module.exports = withLess({
	i18n: {
		defaultLocale: "en",
		locales: allLangCodes,
	},
});
