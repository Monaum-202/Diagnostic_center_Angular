import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit {
  notes: string[] = []; // Array to store notes
  noteText: string = ''; // Model for the input field

  constructor() {}

  ngOnInit(): void {
    this.loadNotes(); // Load notes from local storage when the component initializes
  }

  // Save note to the list and local storage
  saveNote(): void {
    if (this.noteText.trim()) {
      this.notes.push(this.noteText);
      this.noteText = '';
      this.saveToLocalStorage();
    }
  }

  // Delete a specific note
  deleteNote(index: number): void {
    this.notes.splice(index, 1);
    this.saveToLocalStorage();
  }

  // Clear all notes
  clearAllNotes(): void {
    this.notes = [];
    this.saveToLocalStorage();
  }

  // Save to local storage to persist data
  private saveToLocalStorage(): void {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  // Load notes from local storage
  private loadNotes(): void {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
    }
  }
}