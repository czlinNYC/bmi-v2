import { Body, Injectable } from '@nestjs/common';
import { CreateProspectDto } from './dto/create-prospect.dto';
import { UpdateProspectDto } from './dto/update-prospect.dto';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import * as moment from 'moment';
const ZeroBounceSDK = require('@zerobounce/zero-bounce-sdk');
const zeroBounce = new ZeroBounceSDK();
const token = '009D01D4-7320-40F4-806F-B3881FCDB677';
zeroBounce.init('171bee1d04f34fd28031d562f441f296');

@Injectable()
export class ProspectsService {
	constructor(@InjectConnection() private readonly knex: Knex) {}

	async create(
		@Body()
		prospect: {
			comapany_name: string;
			contact_name: string;
			last_name: string;
			first_name: string;
			job_title: string;
			email: string;
			phone: string;
			country: string;
			website: string;
			address: string;
			city: string;
			state: string;
			zip: string;
			industry: string;
			sub_industry: string;
			phone_verfied: boolean;
			phone_type: string;
			phone_status: string;
			phone_DNC: boolean;
			email_verfied: boolean;
			email_type: string;
			email_status: string;
			email_sub_status: string;
			batch_id?: number;
		}
	) {
		try {
			const newProspect = await this.knex
				.table('prospects')
				.insert({ ...prospect })
				.returning('*');
			// console.log(newProspect, 'NEW PROSPECT ----+-----');
			return newProspect;
		} catch (error) {
			console.log(error);
			return error;
		}
	}
	async createMany(
		@Body()
		prospects: {
			comapany_name: string;
			contact_name: string;
			last_name: string;
			first_name: string;
			job_title: string;
			email: string;
			phone: string;
			country: string;
			website: string;
			address: string;
			city: string;
			state: string;
			zip: string;
			industry: string;
			sub_industry: string;
			phone_verfied: boolean;
			phone_type: string;
			phone_status: string;
			phone_DNC: boolean;
			email_verfied: boolean;
			email_type: string;
			email_status: string;
			email_sub_status: string;
			batch_id: number;
		}[]
	) {
		let submittedProspects = [];
		for (const prospect of prospects) {
			try {
				let newProspect = await this.create(prospect);
				submittedProspects.push(newProspect[0]);
			} catch (error) {
				console.log(prospect, 'FAILED---- Prospect');
				console.log(error);
				return error;
			}
		}
		return submittedProspects;
	}
	async validateEmail(
		@Body()
		prospects: {
			comapany_name: string;
			contact_name: string;
			last_name: string;
			first_name: string;
			job_title: string;
			email: string;
			phone: string;
			country: string;
			website: string;
			address: string;
			city: string;
			state: string;
			zip: string;
			industry: string;
			sub_industry: string;
			phone_verfied: boolean;
			phone_type: string;
			phone_status: string;
			phone_DNC: boolean;
			email_verfied: boolean;
			email_type: string;
			email_status: string;
			email_sub_status: string;
			batch_id: number;
		}[]
	) {
		let emailsOnly = prospects.map((prospect) => {
			return { email_address: prospect.email };
		});
		try {
			let results = await zeroBounce.validateBatch(emailsOnly);
			// console.log(results, 'results------ raw');
			results = results.email_batch;
			let validatedProspects = prospects.map((prospect, index) => {
				// console.log(results[index], 'results');
				return {
					...prospect,
					...{
						email_verified:
							results[index].status === 'invalid' ? false : true,
						email_status: results[index].status,
						email_sub_status: results[index].sub_status,
						email_type:
							results[index].free_email === true
								? 'free'
								: 'professional'
					}
				};
			});
			return validatedProspects;
		} catch (error) {
			console.log(error);
			return error;
		}
	}
	async validatePhone(
		@Body()
		prospects: {
			id?: number;
			comapany_name: string;
			contact_name: string;
			last_name: string;
			first_name: string;
			job_title: string;
			email: string;
			phone: string;
			country: string;
			website: string;
			address: string;
			city: string;
			state: string;
			zip: string;
			industry: string;
			sub_industry: string;
			phone_verfied: boolean;
			phone_type: string;
			phone_status: string;
			phone_DNC: boolean;
			email_verfied: boolean;
			email_type: string;
			email_status: string;
			email_sub_status: string;
			batch_id: number;
		}[],
		phone: string,
		DNC: string
	) {
		try {
			console.log(
				prospects,
				'function called in service',
				phone,
				'PHONE',
				DNC,
				'DNC'
			);
			let response;
			let DNCresponse;
			if (phone === 'true') {
				console.log('phone called');
				response =
					await fetch(`https://api.realvalidation.com/rpvWebService/TurboV3.php?output=json&phone=${prospects[0].phone}&token=
${token}`);
				response = await response.json();
			}
			if (DNC === 'true') {
				DNCresponse =
					await fetch(`https://api.realvalidation.com/rpvWebService/DNCPlus.php?output=json&phone=${prospects[0].phone}&token=
${token}`);
				DNCresponse = await DNCresponse.json();
			}
			let DNCstatus = false;
			if (
				DNCresponse.state_dnc === 'Y' ||
				DNCresponse.national_dnc === 'Y' ||
				DNCresponse.litigator === 'Y'
			) {
				DNCstatus = true;
			}
			console.log(response, 'RESPONSE JSON');
			console.log(DNCresponse, 'DNC_response here');

			console.log(
				[
					{
						...prospects[0],
						...{
							phone_verified: true,
							phone_status: response.status,
							phone_type: response.caller_type,
							phone_DNC: DNCstatus
						}
					}
				],
				'stuff'
			);
			return [
				{
					...prospects[0],
					...{
						phone_verified: true,
						phone_status: response.status,
						phone_type: response.caller_type,
						phone_DNC: DNCstatus
					}
				}
			];
		} catch (error) {
			console.log(error);
		}
	}
	async findAll(page) {
		try {
			const prospects = await this.knex
				.table('prospects')
				.limit(100)
				.offset(page * 100);
			return prospects;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async findOne(id: number) {
		try {
			const prospect = await this.knex
				.table('prospects')
				.where({ id })
				.first()
				.then((row) => row);
			return prospect;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async update(
		id: number,
		prospect: {
			id?: number;
			comapany_name: string;
			contact_name: string;
			last_name: string;
			first_name: string;
			job_title: string;
			email: string;
			phone: string;
			country: string;
			website: string;
			address: string;
			city: string;
			state: string;
			zip: string;
			industry: string;
			sub_industry: string;
			phone_verfied: boolean;
			phone_type: string;
			phone_status: string;
			phone_DNC: boolean;
			email_verfied: boolean;
			email_type: string;
			email_status: string;
			email_sub_status: string;
			batch_id: number;
		}
	) {
		try {
			let now = moment.utc().format();

			const modifiedProspect = await this.knex('prospects')
				.where('id', id)
				.update({
					...prospect,
					updated_at: now
				})
				.returning('*');
			return modifiedProspect;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	async remove(id: number) {
		try {
			const removed = await this.knex
				.table('prospects')
				.where('id', id)
				.delete('*');
			return { ...removed, message: 'This prospect has been deleted' };
		} catch (error) {
			console.log(error);
			return error;
		}
	}
	async removeAll(id: number) {
		try {
			const removed = await this.knex
				.table('prospects')
				.where('batch_id', id)
				.delete('*');
			console.log(removed);
			return {
				...removed,
				message: 'The prospects from this batch have been deleted'
			};
		} catch (error) {
			console.log(error);
			return error;
		}
	}
}
