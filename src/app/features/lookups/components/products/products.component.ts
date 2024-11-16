import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { PageHeaderComponent } from "../../../../shared/components/page-header/page-header.component";
import { SaveBtnComponent } from "../../../../shared/components/save-btn/save-btn.component";
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatInputModule,PageHeaderComponent, SaveBtnComponent,MatSelectModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  pageTitle = "الأصناف";

}
