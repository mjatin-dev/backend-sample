export type Migration = {
  user_id: string;
  tenant_id: string;
  data_source_id: string;
  status: string;
  status_date: string;
  synced_at: string;
  data_migration_id: string;
  detail: { [key: string]: any };
};
