import type { Metadata } from 'next';
import { login } from './actions';

export const metadata: Metadata = {
  title: 'Admin login',
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-[6vw]">
      <div className="w-full max-w-[380px]">
        <div className="text-center mb-[32px]">
          <div className="font-[var(--font-display)] font-bold text-[var(--ink)] text-[20px]">Quantyro Technologies</div>
          <div className="mt-[4px] text-[13px] text-[var(--muted)]">Admin panel</div>
        </div>

        <form action={login} className="rounded-[18px] bg-[var(--surface)] border border-[var(--line)] p-[28px] space-y-[16px]">
          {error && (
            <p className="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-[10px] px-[12px] py-[8px]">
              {error}
            </p>
          )}
          <div>
            <label htmlFor="email" className="block text-[12px] mono text-[var(--muted)] mb-[6px]">Email</label>
            <input
              id="email" name="email" type="email" required autoFocus
              className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[14px] py-[11px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-[12px] mono text-[var(--muted)] mb-[6px]">Password</label>
            <input
              id="password" name="password" type="password" required
              className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[14px] py-[11px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--ink)] text-white py-[12px] rounded-[10px] text-[14px] font-semibold hover:bg-[var(--accent)] transition-colors"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
