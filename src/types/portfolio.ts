export interface IUserData {
  data: {
    user: {
      id: string;
      name: string;
      introduce: string;
      imageUrl: string;
      contact: {
        email: string;
        websiteUrl: string | null;
      };
    };
    repositories: {
      name: string;
      description: string;
      url: string;
      language: string;
      startCount: number;
      owner: string;
    }[];
    languages: {
      rate: number;
      name: string;
    }[];
  };
}
