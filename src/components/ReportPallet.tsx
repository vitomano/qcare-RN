import React from 'react'
import { Text, View } from 'react-native'
import { Pallet } from '../interfaces/intakes.reports'
import { Accordeon } from './Accordeon'


interface Props {
    pallets: Pallet[]
}

export const ReportPallet = ({ pallets }: Props) => {

    return (
        <>
          {
    pallets.map((onePallet, i) => {

        const labels = onePallet.details.labels || []
        const appareance = onePallet.details.appareance || []
        const pallgrow = onePallet.details.pallgrow || []

        // const weight_format = parseInt((onePallet.details.pallgrow.find(app => app.name === "weight_10"))?.valor) || 0

        return (

            <Accordeon
                key={onePallet.pid}

                labels={labels}
                appareance={appareance}
                pallgrow={pallgrow}
                i={i}
                // weight_format={weight_format}
                // onePallet={onePallet}
                // reportId={reportId}
                // score={onePallet.score}
                // updateVal={updateVal}
                // setUpdateVal={setUpdateVal}
                // fruit={fruit}
                // addGrower={onePallet.addGrower}
                // oldDate={oldDate}
                // pid={onePallet.pid}
                // format={format}
            />

        )
    })
}
        </>
    )
}


