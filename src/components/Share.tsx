import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useCreateLink } from '../api/useReport';
import { Report, ImageType } from '../interfaces/intakes.reports';
import { globalStyles } from '../theme/globalStyles'
import { MailForm } from './MailForm';
import { ShareImages } from './ShareImages';
import { ShareMailTo } from './ShareMailTo';
import ButtonStyled from './ui/ButtonStyled'
import { TextApp } from './ui/TextApp'

import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';
import { blue } from '../theme/variables';

interface Props {
    data: Report
    closeModal: (b: boolean) => void
}

export interface PropsPdf {
    pid: string,
    images: ImageType[]
}

export const Share = ({ data, closeModal }: Props) => {

    const { mutate, isLoading } = useCreateLink()

    const [step, setStep] = useState(1)
    const [pdfImages, setPdfImages] = useState<PropsPdf[]>([])

    const [link, setLink] = useState<string | null>(null)
    const [message, setMessage] = useState<string>("")

    const [mailTo, setMailTo] = useState<string[]>([])
    const [cc, setCC] = useState<string[]>([])


    useEffect(() => {
        for (const img of data.pallets) setPdfImages(c => [...c, { pid: img.pid, images: img.images }])
    }, [])

    const next = () => {
        mutate({
            reportId: data._id!,
            pdfImages
        }, {
            onSuccess: (data) => {
                setLink(`https://q-care.info/share-report-qc/${data.pdfId}`)
                setMessage(`See the report in this link:
https://q-care.info/share-report-qc/${data.pdfId}`)
                setStep(2)
            },
        })
    };

    return (

        <View style={{ padding: 15 }}>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <TextApp bold size='m' style={{ marginVertical: 5 }}>Share Report</TextApp>
                {
                    step === 2 && link &&
                    <TouchableOpacity
                    onPress={()=>Clipboard.setString(link)} activeOpacity={.9}
                    style={{ padding: 5, borderRadius: 10, borderColor: blue, borderWidth: .5 }}>
                        <View style={{ ...globalStyles.flexRow }}>
                            <Icon name="copy-outline" size={15} color={blue} />
                            <TextApp size='s' color='blue' style={{ marginLeft: 5 }}>Copy link</TextApp>
                        </View>
                    </TouchableOpacity>
                }
            </View>
            {
                step === 1 &&
                <>
                    <View style={{ marginBottom: 20 }}>
                        <ShareMailTo
                            mailTo={mailTo}
                            setMailTo={setMailTo}
                            cc={cc}
                            setCC={setCC}
                        />
                        <ShareImages
                            pdfImages={pdfImages}
                            setPdfImages={setPdfImages}
                            data={data}
                        />
                    </View>
                    <View style={{ ...globalStyles.flexBetween, marginBottom: 10 }}>
                        <ButtonStyled
                            onPress={() => closeModal(false)}
                            text='Close'
                            outline
                            blue
                            width={48}
                        />
                        <ButtonStyled
                            onPress={next}
                            text='Next'
                            blue
                            width={48}
                            loading={isLoading}
                        />

                    </View>
                </>
            }

            {
                step === 2 &&


                <MailForm
                    mailTo={mailTo}
                    cc={cc}
                    link={link || ""}
                    message={message}
                    closeModal={closeModal}
                />

            }



        </View >
    )
}
