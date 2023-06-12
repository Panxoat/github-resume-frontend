export type ILanguages = {
  rate: number;
  name: string;
};

export type ISocialAccounts = {
  name: string;
  url: string;
};

export type IRepositories = {
  name: string;
  description: string;
  url: string;
  language: string;
  startCount: number;
  owner: string;
  topics: string[];
  forkCount: number;
  starCount: number;
  homepageUrl: string;
};

export interface IUserData {
  user: {
    id: string;
    name: string | null;
    introduce: string | null;
    imageUrl: string;
    contact: {
      email: string;
      websiteUrl: string | null;
      socialAccounts: any[] | ISocialAccounts[];
    };
    repositoryCount: number;
  };
  repositories: any[] | IRepositories[];
  languages: any[] | ILanguages[];
  contributions: {
    commitCount: number;
    year: number;
    latestCommittedRepository: {
      name: string;
      url: string;
    } | null;
    monthlyContributionHistories: {
      contributionCount: number;
      date: {
        year: number;
        month: number;
      };
    }[];
    recentMonthRange: number;
  };
}
