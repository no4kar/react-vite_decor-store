export type TyService = {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string[];
};

/* categoryId === typeId */

export enum ServiceCategory {
  Decorative = 1,
  HangWallpaper = 2,
}
