import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environement';
import { IProduct } from '../../models/IProduct';
import { IResult } from '../../../../shared/Models/IResult';
import { ISearch } from '../../models/ISearch';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiBaseUrl}/Product`; 

  constructor(private http: HttpClient) { }

  getAllProducts(category:IProduct): Observable<IResult<IProduct>> {
    return this.http.post<IResult<IProduct>>(`${this.apiUrl}/GetAllProducts`,category);
  }
  AddProduct(category:IProduct): Observable<IResult<IProduct>> {
    return this.http.post<IResult<IProduct>>(`${this.apiUrl}/AddProduct`,category);
  }

  UpdateProduct(category:IProduct): Observable<IResult<IProduct>> {
    return this.http.post<IResult<IProduct>>(`${this.apiUrl}/UpdateProduct`,category);
  }

  HideProduct(category:IProduct): Observable<IResult<IProduct>> {
    return this.http.post<IResult<IProduct>>(`${this.apiUrl}/HideProduct`,category);
  }

  DeleteProduct(category:IProduct): Observable<IResult<IProduct>> {
    return this.http.post<IResult<IProduct>>(`${this.apiUrl}/DeleteProduct`,category);
  }

  GetProductById(category:IProduct): Observable<IResult<IProduct>> {
    return this.http.post<IResult<IProduct>>(`${this.apiUrl}/GetProductById`,category);
  }

  SearchProductByNameOrCode(category:ISearch): Observable<IResult<IProduct>> {
    return this.http.post<IResult<IProduct>>(`${this.apiUrl}/SearchProductByNameOrCode`,category);
  }
}
