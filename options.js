// import Options.js

var options;

var updateAccessibility = () => {
	var company = options.getCompany();
	if (company) {
		updateLink(document.querySelector("#mobileSite"),  options.getMobileSite(company));
		updateLink(document.querySelector("#desktopSite"), options.getDesktopSite(company));
	}
	document.querySelector("#accessibility").className = company ? "visible" : "hidden";
}
var updateLink = (link, site) => {
	link.href = site;
	link.textContent = site;
};

window.addEventListener("load", () => {
	options = new Options(window.localStorage);
	updateAccessibility();
	document.querySelector("#companyForm").addEventListener("submit", saveCompanyName);
}, false);
var saveCompanyName = event => {
	event.preventDefault();
	var companyElement = document.querySelector("#company");
	var company = companyElement.value;
	options.setCompany(company.toLowerCase());
	companyElement.value = '';
	updateAccessibility();
};
