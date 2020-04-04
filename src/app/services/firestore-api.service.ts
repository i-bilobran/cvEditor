import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { Resume, ResumeEntity, ResumeCard } from '@models/resume.models';
import { SwStoreService } from './sw-store.service';

@Injectable({
	providedIn: 'root'
})
export class FirestoreApiService {
	private collection = 'resumes';

	constructor(
		private db: AngularFirestore,
		private swStore: SwStoreService
	) { }

	public getResumeCards(archived: boolean): Observable<any[]> {
		// add query function based on archived param

		return this.getResumes()
			.pipe(
				map((response: any[]) => {
					return response
						.map((item: any[]) => this.generateResumeCard(item))
						.filter((resume: ResumeCard) => resume.archived === archived);
				}));

	}

	public getResume(id: string): Observable<any> {
		return this.db
			.collection(this.collection)
			.doc(id)
			.get()
			.pipe(
				map(response => {
					console.log(response.data().data)
					return response.data().data;
				})
			);
	}

	public getResumes(): Observable<any> {
		// actual data = response[i].payload.doc.data()
		// id = response[i].payload.doc.id

		return this.db.collection(this.collection)
			.snapshotChanges();
	}

	public createResume(resume: Resume): Observable<any> {
		const entity: ResumeEntity = {
			archived: false,
			creationDate: new Date().toDateString().slice(4),
			data: resume
		};
		console.log(this.swStore.isNetworkConnected)
		this.swStore.noConnectionMessage('/dashboard/home');

		return from(
			this.db
				.collection(this.collection)
				.add(entity)
		);
	}

	public updateResume(id: string, data: Resume): Observable<void> {
		const body = {
			data
		};
		this.swStore.noConnectionMessage('/dashboard/home');

		return from(
			this.db
				.collection(this.collection)
				.doc(id)
				.set(body, { merge: true })
		);
	}

	public deleteResume(id: string): Observable<void> {
		this.swStore.noConnectionMessage();

		return from(
			this.db
				.collection(this.collection)
				.doc(id)
				.delete()
		);
	}

	public archiveResume(id: string): Observable<void> {
		this.swStore.noConnectionMessage();

		return from(
			this.db
				.collection(this.collection)
				.doc(id)
				.set({ archived: true }, { merge: true })
		);
	}

	public restoreResume(id: string): Observable<void> {
		this.swStore.noConnectionMessage();

		return from(
			this.db
				.collection(this.collection)
				.doc(id)
				.set({ archived: false }, { merge: true })
		);
	}

	public downloadResume(): void {

	}

	private generateResumeCard(source: any): ResumeCard {
		const entity = source.payload.doc.data() as ResumeEntity;

		return {
			id: source.payload.doc.id,
			photo: entity.data.photo,
			name: `${entity.data.resume.about.firstName} ${entity.data.resume.about.lastName}`,
			title: entity.data.resume.about.position,
			creationDate: entity.creationDate,
			archived: entity.archived
		};
	}
}
