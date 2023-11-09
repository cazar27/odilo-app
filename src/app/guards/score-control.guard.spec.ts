import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { scoreControlGuard } from './score-control.guard';

describe('scoreControlGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => scoreControlGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
