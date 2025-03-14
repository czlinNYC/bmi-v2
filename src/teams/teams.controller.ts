import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common';
import { TeamsService } from './teams.service';

@Controller('api/teams')
export class TeamsController {
	constructor(private readonly TeamsService: TeamsService) {}

	@Post()
	create(
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
		return this.TeamsService.create(team);
	}

	@Get()
	findAll() {
		return this.TeamsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.TeamsService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
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
		return this.TeamsService.update(+id, team);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.TeamsService.remove(+id);
	}
}
