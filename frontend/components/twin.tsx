'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import RichComponent from '@/components/rich/RichComponent';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    components?: string[];
}

export default function Twin() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const [hasAvatar, setHasAvatar] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch('/avatar.png', { method: 'HEAD' })
            .then(res => setHasAvatar(res.ok))
            .catch(() => setHasAvatar(false));
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage.content,
                    session_id: sessionId || undefined,
                }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            const data = await response.json();

            if (!sessionId) setSessionId(data.session_id);

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response,
                timestamp: new Date(),
                components: data.components ?? [],
            }]);
        } catch {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date(),
            }]);
        } finally {
            setIsLoading(false);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <Card className="flex flex-col h-[calc(100vh-12rem)] min-h-[500px] max-h-[800px] border-border bg-card shadow-xl">
            {/* Header */}
            <CardHeader className="flex flex-row items-center gap-3 px-5 py-4 border-b border-border shrink-0">
                <Avatar className="h-9 w-9">
                    {hasAvatar ? (
                        <AvatarImage src="/avatar.png" alt="Dave Njeru" />
                    ) : null}
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                        DN
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground leading-tight">
                        Dave Njeru&apos;s Digital Twin
                    </span>
                    <span className="text-xs text-muted-foreground">
                        Chat with my AI companion about my career
                    </span>
                </div>
                <Badge variant="secondary" className="ml-auto text-xs">
                    Online
                </Badge>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 min-h-0 p-0">
                <ScrollArea className="h-full px-5 py-4">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full min-h-[300px] gap-3 text-center">
                            <div className="rounded-full bg-muted p-4">
                                {hasAvatar ? (
                                    <img
                                        src="/avatar.png"
                                        alt="Dave Njeru"
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <Bot className="h-8 w-8 text-muted-foreground" />
                                )}
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">
                                    Hello! I&apos;m Dave&apos;s Digital Twin
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Ask me anything about my career
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className="flex flex-col gap-2">
                            <div
                                className={cn(
                                    'flex items-end gap-2',
                                    message.role === 'user' ? 'justify-end' : 'justify-start'
                                )}
                            >
                                {message.role === 'assistant' && (
                                    <Avatar className="h-7 w-7 shrink-0">
                                        {hasAvatar ? (
                                            <AvatarImage src="/avatar.png" alt="Dave Njeru" />
                                        ) : null}
                                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                            DN
                                        </AvatarFallback>
                                    </Avatar>
                                )}

                                <div className={cn(
                                    'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm',
                                    message.role === 'user'
                                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                                        : 'bg-muted text-foreground rounded-bl-sm'
                                )}>
                                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                                    <p className={cn(
                                        'text-[10px] mt-1',
                                        message.role === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'
                                    )}>
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>

                                {message.role === 'user' && (
                                    <Avatar className="h-7 w-7 shrink-0">
                                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                                            You
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </div>

                            {/* Rich components — aligned with bubble, below text */}
                            {message.role === 'assistant' && message.components && message.components.length > 0 && (
                                <div className="pl-9 flex flex-col gap-3">
                                    {message.components.map(type => (
                                        <RichComponent key={type} type={type} />
                                    ))}
                                </div>
                            )}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex items-end gap-2 justify-start">
                                <Avatar className="h-7 w-7 shrink-0">
                                    {hasAvatar ? (
                                        <AvatarImage src="/avatar.png" alt="Dave Njeru" />
                                    ) : null}
                                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                        DN
                                    </AvatarFallback>
                                </Avatar>
                                <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                                    <div className="flex gap-1 items-center h-4">
                                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce delay-100" />
                                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce delay-200" />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>
            </CardContent>

            {/* Input */}
            <CardFooter className="px-5 py-4 border-t border-border shrink-0">
                <div className="flex w-full gap-2">
                    <Input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        disabled={isLoading}
                        autoFocus
                        className="flex-1 bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
                    />
                    <Button
                        onClick={sendMessage}
                        disabled={!input.trim() || isLoading}
                        size="icon"
                        className="shrink-0"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
