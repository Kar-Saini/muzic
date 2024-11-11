export type Space = {
  creator: {
    id: string;
    email: string;
    username: string | null;
  };
} & {
  id: string;
  spaceName: string | null;
  createdAt: Date;
  creatorId: string;
  active: boolean;
};
