import { actionObject } from '../../utils';
import { 
  CREATE_TEMPLATE, 
  GET_TEMPLATES, 
  GET_TEMPLATE, 
  UPDATE_TEMPLATE, 
  DELETE_TEMPLATE, 
  CLEAR_TEMPLATES_DATA 
} from './action-types';

// Create a new template
export const createTemplate = (body: any): any =>
  actionObject(CREATE_TEMPLATE, body);

// Fetch all templates
export const getTemplates = (payload: any): any =>
  actionObject(GET_TEMPLATES, payload);

// Fetch a single template by ID
export const getTemplate = (payload: any): any =>
  actionObject(GET_TEMPLATE, payload);

// Update an existing template
export const updateTemplate = (body: any): any =>
  actionObject(UPDATE_TEMPLATE, body);

// Delete a template by ID
export const deleteTemplate = (payload: any): any =>
  actionObject(DELETE_TEMPLATE, payload);

// Clear all template data
export const clearTemplatesData = (): any =>
  actionObject(CLEAR_TEMPLATES_DATA);
