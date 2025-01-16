import { COLLABORATOR_GET_ASYNC,CLEAR_COLLABORATORS, GUEST_INVITED, INVITE_ACCEPTED_ASYNC, UPDATE_COLLABORATOR_ASYNC } from './action-types';

const initialState = {
  guest: false,
  type : '',
  collaborators: [],
  roleUser: '',
  actionSuccessColab: false
};

const collaborator = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case GUEST_INVITED:
      return { ...state, guest: true, type: payload };
    case INVITE_ACCEPTED_ASYNC:
      return { ...state, roleUser: payload };
    case COLLABORATOR_GET_ASYNC:
      return { ...state, actionSuccessColab: true, collaborators: payload };
    case UPDATE_COLLABORATOR_ASYNC:
      // Ensure state.collaborators is an array
      if (!Array.isArray(state.collaborators)) {
        console.error('collaborators is not an array:', state.collaborators);
        return state;
      }

      // Use updated collaborators
      const updatedCollaborators = payload.updatedCollaborators || [];
      return {
        ...state,
        actionSuccessColab: true,
        collaborators: state.collaborators.map((colab: any) =>
          updatedCollaborators.find((updated: any) => updated.id === colab.id)
            ? { ...colab, ...updatedCollaborators.find((updated: any) => updated.id === colab.id) }
            : colab
        ),
      };
    case CLEAR_COLLABORATORS:
      return { ...initialState };
    default:
      return state;
  }
};


export default collaborator;
