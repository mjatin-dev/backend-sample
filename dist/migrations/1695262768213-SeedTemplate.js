"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedTemplate1695262768213 = void 0;
class SeedTemplate1695262768213 {
    async up(queryRunner) {
        await queryRunner.query(`
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('2d98b85a-e407-4e0c-9b12-e77045c14015'::uuid, 'Inactive Opportunity Alert', 'Flags opportunities with no recent activity or updates.', '{
      "table": "Opportunity",
      "where": [
        {
          "field": {
            "type": "FUNCTION_VALUE",
            "function": "DAYS_SINCE",
            "numberOfParams": 1,
            "value": [
              {
                "type": "FIELD_REFERENCE",
                "value": "Opportunity.\"LastActivityDate\""
              }
            ]
          },
          "operator": ">=",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "5"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "AND"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "Opportunity.\"IsClosed\""
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "False"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ],
      "join": []
    }'::json, 'sales', 'Salesforce', '2023-08-31 16:00:49.090', '2023-08-31 16:00:49.090', NULL, 'Flags opportunities with no recent activity or updates.', 6, 'data-validation', 'medium', 'Opportunity', '{
      "table": "Opportunity",
      "where": [
        {
          "field": {
            "type": "FUNCTION_VALUE",
            "function": "DAYS_SINCE",
            "numberOfParams": 1,
            "value": [
              {
                "type": "FIELD_REFERENCE",
                "value": "LastActivityDate"
              }
            ]
          },
          "operator": ">=",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "number",
            "value": "5"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "AND"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "IsClosed"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "boolean",
            "value": "False"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ]
    }'::json);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('8c2c50db-ce77-4db4-b210-c641dc232061'::uuid, 'Contact Without Account', 'Flags contacts that aren''t linked to any account.', '{
      "table": "Contact",
      "where": [
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "AccountId"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ],
      "having": []
    }'::json, 'sales', 'Salesforce', '2023-08-31 16:00:49.090', '2023-08-31 16:00:49.090', NULL, 'Selects contacts that aren''t linked to any account.', 7, 'data-validation', 'medium', 'Contact', '{
      "table": "Contact",
      "where": [
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "AccountId"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "null",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ],
      "having": []
    }'::json);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('3bf702dc-9951-480d-ad73-aa771d0593a3'::uuid, 'Duplicate Lead Detection', 'Identifies potential duplicate leads in the system.', '{}'::json, 'sales', 'Salesforce', '2023-08-31 16:00:49.090', '2023-08-31 16:00:49.090', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('f53f8a7a-af22-4dca-9676-d23079bd8bea'::uuid, 'Missing Lead Source', 'Identifies leads without a specified source.', '{
      "table": "Lead",
      "where": [
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "LeadSource"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ]
    }'::json, 'marketing', 'Salesforce', '2023-09-09 14:19:18.700', '2023-09-09 14:19:18.700', NULL, 'Identifies leads without a specified source.', 7, 'data-validation', 'medium', 'Lead', '{
      "table": "Lead",
      "where": [
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "LeadSource"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "null",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ]
    }'::json);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('f927e8a7-42c6-4ded-aa65-36496c6709fc'::uuid, 'Unassigned Lead Alert', 'Flags leads that have not been assigned to any sales rep.', '{
      "table": "Lead",
      "where": [
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "OwnerId"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ]
    }'::json, 'sales', 'Salesforce', '2023-09-09 14:17:15.631', '2023-09-09 14:17:15.631', NULL, 'Flags leads that have not been assigned to any sales rep.', 7, 'data-validation', 'medium', 'Lead', '{
      "table": "Lead",
      "where": [
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "OwnerId"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "null",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ]
    }'::json);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('5d6f9dce-fd21-4abb-9be3-6d94861a6e2b'::uuid, 'Overdue Sales Task Alert', 'Flags tasks assigned to sales representatives that are overdue by 5 days or more.', '{}'::json, 'sales', 'Salesforce', '2023-09-09 14:14:09.745', '2023-09-09 14:14:09.745', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('e8d4eda3-5c12-49f0-b813-2da50dc04e3c'::uuid, 'High-Value Lead Without Follow-Up', 'Identifies high-potential leads that haven''t been followed up.', '{}'::json, 'sales', 'Salesforce', '2023-09-09 14:15:18.309', '2023-09-09 14:15:18.309', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('aba9a4f1-0053-4709-8184-bc51f13669cf'::uuid, 'Overdue Case Alert', 'Flags support cases that have not been resolved within the expected SLA.', '{}'::json, 'support', 'Salesforce', '2023-09-09 14:16:11.891', '2023-09-09 14:16:11.891', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('57a3fd22-8b2e-4442-9694-e97508a603b2'::uuid, 'Lost Opportunity Without Reason', 'Highlights opportunities marked as "lost" without a specified reason.', '{}'::json, 'support', 'Salesforce', '2023-09-09 14:16:36.181', '2023-09-09 14:16:36.181', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('d6e700a4-6b62-4bad-8bb4-5e19500dde0a'::uuid, 'Task Without Due Date', 'Identifies tasks that have been created without a due date assigned.', '{}'::json, 'others', 'Salesforce', '2023-09-09 14:16:48.513', '2023-09-09 14:16:48.513', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('cdfd3c15-bb08-41aa-b068-a09f4716fb26'::uuid, 'Opportunity Close Date Alert', 'Alerts when an opportunity''s close date is approaching.', '{}'::json, 'sales', 'Salesforce', '2023-09-09 14:17:37.089', '2023-09-09 14:17:37.089', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('986b27e5-57b9-400a-844c-d291c658b506'::uuid, 'Account Without Recent Activity', 'Highlights accounts with no recent activities.', '{}'::json, 'sales', 'Salesforce', '2023-09-09 14:18:18.540', '2023-09-09 14:18:18.540', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('d1a510e3-49de-4d8e-9275-2aa02543578f'::uuid, 'Contact Without Recent Interaction', 'Flags contacts with no recent interactions.', '{}'::json, 'sales', 'Salesforce', '2023-09-09 14:18:28.752', '2023-09-09 14:18:28.752', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('fe0af090-2dd2-4060-9d1e-d5931103b271'::uuid, 'Opportunity Without Contact Role', 'Identifies opportunities without any contact roles specified.', '{}'::json, 'sales', 'Salesforce', '2023-09-09 14:18:38.138', '2023-09-09 14:18:38.138', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('f092f186-dc6d-4f9f-8fb0-7c36ab0642e1'::uuid, 'Lead Source Inconsistency Alert', 'Highlights leads with unclassified or vague sources.', '{}'::json, 'sales', 'Salesforce', '2023-09-09 14:18:49.771', '2023-09-09 14:18:49.771', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('57d82a05-514b-4839-9206-9d8f89f4e784'::uuid, 'Opportunity Without Product Line', 'Flags opportunities that have not had any product lines added.', '{}'::json, 'sales', 'Salesforce', '2023-09-09 14:19:05.029', '2023-09-09 14:19:05.029', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('aeb3d389-2577-4f40-870a-2e307ba4544e'::uuid, 'Campaign Without Goals', 'Flags campaigns that do not have defined goals or objectives.', '{}'::json, 'marketing', 'Salesforce', '2023-09-09 14:19:30.645', '2023-09-09 14:19:30.645', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('fab34271-b9a1-441a-9c90-37464fd0b8be'::uuid, 'Inactive Email Subscribers', 'Flags contacts who have not engaged with emails over a specific period.', '{}'::json, 'marketing', 'Salesforce', '2023-09-09 14:20:07.694', '2023-09-09 14:20:07.694', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('842575b5-db0e-4bf9-a915-e98e0cc86bc5'::uuid, 'Untracked Campaign Channels', 'Alerts when a campaign is launched without associated tracked channels.', '{}'::json, 'marketing', 'Salesforce', '2023-09-09 14:20:22.702', '2023-09-09 14:20:22.702', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('155f17c9-c5d7-4fb6-bdc3-0724e72101bb'::uuid, 'Email Bounce Rate Exceeds Threshold', 'Monitors email campaigns and flags when bounce rate exceeds a certain percentage.', '{}'::json, 'marketing', 'Salesforce', '2023-09-09 14:20:53.869', '2023-09-09 14:20:53.869', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('8807e0be-a0cd-409e-8708-d2489f97cf51'::uuid, 'Lead Scoring Inconsistencies', 'Flags leads where scoring appears inconsistent with engagement metrics.', '{}'::json, 'marketing', 'Salesforce', '2023-09-09 14:21:05.413', '2023-09-09 14:21:05.413', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('70974ef0-5dfd-4f3b-82be-20e941c1cb7f'::uuid, 'Duplicated Campaign Members', 'Identifies duplicate members within a specific marketing campaign.', '{}'::json, 'marketing', 'Salesforce', '2023-09-09 14:21:16.517', '2023-09-09 14:21:16.517', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('0e7ca38a-01b2-404b-a46e-2cea436dbec5'::uuid, 'Stale Marketing Collateral', 'Highlights outdated marketing documents or content.', '{}'::json, 'marketing', 'Salesforce', '2023-09-09 14:21:38.577', '2023-09-09 14:21:38.577', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('5f7f4caf-8c3a-47b5-80c7-eb0195f1b54c'::uuid, 'Unsegmented Email Lists', 'Identifies email lists that are not segmented or targeted.', '{}'::json, 'marketing', 'Salesforce', '2023-09-09 14:21:53.066', '2023-09-09 14:21:53.066', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('da7e61cf-0e95-4441-b8d6-66241fba6318'::uuid, 'Web Leads Without Follow-Up', 'Flags leads originating from the website with no subsequent engagement.', '{}'::json, 'marketing', 'Salesforce', '2023-09-09 14:22:03.477', '2023-09-09 14:22:03.477', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('ade83558-cfa1-4058-bbfc-b3207d68d930'::uuid, 'Event Leads Without Engagement', 'Identifies leads from events (e.g., webinars) that have not been engaged post-event.', '{}'::json, 'marketing', 'Salesforce', '2023-09-09 14:22:46.619', '2023-09-09 14:22:46.619', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('88b9f87e-0974-4775-ae12-043cfed5adf9'::uuid, 'Unattributed Campaign Revenue', 'Highlights campaigns where revenue attribution is not clear.', '{}'::json, 'marketing', 'Salesforce', '2023-09-09 14:22:18.059', '2023-09-09 14:22:18.059', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('1ae5aeaa-37d6-4e8a-860c-3a91f97d819b'::uuid, 'Landing Page Conversion Drop', 'Monitors landing page metrics and flags significant conversion drops.', '{}'::json, 'marketing', 'Salesforce', '2023-09-09 14:22:32.633', '2023-09-09 14:22:32.633', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('34054159-ff20-48b1-8461-d55d0c822294'::uuid, 'Non-Compliant Marketing Materials', 'Monitors marketing collateral for compliance with brand guidelines.', '{}'::json, 'marketing', 'Salesforce', '2023-09-09 14:23:07.643', '2023-09-09 14:23:07.643', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('902e4dfa-7899-4379-afc6-b6e15a0489d2'::uuid, 'Ad Campaigns Without Tracking', 'Identifies ad campaigns where tracking mechanisms (e.g., UTM tags) are not implemented.', '{}'::json, 'marketing', 'Salesforce', '2023-09-09 14:23:24.013', '2023-09-09 14:23:24.013', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('7d5b681c-1b0e-4c02-9f3e-5a1320e20b45'::uuid, 'Stale Marketing Lists', 'Highlights marketing lists that have not been updated or used in a while.', '{}'::json, 'marketing', 'Salesforce', '2023-09-09 14:23:41.566', '2023-09-09 14:23:41.566', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('771bcf54-d930-49b4-8885-7fe956d9516a'::uuid, 'GDPR Consent Missing', 'Flags contacts or leads who have not provided GDPR consent but are included in campaigns.', '{}'::json, 'marketing', 'Salesforce', '2023-09-09 14:23:55.470', '2023-09-09 14:23:55.470', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('9c9dca71-4394-4ad9-91b9-13b2e800a488'::uuid, 'Test rule without json body', 'Test rule without json body', '{}'::json, 'sales', 'Salesforce', '2023-09-09 14:14:38.852', '2023-09-09 14:14:38.852', '2023-09-20 00:22:16.537', '', 0, 'data-validation', 'low', NULL, NULL);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('9defed8d-7949-4850-a86a-c1ddc7439a53'::uuid, 'Account Without Contacts', 'Identifies accounts that do not have associated contacts.', '{
      "table": "Account",
      "where": [],
      "having": [
        {
          "type": "ROOT_CONDITIONAL",
          "field": {
            "type": "FUNCTION_VALUE",
            "function": "COUNT",
            "numberOfParams": 1,
            "value": [
              {
                "value": "Account_Account_Contact.Id",
                "type": "FIELD_REFERENCE"
              }
            ]
          },
          "operator": "<",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "1"
          }
        }
      ],
      "groupBy": [
        "Account.Id"
      ],
      "join": [
        {
          "type": "left",
          "table": "Contact Account_Account_Contact",
          "condition": {
            "type": "ROOT_CONDITIONAL",
            "field": {
              "type": "FIELD_REFERENCE",
              "value": "Account.Id"
            },
            "operator": "=",
            "value": {
              "type": "FIELD_REFERENCE",
              "value": "Account_Account_Contact.AccountId"
            }
          }
        }
      ]
    }'::json, 'sales', 'Salesforce', '2023-08-31 16:00:49.090', '2023-08-31 16:00:49.090', NULL, 'Identifies accounts that do not have associated contacts.', 6, 'data-validation', 'medium', 'Account', '{
      "table": "Account",
      "where": [],
      "having": [
        {
          "type": "ROOT_CONDITIONAL",
          "field": {
            "type": "FUNCTION_VALUE",
            "function": "COUNT",
            "numberOfParams": 1,
            "value": [
              {
                "type": "LOOKUP_VALUE",
                "value": [
                  {
                    "type": "LOOKUP_TABLE",
                    "table": "Account",
                    "relationShipName": "Account",
                    "referenceTable": "Contact",
                    "joinField": "Id",
                    "referenceJoinField": "AccountId"
                  },
                  {
                    "value": "Id",
                    "type": "FIELD_REFERENCE"
                  }
                ]
              }
            ]
          },
          "operator": "<",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "number",
            "value": "1"
          }
        }
      ],
      "groupBy": [
        "Account.Id"
      ]
    }'::json);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('0d6ffa75-a691-43ce-9252-b9aec84f1b90'::uuid, 'Incomplete Lead Marketing Profile', 'Flags leads with incomplete profile information relevant for marketing.', '{
      "table": "Lead",
      "where": [
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "Address"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "OR"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "Title"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "OR"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "Website"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "OR"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "Phone"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "OR"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "Name"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "OR"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "MobilePhone"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "OR"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "Email"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "OR"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "Company"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "OR"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "LastName"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "OR"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "FirstName"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ]
    }'::json, 'marketing', 'Salesforce', '2023-09-09 14:22:57.633', '2023-09-09 14:22:57.633', NULL, 'Flags leads with incomplete profile information relevant for marketing.', 5, 'data-validation', 'low', 'Lead', '{
      "table": "Lead",
      "where": [
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "Address"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "null",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "OR"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "Title"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "null",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "OR"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "Website"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "null",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "OR"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "Phone"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "null",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "OR"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "Name"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "null",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "OR"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "MobilePhone"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "null",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "OR"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "Email"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "null",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "OR"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "Company"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "null",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "OR"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "LastName"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "null",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "OR"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "FirstName"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "null",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ]
    }'::json);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('870d33f5-0235-4d00-80a1-41e3129c5c35'::uuid, 'Over Budget Campaigns', 'Flags campaigns where spending exceeds allocated budget.', '{
      "table": "Campaign",
      "where": [
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "ActualCost"
          },
          "operator": ">",
          "value": {
            "type": "FIELD_REFERENCE",
            "value": "BudgetedCost"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ]
    }'::json, 'marketing', 'Salesforce', '2023-09-09 14:21:27.612', '2023-09-09 14:21:27.612', NULL, 'Flags campaigns where spending exceeds allocated budget.', 8, 'data-validation', 'high', 'Campaign', '{
      "table": "Campaign",
      "where": [
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "ActualCost"
          },
          "operator": ">",
          "value": {
            "type": "FIELD_REFERENCE",
            "value": "BudgetedCost"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ]
    }'::json);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('a5f6cb40-ba2a-437a-88de-3b8c82d62027'::uuid, 'Case Without Resolution', 'Alerts unresolved cases past a certain duration.', '{
      "table": "Case",
      "where": [
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "Case.\"IsClosed\""
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "False"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "AND"
        },
        {
          "field": {
            "type": "FUNCTION_VALUE",
            "function": "DAYS_SINCE",
            "numberOfParams": 1,
            "value": [
              {
                "type": "FIELD_REFERENCE",
                "value": "Case.\"CreatedDate\""
              }
            ]
          },
          "operator": ">=",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "3"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ],
      "join": []
    }'::json, 'support', 'Salesforce', '2023-08-31 16:00:49.090', '2023-08-31 16:00:49.090', NULL, 'Alerts unresolved cases past a certain duration.', 8, 'data-validation', 'high', 'Case', '{
      "table": "Case",
      "where": [
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "IsClosed"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "boolean",
            "value": "False"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "AND"
        },
        {
          "field": {
            "type": "FUNCTION_VALUE",
            "function": "DAYS_SINCE",
            "numberOfParams": 1,
            "value": [
              {
                "type": "FIELD_REFERENCE",
                "value": "CreatedDate"
              }
            ]
          },
          "operator": ">=",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "number",
            "value": "3"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ]
    }'::json);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('94919dcd-6514-4296-916d-4f88f7a7f412'::uuid, 'Stale Lead Alert', 'Identifies leads with prolonged inactivity.', '{
      "table": "Lead",
      "where": [
        {
          "field": {
            "type": "FUNCTION_VALUE",
            "function": "DAYS_SINCE",
            "numberOfParams": 1,
            "value": [
              {
                "type": "FIELD_REFERENCE",
                "value": "Lead.\"LastActivityDate\""
              }
            ]
          },
          "operator": ">=",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "5"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ],
      "join": []
    }'::json, 'sales', 'Salesforce', '2023-09-09 14:14:38.852', '2023-09-09 14:14:38.852', NULL, 'Identifies leads with prolonged inactivity.', 6, 'data-validation', 'medium', 'Lead', '{
      "table": "Lead",
      "where": [
        {
          "field": {
            "type": "FUNCTION_VALUE",
            "function": "DAYS_SINCE",
            "numberOfParams": 1,
            "value": [
              {
                "type": "FIELD_REFERENCE",
                "value": "LastActivityDate"
              }
            ]
          },
          "operator": ">=",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "number",
            "value": "5"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ]
    }'::json);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('6bd5387d-10b4-4aab-97e8-c8d2617452a7'::uuid, 'Contact Email address formatt not valid', 'Flags contacts with Email address not valid', '{"table":"Contact","subQueries":[],"where":[{"field":{"type":"REGEX","value":"","fieldName":"Email","validationPatterns":["989abbda-ade1-4d21-97c9-c46b13d824f0"]},"operator":"===","value":{"type":"PRIMITIVE_VALUE","value":"false"},"type":"ROOT_CONDITIONAL"}]}'::json, 'others', 'Salesforce', '2023-09-09 14:22:57.633', '2023-09-09 14:22:57.633', NULL, 'Flags contacts with Email address not valid', 20, 'anomaly-detection', 'low', 'Contact', '{"table":"Contact","subQueries":[],"where":[{"field":{"type":"REGEX","value":"","fieldName":"Email","validationPatterns":["989abbda-ade1-4d21-97c9-c46b13d824f0"]},"operator":"===","value":{"type":"PRIMITIVE_VALUE","value":"false"},"type":"ROOT_CONDITIONAL"}]}'::json);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('24490aad-3c8e-4cf9-8dc2-200ba5608008'::uuid, 'Leads Without Engagement', 'Identifies leads that have not engaged with any marketing content.', '{
      "table": "Lead",
      "where": [
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "LastActivityDate"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ]
    }'::json, 'marketing', 'Salesforce', '2023-09-09 14:20:37.390', '2023-09-09 14:20:37.390', NULL, 'Identifies leads that have not engaged with any marketing content.', 8, 'data-validation', 'high', 'Lead', '{
      "table": "Lead",
      "where": [
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "LastActivityDate"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "null",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ]
    }'::json);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('837e3ed2-3b03-4de9-a757-89616a6e2d40'::uuid, 'Closed Opportunity Without Activities', 'Flags closed opportunities that had no related activities.', '{
      "table": "Opportunity",
      "where": [
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "IsClosed"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "True"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "AND"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "LastActivityDate"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ]
    }'::json, 'sales', 'Salesforce', '2023-09-09 14:14:49.548', '2023-09-09 14:14:49.548', NULL, 'Flags closed opportunities that had no related activities.', 7, 'data-validation', 'medium', 'Opportunity', '{
      "table": "Opportunity",
      "where": [
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "IsClosed"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "boolean",
            "value": "True"
          },
          "type": "ROOT_CONDITIONAL"
        },
        {
          "type": "LOGICAL_OPERATOR",
          "value": "AND"
        },
        {
          "field": {
            "type": "FIELD_REFERENCE",
            "value": "LastActivityDate"
          },
          "operator": "IS",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "null",
            "value": "Null"
          },
          "type": "ROOT_CONDITIONAL"
        }
      ]
    }'::json);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('0bc9401c-3162-4724-a890-75d8f02df80e'::uuid, 'Account Without Opportunities', 'Flags accounts that have no associated opportunities.', '{
      "table": "Account",
      "where": [],
      "having": [
        {
          "type": "ROOT_CONDITIONAL",
          "field": {
            "type": "FUNCTION_VALUE",
            "function": "COUNT",
            "numberOfParams": 1,
            "value": [
              {
                "type": "FIELD_REFERENCE",
                "value": "Account_Account_Opportunity.Id"
              }
            ]
          },
          "operator": "<",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "number",
            "value": "1"
          }
        }
      ],
      "groupBy": [
        "Account.Id"
      ],
      "join": [
        {
          "type": "left",
          "table": "Opportunity Account_Account_Opportunity",
          "condition": {
            "type": "ROOT_CONDITIONAL",
            "field": {
              "type": "FIELD_REFERENCE",
              "value": "Account.Id"
            },
            "operator": "=",
            "value": {
              "type": "FIELD_REFERENCE",
              "value": "Account_Account_Opportunity.AccountId"
            }
          }
        }
      ]
    }'::json, 'sales', 'Salesforce', '2023-09-09 14:15:46.559', '2023-09-09 14:15:46.559', NULL, 'Flags accounts that have no associated opportunities.', 5, 'data-validation', 'low', 'Account', '{
      "table": "Account",
      "where": [],
      "having": [
        {
          "type": "ROOT_CONDITIONAL",
          "field": {
            "type": "FUNCTION_VALUE",
            "function": "COUNT",
            "numberOfParams": 1,
            "value": [
              {
                "type": "FIELD_REFERENCE",
                "value": "Account_Account_Opportunity.Id"
              }
            ]
          },
          "operator": "<",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "number",
            "value": "1"
          }
        }
      ],
      "groupBy": [
        "Account.Id"
      ],
      "join": [
        {
          "type": "left",
          "table": "Opportunity Account_Account_Opportunity",
          "condition": {
            "type": "ROOT_CONDITIONAL",
            "field": {
              "type": "FIELD_REFERENCE",
              "value": "Account.Id"
            },
            "operator": "=",
            "value": {
              "type": "FIELD_REFERENCE",
              "value": "Account_Account_Opportunity.AccountId"
            }
          }
        }
      ]
    }'::json);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('9ed70a88-b008-46b2-9205-db468a7e1324'::uuid, 'Incomplete Contact Marketing Profile', 'Flags contacts with incomplete profile information relevant for marketing.', '{
      "table": "Account",
      "where": [],
      "having": [
        {
          "type": "ROOT_CONDITIONAL",
          "field": {
            "type": "FUNCTION_VALUE",
            "function": "COUNT",
            "numberOfParams": 1,
            "value": [
              {
                "type": "LOOKUP_VALUE",
                "value": [
                  {
                    "type": "LOOKUP_TABLE",
                    "table": "Account",
                    "relationShipName": "Account",
                    "referenceTable": "Opportunity",
                    "joinField": "Id",
                    "referenceJoinField": "AccountId"
                  },
                  {
                    "type": "FIELD_REFERENCE",
                    "value": "Id"
                  }
                ]
              }
            ]
          },
          "operator": "<",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "value": "1"
          }
        }
      ],
      "groupBy": [
        "Account.Id"
      ]
    }'::json, 'marketing', 'Salesforce', '2023-09-09 14:22:57.633', '2023-09-09 14:22:57.633', '2023-10-10 22:31:31.581', 'Flags contacts with incomplete profile information relevant for marketing.', 5, 'data-validation', 'low', 'Contact', '{
      "table": "Account",
      "where": [],
      "having": [
        {
          "type": "ROOT_CONDITIONAL",
          "field": {
            "type": "FUNCTION_VALUE",
            "function": "COUNT",
            "numberOfParams": 1,
            "value": [
              {
                "type": "LOOKUP_VALUE",
                "value": [
                  {
                    "type": "LOOKUP_TABLE",
                    "table": "Account",
                    "relationShipName": "Account",
                    "referenceTable": "Opportunity",
                    "joinField": "Id",
                    "referenceJoinField": "AccountId"
                  },
                  {
                    "type": "FIELD_REFERENCE",
                    "value": "Id"
                  }
                ]
              }
            ]
          },
          "operator": "<",
          "value": {
            "type": "PRIMITIVE_VALUE",
            "format": "number",
            "value": "1"
          }
        }
      ],
      "groupBy": [
        "Account.Id"
      ]
    }'::json);
    INSERT INTO public.rule_template (rule_template_id, "name", description, rule_body, department, data_source_name, created_at, updated_at, deleted_at, context, violation_score, "type", risk, "table", front_end_rule_body) VALUES('90d1f802-30e8-4961-bc02-12a8a02f56c6'::uuid, 'Contact US Standard Phone Number formatt not valid', 'Flags contacts with Phone number format not US standard valid', '{"ruleName":"Email template test","violationScore":10,"department":"sales","description":"","category":"anomaly-detection","riskLevel":"low","subQueries":[],"where":[{"field":{"type":"REGEX","value":"","fieldName":"Phone","validationPatterns":["513c6472-64f6-4011-a42a-a3748554cbbd","a7b469e9-a339-4907-abb8-2dd62b47e044"]},"operator":"===","value":{"type":"PRIMITIVE_VALUE","value":"false"},"type":"ROOT_CONDITIONAL"}],"having":[]}'::json, 'others', 'Salesforce', '2023-09-09 14:22:57.633', '2023-09-09 14:22:57.633', NULL, 'Flags contacts with Phone number format not US standard valid', 10, 'anomaly-detection', 'low', 'Contact', '{"ruleName":"Email template test","violationScore":10,"department":"sales","description":"","category":"anomaly-detection","riskLevel":"low","subQueries":[],"where":[{"field":{"type":"REGEX","value":"","fieldName":"Phone","validationPatterns":["513c6472-64f6-4011-a42a-a3748554cbbd","a7b469e9-a339-4907-abb8-2dd62b47e044"]},"operator":"===","value":{"type":"PRIMITIVE_VALUE","value":"false"},"type":"ROOT_CONDITIONAL"}],"having":[]}'::json);
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(``);
    }
}
exports.SeedTemplate1695262768213 = SeedTemplate1695262768213;
//# sourceMappingURL=1695262768213-SeedTemplate.js.map