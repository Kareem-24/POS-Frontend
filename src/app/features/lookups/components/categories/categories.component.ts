import { NotificationService } from './../../../../shared/services/notification/notification.service';
import { ICategory, ICategoryWithSub, ISubCategory } from './../../models/ICategory';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SaveBtnComponent } from "../../../../shared/components/save-btn/save-btn.component";
import { CategoryService } from '../../services/category/category.service';
import { NotificationComponent } from '../../../../shared/components/notification/notification.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  selector: 'app-categories',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SaveBtnComponent,
    NotificationComponent,
    PageHeaderComponent,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})


export class CategoriesComponent implements OnInit {
  isSubCategoryChecked = false;
  pageTitle = "الفئات";
  categoryForm: FormGroup;
  parentCategories: ICategory[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  categories = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['name', 'type', 'parentCategory', 'actions'];


  get flattenedCategories(): FlattenedCategory[] {
    const flattened: FlattenedCategory[] = [];
    
    this.categories.data.forEach(category => {
      // Add main category
      flattened.push({
        ID: category.ID!,
        Description: category.Description!,
        isSubCategory: false
      });
      
      // Add subcategories if they exist
      if (category.SubCategory?.length) {
        category.SubCategory.forEach((sub:ISubCategory) => {
          flattened.push({
            ID: sub.ID!,
            Description: sub.Description,
            isSubCategory: true,
            parentId: category.ID,
            parentDescription: category.Description
          });
        });
      }
    });
    
    return flattened;
  }
  
  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoryService,
    public notificationService: NotificationService

  ) {

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      isSubCategory: [false],
      parentId: [null]
    });
  
    this.categoryForm.get('isSubCategory')?.valueChanges.subscribe(isSubCategory => {
      const parentIdControl = this.categoryForm.get('parentId');
      if (isSubCategory) {
        parentIdControl?.setValidators(Validators.required);
      } else {
        parentIdControl?.clearValidators();
      }
      parentIdControl?.updateValueAndValidity();
    });
  }

  ngOnInit() {
    // Load parent categories for dropdown
    this.loadParentCategories();
  }
  loadParentCategories() {
    const category:ICategoryWithSub = {};
    this.categoriesService.getAllCategoriesWithSub(category).subscribe(
      response => {
        console.log(response);

        this.parentCategories = response.Data as ICategory[];
        this.categories.data = response.Data as ICategoryWithSub[];
      }
    );
  }
  onSubmit() {
    if (this.categoryForm.valid) {
      const formData = this.categoryForm.value;
      
      if (formData.isSubCategory) {
        const subCategory: ISubCategory = {
          Description: formData.name,
          CategoryId: formData.parentId
        };

        this.categoriesService.AddSubCategory(subCategory).subscribe({
          next: () => {
            this.notificationService.showNotification('تم إضافة الفئة الفرعية بنجاح', 'success');
            this.categoryForm.reset(); 
            this.loadParentCategories();
          },
          error: (error) => {
            this.notificationService.showNotification('حدث خطأ أثناء إضافة الفئة الفرعية', 'error');
          }
        });
      } else {
        const category: ICategory = {
          Description: formData.name
        };

        this.categoriesService.AddCategory(category).subscribe({
          next: () => {
            this.notificationService.showNotification('تم إضافة الفئة بنجاح', 'success');
            this.categoryForm.reset(); 
            this.loadParentCategories();

          },
          error: (error) => {
            this.notificationService.showNotification('حدث خطأ أثناء إضافة الفئة', 'error');
          }
        });
      }
    }
  }

  ngAfterViewInit() {
    this.categories.paginator = this.paginator;
  }

  getParentCategoryName(parentId: number): string {
    const parent = this.parentCategories.find(cat => cat.ID === parentId);
    return parent?.Description || '';
  }

  editCategory(category: any) {
    // Implement edit logic
  }

  deleteCategory(category: any) {
    // Implement delete logic
  }
}
