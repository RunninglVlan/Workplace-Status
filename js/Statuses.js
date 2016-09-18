function Statuses() {
	var counts = {
		messages: 0, notifications: 0
	};
	this.setCounts = c => counts = c;

	this.resetCounts = () => {
		counts.messages = 0;
		counts.notifications = 0;
	};
	this.getMessagesCount = () => Number(counts.messages);
	this.getNotificationsCount = () => Number(counts.notifications);
}
