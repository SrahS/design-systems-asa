export type UserId = number;

export type User = {
  id: UserId;
  name: string;
  login: string;
  budget: number;
  createdAt: string;
  updatedAt: string | null;
};

export type ActiveUser = User & {
  firstName: string;
};
