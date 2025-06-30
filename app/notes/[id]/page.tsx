import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";

type NoteDetailsProps = {
  params: { id: string };
};

async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = params;

  const parsedId = Number(Array.isArray(id) ? id[0] : id);

  if (isNaN(parsedId) || parsedId <= 0) {
    throw new Error(`Invalid note ID: ${id}`);
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", parsedId],
    queryFn: () => fetchNoteById(parsedId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

export default NoteDetails;
