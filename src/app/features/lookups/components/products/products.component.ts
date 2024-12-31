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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';





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
  styleUrl: './products.component.css',

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
    public notificationService: NotificationService,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      id: [''],
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
      this.products = response.Data;
        }
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



  EditProduct(product: IProduct): void {
    this.productForm.patchValue({
      id: product.ID,
      name: product.Description,
      code: product.Code,
      category: product.CategoryId,
      quantity: product.Quantity,
      purchasePrice: product.PurchasePrice,
      sellingPrice: product.SellingPrice,
      image: product.Image 
    });

    if (product.Image != null) {
      this.imageBase64 = product.Image;
    }

  }

DeleteProduct(product: IProduct): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent);
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.productService.DeleteProduct(product).subscribe({
        next: () => {
          this.notificationService.showNotification('تم حذف الصنف بنجاح', 'success');
          this.loadProducts();
        },
        error: (error) => {
          this.notificationService.showNotification('حدث خطاء في حذف الصنف', 'error');
        }
      });
    }
  });
  
}


  onSubmit(): void {
if (this.productForm.valid) {
  const formData = this.productForm.value;
  console.log(formData);
  const product: IProduct = {
    ID: formData.id,
    Description: formData.name,
    Code: formData.code,
    CategoryId: formData.category,
    Image: formData.image,
    Quantity: formData.quantity,
    PurchasePrice: formData.purchasePrice,
    SellingPrice: formData.sellingPrice
  };
console.log(`product id :${product.ID}`);
  if (product.ID) {
    this.productService.UpdateProduct(product).subscribe({
      next: () => {
        this.notificationService.showNotification('تم تحديث الصنف بنجاح', 'success');
        this.productForm.reset(); 
        this.loadProducts();
      },
      error: (error) => {
        this.notificationService.showNotification(' حدث خطاء في التحديث', 'error');
      }
    });
    
  } else {
    this.productService.AddProduct(product).subscribe({
      next: () => {
        this.notificationService.showNotification('تم إضافة الصنف بنجاح', 'success');
        this.productForm.reset(); 
        this.loadProducts();
        this.productForm.setErrors(null);
  
      },
      error: (error) => {
        this.notificationService.showNotification('حدث خطأ أثناء إضافة الصنف', 'error');
      }
    });
  }

  } 

}

}



