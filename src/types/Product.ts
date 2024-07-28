export enum ProductCategory {
  Paint = 1,
  Wallpaper = 2,
}

export namespace TyProduct {
  export type Item = {
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

  export type ForForm = Omit<Item, 'imageUrl'> & {
    imageUrls: string;
  };

  export type Params = {
    page: string;
    size?: string
  };

  export enum Category {
    Paint = 1,
    Wallpaper = 2,
  }
}
