import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load .env
const envPath = path.resolve('.env');
let supabaseUrl = '';
let supabaseAnonKey = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('VITE_SUPABASE_URL=')) {
      supabaseUrl = trimmed.split('=')[1].trim();
    }
    if (trimmed.startsWith('VITE_SUPABASE_ANON_KEY=')) {
      supabaseAnonKey = trimmed.split('=')[1].trim();
    }
  }
}

async function runTests() {
  console.log('====================================================');
  console.log('🧪 RUNNING TEDDYPUPS UAE END-TO-END VERIFICATION');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // Test 1: Env configuration
  assert(Boolean(supabaseUrl && supabaseUrl.startsWith('https://')), 'Supabase URL configured in .env');
  assert(Boolean(supabaseAnonKey && supabaseAnonKey.length > 20), 'Supabase Anon Key configured in .env');

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Test 2: Puppies Table
  try {
    const { data: puppies, error: pupErr } = await supabase.from('puppies').select('*');
    assert(!pupErr && puppies && puppies.length >= 30, `Live Puppies Table: fetched ${puppies?.length || 0} puppies`);
    
    // Test slug uniqueness
    const slugs = puppies.map(p => p.slug);
    const uniqueSlugs = new Set(slugs);
    assert(slugs.length === uniqueSlugs.size, `Puppy slugs are strictly unique (${uniqueSlugs.size}/${slugs.length})`);
  } catch (e) {
    assert(false, `Puppies query exception: ${e.message}`);
  }

  // Test 3: Happy Families Table
  try {
    const { data: families, error: famErr } = await supabase.from('happy_families').select('*');
    assert(!famErr && families && families.length >= 64, `Live Happy Families Table: fetched ${families?.length || 0} family moments`);
  } catch (e) {
    assert(false, `Happy Families query exception: ${e.message}`);
  }

  // Test 4: Storage Bucket 'media'
  try {
    const testFile = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
    const testPath = `verify/test-${Date.now()}.png`;
    const { data: uploadData, error: upErr } = await supabase.storage.from('media').upload(testPath, testFile, {
      contentType: 'image/png',
      upsert: true
    });
    assert(!upErr && uploadData?.path, 'Supabase Storage upload to media bucket');

    const { data: pubUrlData } = supabase.storage.from('media').getPublicUrl(testPath);
    const res = await fetch(pubUrlData.publicUrl);
    assert(res.status === 200, `Storage Public URL reachable (HTTP ${res.status})`);
  } catch (e) {
    assert(false, `Storage test exception: ${e.message}`);
  }

  // Test 5: Edge Function handle-enquiry
  try {
    const { data: edgeData, error: edgeErr } = await supabase.functions.invoke('handle-enquiry', {
      body: {
        name: 'Automated Test Runner',
        phone: '+971 50 000 0000',
        message: 'System verification check',
        puppy_name: 'Max'
      }
    });
    assert(!edgeErr && edgeData?.success === true, 'Supabase Edge Function handle-enquiry invocation');
  } catch (e) {
    assert(false, `Edge Function invocation exception: ${e.message}`);
  }

  // Test 6: Enquiries Table persistence
  try {
    const { data: enqs, error: enqErr } = await supabase.from('enquiries').select('*');
    assert(!enqErr && enqs && enqs.length > 0, `Live Enquiries Table contains records (${enqs?.length || 0})`);
  } catch (e) {
    assert(false, `Enquiries query exception: ${e.message}`);
  }

  // Test 7: Production Build Files & Vercel Config
  const distHtml = path.resolve('dist/index.html');
  const vercelJson = path.resolve('vercel.json');
  assert(fs.existsSync(distHtml), 'Production build artifact dist/index.html exists');
  assert(fs.existsSync(vercelJson), 'Vercel configuration vercel.json exists');

  console.log('\n====================================================');
  console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) process.exit(1);
}

runTests();
