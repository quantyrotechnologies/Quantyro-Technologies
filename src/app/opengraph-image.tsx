import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Quantyro Technologies — Engineering the Future';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const logoData = await readFile(join(process.cwd(), 'public/images/logo.jpeg'), 'base64');
const logoSrc = `data:image/jpeg;base64,${logoData}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#0A172F',
          backgroundImage: 'radial-gradient(circle at 82% 18%, rgba(23,104,214,0.35) 0%, rgba(10,23,47,0) 55%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            width={72}
            height={72}
            style={{ borderRadius: '18px' }}
          />
          <span style={{ fontSize: 34, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
            Quantyro Technologies
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '980px' }}>
          <span style={{ fontSize: 60, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.15, letterSpacing: '-1.5px' }}>
            Engineering the Future
          </span>
          <span style={{ fontSize: 26, color: '#AEBBD4', lineHeight: 1.4 }}>
            Global software engineering partner for web, mobile, AI, cloud and e-commerce products.
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '48px', height: '5px', borderRadius: '3px', background: '#1768D6', display: 'flex' }} />
          <div style={{ width: '20px', height: '5px', borderRadius: '3px', background: '#0EBCD4', display: 'flex' }} />
          <span style={{ fontSize: 20, color: '#7C8AA5', marginLeft: '8px' }}>quantyrotechnologies.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
