CREATE TABLE IF NOT EXISTS patient_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_initial TEXT NOT NULL,
  last_name TEXT NOT NULL,
  previous_job_ids TEXT NOT NULL,
  current_job_id TEXT NOT NULL UNIQUE,
  rx TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
