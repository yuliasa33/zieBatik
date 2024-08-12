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
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/service/utility/utility.service';
import { EventService } from 'src/app/service/event/event.service';
import { ToastService } from 'src/app/service/taost/toast.service';

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

  navbarMenu: any[] = [
    { label: 'Home' },
    { label: 'About' },
    { label: 'Pricing' },
    { label: 'Service' },
  ]

  constructor(public layoutService: LayoutService,
              private formBuilder:FormBuilder,
              private activatedRoute:ActivatedRoute,
              private utilityService:UtilityService,
              private eventService:EventService,
              private toastService:ToastService
              
  ) {

  }

  ngOnInit(): void {
      this.FormInput = this.formBuilder.group({
        nama_lengkap:[''],
        no_hp:[''],
        gender:[""]
      })

      this.toastService.showSuccess()
  }

  ngAfterViewInit(): void {
    this.id = this.activatedRoute.snapshot.params['id']
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

}
