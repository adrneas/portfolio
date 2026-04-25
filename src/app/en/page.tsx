import { homeMetadata } from "@/lib/metadata";
import { HomeView } from "@/views/home-view";

export const metadata = homeMetadata("en");

export default function Page() {
  return <HomeView locale="en" />;
}
