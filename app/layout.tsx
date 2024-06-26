import "@/styles/globals.css"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

import { BlockUIDialog } from "@/components/block-ui-dialog"
import { CommandDialogDemo } from "@/components/cmdk"
import { ReloadPrompt } from "@/components/reload-prompt"
import { ShortCuts } from "@/components/shortcuts"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeUpdater } from "@/components/theme-updater"
import { Toaster } from "@/components/ui/toaster"
import { useWorker } from "@/hooks/use-worker"

export default function RootLayout() {
  const { isInitialized, initWorker } = useWorker()

  useEffect(() => {
    if (!isInitialized) {
      initWorker()
    }
  }, [initWorker, isInitialized])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <>
        {/* APP MODEL， a sidebar and main */}
        <div className="flex h-screen w-screen overflow-auto">
          <div className="h-full w-auto grow">
            <Outlet />
          </div>
        </div>
        <CommandDialogDemo />
        <ShortCuts />
      </>
      <TailwindIndicator />
      <Toaster />
      <BlockUIDialog />
      <ReloadPrompt />
      <ThemeUpdater />
    </ThemeProvider>
  )
}
