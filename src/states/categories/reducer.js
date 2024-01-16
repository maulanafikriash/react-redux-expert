import { ActionType } from './action';

export default function categoriesReducer(categories = '', action = {}) {
  switch (action.type) {
    case ActionType.SET_CATEGORIES:
      return action.payload.category;
    default:
      return categories;
  }
}
