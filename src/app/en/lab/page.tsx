import { collectionMetadata } from "@/lib/metadata";
import { CollectionView } from "@/views/collection-view";

export const metadata = collectionMetadata("en", "lab");

export default function Page() {
  return <CollectionView collection="lab" locale="en" />;
}
