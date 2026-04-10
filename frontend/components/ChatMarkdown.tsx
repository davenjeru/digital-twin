'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface Props {
    content: string;
    isUser: boolean;
}

export default function ChatMarkdown({ content, isUser }: Props) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                p: ({ children }) => (
                    <p className="leading-relaxed last:mb-0 mb-2">{children}</p>
                ),
                strong: ({ children }) => (
                    <strong className={cn('font-semibold', isUser ? 'text-white' : 'text-foreground')}>
                        {children}
                    </strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,
                ul: ({ children }) => (
                    <ul className="my-2 ml-4 list-disc space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                    <ol className="my-2 ml-4 list-decimal space-y-1">{children}</ol>
                ),
                li: ({ children }) => (
                    <li className="leading-relaxed">{children}</li>
                ),
                h1: ({ children }) => (
                    <h1 className="text-base font-semibold mb-2 mt-3 first:mt-0">{children}</h1>
                ),
                h2: ({ children }) => (
                    <h2 className="text-sm font-semibold mb-1.5 mt-3 first:mt-0">{children}</h2>
                ),
                h3: ({ children }) => (
                    <h3 className="text-sm font-medium mb-1 mt-2 first:mt-0">{children}</h3>
                ),
                code: ({ children, className }) => {
                    const isBlock = className?.includes('language-');
                    return isBlock ? (
                        <code className={cn(
                            'block font-mono text-xs rounded-md p-3 my-2 whitespace-pre-wrap overflow-x-auto',
                            isUser ? 'bg-white/10' : 'bg-muted/80'
                        )}>
                            {children}
                        </code>
                    ) : (
                        <code className={cn(
                            'font-mono text-xs rounded px-1.5 py-0.5',
                            isUser ? 'bg-white/15' : 'bg-muted'
                        )}>
                            {children}
                        </code>
                    );
                },
                pre: ({ children }) => <>{children}</>,
                blockquote: ({ children }) => (
                    <blockquote className={cn(
                        'border-l-2 pl-3 my-2 italic',
                        isUser ? 'border-white/40 text-white/80' : 'border-border text-muted-foreground'
                    )}>
                        {children}
                    </blockquote>
                ),
                a: ({ href, children }) => (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            'underline underline-offset-2 hover:opacity-80',
                            isUser ? 'text-white' : 'text-primary'
                        )}
                    >
                        {children}
                    </a>
                ),
                hr: () => (
                    <hr className={cn('my-3 border-t', isUser ? 'border-white/20' : 'border-border')} />
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
