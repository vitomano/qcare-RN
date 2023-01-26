import { Action, Fruit, Grade } from '../interfaces/interfaces';


type PropsFruit = {
    value: Fruit,
    label: string
}

type PropsGrade = {
    value: string,
    label: Grade
}

type PropsAction = {
    value: string,
    label: Action
}


export const FRUITS:PropsFruit[] = [
    { value: "strawberries", label: "Strawberries" },
    { value: "raspberries", label: "Raspberries" },
    { value: "blackberries", label: "Blackberries" },
    { value: "blueberries", label: "Blueberries" },
    { value: "pears", label: "Pears" },
    { value: "figs", label: "Figs" },
    { value: "kiwiberries", label: "Kiwiberries" },
    { value: "apples", label: "Apples" },
    { value: "cherries", label: "Cherries" },
    { value: "other", label: "Other" },
]

export const GRADE:PropsGrade[] = [
    { value: "0", label: "Select a Grade" },
    { value: "1", label: "Industry" },
    { value: "2", label: "Borderline CAT 2" },
    { value: "3", label: "CAT 2" },
    { value: "4", label: "Borderline CAT 1" },
    { value: "5", label: "CAT 1" },
    { value: "6", label: "Extra" },
]

export const ACTION:PropsAction[] = [
    { value: "0", label: "Select an Action" },
    { value: "1", label: "Dump" },
    { value: "2", label: "Rejected" },
    { value: "3", label: "Hold" },
    { value: "4", label: "Priority for Departure" },
    { value: "5", label: "Suitable for QC check/REPACK" },
    { value: "6", label: "Suitable for Departure" },
    { value: "7", label: "Suitable for Storage" },
]

export const SCORE = [
    { value: "0", label: "Select a Score" },
    { value: "1", label: "1 of 8" },
    { value: "2", label: "2 of 8" },
    { value: "3", label: "3 of 8" },
    { value: "4", label: "4 of 8" },
    { value: "5", label: "5 of 8" },
    { value: "6", label: "6 of 8" },
    { value: "7", label: "7 of 8" },
    { value: "8", label: "8 of 8" }
]

export const PALLETTYPE = [
    { value: "0", label: "Select a Pallet type" },
    { value: "Wooden Block pallet", label:  "Wooden Block pallet" },
    { value: "Wooden Euro pallet", label:   "Wooden Euro pallet" },
    { value: "Wooden Air pallet", label:    "Wooden Air pallet" },
    { value: "Plastic Block pallet", label: "Plastic Block pallet" },
    { value: "Plastic Euro pallet", label:  "Plastic Euro pallet" },
    { value: "Plastic Air pallet", label:   "Plastic Air pallet" },
    { value: "One Way Block pallet", label: "One Way Block pallet" },
    { value: "One Way Euro pallet", label:  "One Way Euro pallet" },
    { value: "One Way Air pallet", label:   "One Way Air pallet" },
    { value: "Other", label:                "Other" },
]


export const STATUS = [
    { value: 'pending', label: "PENDING", selected: false, color: "#80868B", fill: "#e3e4e5" },
    { value: 'in-process', label: "IN PROCESS", selected: false, color: "#dd8100", fill: "#ffe4b3" },
    { value: 'done', label: "DONE", selected: false, color: "#1a9141", fill: "#cdeece" },
]