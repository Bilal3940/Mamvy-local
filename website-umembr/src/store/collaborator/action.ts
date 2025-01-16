import { actionObject } from "@/utils";
import { CLEAR_COLLABORATORS, COLLABORATOR_GET, GUEST_INVITED, INVITE_ACCEPTED, INVITE_COLLABORATOR, REMOVE_COLLABORATOR, REMOVE_COLLABORATOR_NOREGISTER, UPDATE_COLLABORATOR } from "./action-types";

export const inviteCollaborator = (payload: any) => actionObject(INVITE_COLLABORATOR, payload);
export const setGuest = (payload: any) => actionObject(GUEST_INVITED, payload);
export const inviteAccepted = (payload: any) => actionObject(INVITE_ACCEPTED, payload);
export const removeCollaborator = (payload: any) => actionObject(REMOVE_COLLABORATOR, payload);
export const getCollaboratorStory = (payload: any) => actionObject(COLLABORATOR_GET, payload);
export const removeCollaboratorNoRegister = (payload: any) => actionObject(REMOVE_COLLABORATOR_NOREGISTER, payload);
export const clearCollaborators = ()=>actionObject(CLEAR_COLLABORATORS);
export const updateCollaborator = (payload: any) => actionObject(UPDATE_COLLABORATOR, payload);
