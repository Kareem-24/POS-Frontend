import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  standalone : true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule,ReactiveFormsModule]
})
export class SearchBarComponent {
  searchForm: FormGroup;
  
  @Output() search = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  onSearch(): void {
    const term = this.searchForm.value.searchTerm;
    this.search.emit(term);
    this.searchForm.reset();
  }
}