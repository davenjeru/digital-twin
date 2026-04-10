'use client';

import { topSkills, otherSkills, type SkillEntry } from './data/skills';
import { cn } from '@/lib/utils';

// Maps experience range to a visual weight class
function experienceToLevel(experience: string): 'expert' | 'proficient' | 'familiar' {
    if (experience.startsWith('7') || experience.startsWith('10')) return 'expert';
    if (experience.startsWith('4') || experience.startsWith('5') || experience.startsWith('6')) return 'proficient';
    return 'familiar';
}

const levelStyles = {
    expert:     'bg-primary/20 text-primary border-primary/30',
    proficient: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
    familiar:   'bg-muted text-muted-foreground border-border',
} as const;

const levelDot = {
    expert:     'bg-primary',
    proficient: 'bg-blue-400',
    familiar:   'bg-muted-foreground/50',
} as const;

export default function SkillsGrid() {
    return (
        <div className="flex flex-col gap-4">
            <SkillSection title="Top Skills" skills={topSkills} />
            <SkillSection title="Other Skills" skills={otherSkills} />
        </div>
    );
}

function SkillSection({ title, skills }: { title: string; skills: SkillEntry[] }) {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {title}
            </p>
            <div className="flex flex-wrap gap-2">
                {skills.map((s) => <SkillChip key={s.skill} entry={s} />)}
            </div>
        </div>
    );
}

function SkillChip({ entry }: { entry: SkillEntry }) {
    const level = experienceToLevel(entry.experience);
    return (
        <div className={cn(
            'flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
            levelStyles[level]
        )}>
            <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', levelDot[level])} />
            {entry.skill}
            <span className="opacity-60 font-normal">{entry.experience}</span>
        </div>
    );
}
