import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface DiagnosticTest {
  id: number;
  name: string;
  code: string;
  price: number;
}

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss']
})
export class DataEntryComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute, private fb: FormBuilder) {}

  selectedBranch: string = '';
  testNameControl = new FormControl('');
  doctorNameControl = new FormControl('');

  tests: DiagnosticTest[] = [];
  filteredTests: DiagnosticTest[] = [];

  doctors: any[] = [];
  filteredDoctors: any[] = [];

  totalAmount: number = 0;
  discountPercent: number = 0;
  discountCash: number = 0;
  payableAmount: number = 0;
  paidAmount: number = 0;
  dueAmount: number = 0;

  reactform!: FormGroup;

  ngOnInit() {
    this.initializeForm();
    this.fetchTests();
    this.fetchDoctors();
  }

  initializeForm() {
    this.reactform = this.fb.group({
      id: new FormControl(null),
      patientName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      totalAmount: new FormControl(0),
      discount: new FormControl(0),
      discount1: new FormControl(0),
      payableAmount: new FormControl(0),
      paidAmount: new FormControl(0),
      dueAmount: new FormControl(0),
      refBy: new FormControl(null),
      diagonesticTests: this.fb.array([])
    });
  }

  get diagonesticTests(): FormArray {
    return this.reactform.get('diagonesticTests') as FormArray;
  }

  fetchTests() {
    this.http.get<DiagnosticTest[]>('http://localhost:9090/api/diagnostic').subscribe(
      (data) => {
        this.tests = data || [];
      },
      (error) => {
        console.error('Error fetching tests:', error);
        alert('Failed to load test data.');
      }
    );
  }

  fetchDoctors() {
    this.http.get<any[]>('http://localhost:9090/api/doctor').subscribe(
      (data) => {
        this.doctors = data || [];
      },
      (error) => {
        console.error('Error fetching doctors:', error);
        alert('Failed to load doctor data.');
      }
    );
  }

  filterTests() {
    const input = this.testNameControl.value?.trim().toLowerCase() || '';
    this.filteredTests = input ? this.tests.filter(test => test.name.toLowerCase().includes(input)) : [];
  }

  selectTest(test: DiagnosticTest) {
    const alreadyAdded = this.diagonesticTests.controls.some(control => control.value.id === test.id);

    if (!alreadyAdded) {
      this.diagonesticTests.push(
        this.fb.group({
          id: test.id,
          name: test.name,
          price: test.price
        })
      );
      this.calculateAmounts();
    } else {
      alert('Test is already added.');
    }

    this.testNameControl.setValue('');
    this.filteredTests = [];
  }

  removeTest(index: number) {
    this.diagonesticTests.removeAt(index);
    this.calculateAmounts();
  }

  filterDoctors() {
    const input = this.doctorNameControl.value?.trim().toLowerCase() || '';
    this.filteredDoctors = input ? this.doctors.filter(doctor => doctor.name.toLowerCase().includes(input)) : [];
  }

  selectDoctor(doctor: any) {
    this.reactform.patchValue({ refBy: doctor.id });
    this.doctorNameControl.setValue(doctor.name);
    this.filteredDoctors = [];
  }

  calculateAmounts() {
    this.totalAmount = this.diagonesticTests.controls.reduce((sum, control) => sum + control.value.price, 0);
    
    const discountFromPercent = (this.totalAmount * this.reactform.value.discount) / 100;
    const totalDiscount = Math.min(discountFromPercent + this.reactform.value.discount1, this.totalAmount);
    
    this.payableAmount = this.totalAmount - totalDiscount;
    this.dueAmount = Math.max(this.payableAmount - this.reactform.value.paidAmount, 0);

    this.reactform.patchValue({
      totalAmount: this.totalAmount,
      payableAmount: this.payableAmount,
      dueAmount: this.dueAmount
    });
  }

  submitForm() {
    if (this.reactform.valid) {
      console.log('Form submitted:', this.reactform.value);
      
      this.http.post('http://localhost:9090/api/MoneyReceipt', this.reactform.value).subscribe(
        (response) => {
          console.log('Form submitted successfully', response);
          alert('Form submitted successfully!');
          this.reactform.reset();
          this.diagonesticTests.clear(); // Clear selected tests
        },
        (error) => {
          console.error('Error submitting form:', error);
          alert('Failed to submit form.');
        }
      );
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}
