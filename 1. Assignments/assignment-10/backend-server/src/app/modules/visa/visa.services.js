import { visas } from '../../../server.js';

const getVisas = async () => {
  const query = {};
  const result = await visas.find(query).toArray();
  return result;
};

export const VisaService = {
  getVisas,
};
