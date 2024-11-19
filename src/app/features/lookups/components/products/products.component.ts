import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { PageHeaderComponent } from "../../../../shared/components/page-header/page-header.component";
import { SaveBtnComponent } from "../../../../shared/components/save-btn/save-btn.component";
import {MatSelectModule} from '@angular/material/select';
import { ImageUploaderComponent } from '../../../../shared/components/image-uploader/image-uploader.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatInputModule,PageHeaderComponent, SaveBtnComponent,MatSelectModule,ImageUploaderComponent,ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  pageTitle = "الأصناف";
  imageBase64: string | null = null;
  productForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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


  onSubmit(): void {

  }
}
