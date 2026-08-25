import { createAdminClient } from '@/lib/supabase/admin';

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  /** Which page the inquiry came from, e.g. "Service: Website Development — Delhi". */
  source?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, phone, company, message, source } = body;

  if (!name?.trim() || !email?.trim()) {
    return Response.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return Response.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  const fullMessage = [
    phone ? `Phone / WhatsApp: ${phone.trim()}` : null,
    message?.trim() || null,
  ].filter(Boolean).join('\n\n');

  const supabase = createAdminClient();
  const { error } = await supabase.from('contact_submissions').insert({
    name: name.trim(),
    email: email.trim(),
    company: company?.trim() || null,
    message: fullMessage || null,
    source: source?.trim() || null,
  });

  if (error) {
    console.error('[contact] failed to store submission', error);
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  return Response.json({ ok: true });
}
