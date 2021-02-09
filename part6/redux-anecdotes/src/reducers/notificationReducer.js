const notificationReducer = (state = null, action) => {
    console.log('state now: ', state);
    console.log('action', action);
    switch (action.type) {
        case 'VOTE_NOTICE':
            return `You voted on "${action.data}" !`;
        case 'CREATE_NOTICE':
            return `You created "${action.data}" !`;
        case 'HIDE':
            return null;
        default:
            return state;
    }
};

export const votedNotice = anecdote => {
    return {
        type: 'VOTE_NOTICE',
        data: anecdote.content,
    };
};

export const createdNotice = content => {
    return {
        type: 'CREATE_NOTICE',
        data: content,
    };
};

export const hideNotice = () => {
    return {
        type: 'HIDE',
    };
};

export default notificationReducer;
