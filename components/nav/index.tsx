import { Menu } from "lucide-react"
import { useTheme } from "next-themes"

import { useAppStore } from "@/lib/store/app-store"
import { cn } from "@/lib/utils"
import { isMac } from "@/lib/web/helper"
import { Button } from "@/components/ui/button"

import { BreadCrumb } from "./breadcrumb"
import { NavDropdownMenu } from "./dropdown-menu"
import { NavStatus } from "./nav-status"

export const Nav = ({ showMenu = true }: { showMenu?: boolean }) => {
  const { isSidebarOpen, setSidebarOpen } = useAppStore()

  const { theme } = useTheme()
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  return (
    <div
      id="title-bar"
      className={cn(
        "flex h-8 w-full border-separate items-center justify-between pl-2",
        {
          fixed: navigator.windowControlsOverlay?.visible,
          "!h-[38px]": isMac(),
          "bg-[#000]": theme === "dark",
          "bg-[#fff]": theme === "light",
          // PWA does not support css variables for theme color yet, we just use bg-white text-black for now
          // https://github.com/w3c/manifest/issues/975
          // "bg-white text-black": navigator.windowControlsOverlay?.visible,
        }
      )}
    >
      {showMenu && (
        <Button
          variant="ghost"
          size="xs"
          onClick={toggleSidebar}
          // className="hidden md:block"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <div className="hidden md:block">
        <BreadCrumb />
      </div>
      <div className="h-full grow" id="drag-region" />
      <div className="mr-3 flex items-center justify-between gap-2">
        <NavStatus />
        <NavDropdownMenu />
      </div>
    </div>
  )
}
