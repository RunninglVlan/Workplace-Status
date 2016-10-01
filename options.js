// import Options.js

let options;

const updateAccessibility = () => {
	const company = options.getCompany();
	if (company) {
		updateLink(document.querySelector("#mobileSite"),  options.getMobileSite(company));
		updateLink(document.querySelector("#desktopSite"), options.getDesktopSite(company));
	}
	document.querySelector("#accessibility").className = company ? "visible" : "hidden";
}
const updateLink = (link, site) => {
	link.href = site;
	link.textContent = site;
};

window.addEventListener("load", () => {
	options = new Options(window.localStorage);
	updateAccessibility();
	document.querySelector("#companyForm").addEventListener("submit", saveCompanyName);
}, false);
const saveCompanyName = event => {
	event.preventDefault();
	const companyElement = document.querySelector("#company");
	const company = companyElement.value;
	options.setCompany(company.toLowerCase());
	companyElement.value = '';
	updateAccessibility();
};
