import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAPIResponseModel, IProperty, IPropertytype, Site } from '../../model/master';
import { Observable } from 'rxjs';
import { MasterService } from '../../service/master.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-site',
  imports: [FormsModule, AsyncPipe, CommonModule, ReactiveFormsModule],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent implements OnInit {

  isFormView = signal<boolean>(false)
  formObj: Site = new Site()
  masterSrv = inject(MasterService)
  gridData: Site[] = [];
  propertyList: IProperty[] = []
  @ViewChild('propertyModal') modal : ElementRef | undefined 
  currentSiteId: number = 0


  propertyType$: Observable<IPropertytype[]> = new Observable<IPropertytype[]>

  propertyForm: FormGroup = new FormGroup({})

  constructor() {
    this.initialize()

    this.propertyType$ = this.masterSrv.getAllPropertyType().pipe(
      map((item: IAPIResponseModel) => {
        return item.data
      })
    )
  }

  ngOnInit(): void {
    this.getGridData()
  }

  initialize(){
    this.propertyForm = new FormGroup({
      propertyId: new FormControl(0),
      propertyNo: new FormControl(0),
      facing: new FormControl(''),
      totalArea: new FormControl(''),
      rate: new FormControl(0),
      siteId: new FormControl(this.currentSiteId)
    })
  }

  getGridData(){
    this.masterSrv.getAllSites().subscribe((res: IAPIResponseModel) => {
      this.gridData = res.data
    })
  }
  
  getPropertise(){
    this.masterSrv.getAllPropertyMasters().subscribe((res: IAPIResponseModel) => {
      this.propertyList = res.data.filter((m:any) => m.siteId === this.currentSiteId)
    })
  }

  onSave(){
    this.masterSrv.saveSite(this.formObj).subscribe((res: IAPIResponseModel) => {
      if(res.result){
        alert('Record Save')
        this.getGridData()
        this.toggleView()
      }
      else{
        alert(res.message)
      }
    })
  }

  onEdit(data: Site){
    this.formObj = data
    this.toggleView()
  }

  onUpdate(){
    this.masterSrv.updateSites(this.formObj).subscribe((res: IAPIResponseModel) => {
      if(res.result){
        alert('Record Updated')
        this.getGridData()
        this.toggleView()
      }
      else{
        alert(res.message)
      }
    })
  }

  onDelete(data: Site){
    const isDelete = confirm("Are you sure want to delete.")
    if(isDelete){
      this.masterSrv.deleteSites(data.siteId).subscribe((res: IAPIResponseModel) => {
        if(res.result){
          alert('Record Delete')
          this.getGridData()
        }
        else{
          alert(res.message)
        }
      })
    }
    
  }

  openModal(data: Site){
    this.currentSiteId = data.siteId
    this.initialize()
    this.getPropertise()
    if(this.modal){
      this.modal.nativeElement.style.display = 'block'
    }
  }

  closeModal(){
    if(this.modal){
      this.modal.nativeElement.style.display = 'none'
    }
  }

  toggleView(){
    this.isFormView.set(!this.isFormView())
  }

  onSaveProperty(){
    this.masterSrv.saveProperty(this.propertyForm.value).subscribe((res: IAPIResponseModel) => {
      if(res.result){
        alert('Record Save')
        this.getPropertise()
      }
      else{
        alert(res.message)
      }
    })
  }

}
