import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { IAPIResponseModel, IPropertytype } from '../../model/master';

@Component({
  selector: 'app-property-type',
  imports: [ReactiveFormsModule],
  templateUrl: './property-type.component.html',
  styleUrl: './property-type.component.css'
})
export class PropertyTypeComponent implements OnInit {

  form: FormGroup = new FormGroup({

  })
  gridData : IPropertytype[] = []
  masterSrv = inject(MasterService)

  constructor(){
    this.initializeForm()
  }

  ngOnInit(): void {
    this.getGridData()
  }

  getGridData() {
    this.masterSrv.getAllPropertyType().subscribe((res:IAPIResponseModel) => {
      this.gridData = res.data
    })
  }

  onSave(){
    this.masterSrv.savePropertyType(this.form.value).subscribe((res: IAPIResponseModel) => {
      if(res.result){
        alert('Record Save')
        this.getGridData();
      } else {
        alert(res.message)
      }
    })
  }

  initializeForm(item?: IPropertytype) {
    this.form = new FormGroup({
      propertTypeId: new FormControl<number>(item ? item.propertTypeId : 0),
      propertyType: new FormControl<string>(item ? item.propertyType : '', [Validators.required, Validators.minLength(3)])
    })
  }

  onEdit(item: IPropertytype){
    this.initializeForm(item)
  }

  onUpdate(){
    this.masterSrv.updatePropertyType(this.form.value).subscribe((res: IAPIResponseModel) => {
      if(res.result){
        alert('Record Updated')
        this.getGridData();
      } else {
        alert(res.message)
      }
    })
  }

  onDelete(id: number){
    const isDelete = confirm("Are you sure want to delete.")
    if(isDelete){
      this.masterSrv.deletePropertyType(id).subscribe((res: IAPIResponseModel) => {
        if(res.result){
          alert('Record Deleted')
          this.getGridData();
        } else {
          alert(res.message)
        }
      })
    }
  }

}
