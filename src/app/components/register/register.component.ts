import { Router } from '@angular/router';
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
  isValid = true;
  erros:string[] = [];

  constructor(
   private formBuilder: FormBuilder,
   private loginService: LoginService,
   private router:Router)
  {}


   ngOnInit(): void {
     this.form = this.formBuilder.group({
       email: ['', Validators.required, Validators.email],
       password: ['', Validators.required]
     });
   }

   register(): void{
     if(this.form.invalid){
      this.erros.push("Something wrong...")
      this.isValid = false;
     }

      this.loginService.registerUser(this.form.get('email')?.value,
      this.form.get('password')?.value)
      .pipe(first())
      .subscribe({
        next: response => {
          this.router.navigateByUrl('/');
        },
        error: response => {
          this.isValid = false
          this.erros.push(response.error)
        }
      });
   }

}
