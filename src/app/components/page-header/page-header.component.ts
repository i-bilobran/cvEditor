import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() description?: string;
  @Output() search?: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
