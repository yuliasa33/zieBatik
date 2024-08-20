import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LayoutsComponent } from 'src/app/components/layouts/layouts.component';
import { FooterComponent } from "../footer/footer.component";
import { LayoutService } from 'src/app/service/layout-service/layout.service';
import { CommonModule } from '@angular/common';
import { fadeInAnimation } from 'src/app/animations/animations';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/service/utility/utility.service';
import { EventService } from 'src/app/service/event/event.service';
import { ToastService } from 'src/app/service/taost/toast.service';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'src/app/service/authentication-service/authentication.service';

@Component({
  selector: 'app-event-register',
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.css'],
  standalone: true,
  imports: [LayoutsComponent, FooterComponent, CommonModule, DropdownModule,ReactiveFormsModule,ButtonModule,FormsModule],
  animations: [fadeInAnimation]
})
export class EventRegisterComponent implements OnInit ,AfterViewInit {

  FormInput!:FormGroup

  sex: any[] = [
    {
  label: 'LAKI-LAKI', value: 'L'
  },
  {
    label: 'PEREMPUAN', value: 'P'
    }
  ]

  id:any
  selectedSex:any

  StateContentByGet:any = {}

  navbarMenu: any[] = [
    { label: 'Home', icon: 'pi pi-home' },
    { label: 'Product', icon: 'pi pi-receipt' },
    { label: 'Events', icon: 'pi pi-flag' },
    { label: 'Login', icon: 'pi pi-user' },
  ]


  constructor(public layoutService: LayoutService,
              private formBuilder:FormBuilder,
              private activatedRoute:ActivatedRoute,
              private utilityService:UtilityService,
              private eventService:EventService,
              private toastService:ToastService,
              private router:Router,
              private authenticationService:AuthenticationService,
              
  ) {

  }

  ngOnInit(): void {
      this.FormInput = this.formBuilder.group({
        nama_lengkap:[''],
        no_hp:[''],
        gender:[""]
      })

      this.isLogin()
  }

  ngAfterViewInit(): void {
    this.id = this.activatedRoute.snapshot.params['id']
    this.utilityService.onShowLoadingBeforeSend()
    this.eventService.getByIdEvent(this.id).subscribe(result=>{
      if(result.status == 'success'){
        Swal.close()
        this.StateContentByGet =  {
          nama_event:result.data.nama_event,
          images:result.data.path_foto,
          deskripsi:result.data.deskripsi
        }
        console.log(this.StateContentByGet)
      }else{
        this.utilityService.onShowCustomAlert('error','Oops...',result.message)
      }
    })
  }


  handleSave(Form:any):void{
    
    Form.gender = Form.gender.value
   
    Form.id_event = parseInt(this.id)
   
    console.log("FORM==>",Form)
   
    this.eventService.PostdaftarEvent(Form).subscribe(result=>{
   
      if(result.status==="success"){
   
        let closeModal = document.getElementById('closeModal') as HTMLElement
   
        closeModal.click()
   
        this.utilityService.onShowCustomAlert('success','Berhasil',result.message).then(()=>{
   
          this.onResetform()
   
          let openModal = document.getElementById('openModal') as HTMLElement
   
          openModal.click()
        })
      }else{
        let closeModal = document.getElementById('closeModal') as HTMLElement
        this.utilityService.onShowCustomAlert('error','oops..',result.message)
        .then(()=>{
          let openModal = document.getElementById('openModal') as HTMLElement
        })
      }
    })
  }

  onResetform():void{
    this.FormInput.reset()
  }

  isLogin():void{
    const item = localStorage.getItem('BATIK_');
    let data: any;
    if (item) {
      data = JSON.parse(item);
    } else {
      data = {}; // or any default value you want to assign
    }
    if (localStorage.getItem('BATIK_')) {
      this.navbarMenu = [
        { label: 'Home',icon:'pi pi-home' },
        // { label: 'About', },
        { label: 'Product',icon:'pi pi-receipt' },
        { label: 'Events',icon:'pi pi-flag' },
        {
          icon: 'pi pi-user', label: data?.nama, children: [
            { label: 'Order Status', icon: 'pi pi-shopping-bag' },
            { label: 'Log Out', icon: 'pi pi-power-off' }
          ]
        },

      ]
    }

  }

  handleClickSidbar(args:any):void{
    console.log(args)
    let select = args
    if (select == 'Product') {
      this.router.navigateByUrl('Product')
    }
    if (select == 'Home') {
      this.router.navigateByUrl('')
    }

    if (select == 'Events') {
      this.router.navigateByUrl('list-event')
    }

    if (select == 'Log Out') {
      this.authenticationService.SignOut()
    } if (select == 'Order Status') {
      this.router.navigateByUrl('profil')
    }

    if (select == 'Login') {
      this.router.navigateByUrl('login')
    }

  }

}
