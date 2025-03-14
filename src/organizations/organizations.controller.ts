import {
	Controller,
	Get,
	Post,
	Body,
	Query,
	Patch,
	Param,
	Delete
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';

@Controller('api/organizations')
export class OrganizationsController {
	constructor(private readonly organizationsService: OrganizationsService) {}
	@Post()
	create(
		@Body()
		organization: {
			org_name: string;
			status: string;
			account_holder_id: number;
			account_holder_name: string;
		}
	) {
		return this.organizationsService.create(organization);
	}

	@Get()
	findAll(@Query('page') page = 0) {
		return this.organizationsService.findAll(page);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.organizationsService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body()
		organization: {
			org_name: string;
			status: string;
			account_holder_id: number;
			account_holder_name: string;
		}
	) {
		return this.organizationsService.update(+id, organization);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.organizationsService.remove(+id);
	}
}
