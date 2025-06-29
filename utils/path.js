export const PATH = {
  index() {
    return "/";
  },
  journal: {
    create() {
      return "/createJournal";
    },
    details(journalId) {
      return `/journals/${journalId}`;
    },
    todayRoutines(journalId) {
      return `/journals/${journalId}/todayRoutines`;
    },
    exerciseLogs(journalId) {
      return `/journals/${journalId}/exerciseLogs`;
    },
  },
};
