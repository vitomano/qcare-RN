import { DetailObject, PalletState } from '../interfaces/intakes.reports';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { pallgrowApples, pallgrowBerries, pallgrowBlackberries, pallgrowBlueberries, pallgrowCherries, pallgrowPears, pallgrowRaspberries, pallgrowStrawberries } from './pallgrow';
import { Fruit } from '../interfaces/interfaces';


const newlabels:DetailObject[] = [
    { check: true, tipe: "checkbox", label: "Box Label", name: "box_label", valor: true },
    { check: true, tipe: "select", label: "Pallet Type", name: "pallet_type", valor: "" },

    { check: true, tipe: "checkbox", label: "Punnet Label", name: "punnet_label", valor: true },
    { check: true, tipe: "checkbox", label: "Name & Weight", name: "name_weight", valor: true },
    { check: true, tipe: "text", label: "L Code", name: "l_code", valor: "" },
    { check: true, tipe: "text", label: "T Code", name: "t_code", valor: "" },
    { check: true, tipe: "text", label: "EAN Code", name: "ean_code", valor: "" },
    { check: true, tipe: "text", label: "Variety", name: "variety", valor: "" },
]

const newappareance:DetailObject[] = [
    { check: true, tipe: "checkbox", label: "Insect", name: "insect", valor: true },
    { check: true, tipe: "range", label: "Fresh", name: "fresh", minVal: 1, maxVal: 10, valor: 1 },
    { check: true, tipe: "range", label: "Size", name: "size", minVal: 1, maxVal: 10, valor: 1 },
    { check: true, tipe: "range", label: "Coloration", name: "coloration", minVal: 1, maxVal: 10, valor: 1 },
    { check: true, tipe: "range", label: "Taste", name: "taste", minVal: 1, maxVal: 10, valor: 1 },
    { check: true, tipe: "checkbox", label: "Pollution", name: "pollution", valor: true },
    { check: true, tipe: "checkbox", label: "Humidity", name: "humidity", valor: true },
    { check: true, tipe: "checkbox", label: "Juicing", name: "juicing", valor: true },
    { check: true, tipe: "checkbox", label: "Wet", name: "wet", valor: true },

    { check: true, tipe: "range", label: "Pallet Integrity", name: "pallet_integrity", minVal: 1, maxVal: 10, valor: 1 },
    { check: true, tipe: "number", label: "Temperature C", name: "temperature_c", valor: "" },
    { check: true, tipe: "arrays", name: "brix", label: "Brix", arrays: 2, valor: ["", ""] },
    { check: true, tipe: "arrays", name: "weight_check", label: "Weight Check", arrays: 4, valor: ["", "", "", ""] },
]

export const palletDataBerries = (allSamples = 1):PalletState => {
    return {
        id: uuidv4(),
        samples: allSamples,
        score: "0",
        prereport: null,
        newGrower: null,
        images: [],
        labels: [...newlabels],
        appareance: [...newappareance],
        pallgrow: [ ...pallgrowBerries(allSamples) ]

    }
}

export const palletDataRaspberries = (allSamples = 1):PalletState => {
    return {
        id: uuidv4(),
        samples: allSamples,
        score: "0",
        prereport: null,
        newGrower: null,
        images: [],
        labels: [...newlabels],
        appareance: [...newappareance],
        pallgrow: [ ...pallgrowRaspberries(allSamples) ]

    }
}

export const palletDataBlackberries = (allSamples = 1):PalletState => {
    return {
        id: uuidv4(),
        samples: allSamples,
        score: "0",
        prereport: null,
        newGrower: null,
        images: [],
        labels: [...newlabels],
        appareance: [...newappareance],
        pallgrow: [ ...pallgrowBlackberries(allSamples) ]

    }
}

export const palletDataBlueberries = (allSamples = 1):PalletState => {
    return {
        id: uuidv4(),
        samples: allSamples,
        score: "0",
        prereport: null,
        newGrower: null,
        images: [],
        labels: [...newlabels],
        appareance: [...newappareance],
        pallgrow: [ ...pallgrowBlueberries(allSamples) ]

    }
}

export const palletDataPears = (allSamples = 1):PalletState => {
    return {
        id: uuidv4(),
        samples: allSamples,
        score: "0",
        prereport: null,
        newGrower: null,
        images: [],
        labels: [...newlabels],
        appareance: [...newappareance],
        pallgrow: [ ...pallgrowPears(allSamples) ]

    }
}

export const palletDataApples = (allSamples = 1):PalletState => {
    return {
        id: uuidv4(),
        samples: allSamples,
        score: "0",
        prereport: null,
        newGrower: null,
        images: [],
        labels: [...newlabels],
        appareance: [...newappareance],
        pallgrow: [ ...pallgrowApples(allSamples) ]

    }
}

export const palletDataCherries = (allSamples = 1):PalletState => {
    return {
        id: uuidv4(),
        samples: allSamples,
        score: "0",
        prereport: null,
        newGrower: null,
        images: [],
        labels: [...newlabels],
        appareance: [...newappareance],
        pallgrow: [ ...pallgrowCherries(allSamples) ]

    }
}

export const palletDataStrawberries = (allSamples = 1):PalletState => {
    return {
        id: uuidv4(),
        samples: allSamples,
        score: "0",
        images: [],
        prereport: null,
        newGrower: null,
        labels: [...newlabels],
        appareance: [...newappareance],
        pallgrow: [ ...pallgrowStrawberries(allSamples) ]
    }
}


export const palletNewData = (fruit:Fruit = "other", samples = 1):PalletState => {

    if (fruit === "pears") { return palletDataPears(samples) }
    else if (fruit === "apples") { return palletDataApples(samples) }
    else if (fruit === "cherries") { return palletDataCherries(samples) }
    else if (fruit === "blueberries") { return palletDataBlueberries(samples) }
    else if (fruit === "blackberries") { return palletDataBlackberries(samples) }
    else if (fruit === "raspberries") { return palletDataRaspberries(samples) }
    else if (fruit === "strawberries") { return palletDataStrawberries(samples) }

    else { return palletDataBerries(samples) }

};