import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('api/companies')
export class CompaniesController {
	constructor(private readonly companiesService: CompaniesService) {}

	@Post()
	create(
		@Body()
		company: {
			email: string;
			contact_name: string;
			password: string;
			phone: string;
			company: string;
			status: string;
		}
	) {
		return this.companiesService.create(company);
	}

	@Get()
	findAll() {
		return this.companiesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.companiesService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body()
		company: {
			email: string;
			contact_name: string;
			password: string;
			phone: string;
			company: string;
			status: string;
		}
	) {
		return this.companiesService.update(+id, company);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.companiesService.remove(+id);
	}
}
