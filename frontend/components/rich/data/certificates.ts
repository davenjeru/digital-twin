export interface CertificateEntry {
    name: string;
    issuer: string;
    issued: string;
    image: string; // filename only — resolved from /certificates/<image>
    type: 'certification' | 'course';
    platform?: string;
}

export const certificates: CertificateEntry[] = [
    // Certifications — keep in sync with backend/data/facts.json
    {
        name: "Andela AI Academy: AI Mastery Program",
        issuer: "Andela",
        issued: "Nov 2025",
        image: "andela-ai-academy.png",
        type: "certification",
    },
    {
        name: "GitHub Copilot",
        issuer: "GitHub",
        issued: "Oct 2025",
        image: "github-copilot.png",
        type: "certification",
    },
    {
        name: "Certified Cloud Practitioner (Foundational)",
        issuer: "Amazon Web Services (AWS)",
        issued: "Jan 2022",
        image: "aws-cloud-practitioner.png",
        type: "certification",
    },
    // Courses — add Udemy and other course entries here
    // Example:
    // {
    //     name: "Course Name",
    //     issuer: "Instructor Name",
    //     issued: "Mon YYYY",
    //     image: "udemy-course-slug.png",
    //     type: "course",
    //     platform: "Udemy",
    // },
];
