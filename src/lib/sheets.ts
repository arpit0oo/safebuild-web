const WEBHOOK_URL = import.meta.env.SHEETS_WEBHOOK_URL;

export async function submitEnquiry(data: {
  name: string;
  company?: string;
  email: string;
  phone: string;
  message: string;
  source?: string;
}) {
  await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'enquiry', ...data }),
    redirect: 'follow',
  });
  // Apps Script always returns 302 → don't check res.ok
}

export async function submitQuote(data: {
  name: string;
  company: string;
  email: string;
  phone: string;
  productInterest: string;
  capacity: string;
  span: string;
  liftHeight: string;
  additionalNotes: string;
}) {
  await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'quote', ...data }),
    redirect: 'follow',
  });
  // Apps Script always returns 302 → don't check res.ok
}
