import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedValidationPatterns1704723562782 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('c83a0b19-e054-4acb-83ec-08d86af2ec9c'::uuid, NULL, 'Phone validity', NULL, 'SERVICE', 'PHONE', NULL, 'PHONE_VALIDITY', 'DATA_VALIDATION_SERVICE', '{
      "isValid": {
        "keyName": "isValid",
        "label": "Is valid phone number",
        "type": "boolean"
      },
      "isPossible": {
        "keyName": "isPossible",
        "label": "Has correct number length",
        "type": "boolean"
      },
      "isNonGeographic": {
        "keyName": "isNonGeographic",
        "label": "Is non geographic number",
        "type": "boolean"
      },
      "type": {
        "keyName": "type",
        "label": "Phone Number type",
        "type": "picklist",
        "options": [
          {
            "label": "PREMIUM_RATE",
            "value": "PREMIUM_RATE"
          },
          {
            "label": "TOLL_FREE",
            "value": "TOLL_FREE"
          },
          {
            "label": "SHARED_COST",
            "value": "SHARED_COST"
          },
          {
            "label": "VOIP",
            "value": "VOIP"
          },
          {
            "label": "PERSONAL_NUMBER",
            "value": "PERSONAL_NUMBER"
          },
          {
            "label": "PAGER",
            "value": "PAGER"
          },
          {
            "label": "UAN",
            "value": "UAN"
          },
          {
            "label": "VOICEMAIL",
            "value": "VOICEMAIL"
          },
          {
            "label": "FIXED_LINE_OR_MOBILE",
            "value": "FIXED_LINE_OR_MOBILE"
          },
          {
            "label": "FIXED_LINE",
            "value": "FIXED_LINE"
          },
          {
            "label": "MOBILE",
            "value": "MOBILE"
          }
        ]
      }
    }'::json);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('1f4c3613-0e94-4f9d-9c4f-1ab83e7dd70a'::uuid, 'This regex includes emails with subdomains, like user@sub.domain.com.', 'Email with Subdomain', '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$', 'REGEX', 'EMAIL', 'user@sub.domain.com', 'EMAIL_FORMAT', NULL, NULL);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('5036d662-df44-4516-a022-dcb81cbe1841'::uuid, NULL, 'International Format', '^\+(?:[0-9] ?){6,14}[0-9]$', 'REGEX', 'PHONE', '+1234567890', 'PHONE_FORMAT', NULL, NULL);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('49dd06ac-ffbd-44d2-bfe2-b603d1d0f576'::uuid, NULL, 'E.164 Format', '^\+[1-9]\d{1,14}$', 'REGEX', 'PHONE', '+1234567890', 'PHONE_FORMAT', NULL, NULL);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('4d82df92-5a48-49a9-85d2-3bfb7d57e140'::uuid, NULL, 'India Format', '^(\+91[\-\s]?)?[789]\d{9}$', 'REGEX', 'PHONE', '+91 9123456789', 'PHONE_FORMAT', NULL, NULL);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('9a1b420f-a00c-4be8-aed7-236f30130973'::uuid, NULL, 'Japan Format', '^\+81[ -]?\d{1,5}[ -]?\d{1,4}[ -]?\d{1,4}$', 'REGEX', 'PHONE', '+81 3-1234-5678', 'PHONE_FORMAT', NULL, NULL);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('a0955d32-eaf5-46c2-882b-3cfcfc532aa6'::uuid, NULL, 'France Format', '^\+33[1-9](?:(?:(?:\d{1})?)[-. ]?)?\d{2}(?:(?:(?:\d{1})?)[-. ]?)?\d{2}(?:(?:(?:\d{1})?)[-. ]?)?\d{2}(?:(?:(?:\d{1})?)[-. ]?)?\d{2}$', 'REGEX', 'PHONE', '+33 1 23 45 67 89', 'PHONE_FORMAT', NULL, NULL);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('2a49323e-2ed9-4aef-8e8d-a3aeddd93a72'::uuid, NULL, 'Germany Format', '^\+49\s?(\d{2,}|[(]\d{2,}[)])\s?([2-9]\d{2,4}[-\s]?\d{4,})$', 'REGEX', 'PHONE', '+49 30 12345678', 'PHONE_FORMAT', NULL, NULL);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('58364543-9371-4696-8abf-867b0a9833ce'::uuid, NULL, 'Brazil Format', '^(\+55\s?)?(\(?\d{2,3}\)?\s?)?(\d{3,4}[-\s]?\d{4})$', 'REGEX', 'PHONE', '+55 (11) 98765-4321', 'PHONE_FORMAT', NULL, NULL);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('59a3d84a-0b93-4367-9a30-1dde1c135bce'::uuid, NULL, 'South Africa Format', '^(\+27|0)[0-9]{9}$', 'REGEX', 'PHONE', '+27 123456789', 'PHONE_FORMAT', NULL, NULL);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('40456a5d-9e8c-429f-8cbc-c96eeb7df08d'::uuid, NULL, 'Email validity', NULL, 'SERVICE', 'EMAIL', NULL, 'EMAIL_VALIDITY', 'DATA_VALIDATION_SERVICE', '{
      "isValidMx": {
        "keyName": "isValidMx",
        "label": "Is Email Domain Valid",
        "type": "boolean"
      },
      "hasValidFormat": {
        "keyName": "hasValidFormat",
        "label": "Has valid email format",
        "type": "boolean"
      },
      "isDisposable": {
        "keyName": "isDisposable",
        "label": "Is disposable",
        "type": "boolean"
      },
      "isFree": {
        "keyName": "isFree",
        "label": "Is free",
        "type": "boolean"
      },
      "isCorporate": {
        "keyName": "isCorporate",
        "label": "Is corporate",
        "type": "boolean"
      },
      "hasDomainNameMisspellings": {
        "keyName": "hasDomainNameMisspellings",
        "label": "Has domain name misspellings errors",
        "type": "boolean"
      }
    }'::json);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('989abbda-ade1-4d21-97c9-c46b13d824f0'::uuid, 'This is a general-purpose regex for a standard email address format.', 'Standard Email format', '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', 'REGEX', 'EMAIL', 'john.doe@example.com', 'EMAIL_FORMAT', NULL, NULL);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('513c6472-64f6-4011-a42a-a3748554cbbd'::uuid, NULL, 'US alternate format', '^(\+\d{1,2}\s?)?(\d{3}[-.\s]?){2}\d{4}$', 'REGEX', 'PHONE', '123-456-7890 or +1 123-456-7890', 'PHONE_FORMAT', NULL, NULL);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('a7b469e9-a339-4907-abb8-2dd62b47e044'::uuid, NULL, 'US standard format', '^(\+\d{1,2}\s?)?(\(\d{3}\)\s?)?\d{3}[-.\s]?\d{4}$', 'REGEX', 'PHONE', '(123) 456-7890 or +1 (123) 456-7890', 'PHONE_FORMAT', NULL, NULL);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('1c6f00c1-e5f8-4201-8457-7e1f676545fe'::uuid, NULL, 'US format without dashes or spaces', '^(\+\d{1,2}\s?)?\d{10}$', 'REGEX', 'PHONE', '1234567890 or +1 1234567890', 'PHONE_FORMAT', NULL, NULL);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('6b699ad4-e00d-4d6a-a635-8f2f079d4542'::uuid, NULL, 'Int format with country code', '^\+\d{2}\s?\d{3}[-.\s]?\d{4}[-.\s]?\d{4}$', 'REGEX', 'PHONE', '+44 20 1234 5678', 'PHONE_FORMAT', NULL, NULL);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('3cda3c20-401a-488b-8ec0-d35410dae34e'::uuid, NULL, 'UK standard format', '^(\+\d{1,2}\s?)?(\d{4}[-.\s]?){2}\d{3,4}$', 'REGEX', 'PHONE', '020 1234 5678 or +44 20 1234 5678', 'PHONE_FORMAT', NULL, NULL);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('8a8165db-d0ad-41ec-9e21-1266f1e5e179'::uuid, NULL, 'Australia standard format', '^(\+\d{1,2}\s?)?(\(\d{2}\)\s?)?\d{4}[-.\s]?\d{4}$', 'REGEX', 'PHONE', '(02) 1234-5678 or +61 (02) 1234-5678', 'PHONE_FORMAT', NULL, NULL);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('46f59d94-1889-430c-9b70-f54df6930cb6'::uuid, NULL, 'US dot-separated format', '^(\+\d{1,2}\s?)?(\d{3}[.-]?){2}\d{4}$', 'REGEX', 'PHONE', '123.456.7890 or +1 123.456.7890', 'PHONE_FORMAT', NULL, NULL);
    INSERT INTO public.validation_pattern (validation_pattern_id, description, "label", "expression", "type", data_type, example, category, service_name, return_value_schema) VALUES('f2b3cfca-dc6a-4d57-98ce-5699e8cd930c'::uuid, NULL, 'Int format with dashes', '^\+\d{2}[-.\s]?\d{2}[-.\s]?\d{4}[-.\s]?\d{4}$', 'REGEX', 'PHONE', '+33-01-2345-6789', 'PHONE_FORMAT', NULL, NULL); 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM public.validation_pattern;`);
  }
}
