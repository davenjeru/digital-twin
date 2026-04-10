export interface SkillEntry {
    skill: string;
    experience: string;
}

// Keep in sync with backend/data/facts.json top_skills / other_skills
export const topSkills: SkillEntry[] = [
    { skill: "QA Engineering", experience: "7 - 9 years" },
    { skill: "TypeScript", experience: "7 - 9 years" },
    { skill: "Python", experience: "4 - 6 years" },
    { skill: "React.js", experience: "4 - 6 years" },
    { skill: "AWS (Amazon Web Services)", experience: "2 - 3 years" },
];

export const otherSkills: SkillEntry[] = [
    { skill: "Agile", experience: "7 - 9 years" },
    { skill: "Automation Engineering", experience: "7 - 9 years" },
    { skill: "Git", experience: "7 - 9 years" },
    { skill: "GitHub", experience: "7 - 9 years" },
    { skill: "GitHub Actions", experience: "7 - 9 years" },
    { skill: "JavaScript", experience: "7 - 9 years" },
    { skill: "QA Analysis", experience: "7 - 9 years" },
    { skill: "REST", experience: "7 - 9 years" },
];
