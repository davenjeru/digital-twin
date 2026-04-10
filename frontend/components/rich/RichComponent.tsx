'use client';

import CertificatesGrid from './CertificatesGrid';
import SkillsGrid from './SkillsGrid';
import ExperienceTimeline from './ExperienceTimeline';

interface Props {
    type: string;
}

export default function RichComponent({ type }: Props) {
    switch (type) {
        case 'certificates':
            return <CertificatesGrid />;
        case 'skills':
            return <SkillsGrid />;
        case 'experience':
            return <ExperienceTimeline />;
        default:
            return null;
    }
}
