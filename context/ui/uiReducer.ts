import { UIState } from "./";


type UIActionType =
    | { type: "[UI] - Change Theme",  payload: string  }


export const uiReducer = (state: UIState, action: UIActionType): UIState => {

    switch (action.type) {
        case '[UI] - Change Theme':
            return {
                ...state,
                theme: action.payload
            }

        default:
            return state
    }
}

