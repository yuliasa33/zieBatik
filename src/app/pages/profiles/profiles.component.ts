import { Component, OnInit } from '@angular/core';
import { LayoutsComponent } from "../../components/layouts/layouts.component";
import { UtilityService } from 'src/app/service/utility/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css'],
  standalone:true,
  imports: [LayoutsComponent]
})
export class ProfilesComponent implements OnInit {

  constructor(private utilityService:UtilityService,
              private router:Router
  ){

  }

  ngOnInit(): void {
    this.checkIsLogin()
  }

  checkIsLogin():void{
    const isLogin = localStorage.getItem('BATIK_')
    console.log(isLogin)
    if(isLogin == null){
      this.utilityService.onShowCustomAlert('warning','Perhatian','Maaf Anda Belum Login')
      .then(()=>{
        this.router.navigateByUrl('')
      })
    }
  }

}
