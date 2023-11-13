import { createFeatureSelector } from '@ngrx/store';
import { IAuthState } from './auth.state';

export const authFeatureKey = 'auth';

export const selectAuth = createFeatureSelector<IAuthState>(authFeatureKey);
