export const CONTACT_TO_EMAIL = 'lehotechteam@gmail.com';
export const CONTACT_FROM_EMAIL = 'onboarding@resend.dev';

export type ContactFormValues = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export function createContactEmail({ name, email, phone, message }: ContactFormValues) {
  const cleanedName = name.trim();
  const cleanedEmail = email.trim();
  const cleanedPhone = phone?.trim() || 'Not provided';
  const cleanedMessage = message.trim();

  const subject = `New message from ${cleanedName} via LEHO contact form`;
  const text = [
    `Name: ${cleanedName}`,
    `Email: ${cleanedEmail}`,
    `Phone: ${cleanedPhone}`,
    'Message:',
    cleanedMessage,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #202522;">
      <h2 style="margin-bottom: 16px; color: #294c3d;">New message from ${cleanedName}</h2>
      <p><strong>Name:</strong> ${cleanedName}</p>
      <p><strong>Email:</strong> ${cleanedEmail}</p>
      <p><strong>Phone:</strong> ${cleanedPhone}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap; margin: 0;">${cleanedMessage.replace(/\n/g, '<br />')}</p>
    </div>
  `;

  return {
    subject,
    text,
    html,
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    replyTo: cleanedEmail,
  };
}
