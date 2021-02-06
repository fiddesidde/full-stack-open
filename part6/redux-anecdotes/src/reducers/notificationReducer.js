const testNotice = 'test notice!';

const initialState = testNotice;

const notificationReducer = (state = initialState, action) => {
    console.log('state now: ', state);
    console.log('action', action);
    switch (action.type) {
        case 'SHOW':
            return action.data;
        default:
            return state;
    }
};

export const showNotice = msg => {
    return {
        type: 'SHOW',
        data: msg,
    };
};

export default notificationReducer;
