import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {

  private toastr = inject(ToastrService);

  // ✅ SUCCESS
  success(message: string, title: string = 'Succès') {
    this.toastr.success(message, title);
  }

  // ❌ ERROR
  error(message: string, title: string = 'Erreur') {
    this.toastr.error(message, title);
  }

  // ⚠️ WARNING
  warning(message: string, title: string = 'Attention') {
    this.toastr.warning(message, title);
  }

  // ℹ️ INFO
  info(message: string, title: string = 'Info') {
    this.toastr.info(message, title);
  }

  // 🔥 Notification custom
  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
    this.toastr[type](message);
  }

  // 🧹 Clear toutes les notifications
  clear() {
    this.toastr.clear();
  }
}