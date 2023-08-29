import React from 'react'
import ButtonStyled from './ui/ButtonStyled'
import { View } from 'react-native'

interface Props {
    isLoading: boolean,
    setStep: React.Dispatch<React.SetStateAction<number>>,
    step: number,
    existImages: boolean,
    createLink: () => Promise<void>,
    sendMail: () => Promise<void>
}

export default function EmailFormBtn({ isLoading, setStep, step, existImages, createLink, sendMail }: Props) {

    return (
        <View style={{ marginTop: 25, flexDirection: 'row', justifyContent: 'space-between' }}>

            {
                (step > 1 && step !== 4) &&

                <View style={{ width: '48%' }}>
                    <ButtonStyled
                        disabled={isLoading}
                        text='Previous'
                        onPress={() => {
                            if (step === 4 && !existImages) {
                                setStep(2)
                            } else { setStep(c => c - 1) }
                        }}
                        blue
                        width={100}
                        icon='chevron-back-outline'
                    />
                </View>
            }

            {
                step === 4
                    ?
                    // <View style={{ width: '48%' }}>
                    //     <ButtonStyled
                    //         disabled={isLoading}
                    //         text='Send'
                    //         onPress={async () => { await sendMail() }}
                    //         blue
                    //         width={100}
                    //         icon='send-outline'
                    //         iconAfter
                    //         iconSize={22}
                    //     />
                    // </View>

                    <></>

                    :
                    step === 3 || (step === 2 && !existImages)

                        ?
                        <View style={{ width: '48%' }}>
                            <ButtonStyled
                                disabled={isLoading}
                                text='Next'
                                onPress={async () => await createLink()}
                                blue
                                width={100}
                                icon='chevron-forward-outline'
                                iconAfter
                            />
                        </View>

                        :
                        <View style={{ width: '48%', marginLeft: 'auto' }}>
                            <ButtonStyled
                                disabled={isLoading}
                                text='Next'
                                onPress={() => setStep(c => c + 1)}
                                blue
                                width={100}
                                icon='chevron-forward-outline'
                                iconAfter
                            />
                        </View>


            }

        </View>
    )
}
