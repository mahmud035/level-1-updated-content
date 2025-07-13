import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse.js';
import { VisaService } from './visa.services.js';

const getVisas = async (req, res, next) => {
  const visas = await VisaService.getVisas();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Visas retrieved successfully',
    data: visas,
  });
};

export const VisaController = {
  getVisas,
};
