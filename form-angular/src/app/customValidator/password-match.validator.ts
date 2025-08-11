import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator = (firstcontrol: string, secondcontrol: string) : ValidatorFn => {
  return (formGroup: AbstractControl): { passwordMismatch: boolean } | null => {
    const passwordControl = formGroup.get(firstcontrol);
    const confirmPasswordControl = formGroup.get(secondcontrol);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    // Si las contraseñas no coinciden, agregar error al control confirmPassword
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({
        ...confirmPasswordControl.errors,
        passwordMismatch: true
      });
      return { passwordMismatch: true };
    } else {
      // Si coinciden, remover el error passwordMismatch pero mantener otros errores
      if (confirmPasswordControl.errors) {
        delete confirmPasswordControl.errors['passwordMismatch'];
        if (Object.keys(confirmPasswordControl.errors).length === 0) {
          confirmPasswordControl.setErrors(null);
        }
      }
      return null;
    }
  }
}


