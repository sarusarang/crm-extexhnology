import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  FolderOpen,
  Settings,
  HelpCircle,
  Target,
  BarChart3,
} from "lucide-react";




// Main navigation
const mainNavItems = [
  { title: "Overview", url: "/", icon: LayoutDashboard, badge: "New" },
  { title: "Projects", url: "/projects", icon: FolderOpen, badge: "3" },
];




// Workspace navigation
const secondaryNavItems = [
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Help", url: "/dashboard/help", icon: HelpCircle },
];





export function DashBoardSidebar() {



  // Get the current sidebar state and location
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";



  // Check if the current path matches the item URL
  const isActive = (path: string) => location.pathname === path;




  const NavItem = ({ item, isActive }: { item: any; isActive: boolean }) => (


    <SidebarMenuItem>


      <SidebarMenuButton asChild>


        <NavLink
          to={item.url}
          state={{ from: location }}
          className={cn(
            "flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-all group relative",
            "text-gray-700 dark:text-gray-400 hover:text-blue-500 dark:hover:bg-gray-800",
            isActive &&
            "bg-blue-500/10 border border-blue-500/30 text-blue-500 dark:text-blue-400"
          )}
        >


          <div className="flex items-center gap-3">

            <item.icon
              className={cn(
                "h-4 w-4 transition-transform group-hover:scale-110",
                isActive && "text-blue-500 dark:text-blue-400"
              )}
            />

            {!isCollapsed && <span className="font-medium">{item.title}</span>}

          </div>


          {!isCollapsed && item.badge && (
            <Badge
              variant="secondary"
              className={cn(
                "h-5 px-2 text-xs font-medium",
                isActive
                  ? "bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400"
                  : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              )}

            >

              {item.badge}

            </Badge>

          )}


        </NavLink>


      </SidebarMenuButton>

    </SidebarMenuItem>

  );



  return (


    <Sidebar className="border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#2b57c6]">


      <SidebarContent className="p-4">


        {/* Brand */}
        {!isCollapsed && (
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src="/fav-icon.png" className="object-contain" alt="" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-blue-500">Ex-Technology</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Project Hub</p>
              </div>
            </div>
          </div>
        )}



        {/* Main Navigation */}
        <SidebarGroup>


          <SidebarGroupLabel
            className={cn(
              "px-2 text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-3",
              isCollapsed && "sr-only"
            )}
          >
            <Target className="h-3 w-3 inline mr-2" /> Main Navigation
          </SidebarGroupLabel>


          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.map((item) => (
                <NavItem key={item.url} item={item} isActive={isActive(item.url)} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>


        </SidebarGroup>



        {/* Workspace */}
        <SidebarGroup className="mt-6">


          <SidebarGroupLabel
            className={cn(
              "px-2 text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-3",
              isCollapsed && "sr-only"
            )}
          >
            <BarChart3 className="h-3 w-3 inline mr-2" /> Workspace
          </SidebarGroupLabel>


          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {secondaryNavItems.map((item) => (
                <NavItem key={item.url} item={item} isActive={isActive(item.url)} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>


        </SidebarGroup>

      </SidebarContent>

    </Sidebar>

  );


}
