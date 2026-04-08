"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold text-foreground mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-muted leading-relaxed mb-3">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside text-muted mb-4 space-y-1">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside text-muted mb-4 space-y-2">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="text-muted leading-relaxed">{children}</li>,
  strong: ({ children }) => (
    <strong className="text-foreground font-semibold">{children}</strong>
  ),
  hr: () => <hr className="border-card-border my-6" />,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-accent hover:text-accent-light underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  em: ({ children }) => <em className="text-muted italic">{children}</em>,
};

export function LicenseContent({ markdown }: { markdown: string }) {
  return (
    <div className="max-h-[60vh] overflow-y-auto rounded-xl border border-card-border bg-card p-6 md:p-8">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
