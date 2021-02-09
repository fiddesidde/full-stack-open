const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTICE':
            return action.data;
        case 'HIDE_NOTICE':
            return null;
        default:
            return state;
    }
};

export const setNotice = (message, timeToShow) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTICE',
            data: message,
        });
        setTimeout(() => dispatch({ type: 'HIDE_NOTICE' }), timeToShow * 1000);
    };
};

export const hideNotice = () => {
    return {
        type: 'HIDE_NOTICE',
    };
};

export default notificationReducer;
