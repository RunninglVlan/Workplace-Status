function Options(s) {
	var storage = s;

	var COMPANY_PROPERTY = "company";
	var SITE_PREFIX = "https://", SITE_POSTFIX = ".facebook.com/";

	this.setCompany = company => {
		storage.setItem(COMPANY_PROPERTY, company);
		chrome.runtime.sendMessage({ event: "companyIsSet" });
	};
	this.getCompany = () => storage.getItem(COMPANY_PROPERTY);

	this.getMobileSite  = company => getSite(company, true);
	this.getDesktopSite = company => getSite(company);
	var getSite = (company, mobile) => {
		var site = SITE_PREFIX + company;
		site += mobile ? ".m" : '';
		return site + SITE_POSTFIX;
	};
}
