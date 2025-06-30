import NotePreviewClient from "@/app/@modal/(.)notes/[id]/NotePreview.client";
import { fetchNoteById } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

type NotePreviewModalProps = {
  params: { id: string };
};

const NotePreview = async ({ params }: NotePreviewModalProps) => {
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
      <NotePreviewClient />
    </HydrationBoundary>
  );
};

export default NotePreview;
