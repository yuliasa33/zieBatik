import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication-service/authentication.service';
import { UtilityService } from 'src/app/service/utility/utility.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  FormLogin!:FormGroup

  constructor(private formBuilder:FormBuilder,
              private authenticationService:AuthenticationService,
              private utilityService:UtilityService,
              private router:Router
  ){}

  ngOnInit(): void {
    this.FormLogin = this.formBuilder.group({
      email:["",[Validators.email]],
      password:["",[Validators.required]]
    })
  }

  onLogin(FormInputLogin:any):void{
     this.authenticationService.SignInService(FormInputLogin).subscribe(result=>{
       console.log("test",result)
       if(result.status=='success'){
        this.utilityService.onShowCustomAlert('success','Berhasil','LogIn Berhasil').
        then(()=>{
          this.router.navigateByUrl('')
        })
       }else{
        this.utilityService.onShowCustomAlert('error','Oops...','Gagal Login')
       }

     })
    console.log(FormInputLogin)
  }

}
