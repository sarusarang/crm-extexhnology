import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { DashBoardSidebar } from "@/components/common/DashBoardSidebar";
import { DashboardHeader } from "@/components/common/Header";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";





function LayoutContent() {


    // Get the current sidebar state
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";


    return (


        <div className="min-h-screen flex w-full dark:bg-gradient-to-r dark:from-[#0B0F19] dark:to-[#0E1422]">


            {/* Sidebar */}
            <aside
                className={cn(
                    "transition-all duration-300 stick",
                    isCollapsed ? "w-0" : "w-64"
                )}
            >
                <DashBoardSidebar />
            </aside>


            {/* Main area */}
            <div className="flex-1 flex flex-col">

                <header>
                    <DashboardHeader />
                </header>

                <main className="flex-1 p-8 space-y-8 ">
                    <Outlet />
                </main>

            </div>


        </div>

    );

}



export default function DashboardLayout() {
    return (
        <SidebarProvider>
            <LayoutContent />
        </SidebarProvider>
    );
}
