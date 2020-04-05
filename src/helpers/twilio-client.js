import twilio from 'twilio';
import fs from 'fs';

const createTwilioClient = () => {
  const { accountSid, authToken } = JSON.parse(fs.readFileSync('twilio.config.json').toString());

  return twilio(accountSid, authToken);
};

export const twilioClient = createTwilioClient();
