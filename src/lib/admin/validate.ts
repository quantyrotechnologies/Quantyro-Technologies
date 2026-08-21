import type { ResourceConfig } from './resources';

/**
 * Coerces + validates a raw request body against a resource's field config.
 * Returns only known, writable fields (readOnly fields are stripped —
 * clients can't overwrite e.g. contact_submissions.email via PATCH).
 */
export function validateResourcePayload(
  config: ResourceConfig,
  body: Record<string, unknown>
): { data: Record<string, unknown> } | { errors: string[] } {
  const errors: string[] = [];
  const data: Record<string, unknown> = {};

  for (const field of config.fields) {
    if (field.readOnly) continue;
    const raw = body[field.name];

    if (raw === undefined || raw === null || raw === '') {
      if (field.required) errors.push(`${field.label} is required`);
      continue;
    }

    switch (field.type) {
      case 'number': {
        const n = Number(raw);
        if (Number.isNaN(n)) {
          errors.push(`${field.label} must be a number`);
        } else {
          data[field.name] = n;
        }
        break;
      }
      case 'boolean':
        data[field.name] = Boolean(raw);
        break;
      case 'string-array':
        if (!Array.isArray(raw)) {
          errors.push(`${field.label} must be a list`);
        } else {
          data[field.name] = raw.filter((v): v is string => typeof v === 'string' && v.trim() !== '');
        }
        break;
      case 'relation-multi':
        if (!Array.isArray(raw)) {
          errors.push(`${field.label} must be a list`);
        } else {
          data[field.name] = raw.filter((v): v is string => typeof v === 'string' && v.trim() !== '');
        }
        break;
      case 'select':
        if (field.options && !field.options.some((o) => o.value === raw)) {
          errors.push(`${field.label} has an invalid value`);
        } else {
          data[field.name] = raw;
        }
        break;
      case 'json':
        try {
          data[field.name] = JSON.parse(String(raw));
        } catch {
          errors.push(`${field.label} is not valid JSON`);
        }
        break;
      default:
        data[field.name] = String(raw);
    }
  }

  if (errors.length > 0) return { errors };
  return { data };
}
