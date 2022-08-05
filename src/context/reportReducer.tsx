import { PreReport } from '../data/preReport';
import { BatchInfo, MainInfo } from "../interfaces/intakes.reports"
import { Report } from '../data/pallet';


export interface ReportState {
    mainData: MainInfo | null,
    pallets: Report[] ,
    fruit: string,
    reload: boolean
}

type ActionType =
    | { type: 'ADD_MAINDATA', payload: {intake:MainInfo, fruit:string} }
    | { type: 'REMOVE_MAINDATA', payload: BatchInfo }
    | { type: 'SET_PALLETS', payload: Report[] }
    | { type: 'ADD_NEWPALLET', payload: PreReport }
    | { type: 'CHANGE_VALUE', payload: { id: string, item: keyof PreReport, value: string | null} }
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
                pallets: [...state.pallets, action.payload]
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

            const newPallet:PreReport[] = state.pallets.map( (pal:PreReport) => {

                if( pal.id === action.payload.id){

                    if(action.payload.item !== "id"){
                        pal[action.payload.item] = action.payload.value
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
