import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service.service';
import { FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router,private formBuilder: FormBuilder,
    private authService: AuthenticationServiceService ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(form: NgForm){
    this.authService.login(form).subscribe(res => {
      if(res.Message === 'Login Successful'){
        sessionStorage.userName = res.userName;
        this.router.navigate(['/home']);
      }
    })
  }

  register(){
    this.router.navigateByUrl('/register');
  }

}
