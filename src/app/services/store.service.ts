import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Resume } from '@models/resume.models';

@Injectable({
	providedIn: 'root'
})
export class StoreService {
	private collection = 'resumes';

	constructor(
		private db: AngularFirestore
	) { }

	public getResumeCards(archived: boolean): Observable<any[]> {
		// add query function
		return this.getResumes()
			.pipe(
				map((response: any[]) => response.filter((resume: any) => resume.archived === archived))
			);
	}

	public getResume(id: string): Observable<any> {
		// actual data = response[i].payload.doc.data()
		// id = response[i].payload.doc.id

		return this.db
			.collection(this.collection)
			.doc(id)
			.get()
			.pipe(map(response => response));

	}

	public getResumes(): Observable<any> {
		// actual data = response[i].payload.doc.data()
		// id = response[i].payload.doc.id

		return this.db.collection(this.collection)
			.snapshotChanges()
			.pipe(map((e) => {
				return e;
			}));
	}

	public createResume(resume: Resume): Observable<any> {
		return from(
			this.db
				.collection(this.collection)
				.add(resume)
		);
	}

	public updateResume(id: string, body: Resume): Observable<void> {
		return from(
			this.db
				.collection(this.collection)
				.doc(id)
				.set(body, { merge: true })
		);
	}

	public deleteResume(id: string): Observable<void> {
		return from(
			this.db
				.collection(this.collection)
				.doc(id)
				.delete()
		);
	}

	public archiveResume(id: string): Observable<void> {
		return from(
			this.db
				.collection(this.collection)
				.doc(id)
				.set({ archived: true }, { merge: true })
		);
	}

	public downloadResume(): void {

	}

	private fromFirebase(payload: any): any {
		return payload;
	}
}
