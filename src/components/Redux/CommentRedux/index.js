import { createStore } from 'redux';


function counterReducer(state = null , action) {
    switch (action.type) {
      case 'inComment':
        return 'inComment';
      default:
        return state
    }
}

export let inComment = createStore(counterReducer);