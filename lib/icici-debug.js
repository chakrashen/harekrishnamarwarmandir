import fs from 'fs';
import path from 'path';

const LOG_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'icici-debug.jsonl');

export function isIciciDebugEnabled() {
  return process.env.DEBUG_ICICI === 'true' || process.env.DEBUG_ICICI === '1';
}

export function writeIciciDebugLog(event, data = {}) {
  if (!isIciciDebugEnabled()) return;

  const entry = {
    ts: new Date().toISOString(),
    event,
    data,
  };

  try {
    fs.mkdirSync(LOG_DIR, { recursive: true });
    fs.appendFileSync(LOG_FILE, `${JSON.stringify(entry)}\n`, 'utf8');
  } catch (error) {
    console.error('[ICICI][debug] failed to persist debug log', error?.message || error);
  }
}

export async function readIciciDebugLogs(limit = 100) {
  if (!isIciciDebugEnabled()) return [];

  try {
    const content = await fs.promises.readFile(LOG_FILE, 'utf8');
    const lines = content.split(/\r?\n/).filter(Boolean);
    const rows = lines
      .slice(-Math.max(1, Math.min(limit, 500)))
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    return rows.reverse();
  } catch {
    return [];
  }
}

export function getIciciLogFilePath() {
  return LOG_FILE;
}
