export interface ExperienceEntry {
    title: string;
    company: string;
    industry?: string;
    start_date: string;
    end_date: string;
    responsibilities: string[];
    accomplishments?: string[];
    skills_used: string[];
}

// Keep in sync with backend/data/facts.json work_experience
export const experience: ExperienceEntry[] = [
    {
        title: "Software Engineer",
        company: "Measurabl Inc.",
        industry: "Environmental Industry",
        start_date: "Feb 2022",
        end_date: "Aug 2025",
        responsibilities: [
            "Built a comprehensive design system from scratch, standardizing UI/UX across all products.",
            "Hosted Storybook on AWS and automated releases using semantic release.",
            "Engineered AWS (Terraform) infrastructure for product entry points, integrating Auth0.",
            "Managed test cases using Selenium (Python) and Pytest for an Angular app upgrade.",
        ],
        skills_used: ["TypeScript", "React.js", "Python", "AWS (Amazon Web Services)", "GitHub Actions"],
    },
    {
        title: "Software Engineer",
        company: "Safaricom — DigiFarm",
        industry: "Telecom Industry",
        start_date: "May 2021",
        end_date: "Nov 2021",
        responsibilities: [
            "Refactored React components to prevent unnecessary re-renders and improve reusability.",
            "Implemented automated testing and a CI/CD pipeline using GitHub Actions.",
            "Resolved user-facing production bugs and provided technical support.",
        ],
        skills_used: ["TypeScript", "React.js", "GitHub Actions"],
    },
    {
        title: "QA Automation Engineer",
        company: "Attune Insurance Services",
        industry: "Insurance Industry",
        start_date: "Apr 2019",
        end_date: "Feb 2021",
        responsibilities: [
            "Designed and wrote E2E tests for an Angular web app using Selenium/Java and JUnit 4.",
            "Wrote API tests using Node.js (TypeScript) and Jest; Dockerized for GitLab CI.",
            "Added web UI tests with Cypress in TypeScript.",
        ],
        accomplishments: [
            "Reduced browser testing times by 60% through parallel JUnit 4 test execution.",
        ],
        skills_used: ["Python", "Java", "Selenium", "Cypress", "Automation Engineering"],
    },
    {
        title: "Associate Software Engineer",
        company: "Andela Internal Engagements",
        start_date: "Oct 2018",
        end_date: "Apr 2019",
        responsibilities: [
            "Built features for a travel management tool using React, Redux Saga, and Node.js.",
            "Developed an ETL tool to migrate data from Excel and BambooHR to PostgreSQL.",
        ],
        skills_used: ["JavaScript", "React.js", "Node.js"],
    },
    {
        title: "Associate Software Engineer",
        company: "Andela Internal Engagements",
        start_date: "Jul 2018",
        end_date: "Oct 2018",
        responsibilities: [
            "Implemented a blogging app with Python/Flask/PostgreSQL backend and React-Redux frontend.",
            "Translated mock-ups into React/Redux components and implemented corresponding backend APIs.",
        ],
        skills_used: ["Python", "React.js", "JavaScript"],
    },
];
