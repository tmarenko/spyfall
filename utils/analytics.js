import ReactGA from "react-ga4";

export const initGA = () => {
	ReactGA.initialize("G-1VH05G01VY");
};

export const logPageView = () => {
	ReactGA.set({ page: window.location.pathname });
	ReactGA.send({
		hitType: "pageview",
	});
};

export const logEvent = (category = "", action = "") => {
	if (category && action) {
		ReactGA.event({ category, action: String(action) });
	}
};

export const logException = (description = "", fatal = false) => {
	if (description) {
		// https://github.com/codler/react-ga4/issues/40
		// ReactGA.exception({ description, fatal });
	}
};
