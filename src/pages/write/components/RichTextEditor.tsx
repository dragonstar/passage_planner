import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose prose-navy max-w-none min-h-[300px] focus:outline-none p-4',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html !== value) {
        onChange(html);
      }
    },
  });

  // Handle external value changes
  React.useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  if (!editor) return null;

  const EditorButton = ({ 
    isActive, 
    onClick, 
    children 
  }: { 
    isActive: boolean; 
    onClick: () => void; 
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
      className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
        isActive ? 'bg-navy/10 text-navy' : 'hover:bg-navy/5 text-navy/80'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="prose prose-navy max-w-none">
      <div className="border border-navy/20 rounded-lg overflow-hidden bg-white">
        <div className="bg-white border-b border-navy/20 p-2 flex flex-wrap gap-2">
          <EditorButton
            isActive={editor.isActive('bold')}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            Bold
          </EditorButton>
          <EditorButton
            isActive={editor.isActive('italic')}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            Italic
          </EditorButton>
          <EditorButton
            isActive={editor.isActive('heading', { level: 2 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            Heading
          </EditorButton>
          <EditorButton
            isActive={editor.isActive('bulletList')}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            List
          </EditorButton>
        </div>
        <EditorContent editor={editor} className="bg-white" />
      </div>
    </div>
  );
}