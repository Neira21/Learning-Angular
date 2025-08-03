import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {
  private formSubscription?: Subscription;

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required] ),
    email: new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
    // Defaiult role is user
    role: new FormControl('user', [Validators.required] ) // Añadido un validador por defecto

  });


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.formSubscription = this.userForm.valueChanges.subscribe(value => {
      console.log('Form value changed:', value);
      console.log('Form status:', this.userForm.status);
      console.log('Form errors:', this.userForm.errors);
    })

    // this.userForm.get('username')?.valueChanges.subscribe(value => {
    //   console.log('Username changed:', value);
    // });

  }

  ngOnDestroy() {
    // 🧹 Limpiar suscripción para evitar memory leaks
    this.formSubscription?.unsubscribe();
  }

  onSubmit(){
    if(this.userForm.valid){
      console.log('✅ Form Submitted', this.userForm.value);
    }else {
      this.userForm.markAllAsTouched();
      console.log('📊 Form Status:', this.userForm.controls);

      // Usar métodos para mostrar errores específicos

    }
  }


}
