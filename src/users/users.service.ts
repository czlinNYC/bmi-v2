import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import * as moment from 'moment';

@Injectable()
export class UsersService {
	constructor(@InjectConnection() private readonly knex: Knex) {}
	async create(
		@Body()
		user: {
			username: string;
			email: string;
			name: string;
			password: string;
			phone: string;
			company: string;
			status: string;
		}
	) {
		try {
			const newUser = await this.knex
				.table('users')
				.insert({ ...user })
				.returning('*');
			return newUser;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async findAll() {
		try {
			const users = await this.knex.table('users');
			return users;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async findOne(id: number) {
		try {
			const user = await this.knex
				.table('users')
				.where({ id })
				.first()
				.then((row) => row);
			return user;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async update(
		id: number,
		@Body()
		user: {
			username: string;
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

			const modifiedUser = await this.knex('users')
				.where('id', id)
				.update({
					...user,
					updated_at: now
				})
				.returning('*');
			return modifiedUser;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async remove(id: number) {
		try {
			const removed = await this.knex
				.table('users')
				.where('id', id)
				.delete('*');
			return { ...removed, message: 'This user has been deleted' };
		} catch (error) {
			console.log(error);
			return error;
		}
	}
}
