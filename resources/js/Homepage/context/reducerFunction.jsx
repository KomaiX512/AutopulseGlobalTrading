


export function rootReducer(state, { type, payload }) {
    
    switch (type) {
        case 'SET_SELECTED_ATTACHMENT':
            return { ...state, selectedAttachment: payload };
        case 'SET_RELATED_ATTACHMENTS':
            return { ...state, relatedAttachments: payload };
        case 'SET_LOADING':
            return { ...state, loading: payload };
        default: {
            return { ...state, ...payload }
        }
    }

}