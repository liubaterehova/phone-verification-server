export const createServiceSid = async (client) => {
  const { sid: serviceSid } = await client.verify.services.create({ friendlyName: 'My Verify Service' });

  return serviceSid;
};
