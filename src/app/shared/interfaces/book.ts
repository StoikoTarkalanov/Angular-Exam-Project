export interface IBook {
  results: any;
  name: string;
  image: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  objectId: string;
  createdBy: string;
  owner: {
    objectId: string;
  };
  paginator;
}
