interface SendAuthKeyOtpParms {
  countryCode?: string;
  phone: string;
  otp: string;
}

export const sendSms = async ({
  countryCode = "91",
  phone,
  otp,
}: SendAuthKeyOtpParms) => {
  const AuthKey = process.env.AUTHKEY_API_KEY;
};
