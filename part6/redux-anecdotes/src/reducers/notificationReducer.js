const initialState = null;

const notificationReducer = (state = initialState, action) => {
    console.log('state now: ', state);
    console.log('action', action);
    switch (action.type) {
        case 'VOTE':
            return `You voted on "${action.data}" !`;
        case 'HIDE':
            return null;
        default:
            return state;
    }
};

export const showNotice = msg => {
    return {
        type: 'VOTE',
        data: msg,
    };
};
export const showCreateNotice = msg => {
    return {
        type: 'CREATE',
        data: msg,
    };
};

export const hideNotice = () => {
    return {
        type: 'HIDE',
    };
};

export default notificationReducer;
