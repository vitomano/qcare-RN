

export const major = (fruta) => {

    if(fruta === "pears"){
        return [
            "severe_mechanicalDamage",
            "severe_bruising",
            "severe_russeting",
            "severe_bronzeColor",
            "rotting",
            "sunburn",
            "brown_heartCavities",
            "core_breakdowns",
            "scald",
            "grittiness",
            "hail_damage",
            "severe_hailDamage",
            "scab",
            "severe_scab",
            "insect_damage",
            "animal_damage",
            "insect"
        ]
    }
    else if(fruta === "apples"){

        return [
            "rot",
            "bitterpit",
            "brown_core",
            "bruising",
            "decay",
            "freezing_injury",
            "insect_injuries",
            "insects",
            "internal_browning",
            "ltd",
            "lenticel_spots",
            "mold",
            "open_injuries",
            "residue",
            "ruseting",
            "scald",
            "shriveling_heavy",
            "sooty_mold",
            "water_core"
        ]
    }
    else if(fruta === "cherries"){

        return [
            "mold",
            "rot",
            "botrytis",
            "chilling_injury",
            "concentric_cracking",
            "freezing_injury",
            "insects",
            "internal_breakdown",
            "internal_browning",
            "ltd",
            "open_injuries",
            "residue",
            "ruseting"
        ]
    } else {
        return [
            "rot",
            "mould",
            "wet_open",
            "split"
        ]
    }
   
} 