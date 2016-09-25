// import Statuses.js, Presenter.js

function Parser(s, p) {
	var statuses = s, presenter = p;

	var counts = {
		messages: 0, notifications: 0
	};

	this.parseMobile = response => {
		var COUNT_CLASS = "._59tg";
		counts.messages = response.querySelector("#messages_jewel").querySelector(COUNT_CLASS).innerText;
		counts.notifications = response.querySelector("#notifications_jewel").querySelector(COUNT_CLASS).innerText;
		statuses.setCounts(counts);
	};
	this.parseDesktop = response => {
		try {
			counts.messages = response.querySelector("#mercurymessagesCountValue").innerText;
			counts.notifications = response.querySelector("#notificationsCountValue").innerText;
		} catch (e) {
			if (isLoginPage(response)) {
				presenter.loginError();
			} else {
				presenter.unexpectedError(e);
			}
			e.desktop = true;
			throw e;
		}
		statuses.setCounts(counts);
	};

	var isLoginPage = response => {
		var form = response.querySelector("form");
		return (form && form.action.includes("/work"));
	}
}
