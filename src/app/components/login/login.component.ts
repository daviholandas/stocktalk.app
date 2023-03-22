import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

 form!: FormGroup;

constructor(
  private formBuilder: FormBuilder,
  private loginService: LoginService,
  private router: Router)
 {}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
  }

  getLogin():void {
    this.loginService.login(this.form.value)
    .pipe(first())
      .subscribe({
        next: response => {
          this.loginService.setToken(response?.token!);
          this.router.navigateByUrl('/home')
        },
        error: error => {
          console.log(error)
        }
      })
  }

  goRegister(){
    this.router.navigateByUrl('/register');
  }

}
