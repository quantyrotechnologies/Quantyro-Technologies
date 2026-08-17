// TODO: this handler only validates and logs the submission — no email/CRM
// provider is wired up yet. Connect a real provider (e.g. Resend, SendGrid,
// or a CRM webhook) before launch, or contact form submissions will be lost.

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
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

  const { name, email, company, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json({ error: 'Name, email and message are required.' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return Response.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  console.log('[contact] new submission', { name, email, company, message });

  return Response.json({ ok: true });
}
