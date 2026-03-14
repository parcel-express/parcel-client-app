// Georgian postal code format: 4 digits (0100-9999)
export const isValidPostalCode = (code: string): boolean => {
  return /^\d{4}$/.test(code) && parseInt(code) >= 100;
};

// Georgian city names
export const GEORGIAN_CITIES = [
  { ka: 'თბილისი', en: 'Tbilisi', postalPrefix: '01' },
  { ka: 'ბათუმი', en: 'Batumi', postalPrefix: '64' },
  { ka: 'ქუთაისი', en: 'Kutaisi', postalPrefix: '44' },
  { ka: 'რუსთავი', en: 'Rustavi', postalPrefix: '37' },
  { ka: 'გორი', en: 'Gori', postalPrefix: '14' },
  { ka: 'ზუგდიდი', en: 'Zugdidi', postalPrefix: '21' },
  { ka: 'ფოთი', en: 'Poti', postalPrefix: '48' },
  { ka: 'სამტრედია', en: 'Samtredia', postalPrefix: '47' },
  { ka: 'ხაშური', en: 'Khashuri', postalPrefix: '16' },
  { ka: 'სენაკი', en: 'Senaki', postalPrefix: '32' },
  { ka: 'ოზურგეთი', en: 'Ozurgeti', postalPrefix: '35' },
  { ka: 'თელავი', en: 'Telavi', postalPrefix: '22' },
];

export const validateStreetAddress = (address: string) => {
  if (!address || address.trim().length < 3) {
    return { isValid: false, error: 'address.tooShort' };
  }

  const hasGeorgian = /[\u10A0-\u10FF]/.test(address);

  if (!hasGeorgian) {
    return { isValid: false, error: 'address.mustBeGeorgian' };
  }

  return { isValid: true };
};

export type AddressValidationResult = {
  isValid: boolean;
  errors: Record<string, string>;
};

export const validateAddress = (address: {
  street?: string;
  city?: string;
  postalCode?: string;
}): AddressValidationResult => {
  const errors: Record<string, string> = {};

  const streetResult = validateStreetAddress(address.street || '');

  if (!streetResult.isValid) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    errors.street = streetResult.error!;
  }

  if (!address.city) {
    errors.city = 'address.cityRequired';
  } else {
    const cityExists = GEORGIAN_CITIES.some(
      c => c.ka === address.city || c.en.toLowerCase() === address.city?.toLowerCase()
    );

    if (!cityExists) errors.city = 'address.unknownCity';
  }

  if (address.postalCode && !isValidPostalCode(address.postalCode)) {
    errors.postalCode = 'address.invalidPostalCode';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
