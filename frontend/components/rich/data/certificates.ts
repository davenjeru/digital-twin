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
        {
        name: "Data Structures and Algorithms: Deep Dive Using Java",
        issuer: "Tim Buchakla",
        issued: "April 8, 2021",
        image: "udemy-course-data-structures-and-algorithms-using-java.jpg",
        type: "course",
        platform: "Udemy",
    },
    {
        name: "AWS Cloud Practitioner",
        issuer: "Stephane Maarek",
        issued: "January 13, 2020",
        image: "udemy-course-aws-cloud-practitioner.jpg",
        type: "course",
        platform: "Udemy",
    },
    {
        name: "AI Leader: Generative AI & Agentic AI for Leaders & Founders",
        issuer: "Ed Donner",
        issued: "March 12, 2026",
        image: "udemy-course-ai-leadership.jpg",
        type: "course",
        platform: "Udemy",
    },
        {
        name: "LLM Engineering: Master AI, Large Language Models & Agents",
        issuer: "Ed Donner",
        issued: "September 27, 2025",
        image: "udemy-course-llm-engineering.jpg",
        type: "course",
        platform: "Udemy",
    },
  {
        name: "AI Engineer Agentic Track: The Complete Agent & MCP Course",
        issuer: "Ed Donner",
        issued: "March 24, 2026",
        image: "udemy-course-agentic-ai.jpg",
        type: "course",
        platform: "Udemy",
    }
];
