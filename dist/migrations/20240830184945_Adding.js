"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    try {
        return knex.schema
            .createTable('users', (table) => {
            table.increments('id').primary();
            table.string('username').notNullable();
            table.string('name').notNullable();
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            table.string('phone').notNullable();
            table.string('company');
            table.string('status').notNullable();
            table.timestamps(true, true);
        })
            .createTable('organizations', (table) => {
            table.increments('id').primary();
            table.string('org_name').notNullable();
            table.string('status').notNullable();
            table.string('account_holder_name').notNullable();
            table
                .bigint('account_holder_id')
                .unsigned()
                .index()
                .references('id')
                .inTable('users')
                .notNullable();
            table.timestamps(true, true);
        })
            .createTable('teams', (table) => {
            table.increments('id').primary();
            table.string('team_name').notNullable();
            table
                .bigint('org_id')
                .unsigned()
                .index()
                .references('id')
                .inTable('organizations')
                .notNullable();
            table.timestamps(true, true);
        })
            .createTable('roles', (table) => {
            table.increments('id').primary();
            table.string('role_name').notNullable();
            table
                .bigint('org_id')
                .unsigned()
                .index()
                .references('id')
                .inTable('organizations')
                .notNullable();
            table.timestamps(true, true);
        })
            .createTable('permissions', (table) => {
            table.increments('id').primary();
            table.string('permission_name').notNullable();
            table.timestamps(true, true);
        })
            .createTable('permission_assignment', (table) => {
            table
                .bigint('role_id')
                .unsigned()
                .index()
                .references('id')
                .inTable('roles')
                .notNullable();
            table
                .bigint('permission_id')
                .unsigned()
                .index()
                .references('id')
                .inTable('permissions')
                .notNullable();
            table.timestamps(true, true);
        })
            .createTable('team_membership', (table) => {
            table
                .bigint('user_id')
                .unsigned()
                .index()
                .references('id')
                .inTable('users')
                .notNullable();
            table
                .bigint('team_id')
                .unsigned()
                .index()
                .references('id')
                .inTable('teams')
                .notNullable();
        })
            .createTable('role_assignment', (table) => {
            table
                .bigint('user_id')
                .unsigned()
                .index()
                .references('id')
                .inTable('users')
                .notNullable();
            table
                .bigint('role_id')
                .unsigned()
                .index()
                .references('id')
                .inTable('teams')
                .notNullable();
        })
            .createTable('batches', (table) => {
            table.increments('id').primary();
            table
                .bigint('org_id')
                .unsigned()
                .index()
                .references('id')
                .inTable('organizations')
                .notNullable();
            table
                .bigint('assignee_id')
                .unsigned()
                .index()
                .references('id')
                .inTable('users');
            table.bigint('entries');
            table.string('assignee_name');
            table.timestamps(true, true);
        })
            .createTable('prospects', (table) => {
            table.increments('id').primary();
            table.string('company_name');
            table.string('contact_name');
            table.string('last_name');
            table.string('first_name');
            table.string('job_title');
            table.string('email');
            table.string('phone');
            table.string('country');
            table.string('website');
            table.string('address');
            table.string('city');
            table.string('state');
            table.string('zip');
            table.string('industry');
            table.string('sub_industry');
            table.boolean('email_verified');
            table.string('email_status');
            table.string('email_sub_status');
            table.string('email_type');
            table.boolean('phone_DNC');
            table.boolean('phone_verified');
            table.string('phone_status');
            table.string('phone_type');
            table.bigint('batch_id');
            table.timestamps(true, true);
        })
            .createTable('notes', (table) => {
            table.increments('id').primary();
            table
                .bigint('prospect_id')
                .unsigned()
                .index()
                .references('id')
                .inTable('prospects')
                .notNullable();
            table.text('note');
            table.timestamps(true, true);
        })
            .createTable('companies', (table) => {
            table.increments('id').primary();
            table.string('contact_name').notNullable();
            table.string('email').notNullable().unique();
            table.string('website');
            table.string('phone').notNullable();
            table.string('company');
            table.string('status').notNullable();
            table.timestamps(true, true);
        });
    }
    catch (error) {
        console.log(error);
    }
}
async function down(knex) {
    return knex.schema
        .dropTable('notes')
        .dropTable('prospects')
        .dropTable('companies')
        .dropTable('permission_assignment')
        .dropTable('team_membership')
        .dropTable('role_assignment')
        .dropTable('batches')
        .dropTable('permissions')
        .dropTable('roles')
        .dropTable('teams')
        .dropTable('organizations')
        .dropTable('users');
}
//# sourceMappingURL=20240830184945_Adding.js.map