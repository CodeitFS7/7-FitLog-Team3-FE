import { RoutinesTable } from "../../components/pagesComponents/routinesComponents/RoutinesTable";
export const JournalDetail = () => {
  const journal = {
    journalId: "23ee39bc-8d23-4683-aa7f-eba6ed47a603",
  };

  return <RoutinesTable journalId={journal.journalId} />;
};
