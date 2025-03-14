import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(
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
		return this.usersService.create(user);
	}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
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
		return this.usersService.update(+id, user);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(+id);
	}
}
