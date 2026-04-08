import { isIciciDebugEnabled, readIciciDebugLogs, getIciciLogFilePath } from '@/lib/icici-debug';

export const dynamic = 'force-dynamic';

export default async function DebugPaymentPage() {
  const debugEnabled = isIciciDebugEnabled();
  const logs = debugEnabled ? await readIciciDebugLogs(100) : [];

  return (
    <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '8px' }}>ICICI Payment Debug</h1>
      <p style={{ marginBottom: '16px' }}>Debug enabled: <strong>{String(debugEnabled)}</strong></p>

      {!debugEnabled && (
        <p>Set <code>DEBUG_ICICI=true</code> in environment to view logs.</p>
      )}

      {debugEnabled && (
        <>
          <p style={{ marginBottom: '12px' }}>Log file: <code>{getIciciLogFilePath()}</code></p>
          <p style={{ marginBottom: '20px' }}>Entries: <strong>{logs.length}</strong></p>
          <pre style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            background: '#111827',
            color: '#f9fafb',
            padding: '16px',
            borderRadius: '12px',
            maxHeight: '70vh',
            overflow: 'auto'
          }}>
            {JSON.stringify(logs, null, 2)}
          </pre>
        </>
      )}
    </main>
  );
}
