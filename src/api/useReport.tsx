import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SingleReportResponse } from "../interfaces/intakes.reports";
import qcareApi from "./qcareApi";
import Toast from 'react-native-toast-message'
import { Asset } from "react-native-image-picker";
import { PropsPdf } from "../components/Share";


interface PropsDelete {
    reportId: string,
    palletId: string,
    key: string,
    key_low: string
}

interface PropsUploadImages {
    reportId: string,
    palletId: string,
    images: Asset[]
}

interface PdfResponse {
    ok: boolean,
    mgs: string,
    pdfId: string
}

interface PropsCreate {
    reportId: string,
    pdfImages: PropsPdf[],
}

interface PropsEmail {
    mailTo: string[],
    cc: string[],
    subject: string,
    message: HTMLElement | undefined,
    link: string,
    signature: boolean
}


const getSingleReport = async (id: string) => {
    const { data } = await qcareApi.get<SingleReportResponse>(`/report/${id}`);
    return data
};

const editGrower = async (grower: any) => {
    const { data } = await qcareApi.put('/report/edit-grower', grower)
    return data
};

const editItem = async (item: any) => {
    const { data } = await qcareApi.put('/report/edit-item', item)
    return data
};

const createLink = async ({ reportId, pdfImages }: PropsCreate) => {
    const { data } = await qcareApi.post<PdfResponse>('/pdf/create-pdf', {
        reportId,
        pdfImages
    })
    return data
};

//SEND EMAIL
const sendEmail = async ({ mailTo, cc, subject, message, link, signature }: PropsEmail) => {
    const { data } = await qcareApi.post('/pdf/send-mail', {
        mailTo: mailTo.length > 0 ? mailTo.join(", ") : "",
        cc: cc.length > 0 ? cc.join(", ") : "",
        subject,
        message,
        link,
        signature
    })
    return data
};

//DELETE IMAGE
export const deleteImage = async ({ reportId, palletId, key, key_low }: PropsDelete) => {

    const { data } = await qcareApi.post(`/report/delete-image`, {
        reportId,
        palletId,
        keyName: key,
        keyLow: key_low
    })
    return data
}


//ADDITIONAL IMAGES
export const uploadImages = async ({ reportId, palletId, images }: PropsUploadImages) => {

    const formData = new FormData();

    for (const img of images) {
        formData.append('uploady', img)
    }

    formData.append('rid', reportId)
    formData.append('palletId', palletId)

    const { data } = await qcareApi.post('/report/add-files', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })

    return data
}


// ------------------------- HOOKS -------------------------

export const useReport = (id: string) => {
    return useQuery(
        ['report', id],
        () => getSingleReport(id),
        { select: (data) => { return data.singleReport } }
    );
}


export const useEditReport = () => {
    const queryClient = useQueryClient()
    return useMutation(editItem, {
        onSuccess: () => { queryClient.invalidateQueries(['report']) }
    })
}


export const useEditRepGrower = () => {
    const queryClient = useQueryClient()
    return useMutation(editGrower, {
        onSuccess: () => { queryClient.invalidateQueries(['report']) }
    })
}

export const useDeleteReportImage = () => {
    const queryClient = useQueryClient()
    return useMutation(deleteImage, {
        onSuccess: () => {
            queryClient.invalidateQueries(['report']),
                Toast.show({
                    type: 'success',
                    text1: 'Image has been deleted'
                })
        },
        onError: () => Toast.show({
            type: 'error',
            text1: 'Something went wrong'
        })
    })
}


export const useUploadImages = () => {
    const queryClient = useQueryClient()
    return useMutation(uploadImages, {
        onSuccess: () => { queryClient.invalidateQueries(['report']) }
    })
}

export const useCreateLink = () => {
    return useMutation(createLink)
}

export const useSendEmail = () => {
    const queryClient = useQueryClient()
    return useMutation(sendEmail, {
        onSuccess: () => { queryClient.invalidateQueries(['report']) }
    })
}

