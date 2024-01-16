/* eslint-disable indent */
import { describe, it, expect } from 'vitest';
import { ActionType } from './action';
import usersReducer from './reducer';

/**
 * test scenario for usersReducer
 *
 * - usersReducers function
 *  - should return new users when given by users/receive action
 *  - should return the initial state when given by unknown action
*
 */

describe('usersReducer function', () => {
    it('should return the initial state when given by unknown action', () => {
      const initialState = [];
      const action = { type: 'UNKNOWN' };

      const nextState = usersReducer(initialState, action);
      expect(nextState).toBe(initialState);
    });

    it('should return new users when given by users/receive action', () => {
      const initialState = [];
      const action = {
        type: ActionType.RECEIVE_USERS,
        payload: {
          users: [
            {
              id: 'john_kim',
              name: 'John kim',
              email: 'jkim@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            {
              id: 'silva_doe',
              name: 'silva Doe',
              email: 'silva@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            {
              id: 'zeef',
              name: 'zeef',
              email: 'zeef@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
          ],
        },
      };

      const nextState = usersReducer(initialState, action);
      expect(nextState).toBe(action.payload.users);
    });
  });
