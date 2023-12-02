export const formatMobileNumber = (number: string): string => {
  const phoneNumberWithoutPlus: string = number.replace(/\D/g, '');
  let phoneNumber: string;
  const firstSymbol: number = +phoneNumberWithoutPlus[0];
  console.log(number, phoneNumberWithoutPlus, firstSymbol);
  if (firstSymbol === 8 && phoneNumberWithoutPlus.length === 11) {
    phoneNumber = '+7' + phoneNumberWithoutPlus.slice(1);
  } else {
    phoneNumber = '+' + phoneNumberWithoutPlus;
  }

  console.log(phoneNumber);

  return phoneNumber;
};
