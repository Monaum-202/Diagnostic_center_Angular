
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/userService/user-service.service';

@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.scss']
})
export class DoctorRegistrationComponent implements OnInit {

  constructor(
    private userServiceService : UserServiceService
   ){}
   
   userList: any[] = [];

  ngOnInit(): void {
     this.userServiceService.getAllData().subscribe((val : any) => {
      this.userList = val  
    })
  }

  deletecategory(id : any){
    this.userServiceService.deleteById(id).subscribe((val : any) =>{
      console.log("Data deleted");
      this.ngOnInit()
    })
   }

}
