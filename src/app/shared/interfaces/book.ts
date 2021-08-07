export interface IBook {
  results: any;
  name: string;
  image: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  objectId: string;
  userData: {
    userId: string;
    username: string;
  };
}
