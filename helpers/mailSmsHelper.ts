import { expect } from '@playwright/test';

// Example using Mailosaur (can be switched to MailSlurp or other providers)
import MailosaurClient from 'mailosaur';
const mailosaur = new MailosaurClient(process.env.MAILOSAUR_API_KEY || '');
const serverId = process.env.MAILOSAUR_SERVER_ID || '';

export async function waitForEmail(toAddress: string, subjectContains: string) {
  const email = await mailosaur.messages.get(serverId, {
    sentTo: toAddress,
    subject: subjectContains,
  });
  expect(email).toBeDefined();
  return email;
}

// Example usage:
// const email = await waitForEmail('test@example.mailosaur.net', 'Verification Code');

// ---- SMS via Twilio ----

import twilio from 'twilio';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function getLatestSms(toNumber: string): Promise<string> {
  const messages = await twilioClient.messages.list({
    to: toNumber,
    limit: 1,
  });
  expect(messages.length).toBeGreaterThan(0);
  return messages[0].body;
}

// Example usage:
// const sms = await getLatestSms('+15555555555');
