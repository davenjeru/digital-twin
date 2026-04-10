'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { experience, type ExperienceEntry } from './data/experience';

export default function ExperienceTimeline() {
    return (
        <div className="flex flex-col">
            {experience.map((entry, index) => (
                <TimelineItem
                    key={`${entry.company}-${entry.start_date}`}
                    entry={entry}
                    isLast={index === experience.length - 1}
                />
            ))}
        </div>
    );
}

function TimelineItem({ entry, isLast }: { entry: ExperienceEntry; isLast: boolean }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="flex gap-3">
            {/* Timeline spine */}
            <div className="flex flex-col items-center shrink-0 pt-1">
                <div className="w-7 h-7 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
                    <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                {!isLast && <div className="w-px flex-1 bg-border mt-1 mb-1 min-h-[1.5rem]" />}
            </div>

            {/* Content */}
            <div className={cn('flex flex-col gap-1 pb-4 flex-1', isLast && 'pb-0')}>
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <p className="text-sm font-semibold text-foreground leading-tight">
                            {entry.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            {entry.company}
                            {entry.industry && (
                                <span className="text-muted-foreground/50"> · {entry.industry}</span>
                            )}
                        </p>
                    </div>
                    <Badge variant="secondary" className="text-[10px] px-2 py-0.5 shrink-0 whitespace-nowrap">
                        {entry.start_date} – {entry.end_date}
                    </Badge>
                </div>

                {/* Expandable details */}
                <button
                    onClick={() => setExpanded(prev => !prev)}
                    className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors w-fit mt-0.5"
                >
                    {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    {expanded ? 'Less' : 'Details'}
                </button>

                {expanded && (
                    <div className="flex flex-col gap-2 mt-1">
                        <ul className="flex flex-col gap-1">
                            {entry.responsibilities.map((r, i) => (
                                <li key={i} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-muted-foreground/40 shrink-0" />
                                    {r}
                                </li>
                            ))}
                        </ul>
                        {entry.accomplishments && entry.accomplishments.length > 0 && (
                            <div className="flex flex-col gap-1">
                                <p className="text-[10px] font-medium text-primary/80 uppercase tracking-wider">Key wins</p>
                                {entry.accomplishments.map((a, i) => (
                                    <p key={i} className="text-xs text-primary/70 leading-relaxed pl-2 border-l border-primary/30">
                                        {a}
                                    </p>
                                ))}
                            </div>
                        )}
                        <div className="flex flex-wrap gap-1 mt-0.5">
                            {entry.skills_used.map(skill => (
                                <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
