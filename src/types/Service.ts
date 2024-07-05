type Item = {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  imageUrl: string[];
};


type ForForm = Omit<Item, 'imageUrl'> & {
  imageUrls: string;
};

type Params = {
  page: string;
  size?: string
};

export enum ServiceCategory {
  Decorative = 1,
  HangWallpaper = 2,
}

declare namespace TyService {
  export {
    Item,
    ForForm,
    Params,
  };
}

export type { TyService };
