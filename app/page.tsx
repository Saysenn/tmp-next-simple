import { siteConfig } from "@/configs/site";
import MaintenancePage from "@/components/modes/MaintenancePage";
import ComingSoonPage from "@/components/modes/ComingSoonPage";

export default function Home() {
  if (siteConfig.mode === "maintenance") return <MaintenancePage />;
  if (siteConfig.mode === "coming-soon") return <ComingSoonPage />;

  // full site — add your content here
  return null;
}
