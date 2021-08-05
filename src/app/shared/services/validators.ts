import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// tslint:disable-next-line: typedef
export function passwordValidator(getTargetControl: () => AbstractControl | null, killSubscriptions: Observable<any>) {
  let subscription: Subscription | null = null;
  // tslint:disable-next-line: only-arrow-functions typedef
  return function(control: AbstractControl) {
    if (subscription) {
      subscription.unsubscribe(); subscription = null;
    }
    const targetControl = getTargetControl();
    if (!targetControl) {
      return null;
    }
    subscription = targetControl.valueChanges
      .pipe(
        takeUntil(killSubscriptions)
      )
      .subscribe({
        next: () => {
          control.updateValueAndValidity();
        },
        complete: () => {
          subscription = null;
        }
      });

    return targetControl?.value === control?.value ? null : { isMatch: true };
  };

}

// tslint:disable-next-line: typedef
export function urlValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const url = control.value;

    if (url.substring(0, 8) === 'https://' || url.substring(0, 7) === 'http://') {
      return null;
    }

    return { isUrl: true };
  };
}




