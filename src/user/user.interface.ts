export interface UserDoc {
  name: string;
  lastname: string;
  age: number;
  agenda: AgendaDoc[];
}

export interface AgendaDoc {
  name: string;
  lastname: string;
  phone: string;
  type: string;
  internationalCallingCode: string;
  location: string;
  country: string;
  isMobile: boolean;
  prefix: string;
}

export interface PhoneRawData {
  type: string;
  valid: boolean;
  ['international-calling-code']: string;
  location: string;
  country: string;
  ['is-Mobile']: boolean;
  ['prefix-network']: string;
}
