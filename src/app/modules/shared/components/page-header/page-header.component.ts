import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-page-header',
	templateUrl: './page-header.component.html',
	styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
	@Input() title: string;
	@Input() description?: string;
	@Input() search?: boolean;
	@Output() searchEvent: EventEmitter<string> = new EventEmitter();
	@Output() resetEvent: EventEmitter<void> = new EventEmitter();

	public searchControl: FormControl = new FormControl();
	public isSearchValid: boolean;

	constructor() { }

	public emitSearch(): void {
		const searchTerm = this.searchControl.value;

		if (searchTerm && !!searchTerm.trim()) {
			this.isSearchValid = true;

			this.searchEvent.emit(searchTerm);
		}
	}

	public resetSearch(): void {
		this.isSearchValid = false;
		this.searchControl.setValue('');
		this.resetEvent.emit();
	}
}
