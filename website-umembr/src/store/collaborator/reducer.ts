import { COLLABORATOR_GET_ASYNC, GUEST_INVITED, INVITE_ACCEPTED_ASYNC } from './action-types';

const initialState = {
  guest: false,
  type : '',
  collaborators: [],
  roleUser: ''
};

const collaborator = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case GUEST_INVITED:
      return { ...state, guest: true , type : payload };
    case INVITE_ACCEPTED_ASYNC:
      return { ...state, roleUser: payload };
    case COLLABORATOR_GET_ASYNC:
      return { ...state, collaborators: payload };
    default:
      return state;
  }
};

export default collaborator;