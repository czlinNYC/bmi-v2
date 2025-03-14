import { Injectable, Body } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import * as moment from 'moment';
function sortNotesByCreatedAtDesc(notes) {
	return notes.sort((a, b) => {
		// Parse the created_at strings using moment.js
		const dateA = moment(a.created_at);
		const dateB = moment(b.created_at);

		// Compare the moments in descending order (newest first)
		return dateB.diff(dateA);
	});
}
@Injectable()
export class NotesService {
	constructor(@InjectConnection() private readonly knex: Knex) {}

	async create(
		@Body()
		note: {
			prospect_id: number;
			note: string;
		}
	) {
		try {
			const newnote = await this.knex
				.table('notes')
				.insert({ ...note })
				.returning('*');
			return newnote;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async findAll(page: number, prospect_id: number) {
		try {
			const notes = await this.knex
				.table('notes')
				.where('prospect_id', prospect_id)
				.limit(100)
				.offset(page * 100);
			const sortedNotes = sortNotesByCreatedAtDesc(notes);
			console.log(sortedNotes);
			return sortedNotes;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	findOne(id: number) {
		return `This action returns a #${id} note`;
	}

	update(
		id: number,
		note: {
			prospect_id: number;
			note: string;
		}
	) {
		return `This action updates a #${id} notes`;
	}

	async remove(id: number) {
		try {
			const removed = await this.knex
				.table('notes')
				.where('id', id)
				.delete('*');
			return {
				...removed,
				message: `This note has been deleted, along with the ${removed[0].entries} entries within it.`
			};
		} catch (error) {
			console.log(error);
			return error;
		}
	}
}
