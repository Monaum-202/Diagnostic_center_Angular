import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/userService/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(
    private userServiceService : UserServiceService,private http: HttpClient
   ){}
   
   userList: any[] = [];

  ngOnInit(): void {
     this.userServiceService.getAllData().subscribe((val : any) => {
      this.userList = val  
    })
  }


  // ngOnInit(): void {
  //   this.getUserData();
  // }

  // getUserData() {
  //   this.http.get<any[]>('http://localhost:9090/api/users/moderators').subscribe({
  //     next: (data) => {
  //       this.userList = data;
  //       console.log("User data fetched successfully", this.userList);
  //     },
  //     error: (error) => {
  //       console.error("Error fetching user data:", error);
  //     }
  //   });
  // }

  deletecategory(id : any){
    this.userServiceService.deleteById(id).subscribe((val : any) =>{
      console.log("Data deleted");
      this.ngOnInit()
    })
   }

}
