import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
const deleteIcon = 'src/assets/icons/delete.svg';
@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [MatIconModule,CommonModule,MatFormFieldModule],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.css'
})
export class ImageUploaderComponent {
  @Output() imageSelected = new EventEmitter<File>() || null;
  imagePreview: string | null = null;
  errorMessage: string | null = null;
  private readonly maxSizeInBytes = 5 * 1024 * 1024; // 5MB
  deleteIcon = deleteIcon;
  onFileSelected(event: Event): void {
    const input  = event.target as HTMLInputElement;
    if (input.files?.length){
      this.handleFile(input.files[0]);
    }
  }

  removeImage(): void {
    this.imagePreview = null;
    this.errorMessage = null;
    this.imageSelected.emit(undefined)

  }

  private handleFile(file: File): void {
    this.errorMessage = null;
console.log(this.imageSelected)
    if (file.size > this.maxSizeInBytes) {
      this.errorMessage = 'يجب ألا يكون حجم الصورة أكبر من 5MB';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

    this.imageSelected.emit(file);
  }
}
