// Renders HTML produced by RichTextEditor.
export const RichTextContent = ({ html, className = "" }: { html: string; className?: string }) => (
  <div
    className={`prose prose-sm max-w-none text-gray-700 ${className}`}
    dangerouslySetInnerHTML={{ __html: html }}
  />
);
