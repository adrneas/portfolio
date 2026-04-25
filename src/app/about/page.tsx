import { aboutMetadata } from "@/lib/metadata";
import { AboutView } from "@/views/about-view";

export const metadata = aboutMetadata("pt");

export default function Page() {
  return <AboutView locale="pt" />;
}
