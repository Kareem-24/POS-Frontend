import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
  <div class="p-6">
    <h1 class="text-lg font-bold text-center">تأكيد الحذف</h1>
    <div class="mt-4 mb-6 text-center">
      <p>هل أنت متأكد أنك تريد حذف هذا الصنف؟</p>
    </div>
    <div class="flex justify-center space-x-4">
      <button mat-button (click)="onNoClick()" class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mx-2">لا</button>
      <button mat-button cdkFocusInitial (click)="onConfirm()" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mx-2">نعم</button>
    </div>
  </div>
`
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}