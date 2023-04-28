export interface IUserData {
  user: {
    id: string;
    name: string;
    introduce: string;
    imageUrl: string;
    contact: {
      email: string;
      websiteUrl: string | null;
    };
    repositoryCount: number;
  };
  repositories: {
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
  }[];
  languages: {
    rate: number;
    name: string;
  }[];
  contributions: {
    commitCount: number;
    lastYear: number;
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
