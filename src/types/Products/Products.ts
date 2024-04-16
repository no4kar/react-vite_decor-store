export type TyProduct = {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  country: string;
  producer: string;
  collection: string;
  type: string;
  tone: string;
  room: string;
  description: string;
  imgUrl: string[];
};

export enum ProductCategory {
  Wallpaper = 2,
  Paint = 3,
}
