const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
const ACCESS_KEY = import.meta.env.WEB3FORMS_KEY;

export async function submitEnquiry(data: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
}) {
  const payload = {
    access_key: ACCESS_KEY,
    subject: '🔔 New Enquiry — Safe Build Engineering',
    from_name: 'Safe Build Engineering Website',
    name: data.name,
    company: data.company || '',
    email: data.email,
    phone: data.phone || '',
    message: data.message,
    source: data.source || 'contact-form',
  };

  fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload),
    redirect: 'follow',
  });
}

export async function submitQuote(data: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  productInterest?: string;
  capacity?: string;
  span?: string;
  liftHeight?: string;
  additionalNotes?: string;
}) {
  const payload = {
    access_key: ACCESS_KEY,
    subject: '🔔 New Quote Request — Safe Build Engineering',
    from_name: 'Safe Build Engineering Website',
    name: data.name,
    company: data.company || '',
    email: data.email,
    phone: data.phone || '',
    product_interest: data.productInterest || '',
    capacity: data.capacity || '',
    span: data.span || '',
    lift_height: data.liftHeight || '',
    additional_notes: data.additionalNotes || '',
  };

  fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload),
    redirect: 'follow',
  });
}
