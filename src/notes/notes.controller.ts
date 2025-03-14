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
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Prospect } from 'src/prospects/entities/prospect.entity';

@Controller('api/notes')
export class NotesController {
	constructor(private readonly notesService: NotesService) {}

	@Post()
	create(@Body() note: { prospect_id: number; note: string }) {
		return this.notesService.create(note);
	}

	@Get()
	findAll(
		@Query('page') page = 0,
		@Query('prospect_id') prospect_id: number
	) {
		return this.notesService.findAll(page, prospect_id);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.notesService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body()
		note: {
			prospect_id: number;
			note: string;
		}
	) {
		return this.notesService.update(+id, note);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.notesService.remove(+id);
	}
}
