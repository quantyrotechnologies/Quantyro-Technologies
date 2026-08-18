import { createAdminClient } from '@/lib/supabase/admin';

type CommentPayload = {
  postId?: string;
  name?: string;
  email?: string;
  comment?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: CommentPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { postId, name, email, comment } = body;

  if (!postId?.trim() || !name?.trim() || !email?.trim() || !comment?.trim()) {
    return Response.json({ error: 'Name, email and a comment are required.' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return Response.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from('blog_comments').insert({
    post_id: postId.trim(),
    name: name.trim(),
    email: email.trim(),
    comment: comment.trim(),
  });

  if (error) {
    console.error('[blog-comments] failed to store comment', error);
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  return Response.json({ ok: true });
}
