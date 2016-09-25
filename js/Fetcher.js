// import Statuses.js, Parser.js, Presenter.js, IconUpdater.js, Options.js

function Fetcher(s, pa, pr, iU, o) {
	var statuses = s, parser = pa, presenter = pr, iconUpdater = iU, options = o;

	var STATE_DONE = 4, STATUS_ERROR = 0, STATUS_OK = 200;
	var company;
	var mobileUrl, desktopUrl;

	var xhr = new XMLHttpRequest();
	xhr.timeout = 5000;
	xhr.responseType = "document";

	/**
	 * First tries to select statuses from Mobile site as it's most lightweight.
	 * If it'll fail, tries to select statuses from Desktop site.
	 * If it'll fail too, user might be not logged in, this is checked too.
	 * If user is logged in, there's an unexpected error.
	 * XMLHttpRequest is used instead of Fetch API as latter doesn't return necessary data in response.
	 */
	this.fetch = (url = mobileUrl, parseCallback = parser.parseMobile) => {
		if (company) {
			statuses.resetCounts();
			presenter.resetSiteError();
			xhr.onload = () => {
				if (xhr.readyState === STATE_DONE && xhr.status === STATUS_OK) {
					try {
						iconUpdater.clearTimer();
						parseCallback(xhr.response);
						iconUpdater.updateIcons();
					} catch (e) {
						if (!e.desktop) {
							this.fetch(desktopUrl, parser.parseDesktop);
						}
					}
				}
			};
			xhr.onreadystatechange = () => {
				if (xhr.readyState === STATE_DONE && xhr.status === STATUS_ERROR) {
					presenter.siteError();
				}
			};
			xhr.open("GET", url);
			xhr.send(null);
		}
	};

	this.reloadCompanyAndUrls = () => {
		company     = options.getCompany();
		mobileUrl   = options.getMobileSite(company);
		desktopUrl  = options.getDesktopSite(company);
	};
	this.getDesktopUrl = () => desktopUrl;
}
