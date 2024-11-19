import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INotification } from '../../Models/INotification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification = new BehaviorSubject<INotification | null>(null);
  notification$ = this.notification.asObservable();


  showNotification(message: string, type: 'success' | 'error') {
    this.notification.next({ message, type });
    setTimeout(() => {
      this.notification.next(null);
    }, 3000); 
  }
}
