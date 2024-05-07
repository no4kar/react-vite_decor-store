export type TyService = {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  imageUrl: string[];
};

/* categoryId === typeId */

export enum ServiceCategory {
  Decorative = 1,
  HangWallpaper = 2,
}
