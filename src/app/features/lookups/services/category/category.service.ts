import { Injectable } from '@angular/core';
import { environment } from '../../../../../environement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory,ISubCategory } from '../../models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiBaseUrl}/Category`; 
  private apiUrl2 = `${environment.apiBaseUrl}/SubCategory`; 

  constructor(private http: HttpClient) { }

  getAllCategories(category:ICategory): Observable<ICategory[]> {
    return this.http.post<ICategory[]>(`${this.apiUrl}/GetAllCategories`,category);
  }

  getAllCategoriesWithSub(category:ICategory): Observable<ICategory[]> {
    return this.http.post<ICategory[]>(`${this.apiUrl}/GetAllCategoriesWithSubCategory`,category);
  }

  AddCategory(category:ICategory): Observable<ICategory[]> {
    return this.http.post<ICategory[]>(`${this.apiUrl}/AddCategory`,category);
  }

  UpdateCategory(category:ICategory): Observable<ICategory[]> {
    return this.http.post<ICategory[]>(`${this.apiUrl}/UpdateCategory`,category);
  }

  DeleteCategory(category:ICategory): Observable<ICategory[]> {
    return this.http.post<ICategory[]>(`${this.apiUrl}/DeleteCategory`,category);
  }



  getAllSubCategories(category:ISubCategory): Observable<ISubCategory[]> {
    return this.http.post<ISubCategory[]>(`${this.apiUrl2}/GetAllSubCategories`,category);
  }
  AddSubCategory(category:ISubCategory): Observable<ISubCategory[]> {
    return this.http.post<ISubCategory[]>(`${this.apiUrl2}/AddSubCategory`,category);
  }

  UpdateSubCategory(category:ISubCategory): Observable<ISubCategory[]> {
    return this.http.post<ISubCategory[]>(`${this.apiUrl2}/UpdateSubCategory`,category);
  }

  DeleteSubCategory(category:ISubCategory): Observable<ISubCategory[]> {
    return this.http.post<ISubCategory[]>(`${this.apiUrl2}/DeleteSubCategory`,category);
  }
}
