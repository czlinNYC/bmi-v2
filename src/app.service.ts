import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class AppService {
	constructor(@InjectConnection() private readonly knex: Knex) {}
	async getHello() {
		try {
			console.log('oh hell no');
			const message = await this.knex.table('users');
			console.log(message, 'db return');
			console.log(process.env.ENVIRONMENT, 'env var');
			return { message: 'Hello Updated World!', table: message };
		} catch (error) {
			console.log(error);
			return error;
		}
	}
}
