CREATE TABLE `patient_records` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_initial` text NOT NULL,
	`last_name` text NOT NULL,
	`previous_job_ids` text NOT NULL,
	`current_job_id` text NOT NULL,
	`rx` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `patient_records_current_job_id_unique` ON `patient_records` (`current_job_id`);