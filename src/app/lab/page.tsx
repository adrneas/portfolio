import { collectionMetadata } from "@/lib/metadata";
import { CollectionView } from "@/views/collection-view";

export const metadata = collectionMetadata("pt", "lab");

export default function Page() {
  return <CollectionView collection="lab" locale="pt" />;
}
