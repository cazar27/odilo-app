import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AlertService } from './alert.service';
import { Observable } from 'rxjs';
import { Alert, AlertType } from '../models/alert.model';

describe('AlertService', () => {
  let service: AlertService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
    });
    service = TestBed.inject(AlertService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should display success alert', fakeAsync(() => {
    spyOn(snackBar, 'open');
    service.success('Success Message');
    tick(); // wait for snackBar.open to be called

    expect(snackBar.open).toHaveBeenCalledWith('Success Message', 'Cerrar', {
      panelClass: 'success-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }));

  it('should display error alert', fakeAsync(() => {
    spyOn(snackBar, 'open');
    service.error('Error Message');
    tick(); // wait for snackBar.open to be called

    expect(snackBar.open).toHaveBeenCalledWith('Error Message', 'Cerrar', {
      panelClass: 'error-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }));

  it('should display info alert', fakeAsync(() => {
    spyOn(snackBar, 'open');
    service.info('Success Message');
    tick(); // wait for snackBar.open to be called

    expect(snackBar.open).toHaveBeenCalledWith('Success Message', 'Cerrar', {
      panelClass: 'info-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }));

  it('should display warn alert', fakeAsync(() => {
    spyOn(snackBar, 'open');
    service.warn('Error Message');
    tick(); // wait for snackBar.open to be called

    expect(snackBar.open).toHaveBeenCalledWith('Error Message', 'Cerrar', {
      panelClass: 'warn-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }));

  it('should clear alert', () => {
    spyOn(snackBar, 'dismiss');
    service.clear();
    expect(snackBar.dismiss).toHaveBeenCalled();
  });

  it('should listen to alerts', () => {
    const alert: Alert = new Alert({
      type: AlertType.Success,
      message: 'Test Message',
    });
    const alertObserver: Observable<Alert> = service.onAlert();
    alertObserver.subscribe((receivedAlert: Alert) => {
      expect(receivedAlert).toEqual(alert);
    });
    service.alert(alert);
  });
});
