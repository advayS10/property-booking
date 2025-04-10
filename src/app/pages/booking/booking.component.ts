import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAPIResponseModel, IProperty, IPropertytype, Site } from '../../model/master';
import { MasterService } from '../../service/master.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  imports: [AsyncPipe, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  sites$: Observable<Site[]> = new Observable<Site[]>
  masterSrv = inject(MasterService)
  siteId:number = 0;
  propertyList: IProperty[] = [];
  bookingList: IProperty[] = [];
  bookingForm: FormGroup = new FormGroup({})
  currentPropertyId: number = 0;

  constructor() {
    this.initializeForm()

    this.sites$ = this.masterSrv.getAllSites().pipe(
      map((res:IAPIResponseModel) => {
        return res.data;
      })
    )
    
  }

  initializeForm(){
      this.bookingForm = new FormGroup({
        bookingId: new FormControl(0),
        propertyId: new FormControl(this.currentPropertyId),
        bookindDate: new FormControl(0),
        bookingRate: new FormControl(0),
        totalAmont: new FormControl(0),
        custId: new FormControl(0),
        name: new FormControl(''),
        mobile: new FormControl(''),
        emailid: new FormControl(''),
        address: new FormControl('')      
      })
  }

  getPropertise(event: Event){
    console.log(this.siteId)
    this.getBookingBySiteId()
    this.masterSrv.getAllPropertyBySiteId(this.siteId).subscribe((res:IAPIResponseModel) => {
      this.propertyList = res.data
    })

  }

  checkIfPropertyAvailable(propertyId: number) {
    const record = this.bookingList.find((m:any) => m.propertyId === propertyId)
    if(record !== undefined){
      return record
    } else {
      return null
    }
  }

  openModal(data: IProperty){
    this.currentPropertyId = data.propertyId
    this.initializeForm()
    const modal = document.getElementById('modal')
    if(modal){
      modal.style.display = 'block'
    }
  }

  closeModal(){
    
    const modal = document.getElementById('modal')
    if(modal){
      modal.style.display = 'none'
    }
  }

  getBookingBySiteId(){


    this.masterSrv.getAllPropertyBookingBySiteId(this.siteId).subscribe((res:IAPIResponseModel) => {
      this.bookingList = res.data
    })

  }

  doBooking(){
    this.masterSrv.saveBooking(this.bookingForm.value).subscribe((res: IAPIResponseModel) => {
      if(res.result){
        alert('Record Save')
        this.getBookingBySiteId()
      }
      else{
        alert(res.message)
      }
    }) 
  }

}
