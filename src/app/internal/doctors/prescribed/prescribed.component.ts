import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from 'src/app/service/prescription/prescription.service';

@Component({
  selector: 'app-prescribed',
  templateUrl: './prescribed.component.html',
  styleUrls: ['./prescribed.component.scss']
})
export class PrescribedComponent implements OnInit {
  patientList: any[] = []; // Using any[] since there's no model

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPrescriptions();
  }

  fetchPrescriptions(): void {
    this.http.get<any[]>('http://localhost:9090/api/prescriptions').subscribe({
      next: (data) => {
        this.patientList = (data || []).sort((a, b) => b.id - a.id); // Ensure data is not null
      },
      error: (err) => {
        console.error('Error fetching prescriptions:', err);
      }
    });
  }


  
  format: string = 'pdf';  // Default format (can be changed by user)
  id: any = '';   // Start date in ISO 8601 format
}
