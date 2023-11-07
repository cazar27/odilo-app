import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from '../models/alert.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private _subject = new Subject<Alert>();
  private _defaultId = 'default-alert';

  constructor(private snackBar: MatSnackBar) { }

  onAlert(id = this._defaultId): Observable<Alert> {
    return this._subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  // convenience methods
  success(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Success, message }));
  }

  error(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Error, message }));
  }

  info(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Info, message }));
  }

  warn(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
  }

  alert(alert: Alert) {
    alert.id = alert.id || this._defaultId;
    this._subject.next(alert);

    this.snackBar.open(alert.message, 'Cerrar', {
      //duration: 5000,
      panelClass: this.getSnackBarCssClass(alert.type),
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  clear(id = this._defaultId) {
    this._subject.next(new Alert({ id }));
  }

  private getSnackBarCssClass(alertType: AlertType): string {
    switch (alertType) {
      case AlertType.Success:
        return 'success-snackbar';
      case AlertType.Error:
        return 'error-snackbar';
      case AlertType.Info:
        return 'info-snackbar';
      case AlertType.Warning:
        return 'warning-snackbar';
      default:
        return '';
    }
  }
}
