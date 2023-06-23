"use client"

import { Database, Files } from "lucide-react"
import { useEffect, useState } from "react"

import { DatabaseSelect } from "@/components/database-select"
import { Separator } from "@/components/ui/separator"
import { useCurrentNode } from "@/hooks/use-current-node"
import { useCurrentPathInfo } from "@/hooks/use-current-pathinfo"
import { useAllDatabases } from "@/hooks/use-database"
import { useSqlite, useSqliteStore } from "@/hooks/use-sqlite"
import { useAppRuntimeStore } from "@/lib/store/runtime-store"
import { cn } from "@/lib/utils"

import { CreateFileDialog } from "./create-file"
import { EverydaySidebarItem } from "./everyday"
import { CurrentItemTree } from "./item-tree"
import { TableListLoading } from "./loading"

export const SideBar = ({ className }: any) => {
  const { space } = useCurrentPathInfo()
  const currentNode = useCurrentNode()
  const [loading, setLoading] = useState(true)
  const { updateNodeList } = useSqlite(space)
  const { allNodes } = useSqliteStore()
  const databaseList = useAllDatabases()
  const { isShareMode } = useAppRuntimeStore()

  useEffect(() => {
    console.log("side bar loading all tables ")
    updateNodeList().then(() => {
      setLoading(false)
    })
  }, [updateNodeList])

  return (
    <>
      <div className={cn("flex h-full flex-col p-4", className)}>
        <div className="flex items-center justify-between">
          {/* {!isShareMode && (
            <h2 className="relative px-6 text-lg font-semibold tracking-tight">
              <Link href={databaseHomeLink}>Eidos</Link>
            </h2>
          )} */}
          {isShareMode ? (
            "shareMode"
          ) : (
            <>
              <DatabaseSelect databases={databaseList} defaultValue={space} />
            </>
          )}
        </div>
        <Separator className="my-2" />
        <div className="flex  h-full flex-col justify-between">
          {loading ? (
            <TableListLoading />
          ) : (
            <div>
              {!isShareMode && <EverydaySidebarItem space={space} />}
              <CurrentItemTree
                title="Tables"
                spaceName={space}
                allNodes={allNodes.filter((node) => node.type === "table")}
                isShareMode={isShareMode}
                Icon={<Database className="pr-2" />}
                currentNode={currentNode}
              />
              <CurrentItemTree
                title="Documents"
                spaceName={space}
                allNodes={allNodes.filter((node) => node.type === "doc")}
                isShareMode={isShareMode}
                currentNode={currentNode}
                Icon={<Files className="pr-2" />}
              />
            </div>
          )}
          <CreateFileDialog />
        </div>
      </div>
    </>
  )
}
