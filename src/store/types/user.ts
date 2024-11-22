export interface Address {
  street: string;
  number: number;
  zipCode: string;
  city: string;
  province: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  address: Address[]; // Debería ser un array de direcciones
  birthday: string;
  points: number;
  cuponizate: boolean;
  avatar: string;
  gender: string;
  cuil: string | number;
  bank: string;
  paymentDate: string;
  create: string;
  last_login: string;
}

