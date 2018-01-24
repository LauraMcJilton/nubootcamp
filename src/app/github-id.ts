export interface GitIdInfo {
    login: string;
    name?: string;
    bio?: string;
    avatar_url?: string;
    location?: string;
    company?: string;
    html_url?: string;
    created_at?: string;
    public_repos?: string;
    favorite?: boolean;
}

export interface GitRepo{
    name?: string;
    description?: string;
    html_url?: string;
    has_issues?: boolean;
}

export interface GitIssue{
    number: number[];
    title: string[];
    user: { login: string }[];
    labels: { name: string };
    milestone: { title: string }[];
    created_at: string[];
    updated_at: string[];
    closed_at: string[];
    state: string[];
}

export interface GitMilestone{
    title?: string[];
    state?: string[];
    open_issues?: number[];
    closed_issues?: number[];
    created_at?: string[];
    closed_at?: string[];
    due_on?: string[];
}
 