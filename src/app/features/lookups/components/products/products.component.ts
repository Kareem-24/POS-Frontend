import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { PageHeaderComponent } from "../../../../shared/components/page-header/page-header.component";
import { SaveBtnComponent } from "../../../../shared/components/save-btn/save-btn.component";
import {MatSelectModule} from '@angular/material/select';
import { ImageUploaderComponent } from '../../../../shared/components/image-uploader/image-uploader.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category/category.service';
import { ProductService } from '../../services/product/product.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { ICategoryWithSub, ISubCategory } from '../../models/ICategory';
import { IProduct } from '../../models/IProduct';
import { NotificationComponent } from '../../../../shared/components/notification/notification.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';





interface FlattenedCategory {
  ID: number;
  Description: string;
  isSubCategory: boolean;
  parentId?: number;
  parentDescription?: string;
}



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatInputModule,
    PageHeaderComponent,
     SaveBtnComponent,
     MatSelectModule,
     ImageUploaderComponent,
     ReactiveFormsModule,
     CommonModule,
     NotificationComponent,
     MatTableModule,
     MatIconModule,
    ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  pageTitle = "الأصناف";
  imageBase64: string | null = null;
  productForm!: FormGroup;
  parentCategories: ICategoryWithSub[] = [];
  flattenedCategories: FlattenedCategory[] = [];
  displayedColumns: string[] = ['code', 'description', 'category', 'quantity', 'purchasePrice', 'sellingPrice', 'actions'];
  products: IProduct[] = [];
  constructor(private fb: FormBuilder,
     private productService: ProductService,
     private categoriesService: CategoryService,
    public notificationService: NotificationService) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      category: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      purchasePrice: ['', [Validators.required, Validators.min(0)]],
      sellingPrice: ['', [Validators.required, Validators.min(0)]],
      image: [''] // Optional field
    });
    this.loadParentCategories();
    this.loadProducts();
  }


  onImageSelected(file: File | undefined): void {
    if (file){
const reader = new FileReader();
  reader.onload = () => {
    this.imageBase64 = reader.result as string;
    this.productForm.patchValue({
      image: this.imageBase64
    });
  };
    reader.readAsDataURL(file);
    }else {
      this.imageBase64 = null;
      this.productForm.patchValue({
        image: null
      });
    }
  }
  loadParentCategories() {
    const category:ICategoryWithSub = {};
    this.categoriesService.getAllCategoriesWithSub(category).subscribe(
      response => {
        this.parentCategories = response.Data as ICategoryWithSub[];
        this.updateFlattenedCategories();

      }
    );
  }
loadProducts(){
  const product:IProduct = {};
  this.productService.getAllProducts(product).subscribe(
    response => {
      this.products = response.Data;    }
  );
}
  private  updateFlattenedCategories() :void {
    this.flattenedCategories = [];
    
    this.parentCategories.forEach(category => {
      this.flattenedCategories.push({
        ID: category.ID!,
        Description: category.Description!,
        isSubCategory: false
      });
      
      if (category.SubCategory?.length) {
        category.SubCategory.forEach((sub:ISubCategory) => {
          this.flattenedCategories.push({
            ID: sub.ID!,
            Description: sub.Description,
            isSubCategory: true,
            parentId: category.ID,
            parentDescription: category.Description
          });
        });
      }
    });
  }


  onSubmit(): void {
if (this.productForm.valid) {
  const formData = this.productForm.value;
  console.log(formData);
  const product: IProduct = {
    Description: formData.name,
    Code: formData.code,
    CategoryId: formData.category,
    Image: formData.image,
    Quantity: formData.quantity,
    PurchasePrice: formData.purchasePrice,
    SellingPrice: formData.sellingPrice
  };
  this.productService.AddProduct(product).subscribe({
    next: () => {
      this.notificationService.showNotification('تم إضافة الصنف بنجاح', 'success');
      this.productForm.reset(); 
    },
    error: (error) => {
      this.notificationService.showNotification('حدث خطأ أثناء إضافة الصنف', 'error');
    }
  });
} 

  }
}
