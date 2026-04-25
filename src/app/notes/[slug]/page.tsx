import type { Metadata } from "next";
import { getEntryStaticParams } from "@/lib/content";
import { entryMetadata } from "@/lib/metadata";
import { EntryView } from "@/views/entry-view";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getEntryStaticParams("notes", "pt");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  return entryMetadata("pt", "notes", slug);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <EntryView collection="notes" locale="pt" slug={slug} />;
}
