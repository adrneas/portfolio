import { collectionMetadata } from "@/lib/metadata";
import { CollectionView } from "@/views/collection-view";

export const metadata = collectionMetadata("en", "art");

export default function Page() {
  return <CollectionView collection="art" locale="en" />;
}
