const allLanguages = require("./locales/_all_languages.json");
const allLangCodes = Object.keys(allLanguages);

module.exports = {
	i18n: {
		defaultLocale: "en",
		locales: allLangCodes,
	},
};
