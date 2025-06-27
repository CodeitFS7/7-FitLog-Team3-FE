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
  },
};
