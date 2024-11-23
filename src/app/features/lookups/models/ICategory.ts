export interface ICategory {
  ID?: number;
  Description?: string;
}

export interface ICategoryWithSub {
  ID?: number;
  Description?: string;
  SubCategory?: ISubCategory[];
}


export interface ISubCategory {
  ID?: number;
  CategoryId: number;
  Description: string;
}
