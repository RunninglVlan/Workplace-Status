// import Statuses.js, Parser.js, IconUpdater.js, Options.js, Fetcher.js, Presenter.js

var fetcher, presenter, options;

window.addEventListener("load", () => {
	var UPDATE_TIME_MS = 1000 * 30;

	var statuses = new Statuses();
	presenter = new Presenter(chrome.browserAction);
	var parser = new Parser(statuses, presenter);
	var iconUpdater = new IconUpdater(presenter, statuses);
	options = new Options(window.localStorage);
	fetcher = new Fetcher(statuses, parser, presenter, iconUpdater, options);

	fetcher.reloadCompanyAndUrls();
	fetcher.fetch();
	window.setInterval(() => fetcher.fetch(), UPDATE_TIME_MS);
}, false);

chrome.browserAction.onClicked.addListener(() => {
	if (options.getCompany() && !presenter.isSiteError()) {
		chrome.tabs.query({ url: fetcher.getDesktopUrl() + '*' }, tabs => {
			if (tabs.length === 0) {
				var urlToOpen = fetcher.getDesktopUrl();
				if (presenter.isMessagesIconShown()) {
					urlToOpen += "messages/";
				} else if (presenter.isNotificationsIconShown()) {
					urlToOpen += "notifications/";
				}
				chrome.tabs.create({ url: urlToOpen });
			} else {
				chrome.tabs.highlight({ tabs: tabs[0].index });
			}
		});
	} else {
		chrome.runtime.openOptionsPage();
	}
});

chrome.runtime.onInstalled.addListener(() => {
	if (!options.getCompany()) {
		chrome.runtime.openOptionsPage();
	}
});

chrome.runtime.onMessage.addListener(request => {
	if (request.event === "companyIsSet") {
		fetcher.reloadCompanyAndUrls();
		fetcher.fetch();
	}
});
