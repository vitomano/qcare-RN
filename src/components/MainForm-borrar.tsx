import React, { useContext } from 'react'
import { View } from 'react-native';
import { IntakeContext } from '../context/IntakeContext';
import { MainData } from '../interfaces/intakes.reports'
import { CustomInput } from './CustomInput';
import { CreateContext } from '../context/CreateContext';

type Props = {
    mainData: MainData
    createNew?:boolean
}

export const MainForm = ({mainData, createNew=false}:Props) => {

    const { totalPallets, handleMain } = useContext( IntakeContext )
    const { totalPallets:totalPalletsNew, handleMain:handleMainNew } = useContext( CreateContext )

    const {
        pallet_ref,
        delivery_note,
        format,
        gln_ggn,
        origin,
        product,
        purchase_order,
        quality,
        supplier,
        grower,
        total_boxes,
        transport,
        variety,
        unit_label,
        warehouse,
        // total_pallets,
        kilos,
        samples,
        format_gr
    } = mainData

    // const formatRef = useRef()
    // const kilosRef = useRef()

    const handleMainData = createNew ? handleMainNew : handleMain

    return (
        <View>

            <CustomInput
                label="Pallet Ref"
                value={pallet_ref}
                item="pallet_ref"
                handleInput={handleMainData}
            />
            <CustomInput
                label="Product"
                value={product}
                item="product"
                handleInput={handleMainData}
            />
            <CustomInput
                label="Format"
                value={format}
                item="format"
                handleInput={handleMainData}
            />
            <CustomInput
                label="Supplier"
                value={supplier}
                item="supplier"
                handleInput={handleMainData}
            />
            <CustomInput
                label="Grower"
                value={grower}
                item="grower"
                handleInput={handleMainData}
            />
            <CustomInput
                label="Origin"
                value={origin}
                item="origin"
                handleInput={handleMainData}
            />
            <CustomInput
                label="GLN/GGN"
                value={gln_ggn}
                item="gln_ggn"
                handleInput={handleMainData}
            />
            <CustomInput
                label="Variety(ies)"
                value={variety}
                item="variety"
                handleInput={handleMainData}
            />
            <CustomInput
                label="Unit Label"
                value={unit_label}
                item="unit_label"
                handleInput={handleMainData}
            />
            <CustomInput
                label="Total Boxes"
                value={total_boxes}
                item="total_boxes"
                handleInput={handleMainData}
            />

            <CustomInput
                label="Total Pallets"
                value={ createNew ? totalPalletsNew.toString() : totalPallets.toString() }
                item="total_pallets"
                editable={false}
                handleInput={handleMainData}
            />

            <CustomInput
                label="Quality"
                value={quality}
                item="quality"
                handleInput={handleMainData}
            />
            <CustomInput
                label="Transport"
                value={transport}
                item="transport"
                handleInput={handleMainData}
            />

            <CustomInput
                label="Purchase Order"
                value={purchase_order}
                item="purchase_order"
                handleInput={handleMainData}
            />
            <CustomInput
                label="Delivery Note / AWB Number"
                value={delivery_note}
                item="delivery_note"
                handleInput={handleMainData}
            />
            <CustomInput
                label="Warehouse"
                value={warehouse}
                item="warehouse"
                handleInput={handleMainData}
            />

            <CustomInput
                label="Samples"
                value={samples}
                item="samples"
                handleInput={handleMainData}
            />
            <CustomInput
                label="Kilos"
                value={kilos}
                item="kilos"
                handleInput={handleMainData}
            />
            <CustomInput
                label="Format Gr"
                value={format_gr}
                item="format_gr"
                handleInput={handleMainData}
            />
           
        </View>
    )
}
