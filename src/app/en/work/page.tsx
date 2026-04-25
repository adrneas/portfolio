import { collectionMetadata } from "@/lib/metadata";
import { CollectionView } from "@/views/collection-view";

export const metadata = collectionMetadata("en", "work");

export default function Page() {
  return <CollectionView collection="work" locale="en" />;
}
