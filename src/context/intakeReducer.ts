import { Intake, IntakeFormat } from '../interfaces/intakes.interface';
import { Fruit, MainInfo } from '../interfaces/interfaces';
import { Report, ReportsResponse } from '../interfaces/reports.interface';


export interface ReportState {
    mainData: MainInfo
    Pallets: Report | null;
    activeIntake: IntakeFormat | null;
    reload: boolean
}

type ActionType =
    | { type: 'GET_REPORTS', payload: ReportsResponse }
    | { type: 'GET_SINGLE_REPORT', payload: Report }
    | { type: 'GET_INTAKES', payload: Intake[] }
    | { type: 'GET_SINGLE_INTAKE', payload: IntakeFormat }
    | { type: 'RELOAD' }
  

export const reportReducer = (state: ReportState, action: ActionType): ReportState => {
    switch (action.type) {

        case 'GET_SINGLE_INTAKE':
            return {
                ...state,
                activeIntake: action.payload,
            }  


        case 'GET_REPORTS':
            return {
                ...state,
                reportsData: action.payload,
            }

        case 'GET_SINGLE_REPORT':
            return {
                ...state,
                activeReport: action.payload,
            }

        case 'GET_INTAKES':
            return {
                ...state,
                intakes: action.payload,
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
