import { SET_STEP } from './action-types';
import { actionObject } from '@/utils';

export const setStep = (step: any) => actionObject(SET_STEP, { step });
