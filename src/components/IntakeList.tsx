import React from 'react'
import { StyleSheet, View } from 'react-native'
import { BatchInfo } from '../interfaces/intakes.reports'
import { globalStyles } from '../theme/globalStyles'
import { inputColor } from '../theme/variables'
import { PalletNum } from './ui/PalletNum'
import { TextApp } from './ui/TextApp'

interface Props {
    csv: BatchInfo,
    index: number
}

export const IntakeList = ({ csv, index }: Props) => {
    return (
        <View
            style={globalStyles.shadowCard}
        >

            <View style={styles.container}>

                <View style={{ marginBottom: 20, marginTop: 10 }}>
                    <PalletNum num={index + 1} />
                </View>

                <View style={styles.intake}>
                    <TextApp style={styles.label}>Product</TextApp>
                    <View style={styles.valueContainer}><TextApp style={styles.value}>{csv.product}</TextApp></View>
                </View>
                <View style={styles.intake}>
                    <TextApp style={styles.label}>Format</TextApp>
                    <View style={styles.valueContainer}><TextApp style={styles.value}>{csv.format}</TextApp></View>
                </View>
                <View style={styles.intake}>
                    <TextApp style={styles.label}>Supplier</TextApp>
                    <View style={styles.valueContainer}><TextApp style={styles.value}>{csv.supplier}</TextApp></View>
                </View>

                <View style={styles.intake}>
                    <TextApp style={styles.label}>Grower</TextApp>
                    <View style={styles.valueContainer}><TextApp style={styles.value}>{csv.grower}</TextApp></View>
                </View>

                <View style={styles.intake}>
                    <TextApp style={styles.label}>Origin</TextApp>
                    <View style={styles.valueContainer}><TextApp style={styles.value}>{csv.origin}</TextApp></View>
                </View>
                <View style={styles.intake}>
                    <TextApp style={styles.label}>GLN/GGN</TextApp>
                    <View style={styles.valueContainer}><TextApp style={styles.value}>{csv.gln_ggn}</TextApp></View>
                </View>
                <View style={styles.intake}>
                    <TextApp style={styles.label}>Variety(ies)</TextApp>
                    <View style={styles.valueContainer}><TextApp style={styles.value}>{csv.variety}</TextApp></View>
                </View>
                <View style={styles.intake}>
                    <TextApp style={styles.label}>Unit TextApp</TextApp>
                    <View style={styles.valueContainer}><TextApp style={styles.value}>{csv.unit_label}</TextApp></View>
                </View>
                <View style={styles.intake}>
                    <TextApp style={styles.label}>Total Boxes</TextApp>
                    <View style={styles.valueContainer}><TextApp style={styles.value}>{csv.total_boxes}</TextApp></View>
                </View>
                <View style={styles.intake}>
                    <TextApp style={styles.label}>Total Pallets</TextApp>
                    <View style={styles.valueContainer}><TextApp style={styles.value}>{csv.total_pallets}</TextApp></View>
                </View>
                <View style={styles.intake}>
                    <TextApp style={styles.label}>Quality</TextApp>
                    <View style={styles.valueContainer}><TextApp style={styles.value}>{csv.quality}</TextApp></View>
                </View>
                <View style={styles.intake}>
                    <TextApp style={styles.label}>Transport</TextApp>
                    <View style={styles.valueContainer}><TextApp style={styles.value}>{csv.transport}</TextApp></View>
                </View>
                <View style={styles.intake}>
                    <TextApp style={styles.label}>Purchase Order</TextApp>
                    <View style={styles.valueContainer}><TextApp style={styles.value}>{csv.purchase_order}</TextApp></View>
                </View>
                <View style={styles.intake}>
                    <TextApp style={styles.label}>Delivery Note / AWB Number</TextApp>
                    <View style={styles.valueContainer}><TextApp style={styles.value}>{csv.delivery_note}</TextApp></View>
                </View>
                <View style={styles.intake}>
                    <TextApp style={styles.label}>Warehouse</TextApp>
                    <View style={styles.valueContainer}><TextApp style={styles.value}>{csv.warehouse}</TextApp></View>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderRadius: 10,
        position: 'relative',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 25,
    },
    intake: {
        flexDirection: "row",
        marginBottom: 8
    },
    label: {
        flex: 1,
        paddingRight: 5,
        fontSize: 15
    },
    valueContainer: {
        flex: 1,
        backgroundColor: inputColor,
        paddingVertical: 8,
        paddingHorizontal: 7,
        borderRadius: 8
    },
    value: {
        fontSize: 15
    }
});