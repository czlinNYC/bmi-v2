import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query
} from '@nestjs/common';
import { ProspectsService } from './prospects.service';
import { CreateProspectDto } from './dto/create-prospect.dto';
import { UpdateProspectDto } from './dto/update-prospect.dto';
import { Prospect } from './entities/prospect.entity';

let phoneQueueInProgress = false;
let emailQueueInProgress = false;
let emailQueue = [];
let phoneQueue = [];
@Controller('api/prospects')
export class ProspectsController {
	constructor(private readonly prospectsService: ProspectsService) {}
	@Post('bulk')
	async createMany(
		@Query('email') email: string,
		@Query('phone') phone: string,
		@Query('DNC') DNC: string,
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
		console.log('ROUTE HIT', phone, DNC, email, prospects);
		const cleanPhone = (phoneString) => {
			if (phoneString) {
				return Number(phoneString.replace(/[^\d]+/g, '').substr(-10));
			} else {
				return '0000000000';
			}
		};
		const addToeMailQueue = async (prospects) => {
			if (emailQueueInProgress === true) {
				emailQueue = [...emailQueue, ...prospects];
			} else {
				const processEmailQueue = async () => {
					console.log('email queue starting');
					if (emailQueue.length === 0) {
						emailQueue = prospects;
						emailQueueInProgress = true;
						setTimeout(processEmailQueue, 5000);
					} else if (emailQueue.length > 200) {
						let results = await this.prospectsService.validateEmail(
							emailQueue.splice(0, 200)
						);
						for (let prospect of results) {
							await this.prospectsService.update(
								prospect.id,
								prospect
							);
						}

						setTimeout(processEmailQueue, 21000);
					} else {
						let results = await this.prospectsService.validateEmail(
							emailQueue.splice(0)
						);
						for (let prospect of results) {
							await this.prospectsService.update(
								prospect.id,
								prospect
							);
						}
						emailQueueInProgress = false;
					}
				};
				processEmailQueue();
			}
		};

		const addToPhoneQueue = async (prospects) => {
			if (phoneQueueInProgress) {
				phoneQueue = [...phoneQueue, ...prospects];
			} else {
				phoneQueue = [...phoneQueue, ...prospects];
				phoneQueueInProgress = true;
				processPhoneQueue();
			}
		};

		const processPhoneQueue = async () => {
			if (phoneQueue.length === 0) {
				phoneQueueInProgress = false;
				return;
			}
			let phoneSplice = phoneQueue.splice(0, 1)[0];
			console.log(phoneSplice, 'PHONE SPLICE---------------------');
			let results = await this.prospectsService.validatePhone(
				[phoneSplice],
				phone,
				DNC
			);
			for (let prospect of results) {
				await this.prospectsService.update(prospect.id, prospect);
			}

			setTimeout(processPhoneQueue, 240);
		};

		let submittedProspects =
			await this.prospectsService.createMany(prospects);
		submittedProspects = submittedProspects.map((prospect) => {
			return { ...prospect, ...{ phone: cleanPhone(prospect.phone) } };
		});
		if (email === 'true') {
			addToeMailQueue(submittedProspects);
		}
		if (phone === 'true' || DNC === 'true') {
			addToPhoneQueue(submittedProspects);
		}
		return submittedProspects;
	}
	@Post()
	create(
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
			batch_id: number;
		}
	) {
		return this.prospectsService.create(prospect);
	}

	@Get()
	findAll(@Query('page') page = 0) {
		return this.prospectsService.findAll(page);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.prospectsService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
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
			batch_id: number;
		}
	) {
		return this.prospectsService.update(+id, prospect);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.prospectsService.remove(+id);
	}
}
