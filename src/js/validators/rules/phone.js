export const phone = (phoneNumber) => {
  const rawPhoneNumber = phoneNumber.replace(/\D/g, "");

  return rawPhoneNumber.length === 11 && !/^(\d)\1{10}$/.test(rawPhoneNumber);
};
