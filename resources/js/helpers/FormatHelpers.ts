export const ZipCodeFormat = (v: string) =>
  v.replace(/^(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
export const CnpjFormat = (v: string) =>
  v.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
export const CpfFormat = (v: string) =>
  v.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
export const PhoneFormat = (v: string) =>
  v.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') || v;
export const currencyFormat = (v: number) => {
  if (!v) return v;
  if (typeof v == 'string') v = parseFloat(v);
  return v.toLocaleString('pt-br', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
export const ParseNumber = (v: string) =>
  parseFloat(
    v.toString().replace('R$ ', '').replace('.', '').replace(',', '.')
  );
export const CpfCnpjFomat = (v: string) =>
  v ? (v.length == 11 ? CpfFormat(v) : CnpjFormat(v)) : null;

