import { FormControl } from '@angular/forms';

export const noStrider = (control: FormControl) => {
  const valor: string = control.value?.trim().toLowerCase();
  if (valor === 'gcpglobal') {
    return {
      noStrider: true
    }
  }

  return null;
}
