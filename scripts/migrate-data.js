const { createClient } = require('@supabase/supabase-js');

const OLD_URL = process.env.OLD_SUPABASE_URL || 'https://soclkwfudtzeluevhhwk.supabase.co';
const OLD_KEY = process.env.OLD_SUPABASE_KEY;

const NEW_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pcjmvejaqqeuevxcvmtq.supabase.co';
const NEW_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!OLD_KEY || !NEW_KEY) {
  console.error('Please provide OLD_SUPABASE_KEY and SUPABASE_SERVICE_ROLE_KEY environment variables.');
  process.exit(1);
}

const oldSb = createClient(OLD_URL, OLD_KEY);
const newSb = createClient(NEW_URL, NEW_KEY);

const TABLES = [
  'site_settings',
  'services',
  'industries',
  'projects',
  'testimonials',
  'faqs',
  'stats',
  'offices',
  'social_links',
  'certifications',
  'location_pages',
  'tech_stack_pages',
  'industry_solution_pages',
  'industry_applications',
];

async function migrate() {
  console.log('Starting data migration from old to new Supabase...');
  for (const table of TABLES) {
    try {
      const { data, error } = await oldSb.from(table).select('*');
      if (error) {
        console.warn(`Could not read from ${table}:`, error.message);
        continue;
      }
      if (!data || data.length === 0) {
        console.log(`Table ${table} is empty, skipping.`);
        continue;
      }
      console.log(`Migrating ${data.length} rows for table: ${table}...`);

      for (let i = 0; i < data.length; i += 50) {
        const batch = data.slice(i, i + 50);
        const { error: insertError } = await newSb.from(table).upsert(batch, { onConflict: 'id' });
        if (insertError) {
          console.error(`Error inserting into ${table} (batch ${i}):`, insertError.message);
        }
      }
      console.log(`✓ ${table} migrated successfully.`);
    } catch (err) {
      console.error(`Failed migrating ${table}:`, err);
    }
  }
  console.log('Migration process finished!');
}

migrate();
