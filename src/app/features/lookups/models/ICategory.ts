export interface ICategory {
  ID: number;
  Description: string;
}

export interface ICategoryWithSub {
  ID: number;
  Description: string;
  SubCategory : ISubCategory;
}


export interface ISubCategory {
  ID: number;
  ICategoryId: number;
  Description: string;
}
