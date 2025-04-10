import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIResponseModel, IPropertytype, Site } from '../model/master';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  getAllPropertyType():Observable<IAPIResponseModel>{
    return this.http.get<IAPIResponseModel>( 'https://projectapi.gerasim.in/api/PropertyBookingController/GetAllPropertyType')
  }

  savePropertyType(obj: IPropertytype):Observable<IAPIResponseModel>{
    const newObj = [obj]
    return this.http.post<IAPIResponseModel>( 'https://projectapi.gerasim.in/api/PropertyBookingController/AddPropertyType', newObj)
  }

  updatePropertyType(obj: IPropertytype):Observable<IAPIResponseModel>{
    return this.http.put<IAPIResponseModel>('https://projectapi.gerasim.in/api/PropertyBookingController/UpdatePropertyType', obj)
  }

  deletePropertyType(id: number):Observable<IAPIResponseModel>{
    return this.http.delete<IAPIResponseModel>( 'https://projectapi.gerasim.in/api/PropertyBookingController/DeletePropertyTypeById?id=' + id)
  }

  getAllSites():Observable<IAPIResponseModel>{
    return this.http.get<IAPIResponseModel>( 'https://projectapi.gerasim.in/api/PropertyBookingController/GetAllSites')
  }

  saveSite(obj: Site):Observable<IAPIResponseModel>{
    return this.http.post<IAPIResponseModel>('https://projectapi.gerasim.in/api/PropertyBookingController/AddSites', obj)
  }
  
  updateSites(obj: Site):Observable<IAPIResponseModel>{
    return this.http.put<IAPIResponseModel>('https://projectapi.gerasim.in/api/PropertyBookingController/UpdateSites', obj)
  }

  deleteSites(id: number):Observable<IAPIResponseModel>{
    return this.http.delete<IAPIResponseModel>('https://projectapi.gerasim.in/api/PropertyBookingController/DeleteSitesById?id=' + id)
  }

  saveProperty(obj: Site):Observable<IAPIResponseModel>{
    return this.http.post<IAPIResponseModel>('https://projectapi.gerasim.in/api/PropertyBookingController/AddPropertyMasters', obj)
  }

  getAllPropertyMasters():Observable<IAPIResponseModel>{
    return this.http.get<IAPIResponseModel>('https://projectapi.gerasim.in/api/PropertyBookingController/GetAllPropertyMasters')
  }

  getAllPropertyBySiteId(id: number):Observable<IAPIResponseModel>{
    return this.http.get<IAPIResponseModel>('https://projectapi.gerasim.in/api/PropertyBookingController/GetAllPropertyBySiteId?siteid=' + id)
  }

  saveBooking(obj: Site):Observable<IAPIResponseModel>{
    return this.http.post<IAPIResponseModel>('https://projectapi.gerasim.in/api/PropertyBookingController/AddPropertyBooking', obj)
  }

  getAllPropertyBookingBySiteId(id: number):Observable<IAPIResponseModel>{
    return this.http.get<IAPIResponseModel>('https://projectapi.gerasim.in/api/PropertyBookingController/GetAllPropertyBookingBySiteId?siteid=' + id)
  }
}