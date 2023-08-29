import { DataPrereport, MainData } from '../interfaces/intakes.reports';

type Response = {
 error: string,
 ok: boolean
}


export const validationPrereport = (mainData:MainData, pallets?:DataPrereport[]):Response => {

    if (mainData?.pallet_ref?.trim().length === 0) return {
        error:`"Pallet Reference" is missing`,
        ok: false
    }

    if (mainData?.format_gr?.trim().length === 0 || mainData?.format_gr === "0") return {
        error:`"Format gr" value is missing`,
        ok: false
    }
    
    if (mainData?.kilos?.trim().length === 0 || mainData?.kilos === "0") return {
        error:`"Kilos" value is missing`,
        ok: false
    }

    //-----------------------------------------------------

    if(pallets?.some( pall => pall.newGrower !== null )) {

        if(pallets.some( pall => pall.newGrower?.grower_variety.length === 0
            || pall.newGrower?.boxes.length === 0 )) {

            return {
                error:"Grower / Variety value incomplete",
                ok: false
            }
        }
    }

    //-----------------------------------------------------
    

    if( pallets?.some( pall => pall?.grade === "0" )) return {
        error:"QC Appreciation is pending",
        ok: false
    }


    if( pallets?.some( pall => pall?.action === "0" )) return {
        error:"Suggested commercial action is pending",
        ok: false
    }


    if(pallets?.some( pall => pall.score === "0" )) return {
        error:"Score is pending",
        ok: false
    }


    return {
        error:"Ok",
        ok: true
    }
}