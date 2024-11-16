import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from "../../../../shared/components/page-header/page-header.component";
import { SaveBtnComponent } from "../../../../shared/components/save-btn/save-btn.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatInputModule, MatCheckboxModule, MatSelectModule, MatFormFieldModule, FormsModule, CommonModule, PageHeaderComponent, SaveBtnComponent],
templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  isSubCategoryChecked = false;
  pageTitle = "الفئات";
}
