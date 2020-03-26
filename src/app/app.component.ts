import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
	selector: 'app-root',
	template: `<router-outlet></router-outlet>`
})
export class AppComponent {
	constructor(
		private db: AngularFirestore
	) {
		this.db.collection("/resume/lHvwrmlx2snvsiQmSYnj")
			.valueChanges()
			.subscribe(response => { console.log(response) })
	}
}
