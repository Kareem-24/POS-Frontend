import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-save-btn',
  standalone: true,
  imports: [],
  templateUrl: './save-btn.component.html',
  styleUrl: './save-btn.component.css'
})
export class SaveBtnComponent {
  @Input() disabled = false;

}
