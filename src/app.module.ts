import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { join } from 'path';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { KnexModule } from 'nest-knexjs';
import { UsersModule } from './users/users.module';
import { ProspectsModule } from './prospects/prospects.module';
import { CompaniesModule } from './companies/companies.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { TeamsModule } from './teams/teams.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { BatchesModule } from './batches/batches.module';
import { NotesModule } from './notes/notes.module';
@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '../../', 'client/build'),
			exclude: ['api/*']
		}),
		KnexModule.forRootAsync({
			useFactory: () => ({
				config: {
					client: 'pg',
					connection:
						'postgresql://blue_max_dev_owner:PvU1fWIzSc7u@ep-lucky-hat-a65zlnzq.us-west-2.aws.neon.tech/blue_max_dev?sslmode=require',
					searchPath: ['knex', 'public']
				}
			})
		}),
		UsersModule,
		ProspectsModule,
		CompaniesModule,
		OrganizationsModule,
		TeamsModule,
		RolesModule,
		PermissionsModule,
		BatchesModule,
		NotesModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
