import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabEntryRoutingModule } from './lab-entry-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataEntryComponent } from './data-entry/data-entry.component';


@NgModule({
  declarations: [
    DataEntryComponent
  ],
  imports: [
    CommonModule,
    LabEntryRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class LabEntryModule { }
