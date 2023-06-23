import { DataSpace } from "@/worker/sql"
import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { createHeadlessEditor } from "@lexical/headless"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import { ListItemNode, ListNode } from "@lexical/list"
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  CHECK_LIST,
  CODE,
  INLINE_CODE,
  TRANSFORMERS,
} from "@lexical/markdown"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table"
import { useCallback } from "react"


export const allTransformers = [CHECK_LIST, CODE, INLINE_CODE, ...TRANSFORMERS]

export const AllNodes = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  CodeHighlightNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  AutoLinkNode,
  LinkNode,
  //   SQLNode,
]
const editor = createHeadlessEditor({
  nodes: AllNodes,
  onError: () => {},
})

export const useDocEditor = (sqlite: DataSpace | null) => {
  const getDocMarkdown = useCallback(
    async (docId: string): Promise<string> => {
      if (!sqlite) return ""
      const articleEditorStateJSON = await sqlite.getDoc(docId)
      editor.setEditorState(editor.parseEditorState(articleEditorStateJSON))
      return new Promise((resolve) => {
        editor.update(() => {
          const markdown = $convertToMarkdownString(allTransformers)
          resolve(markdown)
        })
      })
    },
    [sqlite]
  )
  const convertMarkdown2State = useCallback(
    async (markdown: string): Promise<string> => {
      return new Promise((resolve) => {
        editor.update(() => {
          $convertFromMarkdownString(markdown, allTransformers)
          const json = editor.getEditorState().toJSON()
          const content = JSON.stringify(json)
          resolve(content)
        })
      })
    },
    []
  )

  return { getDocMarkdown, convertMarkdown2State }
}
