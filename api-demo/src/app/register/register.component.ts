import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { MatDialog }from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private authService: AuthenticationServiceService,
              private formBuilder: FormBuilder, private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  onSubmit(form: NgForm){
    this.authService.register(form).subscribe(res => {
      if(res.Message === 'Registration successful'){
        let dialogRef = this.dialog.open(RegisterDialogComponent, {data: {Message : 'Registration Successful'}});
        dialogRef.afterClosed().subscribe(res => {
          this.router.navigate(['/']);
        })
      }else{
        this.dialog.open(RegisterDialogComponent, {data: {Message : 'Registration Failed'}});
      }
    })
  }
}
