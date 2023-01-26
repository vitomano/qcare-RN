export type Fruit =
| "blueberries" 
| "strawberries" 
| "raspberries" 
| "blackberries" 
| "pears" 
| "figs" 
| "kiwiberries" 
| "apples" 
| "cherries" 
| "other"

export type Grade =
| "Select a Grade"
| "Industry"
| "Borderline CAT 2"
| "CAT 2"
| "Borderline CAT 1"
| "CAT 1"
| "Extra"

export type Action =
| "Select an Action"
| "Dump"
| "Rejected"
| "Hold"
| "Priority for Departure"
| "Suitable for QC check/REPACK"
| "Suitable for Departure"
| "Suitable for Storage"

export type Status =
| "grade"
| "action"
| "score"

export type QueryType =
| "fruit"
| "score"
| "grower"
| "status"
| "supplier"
| "palletRef"
| "deliveryNote"
| "startDate"
| "endDate"


export type DetailName = "labels" | "appareance" | "pallgrow"

export type GradeNum = "0" | "1" | "2" | "3" | "4" | "5" | "6"
export type ActionNum = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7"
export type ScoreNum = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"




//----------------------------------

