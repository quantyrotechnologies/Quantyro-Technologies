"use client";
import React from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

function ToolbarButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`px-[9px] py-[5px] rounded-[6px] text-[12.5px] font-semibold border transition-colors ${
        active
          ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
          : 'bg-white text-[var(--ink)] border-[var(--line)] hover:border-[var(--accent)]'
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = () => {
    const previous = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Link URL', previous ?? 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-[6px] p-[8px] rounded-t-[10px] border border-b-0 border-[var(--line)] bg-[var(--bg-alt)]">
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <ToolbarButton
          key={level}
          label={`Heading ${level}`}
          active={editor.isActive('heading', { level })}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
        >
          H{level}
        </ToolbarButton>
      ))}
      <span className="w-px h-[20px] bg-[var(--line)] mx-[2px]" />
      <ToolbarButton label="Paragraph" active={editor.isActive('paragraph')} onClick={() => editor.chain().focus().setParagraph().run()}>
        P
      </ToolbarButton>
      <ToolbarButton label="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
        <span className="font-bold">B</span>
      </ToolbarButton>
      <ToolbarButton label="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <span className="italic">I</span>
      </ToolbarButton>
      <ToolbarButton label="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <span className="line-through">S</span>
      </ToolbarButton>
      <span className="w-px h-[20px] bg-[var(--line)] mx-[2px]" />
      <ToolbarButton label="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        • List
      </ToolbarButton>
      <ToolbarButton label="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        1. List
      </ToolbarButton>
      <ToolbarButton label="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        &ldquo;&rdquo;
      </ToolbarButton>
      <span className="w-px h-[20px] bg-[var(--line)] mx-[2px]" />
      <ToolbarButton label="Insert link" active={editor.isActive('link')} onClick={setLink}>
        Link
      </ToolbarButton>
      <span className="w-px h-[20px] bg-[var(--line)] mx-[2px]" />
      <ToolbarButton label="Undo" onClick={() => editor.chain().focus().undo().run()}>
        ↺
      </ToolbarButton>
      <ToolbarButton label="Redo" onClick={() => editor.chain().focus().redo().run()}>
        ↻
      </ToolbarButton>
    </div>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  required,
}: {
  value: string;
  onChange: (html: string) => void;
  required?: boolean;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      Link.configure({ openOnClick: false, autolink: true, defaultProtocol: 'https' }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'min-h-[140px] px-[12px] py-[10px] text-[14px] text-[var(--ink)] outline-none [&_h1]:text-[20px] [&_h1]:font-bold [&_h2]:text-[18px] [&_h2]:font-bold [&_h3]:text-[16px] [&_h3]:font-bold [&_ul]:list-disc [&_ul]:pl-[20px] [&_ol]:list-decimal [&_ol]:pl-[20px] [&_a]:text-[var(--accent)] [&_a]:underline',
      },
    },
  });

  if (!editor) {
    return <div className="w-full h-[180px] rounded-[10px] border border-[var(--line)] bg-white animate-pulse" />;
  }

  return (
    <div>
      <Toolbar editor={editor} />
      <div className="rounded-b-[10px] border border-[var(--line)] bg-white focus-within:border-[var(--accent)]">
        <EditorContent editor={editor} />
      </div>
      {required && editor.isEmpty && (
        <p className="mt-[4px] text-[11px] text-slate-400">Required</p>
      )}
    </div>
  );
}
