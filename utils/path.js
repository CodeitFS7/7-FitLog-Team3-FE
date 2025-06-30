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
    update(journalId) {
      return `/journals/${journalId}/updateJournal`;
    },
    todayRoutines(journalId) {
      return `/routines/${journalId}`;
    },
    exerciseLogs(journalId) {
      return `/journals/${journalId}/exerciseLogs`;
    },
  },
};
