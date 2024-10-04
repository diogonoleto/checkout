import {
  isValidCPF,
  isValidCNPJ,
  isValidPhone,
  isValidCEP,
} from '@brazilian-utils/brazilian-utils';

export const cpf = (value) => isValidCPF(value);
export const cnpj = (value) => isValidCNPJ(value);
export const cnpjCpf = (value) =>
  isValidCPF(value) || isValidCNPJ(value);
export const phone = (value) => isValidPhone(value);
export const zipCode = (value) => isValidCEP(value);
