'use server';

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required' };
  }

  try {
    const response = await fetch('http://localhost:3001/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    if (!response.ok) throw new Error('Failed to submit');
    
    return { success: true };
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    return { success: false, error: 'Failed to submit form' };
  }
}
