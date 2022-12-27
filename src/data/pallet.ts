import { PalletState } from '../interfaces/intakes.reports';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';



export const palletDataBerries = (allSamples = 1):PalletState => {
    return {
        id: uuidv4(),
        samples: allSamples,
        score: "0",
        images: [],
        labels: [],
        appareance: [
            { check: true, tipe: "checkbox", label: "Insect", name: "insect", valor: true },
            { check: true, tipe: "range", label: "Fresh", name: "fresh", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Size", name: "size", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Coloration", name: "coloration", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Taste", name: "taste", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "checkbox", label: "Pollution", name: "pollution", valor: true },
            { check: true, tipe: "checkbox", label: "Humidity", name: "humidity", valor: true },
            { check: true, tipe: "checkbox", label: "Juicing", name: "juicing", valor: true },
            { check: true, tipe: "checkbox", label: "Wet", name: "wet", valor: true },

            { check: true, tipe: "arrays", name: "brix", label: "Brix", arrays: 2, valor: ["", ""] },
            { check: true, tipe: "arrays", name: "weight_check", label: "Weight Check", arrays: 4, valor: ["", "", "", ""] },
        ],
        pallgrow: [
            { check: true, tipe: "number", label: "Weight 10 Fruits", name: "weight_10", valor: "" },

            { check: false, tipe: "arrays", label: "Rot", name: "rot", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Mould", name: "mould", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Wet/Open Berries", name: "wet_open", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Split", name: "split", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Dehydration", name: "dehydration", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Soft", name: "soft", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Sensitive", name: "sensitive", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Misformed", name: "misformed", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Damage", name: "damage", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Unripe", name: "unripe", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Undersized", name: "undersized", valor: new Array(Number(allSamples)).fill("0") },
        ]
    }
}

export const palletDataRaspberries = (allSamples = 1):PalletState => {
    return {
        id: uuidv4(),
        samples: allSamples,
        score: "0",
        images: [],
        labels: [],
        appareance: [
            { check: true, tipe: "checkbox", label: "Insect", name: "insect", valor: true },
            { check: true, tipe: "range", label: "Fresh", name: "fresh", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Size", name: "size", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Coloration", name: "coloration", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Taste", name: "taste", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "checkbox", label: "Pollution", name: "pollution", valor: true },
            { check: true, tipe: "checkbox", label: "Humidity", name: "humidity", valor: true },
            { check: true, tipe: "checkbox", label: "Juicing", name: "juicing", valor: true },
            { check: true, tipe: "checkbox", label: "Wet", name: "wet", valor: true },

            { check: true, tipe: "arrays", name: "brix", label: "Brix", arrays: 2, valor: ["", ""] },
            { check: true, tipe: "arrays", name: "weight_check", label: "Weight Check", arrays: 4, valor: ["", "", "", ""] },
        ],
        pallgrow: [
            { check: true, tipe: "number", label: "Weight 10 Fruits", name: "weight_10", valor: "" },

            { check: false, tipe: "arrays", label: "Undersized", name: "undersized", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Scars", name: "scars", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Misformed", name: "misformed", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Unripe", name: "unripe", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Missing Calyxes", name: "missing_calyxes", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Insect damage", name: "insect_damage", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Not well developed", name: "not_well_developed", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Residue / Dirt", name: "residue_dirt", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Sensitive", name: "sensitive", valor: new Array(Number(allSamples)).fill("0") },

            { check: false, tipe: "arrays", label: "Wounds", name: "wounds", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Water cells", name: "water_cells", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Crumbled berries", name: "crumbled berries", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Chrushed", name: "chrushed", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Leaking", name: "leaking", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Dehydration", name: "dehydration", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Soft", name: "soft", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Overripe", name: "overripe", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Grub presence", name: "grub_presence", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Mould hotspot", name: "mould_hotspot", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Rot hotspot", name: "rot_hotspot", valor: new Array(Number(allSamples)).fill("0") },

            { check: false, tipe: "arrays", label: "Rot", name: "rot", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Decay", name: "decay", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Mould", name: "mould", valor: new Array(Number(allSamples)).fill("0") },

        ]
    }
}

export const palletDataBlackberries = (allSamples = 1):PalletState => {
    return {
        id: uuidv4(),
        samples: allSamples,
        score: "0",
        images: [],
        labels: [],
        appareance: [
            { check: true, tipe: "checkbox", label: "Insect", name: "insect", valor: true },
            { check: true, tipe: "range", label: "Fresh", name: "fresh", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Size", name: "size", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Coloration", name: "coloration", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Taste", name: "taste", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "checkbox", label: "Pollution", name: "pollution", valor: true },
            { check: true, tipe: "checkbox", label: "Humidity", name: "humidity", valor: true },
            { check: true, tipe: "checkbox", label: "Juicing", name: "juicing", valor: true },
            { check: true, tipe: "checkbox", label: "Wet", name: "wet", valor: true },

            { check: true, tipe: "arrays", name: "brix", label: "Brix", arrays: 2, valor: ["", ""] },
            { check: true, tipe: "arrays", name: "weight_check", label: "Weight Check", arrays: 4, valor: ["", "", "", ""] },
        ],
        pallgrow: [
            { check: true, tipe: "number", label: "Weight 10 Fruits", name: "weight_10", valor: "" },

            { check: false, tipe: "arrays", label: "Undersized", name: "undersized", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Scars wounds", name: "scars_wounds", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Deformed", name: "deformed", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Unripe", name: "unripe", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Insect damage", name: "insect_damage", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Not well developed", name: "not_well_developed", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Residue / Dirt", name: "residue_dirt", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Red drupelets", name: "red_drupelets", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Sensitive", name: "sensitive", valor: new Array(Number(allSamples)).fill("0") },


            { check: false, tipe: "arrays", label: "Insect presence", name: "insect_presence", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Wounds", name: "wounds", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Dehydration", name: "dehydration", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Chrushed", name: "chrushed", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Leaking", name: "leaking", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Overripe", name: "overripe", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Grub presence", name: "grub_presence", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Soft", name: "soft", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Mould hotspot", name: "mould_hotspot", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Rot hotspot", name: "rot_hotspot", valor: new Array(Number(allSamples)).fill("0") },

            { check: false, tipe: "arrays", label: "Rot", name: "rot", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Decay", name: "decay", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Mould", name: "mould", valor: new Array(Number(allSamples)).fill("0") },

        ]
    }
}

export const palletDataBlueberries = (allSamples = 1):PalletState => {
    return {
        id: uuidv4(),
        samples: allSamples,
        score: "0",
        images: [],
        labels: [],
        appareance: [
            { check: true, tipe: "checkbox", label: "Insect", name: "insect", valor: true },
            { check: true, tipe: "range", label: "Fresh", name: "fresh", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Size", name: "size", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Coloration", name: "coloration", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Taste", name: "taste", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "checkbox", label: "Pollution", name: "pollution", valor: true },
            { check: true, tipe: "checkbox", label: "Humidity", name: "humidity", valor: true },
            { check: true, tipe: "checkbox", label: "Juicing", name: "juicing", valor: true },
            { check: true, tipe: "checkbox", label: "Wet", name: "wet", valor: true },

            { check: true, tipe: "arrays", name: "brix", label: "Brix", arrays: 2, valor: ["", ""] },
            { check: true, tipe: "arrays", name: "weight_check", label: "Weight Check", arrays: 4, valor: ["", "", "", ""] },
        ],
        pallgrow: [
            { check: true, tipe: "number", label: "Weight 10 Fruits", name: "weight_10", valor: "" },

            { check: false, tipe: "arrays", label: "Undersized", name: "undersized", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Underripe green", name: "underripe_green", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Underripe red", name: "underripe_red", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Russet / Scar", name: "russet_scar", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Floral remains", name: "floral_remains", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Stems", name: "stems", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Insect damage", name: "insect_damage", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Insect presence", name: "insect_presence", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Pruineless", name: "pruineless", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Sensitive", name: "sensitive", valor: new Array(Number(allSamples)).fill("0") },

            { check: false, tipe: "arrays", label: "Wounds", name: "wounds", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Juicing / Exudated berry", name: "juicing_exudated_berry", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Peeled steam insterion", name: "peeled_steam_insterion", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Crushed berries", name: "crushed_berries", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Mechanical damage", name: "mechanical_damage", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Grub presence", name: "grub_presence", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Soft", name: "soft", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Overripe", name: "overripe", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Bruising", name: "bruising", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Dehydration", name: "dehydration", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Hail damage", name: "hail_damage", valor: new Array(Number(allSamples)).fill("0") },

            { check: false, tipe: "arrays", label: "Rot", name: "rot", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Decay", name: "decay", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Mould", name: "mould", valor: new Array(Number(allSamples)).fill("0") },
        ]
    }
}

export const palletDataPears = (allSamples = 1):PalletState => {
    return {
        id: uuidv4(),
        samples: allSamples,
        score: "0",
        images: [],
        labels: [],
        appareance: [
            { check: true, tipe: "checkbox", label: "Insect", name: "insect", valor: true },
            { check: true, tipe: "range", label: "Fresh", name: "fresh", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Size", name: "size", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Coloration", name: "coloration", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Taste", name: "taste", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "checkbox", label: "Pollution", name: "pollution", valor: true },
            { check: true, tipe: "checkbox", label: "Humidity", name: "humidity", valor: true },
            { check: true, tipe: "checkbox", label: "Juicing", name: "juicing", valor: true },
            { check: true, tipe: "checkbox", label: "Wet", name: "wet", valor: true },

            { check: true, tipe: "arrays", name: "brix", label: "Brix", arrays: 2, valor: ["", ""] },
            { check: true, tipe: "arrays", name: "weight_check", label: "Weight Check", arrays: 4, valor: ["", "", "", ""] },
        ],
        pallgrow: [
            { check: true, tipe: "number", label: "Weight 10 Fruits", name: "weight_10", valor: "" },

            { check: false, tipe: "arrays", label: "Skin Deffects", name: "skin_deffects", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Cracks", name: "cracks", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Injury of the Stalk Cavity", name: "injury_stalkCavity", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Mechanical Damage", name: "mechanical_damage", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Bruising", name: "bruising", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Russeting", name: "russeting", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Fresh Crack", name: "fresh_crack", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Sensitive", name: "sensitive", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Dry Crack", name: "dry_crack", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Miss Shape", name: "miss_shape", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Bronze Color", name: "bronze_color", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Undersized", name: "undersized", valor: new Array(Number(allSamples)).fill("0") },

            { check: false, tipe: "arrays", label: "Severe Mechanical Damage", name: "severe_mechanicalDamage", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Severe Bruising", name: "severe_bruising", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Severe Russeting", name: "severe_russeting", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Severe Bronze Color", name: "severe_bronzeColor", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Rotting", name: "rotting", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Sunburn", name: "sunburn", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Brown Heart/Cavities", name: "brown_heartCavities", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Core Breakdowns", name: "core_breakdowns", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Scald", name: "scald", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Grittiness", name: "grittiness", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Hail Damage", name: "hail_damage", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Severe Hail Damage", name: "severe_hailDamage", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Scab", name: "scab", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Severe Scab", name: "severe_scab", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Insect Damage", name: "insect_damage", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Animal Damage", name: "animal_damage", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Insect", name: "insect", valor: new Array(Number(allSamples)).fill("0") },
        ]
    }
}

export const palletDataApples = (allSamples = 1):PalletState => {
    return {
        id: uuidv4(),
        samples: allSamples,
        score: "0",
        images: [],
        labels: [],
        appareance: [
            { check: true, tipe: "checkbox", label: "Insect", name: "insect", valor: true },
            { check: true, tipe: "range", label: "Fresh", name: "fresh", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Size", name: "size", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Coloration", name: "coloration", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Taste", name: "taste", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "checkbox", label: "Pollution", name: "pollution", valor: true },
            { check: true, tipe: "checkbox", label: "Humidity", name: "humidity", valor: true },
            { check: true, tipe: "checkbox", label: "Juicing", name: "juicing", valor: true },
            { check: true, tipe: "checkbox", label: "Wet", name: "wet", valor: true },

            { check: true, tipe: "arrays", name: "brix", label: "Brix", arrays: 2, valor: ["", ""] },
            { check: true, tipe: "arrays", name: "weight_check", label: "Weight Check", arrays: 4, valor: ["", "", "", ""] },
        ],
        pallgrow: [
            { check: true, tipe: "number", label: "Weight 10 Fruits", name: "weight_10", valor: "" },

            { check: false, tipe: "arrays", label: "Bruising", name: "bruising", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Injury of the Stalk Cavity", name: "injury_stalkCavity", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Hail Damage", name: "hail_damage", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Lenticel", name: "lenticel", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Lenticel Spots", name: "lenticel_spots", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Misshaped", name: "misshaped", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Mold on blossom end", name: "Mold_blossomEnd", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Mold on stem end", name: "Mold_stemEnd", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Punctures", name: "punctures", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Russeting", name: "russeting", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Scab", name: "scab", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Scarring", name: "scarring", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Shrivelling", name: "shrivelling", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Skin Deffects", name: "skin_deffects", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Sunburn", name: "sunburn", valor: new Array(Number(allSamples)).fill("0") },


            { check: false, tipe: "arrays", label: "Rot", name: "rot", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Bitterpit", name: "bitterpit", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Brown Core", name: "brown_core", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Bruising", name: "bruising", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Decay", name: "decay", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Freezing Injury", name: "freezing_injury", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Insect Injuries", name: "insect_injuries", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Insects", name: "insects", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Internal Browning", name: "internal_browning", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "LTD", name: "ltd", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Lenticel Spots (Heavy)", name: "lenticel_spots", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Mold", name: "mold", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Open Injuries", name: "open_injuries", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Residue", name: "residue", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Ruseting", name: "ruseting", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Scald", name: "scald", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Shriveling (Heavy)", name: "shriveling_heavy", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Sooty Mold", name: "sooty_mold", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Water Core", name: "water_core", valor: new Array(Number(allSamples)).fill("0") },

        ]
    }
}

export const palletDataCherries = (allSamples = 1):PalletState => {
    return {
        id: uuidv4(),
        samples: allSamples,
        score: "0",
        images: [],
        labels: [],
        appareance: [
            { check: true, tipe: "checkbox", label: "Insect", name: "insect", valor: true },
            { check: true, tipe: "range", label: "Fresh", name: "fresh", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Size", name: "size", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Coloration", name: "coloration", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "range", label: "Taste", name: "taste", minVal: 1, maxVal: 10, valor: 1 },
            { check: true, tipe: "checkbox", label: "Pollution", name: "pollution", valor: true },
            { check: true, tipe: "checkbox", label: "Humidity", name: "humidity", valor: true },
            { check: true, tipe: "checkbox", label: "Juicing", name: "juicing", valor: true },
            { check: true, tipe: "checkbox", label: "Wet", name: "wet", valor: true },

            { check: true, tipe: "arrays", name: "brix", label: "Brix", arrays: 2, valor: ["", ""] },
            { check: true, tipe: "arrays", name: "weight_check", label: "Weight Check", arrays: 4, valor: ["", "", "", ""] },
        ],
        pallgrow: [
            { check: true, tipe: "number", label: "Weight 10 Fruits", name: "weight_10", valor: "" },

            { check: false, tipe: "arrays", label: "Handling Damage", name: "handling_damage", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Skin Deffects", name: "skin_deffects", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Blemishes", name: "blemishes", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Bruising", name: "bruising", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Cracked Fresh", name: "cracked_fresh", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Discolored", name: "discolored", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Doubles", name: "doubles", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Fruit split in cavity", name: "fruit_splitCavity", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Hail Damage", name: "hail_damage", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Harvest Damage", name: "harvest_damage", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Mechanical Damage", name: "mechanical_damage", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Pitting", name: "pitting", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Sensitive", name: "sensitive", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Soft", name: "soft", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Too Ripe", name: "ripe", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Undersized", name: "undersized", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Unripe Fruit", name: "unripe_fruit", valor: new Array(Number(allSamples)).fill("0") },


            { check: false, tipe: "arrays", label: "Mold", name: "mold", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Rot", name: "rot", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Botrytis", name: "botrytis", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Chilling Injury", name: "chilling_injury", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Concentric Cracking", name: "concentric_cracking", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Freezing Injury", name: "freezing_injury", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Insects", name: "insects", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Internal Breakdown", name: "internal_breakdown", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Internal Browning", name: "internal_browning", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "LTD", name: "ltd", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Open Injuries", name: "open_injuries", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Residue", name: "residue", valor: new Array(Number(allSamples)).fill("0") },
            { check: false, tipe: "arrays", label: "Ruseting", name: "ruseting", valor: new Array(Number(allSamples)).fill("0") },
        ]
    }
}


export const palletData = (fruit = "other", samples = 1):PalletState => {

    if (fruit === "pears") { return palletDataPears(samples) }
    else if (fruit === "apples") { return palletDataApples(samples) }
    else if (fruit === "cherries") { return palletDataCherries(samples) }
    else if (fruit === "blueberries") { return palletDataBlueberries(samples) }
    else if (fruit === "blackberries") { return palletDataBlackberries(samples) }
    else if (fruit === "raspberries") { return palletDataRaspberries(samples) }
    else { return palletDataBerries(samples) }

};