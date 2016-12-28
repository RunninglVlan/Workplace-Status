const Presenter = (() => {
	const EXTENSION_NAME = "Workplace Status";
	const BROWSER_ACTION_PATH = "img/browserAction/";
	const FILE_EXTENSION = ".png";
	const Icons = {
		DEFAULT: "default",
		ERROR:   "error",
		MESSAGES:      "messages",
		NOTIFICATIONS: "notifications"
	};

	let instance, browserAction, currentIcon;
	let siteError;

	class Presenter {
		constructor(bA) {
			if (!instance) {
				instance = this;
				browserAction = bA;
				browserAction.setBadgeBackgroundColor({ color: [250, 62, 62, 230] });
				currentIcon = Icons.DEFAULT;
			}
			return instance;
		}

		resetSiteError() { siteError = false; }
		isSiteError()    { return siteError; }

		unexpectedError(e) {
			console.error(e);
			error("Unexpected error, check Console for error message and stack trace");
		}
		loginError() { error("Login to Workplace first"); }
		siteError() {
			error("Provided site is inaccessible, update company in options");
			siteError = true;
		}

		resetTitle() { changeTitle(); }

		isMessagesIconShown()      { return currentIcon === Icons.MESSAGES; }
		isNotificationsIconShown() { return currentIcon === Icons.NOTIFICATIONS; }

		resetIcon() { changeIcon(Icons.DEFAULT, ''); }
		changeToMessagesIcon(count)      { changeIconWithCount(Icons.MESSAGES, count); }
		changeToNotificationsIcon(count) { changeIconWithCount(Icons.NOTIFICATIONS, count); }
	}

	const error = message => {
		changeIcon(Icons.ERROR, '!');
		changeTitle(message);
	};

	const changeTitle = message => {
		browserAction.setTitle({ title: EXTENSION_NAME + (message ? `: ${message}` : '') });
	};

	const changeIconWithCount = (icon, count) => {
		if (count) {
			changeIcon(icon, count);
		}
	};
	const changeIcon = (icon, badgeText) => {
		browserAction.setIcon({ path: getPaths(icon) });
		browserAction.setBadgeText({ text: badgeText.toString() });
		currentIcon = icon;
	};
	const getPaths = name => {
		return {
			16: getPath(name, 16),
			32: getPath(name, 32),
			19: getPath(name, 19),
			38: getPath(name, 38)
		}
	};
	const getPath = (name, pixels) => BROWSER_ACTION_PATH + name + pixels + FILE_EXTENSION;

	return Presenter;
})();
