import { call, put, select, takeLatest } from "redux-saga/effects";
import { actionObject, showDialog } from "../../utils/common";


import {
  GET_TEMPLATES,
  GET_TEMPLATES_ASYNC,
  GET_TEMPLATE,
  GET_TEMPLATE_ASYNC,
  CREATE_TEMPLATE,
  CREATE_TEMPLATE_ASYNC,
  UPDATE_TEMPLATE,
  UPDATE_TEMPLATE_ASYNC,
  DELETE_TEMPLATE,
  DELETE_TEMPLATE_ASYNC,
} from "./action-types";
import { authSelector } from "../selectors";
import { FetchService } from "@/utils";

// Worker Saga: Get all templates
function* getTemplatesAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    let url = `/tempconfig/all?page=${payload.page + 1}&pageSize=${payload.pageSize}`;
    if (payload.search) url += `&search=${payload.search}`;
    const { result } = yield call(FetchService, url, "GET", "", user?.token);
    if (result) {
      yield put(actionObject(GET_TEMPLATES_ASYNC, result));
    }
  } catch (error: any) {
    const message = error?.message?.includes("error")
      ? JSON.parse(error.message)?.error
      : error.message;
    yield call(showDialog, message, "error");
  }
}

// Worker Saga: Get a template by ID
function* getTemplateAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    const url = `/tempconfig/${payload}`;
    const { result } = yield call(FetchService, url, "GET", "", user?.token);
    if (result) yield put(actionObject(GET_TEMPLATE_ASYNC, result));
  } catch (error: any) {
    const message = error?.message?.includes("error")
      ? JSON.parse(error.message)?.error
      : error.message;
    yield call(showDialog, message, "error");
  }
}

// Worker Saga: Create a new template
function* createTemplateAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    const url = `/tempconfig/create`;
    const { result } = yield call(FetchService, url, "POST", payload, user?.token);
    if (result) {
      yield put(actionObject(CREATE_TEMPLATE_ASYNC, result));
      yield call(showDialog, `Template created successfully`, "success");
    }
  } catch (error: any) {
    const message = error?.message?.includes("error")
      ? JSON.parse(error.message)?.error
      : error.message;
    yield call(showDialog, message, "error");
  }
}

// Worker Saga: Update an existing template
function* updateTemplateAsync({ payload }: any): any {
  try {
    const { user } = yield select(authSelector);
    const url = `/tempconfig/update`;
    const { result } = yield call(FetchService, url, "PUT", payload, user?.token);
    if (result) {
      yield put(actionObject(UPDATE_TEMPLATE_ASYNC, result));
      yield call(showDialog, `Template updated successfully`, "success");
    }
  } catch (error: any) {
    const message = error?.message?.includes("error")
      ? JSON.parse(error.message)?.error
      : error.message;
    yield call(showDialog, message, "error");
  }
}

// Worker Saga: Delete a template
function* deleteTemplateAsync({ payload }: any): any {
  try {
    const url = `/tempconfig/${payload}`;
    yield call(FetchService, url, "DELETE");
    yield put(actionObject(DELETE_TEMPLATE_ASYNC, payload));
    yield call(showDialog, `Template deleted successfully`, "success");
  } catch (error: any) {
    const message = error?.message?.includes("error")
      ? JSON.parse(error.message)?.error
      : error.message;
    yield call(showDialog, message, "error");
  }
}

// Watcher Sagas
export function* watchGetTemplates() {
  yield takeLatest(GET_TEMPLATES, getTemplatesAsync);
}

export function* watchGetTemplate() {
  yield takeLatest(GET_TEMPLATE, getTemplateAsync);
}

export function* watchCreateTemplate() {
  yield takeLatest(CREATE_TEMPLATE, createTemplateAsync);
}

export function* watchUpdateTemplate() {
  yield takeLatest(UPDATE_TEMPLATE, updateTemplateAsync);
}

export function* watchDeleteTemplate() {
  yield takeLatest(DELETE_TEMPLATE, deleteTemplateAsync);
}

// Combine Sagas
export const templatesSagas = [
  watchGetTemplates,
  watchGetTemplate,
  watchCreateTemplate,
  watchUpdateTemplate,
  watchDeleteTemplate,
];
