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
  imageUrl: string[];
};

export enum ProductCategory {
  Paint = 1,
  Wallpaper = 2,
}
