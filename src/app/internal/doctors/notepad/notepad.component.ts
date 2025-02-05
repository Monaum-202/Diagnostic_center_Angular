import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit {
  @ViewChild('notepad', { static: false }) notepad!: ElementRef;
  noteContent: string = '';

  ngOnInit(): void {
    // Load saved note from localStorage on component initialization
    const savedNote = localStorage.getItem('note');
    if (savedNote) {
      this.noteContent = savedNote;
    }
  }

  // Save note to localStorage
  saveNote(): void {
    localStorage.setItem('note', this.noteContent);
    alert('Note saved successfully!');
  }

  // Clear the textarea and localStorage
  clearNote(): void {
    const confirmClear = confirm('Are you sure you want to clear the note? This action cannot be undone.');
    if (confirmClear) {
      this.noteContent = ''; // Clear the textarea content
      localStorage.removeItem('note'); // Remove the note from localStorage
      alert('Note cleared!');
    }
  }


  diagnosisList: any[] = [];
  addDiagnosis(event: any) {
    const selectedValue = event.target.value;
    this.diagnosisList.push(selectedValue);
  }
}
