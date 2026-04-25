import { funMetadata } from "@/lib/metadata";
import { FunView } from "@/views/fun-view";

export const metadata = funMetadata("en");

export default function Page() {
  return <FunView locale="en" />;
}
