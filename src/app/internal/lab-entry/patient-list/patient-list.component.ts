import { Component, OnInit, OnDestroy } from '@angular/core';
import { DiagnosisMoneyService } from 'src/app/service/diagnosisMoney/diagnosis-money.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit, OnDestroy {
  patients: any[] = [];
  filteredEmployee: any = null;
  private subscription!: Subscription; // Store API subscriptions

  constructor(private diagnosisMoneyService: DiagnosisMoneyService) {}

  ngOnInit(): void {
    this.getAllPatient();
  }

  // Fetch all patients
  getAllPatient(): void {
    this.subscription = this.diagnosisMoneyService.getAll().subscribe({
      next: (val: any) => {
        console.log('Fetched Patients:', val);
        this.patients = val;
      },
      error: (err) => {
        console.error('Error fetching patients:', err);
      }
    });
  }

  // Delete a patient
  deletePatient(id: number): void {
    this.diagnosisMoneyService.deleteById(id).subscribe({
      next: () => {
        console.log('Patient deleted successfully');
        this.getAllPatient(); // Refresh list instead of calling ngOnInit()
      },
      error: (err) => {
        console.error('Error deleting patient:', err);
      }
    });
  }

  // Prevent memory leaks by unsubscribing from observables
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
