"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
async function seed(knex) {
    await knex('users').del();
    await knex('companies').del();
    await knex('prospects').del();
    await knex('users').insert([
        {
            username: 'boyza',
            name: 'John Don',
            email: 'johnd@test.com',
            phone: '1312311123',
            company: 'The boys',
            status: 'alive',
            password: 'root'
        },
        {
            username: 'kimnna98',
            name: 'Kimmy Na',
            email: 'todos@nola.com',
            phone: '1231231123',
            company: 'X-men',
            status: 'alive',
            password: 'root'
        },
        {
            username: 'redranger',
            name: 'Power Rangers',
            email: 'Pr@gmail.com',
            phone: '2132131231',
            company: 'Fantastic 4',
            status: 'alive',
            password: 'root'
        }
    ]);
    await knex('prospects').insert([
        {
            address: '2401 Utah Avenue South',
            city: ' Seattle',
            company_name: 'Starbucks',
            contact_name: 'Kris Aamot',
            country: ' United States',
            email: 'kaamot@starbucks.com',
            first_name: 'Kris',
            industry: 'Retail',
            job_title: 'Systems Analyst Lead and Product Owner',
            last_name: 'Aamot',
            phone: 2064471575,
            state: ' Washington',
            sub_industry: 'Gifts Stores',
            website: 'www.starbucks.com',
            zip: 98134,
            phone_verified: true,
            phone_type: 'unknown',
            phone_status: 'valid',
            phone_DNC: false,
            email_verified: true,
            email_status: 'valid',
            email_sub_status: 'valid',
            email_type: 'unkown',
            batch_id: 1
        },
        {
            address: '421 Great Circle Rd',
            city: 'Nashville',
            company_name: 'Sampoerna',
            contact_name: 'Septian Aan',
            country: ' United States',
            email: 'septian.aan@sampoerna.com',
            first_name: 'Septian',
            industry: 'Retail',
            job_title: 'Sales Executive',
            last_name: 'Aan',
            phone: 2064471575,
            state: ' Tennessee',
            sub_industry: 'Tobacco Store',
            website: 'www.sampoerna.com',
            zip: 37228,
            phone_verified: true,
            phone_type: 'unknown',
            phone_status: 'valid',
            email_verified: true,
            phone_DNC: false,
            email_status: 'valid',
            email_sub_status: 'valid',
            email_type: 'unkown',
            batch_id: 1
        },
        {
            address: 'N56w17000 Ridgewood Drive',
            city: ' Menomonee Falls',
            company_name: 'Kohls Distribution Center',
            contact_name: 'Chelsey Aarestad',
            country: ' United States',
            email: 'caarestad@kohls.com',
            first_name: 'Chelsey',
            industry: 'Retail',
            job_title: 'Human Resources Business Partner',
            last_name: 'Aarestad',
            phone: 2627033790,
            state: ' Wisconsin',
            sub_industry: 'Fancy Stores',
            website: 'www.kohls.com',
            zip: 53051,
            phone_verified: true,
            phone_type: 'unknown',
            phone_status: 'valid',
            phone_DNC: false,
            email_verified: true,
            email_status: 'valid',
            email_sub_status: 'valid',
            email_type: 'unkown',
            batch_id: 2
        }
    ]);
    await knex('companies').insert([
        {
            contact_name: 'The Don',
            email: 'johnd@test.com',
            website: 'www.hi.com',
            phone: '1312311123',
            company: 'The boys',
            status: 'alive'
        },
        {
            contact_name: 'Kimmy Na',
            email: 'todos@nola.com',
            website: 'www.no.com',
            phone: '1231231123',
            company: 'X-men',
            status: 'alive'
        },
        {
            contact_name: 'Company Rangers',
            email: 'Pr@gmail.com',
            website: 'www.argh.com',
            phone: '2132131231',
            company: 'Fantastic 4',
            status: 'alive'
        }
    ]);
    await knex('organizations').insert([
        {
            account_holder_id: 1,
            account_holder_name: 'John Don',
            org_name: 'Blue Max Icon',
            status: 'ACTIVE'
        }
    ]);
    await knex('batches').insert([
        {
            org_id: 1,
            assignee_id: 1,
            assignee_name: 'John Don',
            entries: 2
        },
        { org_id: 1, assignee_id: 2, assignee_name: 'Kimmy Na', entries: 1 }
    ]);
    await knex('notes').insert([
        {
            prospect_id: 1,
            note: 'i talked to this guy he smelled bad through the phone'
        },
        {
            prospect_id: 1,
            note: 'i called a him again he wanted to buy a bag of human hair'
        },
        {
            prospect_id: 1,
            note: 'made a sale. minus the cost of hair clippers. i think it went ok'
        }
    ]);
}
//# sourceMappingURL=initial_data.js.map