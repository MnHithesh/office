import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertPromise } from 'selenium-webdriver';
import { DatePipe } from '@angular/common';
import { ResourceService } from '../../resource.service';
import { BookingService } from '../../booking.service';
import { ClientService } from '../../client.service';
import { LocationService } from './../../location.service';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  providers: [DatePipe]
})
export class CreateEventComponent implements OnInit {

  public showDate;
  public toDate;
  public BookinglocationList : {};
  public locationList: {};
  public guestList: {};
  private roomList: {};

  constructor(
    private booking:BookingService,
    private client: ClientService,
    private location : LocationService,
    private resource : ResourceService,
    public dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private datePipe: DatePipe) { }

  date() {
    let myDate = new Date();
    this.showDate = this.datePipe.transform(myDate, 'MMM d,y');
  }

  selectDate(){
    console.log("This is the DATE:", this.showDate);
  }
  hideModel() {
    this.dialogRef.close("Closed");
  }


  //get location details to location autocomplite
getBookingLocation(){
  this.booking.getAllLocations().subscribe((data)=>{
    let res : any = data;
    this.BookinglocationList = JSON.parse(res._body);
    console.log(this.locationList);
  })
}
// get all clients
getClients(){
  this.client.getAllClients().subscribe((data)=>{
    let res : any = data;
    this.guestList = JSON.parse(res._body);
    console.log(this.guestList);
  })
}
// get  all location
gelLocation(){
  this.location.getAllLocation().subscribe((data)=>{
    let res : any = data;
    this.locationList = JSON.parse(res._body);
    console.log(this.locationList);
  })
}

  // getall rooms List
  getAllResource(){
    this.resource.getAll().subscribe((data)=>{
       let res:any = data;
       this.roomList = JSON.parse(res._body);
       console.log(this.roomList)
    })
   }

  ngOnInit() {
    this.date();
    this.selectDate();
    this.getBookingLocation();
    this.getClients();
    this.gelLocation();
    this.getAllResource();
  }

}
