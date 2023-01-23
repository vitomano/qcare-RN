import React, { useContext } from 'react'
import { View } from 'react-native';
import { IntakeContext } from '../context/IntakeContext';
import { MainInfo } from '../interfaces/intakes.reports'
import { CustomInput } from './CustomInput';

type Props = { mainData: MainInfo}

export const MainForm = ({mainData}:Props) => {

    const { totalPallets, handleMain } = useContext( IntakeContext )

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

    return (


        <View>

            <CustomInput
                label="Pallet Ref"
                value={pallet_ref}
                item="pallet_ref"
                handleInput={handleMain}
            />
            <CustomInput
                label="Product"
                value={product}
                item="product"
                handleInput={handleMain}
            />
            <CustomInput
                label="Format"
                value={format}
                item="format"
                handleInput={handleMain}
            />
            <CustomInput
                label="Supplier"
                value={supplier}
                item="supplier"
                handleInput={handleMain}
            />
            <CustomInput
                label="Grower"
                value={grower}
                item="grower"
                handleInput={handleMain}
            />
            <CustomInput
                label="Origin"
                value={origin}
                item="origin"
                handleInput={handleMain}
            />
            <CustomInput
                label="GLN/GGN"
                value={gln_ggn}
                item="gln_ggn"
                handleInput={handleMain}
            />
            <CustomInput
                label="Variety(ies)"
                value={variety}
                item="variety"
                handleInput={handleMain}
            />
            <CustomInput
                label="Unit Label"
                value={unit_label}
                item="unit_label"
                handleInput={handleMain}
            />
            <CustomInput
                label="Total Boxes"
                value={total_boxes}
                item="total_boxes"
                handleInput={handleMain}
            />

            <CustomInput
                label="Total Pallets"
                value={ totalPallets.toString() }
                item="total_pallets"
                editable={false}
                handleInput={handleMain}
            />

            <CustomInput
                label="Quality"
                value={quality}
                item="quality"
                handleInput={handleMain}
            />
            <CustomInput
                label="Transport"
                value={transport}
                item="transport"
                handleInput={handleMain}
            />

            <CustomInput
                label="Purchase Order"
                value={purchase_order}
                item="purchase_order"
                handleInput={handleMain}
            />
            <CustomInput
                label="Delivery Note / AWB Number"
                value={delivery_note}
                item="delivery_note"
                handleInput={handleMain}
            />
            <CustomInput
                label="Warehouse"
                value={warehouse}
                item="warehouse"
                handleInput={handleMain}
            />

            <CustomInput
                label="Samples"
                value={samples}
                item="samples"
                handleInput={handleMain}
            />
            <CustomInput
                label="Kilos"
                value={kilos}
                item="kilos"
                handleInput={handleMain}
            />
            <CustomInput
                label="Format Gr"
                value={format_gr}
                item="format_gr"
                handleInput={handleMain}
            />
           
        </View>
    )
}
