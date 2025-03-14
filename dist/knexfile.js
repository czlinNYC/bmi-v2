"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    development: {
        client: 'postgresql',
        connection: 'postgresql://blue_max_dev_owner:PvU1fWIzSc7u@ep-lucky-hat-a65zlnzq.us-west-2.aws.neon.tech/blue_max_dev?sslmode=require',
        searchPath: ['knex', 'public'],
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },
    staging: {
        client: 'postgresql',
        connection: 'postgresql://blue_max_dev_owner:PvU1fWIzSc7u@ep-lucky-hat-a65zlnzq.us-west-2.aws.neon.tech/blue_max_dev?sslmode=require',
        searchPath: ['knex', 'public'],
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },
    production: {
        client: 'postgresql',
        connection: 'postgresql://blue_max_dev_owner:PvU1fWIzSc7u@ep-lucky-hat-a65zlnzq.us-west-2.aws.neon.tech/blue_max_dev?sslmode=require',
        searchPath: ['knex', 'public'],
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
module.exports = config;
//# sourceMappingURL=knexfile.js.map