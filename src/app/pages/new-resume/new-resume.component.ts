import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-resume',
  templateUrl: './new-resume.component.html',
  styleUrls: ['./new-resume.component.scss']
})
export class NewResumeComponent implements OnInit {
  public contactEdit: boolean;

  constructor() { }

  ngOnInit() {
  }

  public toggleAdititionalEdit(key: string): void {
    this[`${key}Edit`] = !this[`${key}Edit`];
  }
}
