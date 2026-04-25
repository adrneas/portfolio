import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFunEntryStaticParams } from "@/lib/content";
import { entryMetadata } from "@/lib/metadata";
import {
  getCollectionFromFunCategory,
  isFunCategory,
} from "@/lib/i18n";
import { EntryView } from "@/views/entry-view";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getFunEntryStaticParams("pt");
}

function getCollection(category: string) {
  if (!isFunCategory(category)) {
    return null;
  }

  return getCollectionFromFunCategory(category);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const collection = getCollection(category);

  if (!collection) {
    return { title: "Not found" };
  }

  return entryMetadata("pt", collection, slug);
}

export default async function Page({ params }: PageProps) {
  const { category, slug } = await params;
  const collection = getCollection(category);

  if (!collection) {
    notFound();
  }

  return <EntryView collection={collection} locale="pt" slug={slug} />;
}
