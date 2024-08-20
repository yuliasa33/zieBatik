import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication-service/authentication.service';
import { UtilityService } from 'src/app/service/utility/utility.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  FormLogin!:FormGroup

  FormRegister!:FormGroup

  FormState:'Login' | 'Register' = 'Login'

  sex: any[] = [
    {
  label: 'LAKI-LAKI', value: 'L'
  },
  {
    label: 'PEREMPUAN', value: 'P'
    }
  ]

  selectedSex:any

  id:any

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

    this.FormRegister = this.formBuilder.group({
      name:["",[Validators.required]],
      email:["",[Validators.email]],
      password:["",[Validators.required]],
      gender:["",[Validators.required]],
      phone:["",Validators.required],
      image:["test"]
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

  onRegister(Form:any):void{
    Form.gender = Form.gender.value
    console.log(Form)
    this.authenticationService.Register(Form).subscribe(result=>{
      if(result.status == 'success'){
        this.utilityService.onShowCustomAlert('success','Berhasil',result.message)
        .then(()=>{
          this.ResetFormRegister()
        })
      }else{
        this.utilityService.onShowCustomAlert('error','Oops...',result.message)
      }
    })
  }

  ResetFormRegister():void{
    this.FormRegister.reset()
  }

  MoveToRegister():void{
    this.FormState = 'Register'
  }

}
