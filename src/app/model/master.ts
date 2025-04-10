export interface IPropertytype {
    propertTypeId: number;
    propertyType: string 
}

export interface IAPIResponseModel {
    result: boolean;
    message: string;
    data: any
}

export interface IProperty {
    propertyId: number
    propertyNo: number
    facing: string
    totalArea: string
    rate: number
    siteId: number
    siteTitle: string
    location: string
    propertyTypeId: number
    city: string
    pincode: string
    state: string
    totalProperties: number
    createdDate: string
    lastUpdatedDate: string
  }

export class Site {
    siteId: number
    siteTitle: string
    location: string
    propertyTypeId: number
    city: string
    pincode: string
    state: string
    totalProperties: number
    createdDate: Date
    lastUpdatedDate: Date

    constructor() {
        this.siteId = 0;
        this.siteTitle = '';
        this.location = ''
        this.propertyTypeId = 0
        this.city = ''
        this.pincode = ''
        this.state = ''
        this.totalProperties = 0
        this.createdDate = new Date()
        this.lastUpdatedDate = new Date()

    }
}