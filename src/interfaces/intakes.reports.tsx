import { ActionNum, Fruit, GradeNum, ScoreNum } from './interfaces';
import { TeamsName, User } from "./interfaces.auth";

export interface ObjectType {
    [key:string] : string
}

export interface ObjectArray {
    key: string,
    value: string
}

// export type MainData = Record<string, string | number | null | undefined>
export type MainData = Record<string, string>

export interface IntakeCSV {
    id:         string;
    inCharge:   string | null;
    team:       string | null;
    data:       MainData;
}

export interface IntakesResponse {
    ok:         boolean;
    page:       number;
    totalPages: number;
    intakes:    Intake[];
}

export interface Intake {
    _id:        string;
    data:       MainData;
    user:       string;
    inCharge:   InCharge | null
    team:       TeamsName | null
    createdAt:  string;
    updatedAt:  string;
}

export interface InCharge {
    uid:        string;
    name:       string;
    lastname:   string;
}

export interface EntriesResponse {
    ok:         boolean;
    msg:        string;
    entries:    Intake[];
}

export interface SingleIntake {
    ok:             boolean;
    msg:            string;
    intakeReport:   Intake;
}



// Responde to Finish Report --------------------------------------

export interface IntakeSingleResponse {
    ok?:            boolean;
    msg:            string;
    intakeReport:   IntakeData;
}

export interface IntakeData {
    _id:            string;
    discrepancies:  ObjectType | null;
    palletRef:      string;
    fruit:          Fruit;
    pallets:        PrereportPallet[];
    formatGr:       string;
    mainData:       MainData;
    user:           UserInCharge;
    score:          string;
    grade:          string;
    action:         string;
    startDate:      string;
    endDate:        string;
    team:           string | null; 
}

export interface UserInCharge {
    uid:        string;
    name:       string;
    lastname:   string;
}

// END Responde to Finish Report --------------------------------------

export interface UserPop {
    name:   string,
    uid:    string
}

export interface AllReports {
    msg:            string;
    singleReport:   SingleReport;
}

export interface Pallet {
    pid:        string;
    details:    Details;
    score:      ScoreNum;
    images:     ImageType[];
    prereport:  PrereportPallet | null;
    addGrower:  NewGrower | null;
}

export interface PrereportDone {
    score:      ScoreNum;
    grade:      GradeNum;
    action:     ActionNum;
    details:    Details;
    images:     ImageType[];
}

export interface SingleReport {
    _id: string;
    palletRef: string;
    comments:  string;
    fruit:     string;
    pallets:   Pallet[];
    formatGr:  number;
    score:     ScoreNum;
    mainData:  MainData;
    date:      string;
    team:      string | null;
    inCharge:  string | null;
}

export interface AllReportsResponse {
    ok:         boolean;
    page:       number;
    totalPages: number;
    reports:    SingleReport[];
}

export interface FilterResponse {
    ok:         boolean;
    page:       number;
    totalPages: number;
    result:     SingleReport[];
    fruit:      Fruit,
    score:      ScoreNum,
    total:      number
    pageSize:   number
}

export interface SingleReportResponse {
    msg:            string;
    singleReport:   Report;
}

export interface Report {
    _id:        string;
    palletRef:  string;
    comments:   string;
    fruit:      string;
    pallets:    Pallet[];
    formatGr:   number;
    score:      ScoreNum;
    mainData:   MainData;
    user:       UserData;
    date:       string;
    team:       string | null;
}

export interface UserData {
    name: string;
    lastname: string;
    uid: string
}


export interface Details {
    labels:     DetailObject[];
    appareance: DetailObject[];
    pallgrow:   DetailObject[];
}

export interface DetailObject {
    check:      boolean;
    tipe:       "checkbox" | "text" | "range" | "number" | "arrays" | "select";
    label:      string;
    name:       string;
    valor:      string | boolean | number | string[];
    minVal?:    number;
    maxVal?:    number;
    arrays?:    object[] | number;
    photo?:     ImageTemp | ImageType | null;
    // photo?:     ImageType[] | null;
}

export interface Label {
    check:  boolean;
    tipe:   string;
    label:  string;
    name:   string;
    valor:  boolean | string;
}

export interface Appareance {
    check:      boolean;
    tipe:       string;
    label:      string;
    name?:      string;
    valor?:     string[] | boolean | number | string;
    minVal?:    number;
    maxVal?:    number;
    arrays?:    object[] | number;
}

export interface Pallgrow {
    check:  boolean;
    tipe:   string;
    label:  string;
    name:   string;
    valor:  string[] | string;
}



//Pre Reports----------------------------------------------------

export interface NewGrower {
    grower_variety: string,
    boxes: string,
}


export interface PrereportsResponse {
    ok:         boolean;
    page:       number;
    totalPages: number;
    prereports: Prereport[];
}

export interface SinglePreReportResponse {
    ok:              boolean;
    msg:             string;
    singlePreReport: Prereport;
}


export interface Prereport {
    _id:            string;
    discrepancies:  ObjectType | null;
    palletRef:      string;
    fruit:          string;
    pallets:        PrereportPallet[];
    formatGr:       string;
    mainData:       MainData;
    user:           UserPop;
    score:          ScoreNum;
    grade:          GradeNum;
    action:         ActionNum;
    startDate:      string;
    endDate:        string;
    team?:          string | null;
}

export interface PrereportPallet {
    pid:        string;
    details:    Details;
    score:      ScoreNum;
    grade:      GradeNum;
    action:     ActionNum;
    images:     ImageType[];
    addGrower:  NewGrower | null;
}

export interface ImageType {
    imgURL:     string;
    imgURL_low: string;
    key:        string;
    key_low:    string;
}

export interface ImageTemp {
    uri:    string | undefined;
    type:   string | undefined;
    name:   string | undefined 
}


// DATA ----------------------------------------------

export interface DataPrereport {
    id:         string,
    score:      ScoreNum,
    grade:      string,
    action:     string,
    images:     ImageTemp[],
    newGrower:  NewGrower | null,
    labels:     DetailObject[],
    appareance: DetailObject[],
    pallgrow:   DetailObject[],
}

export interface PalletState {
    id:         string;
    samples:    number | string,
    score:      ScoreNum;
    images:     ImageTemp[],
    labels:     DetailObject[];
    appareance: DetailObject[];
    pallgrow:   DetailObject[];
    prereport?: PrereportPallet | null
    addGrower?: NewGrower | null

    newGrower?: NewGrower | null
}

export interface DataReports {
    id:         string,
    samples?:   number | string,
    score:      ScoreNum,
    grade?:     string,
    action?:    string,
    images:     object[],
    newGrower?: NewGrower | null,
    prereport?: PrereportPallet | null
    addGrower?: NewGrower | null
    labels:     DetailObject[],
    appareance: DetailObject[],
    pallgrow:   DetailObject[],
}