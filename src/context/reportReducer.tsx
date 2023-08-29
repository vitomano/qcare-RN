import { MainData, Report } from "../interfaces/intakes.reports"


export interface ReportState {
    mainData: MainData | null,
    pallets: Report[] ,
    fruit: string,
    reload: boolean
}

type ActionType =
    | { type: 'ADD_MAINDATA', payload: {intake:MainData, fruit:string} }
    | { type: 'REMOVE_MAINDATA', payload: MainData }
    | { type: 'SET_PALLETS', payload: Report[] }
    | { type: 'ADD_NEWPALLET', payload: Report }
    | { type: 'CHANGE_VALUE', payload: { id: string, item: keyof Report, value: string | null} }
    | { type: 'REMOVE_PALLETS' }
    | { type: 'RESET_ALL' }
    | { type: 'RELOAD' }

export const reportReducer = (state: ReportState, action: ActionType): ReportState => {
    switch (action.type) {

        case 'ADD_MAINDATA':
            return {
                ...state,
                mainData: action.payload.intake,
                fruit: action.payload.fruit
            }
        case 'REMOVE_MAINDATA':
            return {
                ...state,
                mainData: null
            }
        case 'SET_PALLETS': 
            return {
                ...state,
                pallets: action.payload
            };
        case 'ADD_NEWPALLET': 
            return {
                ...state,
                pallets: [...state.pallets as Report[], action.payload]
            };
        
        case 'REMOVE_PALLETS':
            return {
                ...state,
                pallets: []
            }

        case 'RESET_ALL':
            return {
                ...state,
                mainData: null,
                pallets: []
            }

        case 'CHANGE_VALUE':{

            const newPallet:Report[] = state.pallets.map( (pal:Report) => {

                if( pal._id === action.payload.id){

                    if(action.payload.item !== "_id"){
                        // pal[action.payload.item] = action.payload.value
                        return pal
                    } else { return pal}

                    
                } else return pal
            } )

            return {
                ...state,
                pallets: newPallet
            }
        }

        case 'RELOAD':
            return {
                ...state,
                reload: !state.reload,
            }


        default:
            return state
    }
}
