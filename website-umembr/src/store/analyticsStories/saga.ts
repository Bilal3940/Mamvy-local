// src/store/analyticsStories/saga.ts
import { call, takeLatest } from 'redux-saga/effects';
import { CREATE_MEMORY_ACTION_G, CREATE_MEMORY_VIEW_G, CREATE_STORY_ACTION_G, CREATE_STORY_VIEW_G, DELETE_MEMORY_ACTION_G, DELETE_MEMORY_VIEW_G, DELETE_STORY_ACTION_G, DELETE_STORY_VIEW_G, FILTER_STORY_ACTION_G, UPDATE_MEMORY_ACTION_G, UPDATE_MEMORY_VIEW_G, UPDATE_STORY_ACTION_G, UPDATE_STORY_VIEW_G, VIEW_MEMORY_G, VIEW_STORY_G } from './action-types';
import { sendEvent } from '@/utils/analytics';

function* handleViewStoryG({ payload }: any): any {
  const { story} = payload;
  yield call(sendEvent, {
    event: 'view_story',
    category: 'Story Management',
    action: 'View Story',
    storyId: story?.id,
    template: story?.story_details?.type_of_story,
    title: story?.title,
    userId: story?.user_id,
  });
}
function* handleCreateStoryView({ payload }: any): any {
    const { user_id } = payload;
    yield call(sendEvent, {
      event: 'create_story_view',
      category: 'Story Management',
      action: 'Create Story View',
      userId: user_id,
    });
  }
  
  function* handleCreateStoryAction({ payload }: any): any {
    const { story } = payload;
    yield call(sendEvent, {
      event: 'create_story_action',
      category: 'Story Management',
      action: 'Create Story',
      template: story?.story_details.type_of_story,
      title: story?.title,
      userId: story?.user_id,
    });
  }
  function* handleUpdateStoryView({ payload }: any): any {
    const { userId } = payload;
    yield call(sendEvent, {
      event: 'update_story_view',
      category: 'Story Management',
      action: 'Update Story View',
      userId,
    });
  }
  
  function* handleUpdateStoryAction({ payload }: any): any {
    const { story } = payload;
    yield call(sendEvent, {
      event: 'update_story_action',
      category: 'Story Management',
      action: 'Update Story Action',
      storyId: story?.id,
      template: story?.story_details?.type_of_story,
      title: story?.title,
      userId: story?.user_id,
    });
  }
  
  function* handleDeleteStoryView({ payload }: any): any {
    const { userId } = payload;
    yield call(sendEvent, {
      event: 'delete_story_view',
      category: 'Story Management',
      action: 'Delete Story View',
      userId,
    });
  }
  
  function* handleDeleteStoryAction({ payload }: any): any {
    const { story } = payload;
    yield call(sendEvent, {
      event: 'delete_story_action',
      category: 'Story Management',
      action: 'Delete Story Action',
      storyId: story?.id,
      template: story?.story_details?.type_of_story,
      title: story?.title,
      userId: story?.user_id,
    });
  }

  function* handleSearchStoryAction({ payload }: any): any {
    const { searchValue } = payload;
    yield call(sendEvent, {
      event: 'search_story_action',
      category: 'Story Management',
      action: 'Search Story',
      searchValue,
    });
  }

  function* handleCreateMemoryView({ payload }: any): any {
    const { userId } = payload;
    yield call(sendEvent, {
      event: 'create_memory_view',
      category: 'Memory Management',
      action: 'View Memory Creation Page',
      userId,
    });
  }
  
  function* handleCreateMemoryAction({ payload }: any): any {
    const { memory } = payload;
    yield call(sendEvent, {
      event: 'create_memory_action',
      category: 'Memory Management',
      action: 'Create Memory',
      prompt: memory?.prompt,
      storyId: memory?.story_id,
      userId: memory?.user_id,
      memoryId: memory?.id,
      memoryTitle: memory?.title
    });
  }
  function* handleUpdateMemoryView({ payload }: any): any {
    const { userId } = payload;
    yield call(sendEvent, {
      event: 'update_memory_view',
      category: 'Memory Management',
      action: 'View Edit Memory Page',
      userId,
    });
  }
  
  function* handleUpdateMemoryAction({ payload }: any): any {
    const { memory } = payload;
    yield call(sendEvent, {
      event: 'update_memory_action',
      category: 'Memory Management',
      action: 'Edit Memory',
      memoryId: memory?.id,
      storyId: memory?.story_id,
      prompt: memory?.prompt,
      userId: memory?.user_id,
      memoryTitle: memory?.title
    });
  }
  
  function* handleDeleteMemoryView({ payload }: any): any {
    const { userId } = payload;
    yield call(sendEvent, {
      event: 'delete_memory_view',
      category: 'Memory Management',
      action: 'View Delete Memory Page',
      userId,
    });
  }
  
  function* handleDeleteMemoryAction({ payload }: any): any {
    const { memory } = payload;
    yield call(sendEvent, {
      event: 'delete_memory_action',
      category: 'Memory Management',
      action: 'Delete Memory',
      prompt: memory?.prompt,
      storyId: memory?.story_id,
      userId: memory?.user_id,
      memoryId: memory?.id,
      memoryTitle: memory?.title
    });
  }
  
  function* handleViewMemory({ payload }: any): any {
    const { memory } = payload;
    const { memoryId, prompt } = memory;
    yield call(sendEvent, {
      event: 'view_memory',
      category: 'Memory Management',
      action: 'View Memory',
      memoryId,
      prompt,
    });
  }

export function* watchViewStoryG() {
  yield takeLatest(VIEW_STORY_G, handleViewStoryG);
}

export function* watchCreateStoryView() {
  yield takeLatest(CREATE_STORY_VIEW_G, handleCreateStoryView);
}

export function* watchCreateStoryAction() {
  yield takeLatest(CREATE_STORY_ACTION_G, handleCreateStoryAction);
}

export function* watchUpdateStoryView() {
  yield takeLatest(UPDATE_STORY_VIEW_G, handleUpdateStoryView)
}
export function* watchUpdateStoryAction() {
  yield takeLatest(UPDATE_STORY_ACTION_G, handleUpdateStoryAction)
}
export function* watchDeleteStoryView() {
  yield takeLatest(DELETE_STORY_VIEW_G, handleDeleteStoryView)
}
export function* watchDeleteStoryAction() {
  yield takeLatest(DELETE_STORY_ACTION_G, handleDeleteStoryAction)
}
export function* watchFilterStoryAction() {
  yield takeLatest(FILTER_STORY_ACTION_G, handleSearchStoryAction)
}
export function* watchCreateMemoryView() {
  yield takeLatest(CREATE_MEMORY_VIEW_G, handleCreateMemoryView);
}

export function* watchCreateMemoryAction() {
  yield takeLatest(CREATE_MEMORY_ACTION_G, handleCreateMemoryAction);
}

export function* watchUpdateMemoryView() {
  yield takeLatest(UPDATE_MEMORY_VIEW_G, handleUpdateMemoryView);
}

export function* watchUpdateMemoryAction() {
  yield takeLatest(UPDATE_MEMORY_ACTION_G, handleUpdateMemoryAction);
}

export function* watchDeleteMemoryView() {
  yield takeLatest(DELETE_MEMORY_VIEW_G, handleDeleteMemoryView);
}

export function* watchDeleteMemoryAction() {
  yield takeLatest(DELETE_MEMORY_ACTION_G, handleDeleteMemoryAction);
}

export function* watchViewMemoryG() {
  yield takeLatest(VIEW_MEMORY_G, handleViewMemory);
}
