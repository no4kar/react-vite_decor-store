type Item = {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  country: string;
  producer: string;
  collection: string;
  type: string;
  code: string,
  tone: string;
  room: string;
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

export enum ProductCategory {
  Paint = 1,
  Wallpaper = 2,
}

declare namespace TyProduct {
  export {
    Item,
    ForForm,
    Params,
  };
}

export type { TyProduct };
