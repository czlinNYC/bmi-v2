import { Body, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import * as moment from 'moment';

@Injectable()
export class TeamsService {
	constructor(@InjectConnection() private readonly knex: Knex) {}
	async create(
		@Body()
		team: {
			teamname: string;
			email: string;
			name: string;
			password: string;
			phone: string;
			company: string;
			status: string;
		}
	) {
		try {
			const newteam = await this.knex
				.table('teams')
				.insert({ ...team })
				.returning('*');
			return newteam;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async findAll() {
		try {
			const teams = await this.knex.table('teams');
			return teams;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async findOne(id: number) {
		try {
			const team = await this.knex
				.table('teams')
				.where({ id })
				.first()
				.then((row) => row);
			return team;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async update(
		id: number,
		@Body()
		team: {
			teamname: string;
			email: string;
			name: string;
			password: string;
			phone: string;
			company: string;
			status: string;
		}
	) {
		try {
			let now = moment.utc().format();

			const modifiedteam = await this.knex('teams')
				.where('id', id)
				.update({
					...team,
					updated_at: now
				})
				.returning('*');
			return modifiedteam;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async remove(id: number) {
		try {
			const removed = await this.knex
				.table('teams')
				.where('id', id)
				.delete('*');
			return { ...removed, message: 'This team has been deleted' };
		} catch (error) {
			console.log(error);
			return error;
		}
	}
}
