import { Action, ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { authStateKey } from '../app.state';

const localStorageSyncConfig = {
  keys: [authStateKey],
  rehydrate: true,
  storage: localStorage,
  removeOnUndefined: true,
};

export function localStorageSyncReducer(
  reducer: ActionReducer<any, Action>
): ActionReducer<any, Action> {
  return localStorageSync(localStorageSyncConfig)(reducer);
}
