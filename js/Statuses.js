const Statuses = (() => {
	let instance;
	let counts = {
		messages: 0, notifications: 0
	};

	return class {
		constructor() {
			if (!instance) {
				instance = this;
			}
			return instance;
		}

		setCounts(c) { counts = c; }

		resetCounts() {
			counts.messages = 0;
			counts.notifications = 0;
		}

		getMessagesCount()      { return Number(counts.messages); }
		getNotificationsCount() { return Number(counts.notifications); }
	}
})();
