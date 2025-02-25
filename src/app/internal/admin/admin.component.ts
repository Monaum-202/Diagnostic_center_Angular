import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

constructor(private router: Router) {
  // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // this.isDarkMode = localStorage.getItem('theme')
  //   ? localStorage.getItem('theme') === 'dark'
  //   : prefersDark;

  // // this.updateTheme();
   }
  // private isDarkMode = false;


  // private updateTheme() {
  //   if (this.isDarkMode) {
  //     document.body.classList.add('dark-mode');
  //   } else {
  //     document.body.classList.remove('dark-mode');
  //   }
  // }
// toggleTheme() {
//   this.themeService.toggleTheme();
// }
// userlist:any[]= [];
userName: string = '';



  ngOnInit(): void {
   
    const user = sessionStorage.getItem("auth-user");
  if (user) {
    this.userName = JSON.parse(user).user.userName; // Extract userName
  } else {
    this.userName = "Guest"; // Default value if no user is found
  }
  console.log("Retrieved userName:", this.userName);
    console.log(this.userName);

    setInterval(() => {
       this.time = new Date().toLocaleTimeString();
     }, 1000);

     setInterval(() => {
       const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
       this.date = new Date().toLocaleDateString('en-GB'); // en-GB ensures dd/mm/yyyy format
     }, 1000); 
     
     // Update every second


     
  }


  
 
  time = ""
  date=""



  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);

  }
                
  
  

}
