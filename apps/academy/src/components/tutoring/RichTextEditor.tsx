import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote,
  Undo2, Redo2,
} from "lucide-react";

const Btn = ({
  onClick, active, title, children,
}: {
  onClick: () => void; active?: boolean; title?: string; children: React.ReactNode;
}) => (
  <button
    type="button"
    title={title}
    onMouseDown={e => { e.preventDefault(); onClick(); }}
    className={`p-1.5 rounded transition-colors ${
      active ? "bg-[#0B1E40] text-white" : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {children}
  </button>
);

const Sep = () => <div className="w-px h-4 bg-gray-300 mx-0.5 self-center" />;

export const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Start typing…",
  minHeight = 100,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Sync when value changes from outside (e.g. switching between items)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#0B1E40]/20">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200">
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
          <Bold className="w-3.5 h-3.5" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
          <Italic className="w-3.5 h-3.5" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline">
          <UnderlineIcon className="w-3.5 h-3.5" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
          <Strikethrough className="w-3.5 h-3.5" />
        </Btn>

        <Sep />

        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1">
          <Heading1 className="w-3.5 h-3.5" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">
          <Heading2 className="w-3.5 h-3.5" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">
          <Heading3 className="w-3.5 h-3.5" />
        </Btn>

        <Sep />

        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list">
          <List className="w-3.5 h-3.5" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered list">
          <ListOrdered className="w-3.5 h-3.5" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">
          <Quote className="w-3.5 h-3.5" />
        </Btn>

        <Sep />

        <Btn onClick={() => editor.chain().focus().undo().run()} title="Undo">
          <Undo2 className="w-3.5 h-3.5" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} title="Redo">
          <Redo2 className="w-3.5 h-3.5" />
        </Btn>
      </div>

      {/* Editor area */}
      <div className="relative">
        {editor.isEmpty && (
          <p className="absolute top-2 left-3 text-gray-400 text-sm pointer-events-none select-none">
            {placeholder}
          </p>
        )}
        <EditorContent
          editor={editor}
          style={{ minHeight }}
          className="prose prose-sm max-w-none px-3 py-2 text-gray-700 [&_.ProseMirror]:outline-none"
        />
      </div>
    </div>
  );
};
