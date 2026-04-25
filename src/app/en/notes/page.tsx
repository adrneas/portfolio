import { collectionMetadata } from "@/lib/metadata";
import { CollectionView } from "@/views/collection-view";

export const metadata = collectionMetadata("en", "notes");

export default function Page() {
  return <CollectionView collection="notes" locale="en" />;
}
