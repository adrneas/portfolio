import { homeMetadata } from "@/lib/metadata";
import { HomeView } from "@/views/home-view";

export const metadata = homeMetadata("pt");

export default function Home() {
  return <HomeView locale="pt" />;
}
