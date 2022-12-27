import React, { useEffect, useContext, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { globalStyles } from '../../theme/globalStyles'
import ButtonStyled from '../ui/ButtonStyled'
import { TextApp } from '../ui/TextApp'
import { DataPrereport } from '../../interfaces/intakes.reports';
import { IntakeContext } from '../../context/IntakeContext';
import { PalletPrereportAdd } from '../PalletPrereportAdd'
import { alertMsg } from '../../helpers/alertMsg';
import { uploadPallet, useUploadImages } from '../../api/usePrereport'


interface Props {
    repId: string
    grower: boolean
    openModal: (b: boolean) => void
}

export const NewPallet = ({ repId, grower, openModal }: Props) => {

    const { cleanAll, addPallet, pallets = [] } = useContext(IntakeContext)
    const { mutateAsync } = useUploadImages()

    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        cleanAll()
        addPallet(grower)
    }, [grower])


    const sendNewPallet = async () => {

        if ((pallets as any)[0].grade === "0") return alertMsg("Error to send", "QC Appreciation is pending")
        if ((pallets as any)[0].action === "0") return alertMsg("Error to send", "Suggested commercial action is pending")
        if ((pallets as any)[0].score === "0") return alertMsg("Error to send", "Score is pending")

        setUploading(true)

        try {

            const details = {
                labels: (pallets[0].labels.filter(p => p.check === true)).map(lab => { const { check, ...rest } = lab; return rest }),
                appareance: (pallets[0].appareance.filter(p => p.check === true)).map(app => { const { check, ...rest } = app; return rest })
            }


            const newPallet = {
                pid: pallets[0].id,
                details,
                score: (pallets as any)[0].score,
                grade: (pallets as any)[0].grade,
                action: (pallets as any)[0].action,
                images: [],
                addGrower: (pallets as any)[0].newGrower! || null,
            }

            //-----------------------------------------------------------

            await uploadPallet({
                repId,
                pallet: newPallet,
            })

            const allData = {
                pid: newPallet.pid,
                pallets,
                repId
            }

            await mutateAsync(allData)

            openModal(false)
        } catch (error) {
            console.log(error)
            alertMsg('Error', 'Something went wrong')
        } finally { setUploading(false)}
    };

    return (
        <View style={{ margin: 20 }}>

            {
                uploading
                    ?
                    <ActivityIndicator
                        size={50}
                        color="black"
                    />
                    :
                    <>
                        <TextApp bold size='m' style={{ marginBottom: 10 }}>Additional Pallet</TextApp>
                        {
                            pallets.length > 0 &&
                            <PalletPrereportAdd
                                pallet={pallets[0] as DataPrereport}
                            />
                        }

                        <View style={{ ...globalStyles.flexBetween, marginTop: 25 }}>
                            <ButtonStyled
                                onPress={() => openModal(false)}
                                text='Cancel'
                                outline
                                width={48}
                            />
                            <ButtonStyled
                                onPress={sendNewPallet}
                                text='Confirm'
                                width={48}
                            />
                        </View>
                    </>
            }



        </View>
    )
}
