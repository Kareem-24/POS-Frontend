import { NotificationService } from './../../../../shared/services/notification/notification.service';
import { ICategory, ISubCategory } from './../../models/ICategory';
import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SaveBtnComponent } from "../../../../shared/components/save-btn/save-btn.component";
import { CategoryService } from '../../services/category/category.service';
import { NotificationComponent } from '../../../../shared/components/notification/notification.component';
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
    NotificationComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  isSubCategoryChecked = false;
  pageTitle = "الفئات";
  categoryForm: FormGroup;
  parentCategories: any[] = [];

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
    const category:ICategory = {};
    this.categoriesService.getAllCategories(category).subscribe(
      categories => this.parentCategories = categories
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
          },
          error: (error) => {
            this.notificationService.showNotification('حدث خطأ أثناء إضافة الفئة', 'error');
          }
        });
      }
    }
  }
}
