import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

 constructor(
   private formBuilder: FormBuilder,
   private loginService: LoginService)
  {}
  
  
   ngOnInit(): void {
     this.form = this.formBuilder.group({
       email: ['', Validators.required, Validators.email],
       password: ['', Validators.required]
     });
   }

   onSubmit(): void{
    console.log(this.form.value)
      this.loginService.registerUser(this.form.value)
      .pipe(first())
      .subscribe({
        next: response => {
          console.log(response);
        },
        error: error => console.log(error)
      });
   }
 
}
