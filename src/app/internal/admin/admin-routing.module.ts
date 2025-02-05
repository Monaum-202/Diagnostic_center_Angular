import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { MediDepartmentComponent } from './medi-department/medi-department.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { RoleSetComponent } from './role-set/role-set.component';



const routes: Routes = [

    { path: '', redirectTo: 'doctor_reg', pathMatch: 'full' },
      {path:"admin_dashboard", component:DashboardComponent},
    {path:"doctor_reg", component:DoctorRegistrationComponent},
  //   {path:"appointment", component:AppointmentComponent},
  //   {path:"prescription/:pId", component:PrescriptionCreateComponent},
  //   {path:"prescription", component:PrescriptionCreateComponent},
  //   {path:"prescription_pad", component:PrescriptionPadComponent},
  //   {path:"note", component:NotepadComponent},
  //   {path:"to_do", component:ToDoListComponent},
  {path:"role_set/:userName", component:RoleSetComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
