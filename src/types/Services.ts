export type TyService = {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  imageUrl: string[];
};


export type TyServiceForForm = Omit<TyService, 'imageUrl'> & {
  imageUrls: string;
};

/* categoryId === typeId */

export enum ServiceCategory {
  Decorative = 1,
  HangWallpaper = 2,
}
