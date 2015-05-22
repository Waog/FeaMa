declare module GithubLib {
    interface Github {
        getIssues(ownerName: string, repoName: string): GithubIssues;
    }

    interface GithubIssues {
        list(options: any, callback: (err: any, issues: any) => void): void;
    }

    interface GithubFactory {
        new (config: any): Github;
    }
}

declare var Github: GithubLib.GithubFactory;
