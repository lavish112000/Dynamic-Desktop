import Desktop from "@/components/Desktop";
import Sidebar from "@/components/Sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <SidebarInset className="flex-1">
        <Desktop />
      </SidebarInset>
    </div>
  );
}
