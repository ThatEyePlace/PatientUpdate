import { writeFile } from "node:fs/promises";

const siteUrl = process.env.LEGACY_SITE_URL;
const pin = process.env.LEGACY_PIN;
if (!siteUrl || !pin) throw new Error("LEGACY_SITE_URL and LEGACY_PIN are required");

const login = await fetch(new URL("/api/login", siteUrl), {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ pin }),
});
if (!login.ok) throw new Error(`Legacy login failed (${login.status})`);

const cookie = login.headers.get("set-cookie")?.split(";", 1)[0];
if (!cookie) throw new Error("Legacy login did not return an authentication cookie");

const response = await fetch(new URL("/api/records", siteUrl), { headers: { cookie } });
if (!response.ok) throw new Error(`Legacy record export failed (${response.status})`);

const records = await response.json();
if (!Array.isArray(records)) throw new Error("Legacy record export returned an unexpected response");

const sqlValue = (value) => {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return String(value);
  return `'${String(value).replaceAll("'", "''")}'`;
};

const statements = ["BEGIN TRANSACTION;"];
for (const record of records) {
  statements.push(
    `INSERT OR IGNORE INTO patient_records (id,first_initial,last_name,previous_job_ids,current_job_id,rx,created_at,updated_at) VALUES (${[
      record.id,
      record.firstInitial,
      record.lastName,
      JSON.stringify(record.previousJobIds ?? []),
      record.currentJobId,
      JSON.stringify(record.rx ?? {}),
      record.createdAt,
      record.updatedAt,
    ].map(sqlValue).join(",")});`,
  );
}
statements.push("COMMIT;");

await writeFile("legacy-migration.sql", `${statements.join("\n")}\n`, "utf8");
console.log(`Prepared ${records.length} live PatientUpdate records for migration.`);
