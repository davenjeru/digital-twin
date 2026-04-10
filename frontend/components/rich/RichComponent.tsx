'use client';

import CertificatesGrid from './CertificatesGrid';

interface Props {
    type: string;
}

export default function RichComponent({ type }: Props) {
    switch (type) {
        case 'certificates':
            return <CertificatesGrid />;
        // Future: case 'skills': return <SkillsGrid />;
        // Future: case 'experience': return <ExperienceTimeline />;
        default:
            return null;
    }
}
