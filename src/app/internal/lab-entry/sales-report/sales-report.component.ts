import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent {


  balanceSheetForm: FormGroup;
  exportFormats = ['PDF', 'Excel', 'Excel Data Only'];
  selectedFormat = 'PDF';

  constructor(private fb: FormBuilder) {
    this.balanceSheetForm = this.fb.group({
      fromDate: [new Date().toISOString().split('T')[0]], // Default to today
      toDate: [new Date().toISOString().split('T')[0]], // Default to today
      businessUnit: ['']
    });
  }

  clearForm() {
    this.balanceSheetForm.reset({
      fromDate: new Date().toISOString().split('T')[0],
      toDate: new Date().toISOString().split('T')[0],
      businessUnit: ''
    });
  }

  searchBusinessUnit() {
    console.log('Search business unit functionality to be implemented');
  }

  resetBusinessUnit() {
    this.balanceSheetForm.patchValue({ businessUnit: '' });
  }

  generateReport() {
    console.log('Generating report in format:', this.selectedFormat);
    console.log('Form values:', this.balanceSheetForm.value);
    
  }

}
