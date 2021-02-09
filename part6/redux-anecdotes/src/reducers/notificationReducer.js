const defaultState = { notification: null, timeoutId: null };

const notificationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_NOTICE':
            if (state.timeoutId) {
                clearTimeout(state.timeoutId);
            }
            return {
                notification: action.data,
                timeoutId: null,
            };
        case 'HIDE_NOTICE':
            return {
                notification: null,
                timeoutId: null,
            };
        case 'SET_TIMEOUT_ID':
            return {
                notification: state.notification,
                timouteId: action.data,
            };
        default:
            return state;
    }
};

export const setNotice = (message, duration = 3) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTICE',
            data: message,
        });
        const timeoutId = setTimeout(
            () => dispatch({ type: 'HIDE_NOTICE' }),
            duration * 1000
        );
        dispatch({
            type: 'SET_TIMEOUT_ID',
            data: timeoutId,
        });
    };
};

// export const hideNotice = () => {
//     return {
//         type: 'HIDE_NOTICE',
//     };
// };

// export const createTimeoutId = timeoutId => {
//     return {
//         type: 'SET_TIMEOUT_ID',
//         data: timeoutId,
//     };
// };

export default notificationReducer;
