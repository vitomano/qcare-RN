import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity, View, Image } from 'react-native';
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
import { AuthContext } from '../context/AuthContext';
import { supplierVal } from '../helpers/eliminarEs';
import { Contact } from '../interfaces/interfaces.auth';
import { StepOne } from './StepOne';

interface Props {
    data: Report
    closeModal: (b: boolean) => void
}

export interface PropsPdf {
    pid: string,
    images: ImageType[]
}

export const Share = ({ data, closeModal }: Props) => {

    const { user } = useContext(AuthContext)
    const { mutate, isLoading } = useCreateLink()

    const [step, setStep] = useState(0)
    const [pdfImages, setPdfImages] = useState<PropsPdf[]>([])

    const [link, setLink] = useState<string | null>(null)
    const [message, setMessage] = useState<string>("")

    const [mailTo, setMailTo] = useState<string[]>([])
    const [cc, setCC] = useState<string[]>([])

    const [supplierEmails, setSupplierEmails] = useState<Contact[]>([])


    useEffect(() => {
        const contactSupplier: Contact[] = user!.contacts.filter(contact => supplierVal(contact.supplier) === supplierVal(data.mainData?.supplier))
        if (contactSupplier?.length === 0) return setStep(1)
        setSupplierEmails(contactSupplier)
        for (const contact of contactSupplier) {
            setMailTo(c => [...c, contact.email])
        }
    }, [data.mainData.supplier, user!.contacts])


    useEffect(() => {
        for (const img of data.pallets) setPdfImages(c => [...c, { pid: img.pid, images: img.images }])
    }, [data.pallets])

    const next = () => {
        mutate({
            reportId: data._id!,
            pdfImages
        }, {
            onSuccess: (data) => {
                setLink(`https://q-care.info/share-report-qc/${data.pdfId}`)
                setMessage(`<p>Download this report in PDF format by clicking this link: https://q-care.info/share-report-qc/${data.pdfId}</p><p>Download the images of this inspection in a ZIP file by clicking this link: https://q-care.info/zipped-images/${data.pdfId}</p>`)
                setStep(2)
            },
        })
    };

    useEffect(() => {
        if( user?.email === "quality@growerspackers.com"){
            setCC(["quality@growerspackers.com", "quality.gp3@growerspackers.com"])
        }
      }, [])

    return (

        <View style={{ padding: 15 }}>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <View style={{ ...globalStyles.flexRow }}>
                    {
                        (step === 1 && supplierEmails.length > 0 || step === 2) &&
                        <TouchableOpacity
                            activeOpacity={.9}
                            onPress={() => setStep(step - 1)}
                            style={{ marginRight: 5 }}
                        >
                            <Icon name="chevron-back-outline" size={25} />
                        </TouchableOpacity>
                    }
                    <TextApp bold size='m' style={{ marginVertical: 5 }}>Share Report</TextApp>
                </View>
                {
                    step === 2 && link &&
                    <TouchableOpacity
                        onPress={() => Clipboard.setString(link)} activeOpacity={.9}
                        style={{ padding: 5, borderRadius: 10, borderColor: blue, borderWidth: .5 }}>
                        <View style={{ ...globalStyles.flexRow }}>
                            <Icon name="copy-outline" size={15} color={blue} />
                            <TextApp size='s' color='blue' style={{ marginLeft: 5 }}>Copy link</TextApp>
                        </View>
                    </TouchableOpacity>
                }
            </View>

            {
                step === 0 &&
                <>
                    <View style={{ marginBottom: 20 }}>
                        {
                            supplierEmails.length > 0 &&
                            <StepOne
                                suppliers={supplierEmails}
                                setMailTo={setMailTo}
                                mailTo={mailTo}
                            />
                        }
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
                            onPress={() => setStep(1)}
                            text='Next'
                            blue
                            width={48}
                            loading={isLoading}
                        />

                    </View>
                </>
            }
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
