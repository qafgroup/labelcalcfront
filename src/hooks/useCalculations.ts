import { useEffect } from 'react';
import { calculatePriceByRollLength } from '../config/pricingConfig';
import { MACHINE_CONFIG } from '../config/index';

export const useCalculations = (
  length: string,
  width: string,
  quantity: string,
  gaping: string,
  rollWidth: string,
  shape: string,
  cornerType: string,
  printType: string,
  designCount: string,
  material: string,
  hasLamination: boolean,
  hasEmbossing: boolean,
  embossingColor: string,
  hasSilkScreen: boolean,
  hasSpotUV: boolean,
  assembly: string,
  customerName: string,
  customerNumber: string,
  salesRep: string,
  salesRepPhone: string,
  onPriceUpdate: (data: {
    subtotal: number;
    tax: number;
    total: number;
    unitPrice: number;
    MatCost: number;
  }) => void,
  onRollDataUpdate: (data: {
    requiredLengthMeters: number;
    stickersPerMeter: number;
    requiredAreaM2: number;
    stickersAcrossWidth: number;
  }) => void,
  onFormValidityUpdate: (isValid: boolean) => void,
  validateForm: () => string[]
) => {
  useEffect(() => {
    const result = calculatePriceByRollLength({
      length: parseFloat(length) || 0,
      width: parseFloat(width) || 0,
      quantity: parseInt(quantity) || 0,
      shape,
      cornerType,
      printType,
      designCount: parseInt(designCount) || 1,
      material,
      hasLamination,
      hasEmbossing,
      embossingColor,
      hasSilkScreen,
      hasSpotUV,
      assembly,
      gaping: parseFloat(gaping) || 0,
      rollWidth: parseFloat(rollWidth) || MACHINE_CONFIG.rollWidth,
    });

    if ('rollInfo' in result) {
      onPriceUpdate({
        subtotal: result.subtotal || 0,
        tax: result.tax || 0,
        total: result.total || 0,
        unitPrice: result.unitPrice || 0,
        MatCost: result.materialCost || 0,
      });

      onRollDataUpdate({
        requiredLengthMeters: result.rollInfo.requiredLengthMeters || 0,
        stickersPerMeter: result.rollInfo.stickersPerMeter || 0,
        requiredAreaM2: result.rollInfo.requiredAreaM2 || 0,
        stickersAcrossWidth: result.rollInfo.stickersPerRowAcrossRoll || 0,
      });
    } else {
      onPriceUpdate({
        subtotal: 0,
        tax: 0,
        total: 0,
        unitPrice: 0,
        MatCost: 0,
      });
      onRollDataUpdate({
        requiredLengthMeters: 0,
        stickersPerMeter: 0,
        requiredAreaM2: 0,
        stickersAcrossWidth: 0,
      });
    }

    const errors = validateForm();
    onFormValidityUpdate(errors.length === 0 && (result.total || 0) > 0);

  }, [
    length, width, quantity, gaping, rollWidth, shape, cornerType, printType, designCount,
    material, hasLamination, hasEmbossing, embossingColor, hasSilkScreen,
    hasSpotUV, assembly, customerName, customerNumber, salesRep, salesRepPhone,
    onPriceUpdate, onRollDataUpdate, validateForm, onFormValidityUpdate
  ]);
};
