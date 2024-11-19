import { Injectable } from '@angular/core';
import { ISubCategory } from '../../models/ICategory';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environement';
import { IProduct } from '../../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiBaseUrl}/Product`; 

  constructor(private http: HttpClient) { }

  getAllProducts(category:IProduct): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(`${this.apiUrl}/GetAllProducts`,category);
  }
  AddProduct(category:IProduct): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(`${this.apiUrl}/AddProduct`,category);
  }

  UpdateProduct(category:IProduct): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(`${this.apiUrl}/UpdateProduct`,category);
  }

  DeleteProduct(category:IProduct): Observable<IProduct[]> {
    return this.http.post<IProduct[]>(`${this.apiUrl}/DeleteProduct`,category);
  }
}
