import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { CentredContent } from '../components/CenterContent'
import ButtonStyled from '../components/ui/ButtonStyled'
import Toast from 'react-native-toast-message'

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import Papa from 'papaparse'

import DocumentPicker, { types } from 'react-native-document-picker'
import { } from '../theme/globalStyles';
import { BatchInfo, CVSResponse } from '../interfaces/intakes.reports';
import { IntakeList } from '../components/IntakeList';
import qcareApi from '../api/qcareApi';
import { StackScreenProps } from '@react-navigation/stack'
import { IntakesStackParams } from '../navigation/IntakesStack'
import { useQueryClient } from '@tanstack/react-query'
import { LoadingScreen } from './LoadingScreen'
import { TextApp } from '../components/ui/TextApp'

interface Props extends StackScreenProps<IntakesStackParams, "IntakeUploadScreen"> { };


export const IntakeUploadScreen = ({ navigation }:Props) => {

    const [csvFile, setCsvFile] = useState<BatchInfo[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const queryClient = useQueryClient()

    const docPicker = async () => {
        DocumentPicker.pickSingle({
            type: [types.allFiles],
        })
            .then(async (resp) => {

                // "type": "text/comma-separated-values"
                // "type": "text/csv"


                fetch(resp.uri)
                    .then(async (response) => {

                        const resp = await response.text();

                        Papa.parse(resp, {
                            header: true,
                            encoding: 'UTF-8',
                            transformHeader: (headerName) => headerName.toLowerCase(),
                            complete: function (results: any) {

                                let newCsvJson = []
                                let data: CVSResponse[] = results.data

                                for (let item of data) {
                                    newCsvJson.push({

                                        product: item.product || "",
                                        pallet_ref: item.pallet || "",
                                        format: item.format || "",
                                        supplier: item.supplier || "",
                                        grower: item.grower || "",
                                        origin: item.origin || "",
                                        gln_ggn: item['gln/ggn number'] || "",
                                        variety: item['variety(ies)'] || "",
                                        unit_label: item['unit label'] || "",
                                        total_boxes: item['total boxes'] || "",
                                        total_pallets: item['total pallets'] || "0",
                                        quality: item.quality || "",
                                        transport: item.transport || "",
                                        purchase_order: item['purchase order'] || "",
                                        delivery_note: item['delivery note / awb number'] || "",
                                        warehouse: item.warehouse || ""
                                    })
                                }

                                setCsvFile(newCsvJson)
                            }
                        });

                    })
                    .catch((error) => {
                        console.error("some error occurred", error);
                    });

            }
            )
            .catch(err => console.log(err))
    }

    const handleSubmit = async () => {

        setIsLoading(true)

        try {
            await qcareApi.post('/intakes/new', csvFile)
            Toast.show({
                type: 'success',
                text1: 'Intakes uploaded successfully'
              });
              queryClient.invalidateQueries(['intakes'])
              navigation.navigate("IntakesScreen" as never)
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Something went wrong'
              });
        } finally {
            setIsLoading(false)
        }
    }

    if(isLoading){
        return <LoadingScreen text='Uploading Intakes...'/>
    }


    return (
        <ScrollView>

            <View>
                <CentredContent style={{ marginTop: 20, marginBottom: 20 }}>
                    <ButtonStyled
                        text='Select CSV File'
                        width={60}
                        icon='document-text-outline'
                        onPress={docPicker}
                    />
                </CentredContent>
            </View>

            {
                csvFile.length > 0 
                
                ?
                <View style={{ paddingHorizontal: 20, marginBottom: 50 }}>
                    {
                        csvFile.map((csv, index) => (
                            <IntakeList
                                key={uuidv4()}
                                csv={csv}
                                index={index}
                            />

                        ))
                    }

                    <CentredContent style={{ marginTop: 10, marginBottom: 20 }}>
                        <ButtonStyled
                            text='Upload Intakes'
                            blue
                            width={60}
                            icon='document-text-outline'
                            onPress={handleSubmit}
                        />
                    </CentredContent>

                </View>

                :
                <View style={{paddingHorizontal: 50}}>
                    <TextApp center size='xs' color='mute'>We recommend to upload the CSV file in the web version www.q-care.info</TextApp>
                </View>
            }

        </ScrollView>
    )
}
