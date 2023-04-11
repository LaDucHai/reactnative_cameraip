import { createStore } from 'redux';

function counterReducer(state = null , action) {
    switch (action.type) {
        case 'inComment':
            return 'inComment';
        case 'postDetail':
            return 'postDetail';
        case 'postOverview':
            return 'postOverview';

        // Profile    
        case 'ProfileTopSubject':
            return 'ProfileTopSubject';
        case 'ProfileBottomSubjectPost':
            return 'ProfileBottomSubjectPost';
        case 'ProfileBottomSubjectImage':
            return 'ProfileBottomSubjectImage';
        case 'ProfileBottomSubjectVideo':
            return 'ProfileBottomSubjectVideo';
        case 'ProfileBottomSubjectCamera':
            return 'ProfileBottomSubjectCamera';
        case 'ProfileBottomSubjectInfo':
            return 'ProfileBottomSubjectInfo';
        case 'ProfileBottomSubjectSetUp':
            return 'ProfileBottomSubjectSetUp';


        default:
            return state
    }
}

export let reduxStore = createStore(counterReducer);