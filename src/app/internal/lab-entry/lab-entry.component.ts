import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lab-entry',
  templateUrl: './lab-entry.component.html',
  styleUrls: ['./lab-entry.component.scss']
})
export class LabEntryComponent implements OnInit {
  ngOnInit(): void {
    setInterval(() => {
       this.time = new Date().toLocaleTimeString();
     }, 1000);

     setInterval(() => {
       const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
       this.date = new Date().toLocaleDateString('en-GB'); // en-GB ensures dd/mm/yyyy format
     }, 1000); // Update every second
     
  }

  time = ""
  date=""


  logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "";

  }


  userlist:any[]= [];
userName: string = '';

  constructor() {
    const user = sessionStorage.getItem("auth-user");
  if (user) {
    this.userName = JSON.parse(user).user.userName; // Extract userName
  } else {
    this.userName = "Guest"; // Default value if no user is found
  }
  console.log("Retrieved userName:", this.userName);
    console.log(this.userName);
  }

  
}
