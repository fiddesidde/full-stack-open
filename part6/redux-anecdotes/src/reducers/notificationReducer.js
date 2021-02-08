const notificationReducer = (state = null, action) => {
    console.log('state now: ', state);
    console.log('action', action);
    switch (action.type) {
        case 'VOTENOTICE':
            return `You voted on "${action.data}" !`;
        case 'CREATENOTICE':
            return `You created ${action.data} !`;
        case 'HIDE':
            return null;
        default:
            return state;
    }
};

export const votedNotice = anecdote => {
    return {
        type: 'VOTENOTICE',
        data: anecdote.content,
    };
};

export const createdNotice = content => {
    return {
        type: 'CREATENOTICE',
        data: content,
    };
};

export const hideNotice = () => {
    return {
        type: 'HIDE',
    };
};

export default notificationReducer;
