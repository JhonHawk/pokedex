import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

export function UsernameValidator(
  control: AbstractControl,
): Observable<ValidationErrors | null> {
  const value = control.value;
  if (!value) {
    return of(null);
  }

  const startsWithNumber = /^\d/.test(value);
  const isOverLength = value.length > 8;
  return startsWithNumber || isOverLength
    ? of({ forbiddenUsername: { value } })
    : of(null);
}
