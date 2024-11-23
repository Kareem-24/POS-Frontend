import { Injectable } from '@angular/core';
import { environment } from '../../../../../environement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory,ICategoryWithSub,ISubCategory } from '../../models/ICategory';
import { IResult } from '../../../../shared/Models/IResult';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiBaseUrl}/Category`; 
  private apiUrl2 = `${environment.apiBaseUrl}/SubCategory`; 

  constructor(private http: HttpClient) { }

  getAllCategories(category:ICategory): Observable<IResult<ICategory>> {
    return this.http.post<IResult<ICategory>>(`${this.apiUrl}/GetAllCategories`,category);
  }

  getAllCategoriesWithSub(category:ICategory): Observable<IResult<ICategoryWithSub>> {
    return this.http.post<IResult<ICategoryWithSub>>(`${this.apiUrl}/GetAllCategoriesWithSubCategory`,category);
  }

  AddCategory(category:ICategory): Observable<IResult<ICategory>> {
    return this.http.post<IResult<ICategory>>(`${this.apiUrl}/AddCategory`,category);
  }

  UpdateCategory(category:ICategory): Observable<IResult<ICategory>> {
    return this.http.post<IResult<ICategory>>(`${this.apiUrl}/UpdateCategory`,category);
  }

  DeleteCategory(category:ICategory): Observable<IResult<ICategory>> {
    return this.http.post<IResult<ICategory>>(`${this.apiUrl}/DeleteCategory`,category);
  }



  getAllSubCategories(category:ISubCategory): Observable<IResult<ISubCategory>> {
    return this.http.post<IResult<ISubCategory>>(`${this.apiUrl2}/GetAllSubCategories`,category);
  }
  AddSubCategory(category:ISubCategory): Observable<IResult<ISubCategory>> {
    return this.http.post<IResult<ISubCategory>>(`${this.apiUrl2}/AddSubCategory`,category);
  }

  UpdateSubCategory(category:ISubCategory): Observable<IResult<ISubCategory>> {
    return this.http.post<IResult<ISubCategory>>(`${this.apiUrl2}/UpdateSubCategory`,category);
  }

  DeleteSubCategory(category:ISubCategory): Observable<IResult<ISubCategory>> {
    return this.http.post<IResult<ISubCategory>>(`${this.apiUrl2}/DeleteSubCategory`,category);
  }
}
