
export function rootReducer(state, { type, payload }) {
    
    switch (type) {
            
        default: {
            return { ...state, ...payload }
        }
    }

}