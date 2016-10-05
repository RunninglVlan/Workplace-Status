// import Storage

const Options = (() => {
	const COMPANY_PROPERTY = "company";
	const SITE_PREFIX = "https://", SITE_POSTFIX = ".facebook.com/";

	let instance, storage;

	class Options {
		constructor(s) {
			if (!instance) {
				instance = this;
				storage = s;
			}
			return instance;
		}

		setCompany(company) {
			storage.setItem(COMPANY_PROPERTY, company);
			chrome.runtime.sendMessage({ event: "companyIsSet" });
		}
		getCompany() { return storage.getItem(COMPANY_PROPERTY); }

		getMobileSite(company)  { return getSite(company, true); }
		getDesktopSite(company) { return getSite(company); }
	}

	const getSite = (company, mobile) => {
		let site = SITE_PREFIX + company;
		site += mobile ? ".m" : '';
		return site + SITE_POSTFIX;
	};

	return Options;
})();
