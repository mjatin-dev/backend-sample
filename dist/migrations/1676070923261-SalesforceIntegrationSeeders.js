"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesforceIntegrationSeeders1676070923261 = void 0;
class SalesforceIntegrationSeeders1676070923261 {
    async up(queryRunner) {
        await queryRunner.query(`
        INSERT INTO public.integration (application_id, application_name, application_description, application_icon, provider_name, provider_link, total_installs, categories, features, languages, requirement_permissions, subscription_title, subscriptions, subscription_link)
        VALUES('salesforce', 'Salesforce (Admin)', 'Analyze your Salesforce data and discover their confidence score with CustomerCity', 'https://cdn-icons-png.flaticon.com/128/5968/5968914.png', 'CustomerCity', 'https://customercitydev.com', '10,000+', '{Analysis,CRM}', '{Analysis,Data,Confidence}', 'Japanese, German, Finnish, Swedish, Portuguese, English, Italian, French, Spanish, Polish, and Dutch', NULL, 'Salesforce Subscription', 'Essentials, Professional, Enterprise or Unlimited plans', 'https://www.salesforce.com/editions-pricing/overview/');
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DELETE FROM public.integration where application_name ='Salesforce';
    `);
    }
}
exports.SalesforceIntegrationSeeders1676070923261 = SalesforceIntegrationSeeders1676070923261;
//# sourceMappingURL=1676070923261-SalesforceIntegrationSeeders.js.map