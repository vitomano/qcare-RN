import React, { useCallback, useContext, useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { useCreateLink } from '../api/useReport';
import { Report, ImageType, SingleReportResponse, Pallet } from '../interfaces/intakes.reports';
import { globalStyles } from '../theme/globalStyles'
import { MailForm } from './MailForm';
import { ShareImages } from './ShareImages';
import { ShareMailTo } from './ShareMailTo';
import ButtonStyled from './ui/ButtonStyled'
import { TextApp } from './ui/TextApp'
import Toast from 'react-native-toast-message';

import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';
import { blue, inputColor, text } from '../theme/variables';
import { AuthContext } from '../context/AuthContext';
import { supplierVal } from '../helpers/eliminarEs';
import { Contact, Teams } from '../interfaces/interfaces.auth';
import { StepOne } from './StepOne';
import { subjectString } from '../helpers/subjectString';
import { combinedContacts } from '../helpers/sortContacts';
import qcareApi from '../api/qcareApi';
import { MainDataSelect, objectToCheckArray } from '../helpers/objToArray';
import { existPDFImages } from '../helpers/pdfFilters';
import { ImageTypeLabel, photosSavePDF } from '../helpers/photosToShow';
import EmailFormBtn from './EmailFormBtn';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';

interface Props {
    data: Report
    closeModal: () => void
    supplier: string | null
}

export interface PropsPdfImages {
    pid: string,
    images: ImageTypeLabel[]
}


export const Share = ({ data: report, closeModal, supplier }: Props) => {

    const { user } = useContext(AuthContext)
    const [pallets, setPallets] = useState<Pallet[]>([])
    const [mainData, setMainData] = useState<MainDataSelect[]>([])
    const [contactsTeam, setContactsTeam] = useState<Contact[]>([])

    const [images, setImages] = useState<PropsPdfImages[]>([])
    const [defectImages, setDefectImages] = useState<PropsPdfImages[]>([])

    const [existImages, setExistImages] = useState<boolean>(true)

    const [link, setLink] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [signature, setSignature] = useState<boolean>(true)

    const [mailTo, setMailTo] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([]);

    const [subject, setSubject] = useState<string>("")
    const [message, setMessage] = useState("")

    const [step, setStep] = useState(1)
    const [supplierEmails, setSupplierEmails] = useState<Contact[]>([])

    useEffect(() => {

        if (!user) return

        const contactsTeam: Contact[] = [...user.teamsUser, ...user.teamsAdmin].find(teamOne => teamOne._id === report.team)?.contacts ?? []

        if ([...user.contacts, ...contactsTeam].length === 0) return setStep(2)

        const contactSupplier = combinedContacts(user.contacts, contactsTeam).filter(contact => supplierVal(contact.supplier) === supplierVal(supplier ?? ""))

        setSupplierEmails(contactSupplier)
        for (const contact of contactSupplier) {
            setMailTo(c => [...c, contact.email])
        }
    }, [supplier, user, report])


    useEffect(() => {
        setMainData(objectToCheckArray(report.mainData))
        setPallets(report.pallets)
        setSubject(subjectString(report))
        setExistImages(existPDFImages(report.pallets))

    }, [report])

    useEffect(() => {
        let allImages = []
        let defectImages = []
        for (const paly of pallets) {
            allImages.push({
                pid: paly.pid,
                images: paly.images
            })
        }
        for (const pall of pallets) {
            defectImages.push({
                pid: pall.pid,
                images: photosSavePDF(pall)
            })
        }

        setImages(allImages)
        setDefectImages(defectImages || [])
    }, [pallets])


    useEffect(() => {
        if (user?.email === "quality@growerspackers.com") {
            setTags(["quality@growerspackers.com", "quality.gp3@growerspackers.com"])
        }
    }, [user])


    // const closeModal = () => setOpenSendPDF(false)


    //Save the PDF Data in the Database
    const createLink = useCallback(async () => {

        const allImages = []
        for (const pallet of pallets) {

            const newDefect = defectImages.reduce((acc, img): any => {
                if (img.pid === pallet.pid) {
                    return [...acc, ...(img.images.map(i => ({ label: i.label || null, imgURL: i.imgURL || null })))]
                } return acc
            }, [])

            const newimages = images.reduce((acc, img): any => {
                if (img.pid === pallet.pid) {
                    return [...acc, ...(img.images.map(i => ({ imgURL: i.imgURL || null })))]
                } return acc
            }, [])

            allImages.push({
                pid: pallet.pid,
                images: [...newDefect, ...newimages]
            })
        }

        setIsLoading(true)
        try {
            const avoidData = mainData.filter(data => data.check === false).map(item => item.key)

            const fetchData: {
                reportId: string,
                pdfImages: any[],
                avoidData?: string[]
            } = {
                reportId: report._id,
                pdfImages: allImages
            }

            if (avoidData.length > 0) fetchData.avoidData = avoidData

            const { data } = await qcareApi.post('/pdf/create-pdf', fetchData)

            setLink(`https://q-care.info/share-report-qc/${data.pdfId}`)

            setMessage(`<p>Download this report in PDF format by clicking this link: https://q-care.info/share-report-qc/${data.pdfId}</p><p>Download the images of this inspection in a ZIP file by clicking this link: https://q-care.info/zipped-images/${data.pdfId}</p>`)
            setStep(4)
        } catch (error) {
            console.log(error)
            setLink(null)
        } finally { setIsLoading(false) }
    }, [report, images, defectImages, mainData]);


    //Send the PDF by mail
    const sendMail = async () => {

        if (subject.length < 1) return Toast.show({ type: 'error', text1: 'Add a Subject' })
        if (message.length < 1) return Toast.show({ type: 'error', text1: 'Add a Message' })

        setIsLoading(true)

        try {

            const { data } = await qcareApi.post('/pdf/send-mail', {
                mailTo: mailTo.length > 0 ? mailTo.join(", ") : "",
                subject,
                message,
                cc: tags.length > 0 ? tags.join(", ") : "",
                link,
                signature
            })

            if (!data.ok) return Toast.show({ type: 'error', text1: 'Something went wrong' })

            Toast.show({ type: 'success', text1: 'Email delivered' })
            
        } catch (error) {
            console.log(error)
            Toast.show({ type: 'error', text1: 'Something went wrong' })
        } finally {
            setIsLoading(false)
            closeModal()
        }
    };

    //--------------------------------------------------------

    const removeMailTo = (indexToRemove: number) => {
        setMailTo([...mailTo.filter((_, index) => index !== indexToRemove)]);
    };

    const removeTags = (indexToRemove: number) => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };

    //--------------------------------------------------------

    return (

        <View style={{ paddingHorizontal: 15, paddingVertical: 20 }}>

            <TouchableOpacity
                activeOpacity={.8}
                onPress={() => closeModal()}
                style={{ ...globalStyles.flexCenter, zIndex: 1, width: 25, height: 25, backgroundColor: inputColor, borderRadius: 5, position: 'absolute', right: 18, top: 18 }}
            >
                <Icon name='close' size={20} color={text} />
            </TouchableOpacity>

            {
                step === 1 &&
                <StepOne
                    // isLoading={isLoading}
                    suppliers={supplierEmails || []}
                    setMailTo={setMailTo}
                    mailTo={mailTo || []}
                    contactsTeam={contactsTeam || []}
                />
            }

            {
                step === 2 &&
                <StepTwo
                    mainData={mainData || []}
                    setMainData={setMainData}
                />
            }

            {
                step === 3 &&
                <StepThree
                    pallets={pallets}

                    images={images}
                    setImages={setImages}
                    defectImages={defectImages}
                    setDefectImages={setDefectImages}

                    createLink={createLink}
                    existImages={existImages}
                    setStep={setStep}
                />
            }

            {
                step === 4 &&

                <MailForm
                    mailTo={mailTo}
                    cc={tags}
                    link={link || ""}
                    subject={subject}
                    message={message}
                    closeModal={closeModal}
                    setStep={setStep}
                    step={step}
                    existImages={existImages}

                />
            }

            {
                step !== 4 &&
                <EmailFormBtn
                    setStep={setStep}
                    step={step}
                    // contacts={contacts}
                    existImages={existImages}
                    createLink={createLink}
                    isLoading={isLoading}
                    sendMail={sendMail}
                />
            }

        </View >
    )
}
