import { ActionNum, Fruit, GradeNum, ScoreNum } from './interfaces';
import { User } from "./interfaces.auth";

export interface ObjectType {
    [key:string] : string
}

export interface IntakeCSV {
    id:         string;
    inCharge:   string | null;
    team:       string | null;
    data:       ObjectType;
}

export interface BatchInfo {

    product: string;
    pallet_ref: string;
    format: string;
    supplier: string;
    grower: string;
    origin: string;
    gln_ggn: string;
    variety: string;
    unit_label: string;
    total_boxes: string;
    total_pallets: string;
    quality: string;
    transport: string;
    purchase_order: string;
    delivery_note: string;
    warehouse: string;

    samples?: string | undefined,
    kilos?: string | undefined,
    format_gr?: string | undefined
}

export interface MainInfo extends BatchInfo {
    samples: string,
    kilos: string,
    format_gr: string,
}

export interface IntakesResponse {
    ok: boolean;
    msg: string;
    intakes?: Intake[];
}

export interface EntriesResponse {
    ok: boolean;
    msg: string;
    entries: Intake[];
}

export interface SingleIntake {
    ok: boolean;
    msg: string;
    intakeReport: Intake;
}

export interface Intake {
    _id: string;
    data: MainInfo;
    user: string;
}

// Responde to Finish Report --------------------------------------

export interface IntakeSingleResponse {
    ok?: boolean;
    msg: string;
    intakeReport: IntakeData;
}

export interface IntakeData {
    _id: string;
    palletRef: string;
    fruit: Fruit;
    pallets: PrereportPallet[];
    formatGr: string;
    mainData: MainInfo | null;
    user: string;
    score: string;
    grade: string;
    action: string;
    startDate: string;
    endDate: string;
}

// END Responde to Finish Report --------------------------------------


export interface UserPop {
    name: string,
    uid: string
}


export interface AllReports {
    msg: string;
    singleReport: SingleReport;
}

export interface Pallet {
    pid: string;
    details: Details;
    score: ScoreNum;
    images: ImageType[];
    prereport: PrereportPallet | null;
    addGrower: NewGrower | null;

}

export interface PrereportDone {
    score: ScoreNum;
    grade: GradeNum;
    action: ActionNum;
    details: Details;
    images: ImageType[];
}

export interface SingleReport {
    _id: string;
    palletRef: string;
    comments: string;
    fruit: string;
    pallets: Pallet[];
    formatGr: number;
    score: ScoreNum;
    mainData: MainInfo;
    date: string;
}

export interface AllReportsResponse {
    ok: boolean;
    page: number;
    totalPages: number;
    reports: SingleReport[];
}

export interface FilterResponse {
    ok: boolean;
    page: number;
    totalPages: number;
    result: SingleReport[];
    fruit: Fruit,
    score: ScoreNum,
    total: number
    pageSize: number
}

export interface SingleReportResponse {
    msg: string;
    singleReport: Report;
}

export interface Report {
    _id: string;
    palletRef: string;
    comments: string;
    fruit: string;
    pallets: Pallet[];
    formatGr: number;
    score: ScoreNum;
    mainData: MainInfo;
    user?: User;
    date: string;
}


export interface Details {
    labels: DetailObject[];
    appareance: DetailObject[];
    pallgrow: DetailObject[];
}

export interface DetailObject {
    check: boolean;
    tipe: "checkbox" | "text" | "range" | "number" | "arrays" | "select";
    label: string;
    name: string;
    valor: string | boolean | number | string[];
    minVal?: number;
    maxVal?: number;
    arrays?: object[] | number;
}

export interface Label {
    check: boolean;
    tipe: string;
    label: string;
    name: string;
    valor: boolean | string;
}

export interface Appareance {
    check: boolean;
    tipe: string;
    label: string;
    name?: string;
    valor?: string[] | boolean | number | string;
    minVal?: number;
    maxVal?: number;
    arrays?: object[] | number;
}

export interface Pallgrow {
    check: boolean;
    tipe: string;
    label: string;
    name: string;
    valor: string[] | string;
}



//Pre Reports----------------------------------------------------

export interface NewGrower {
    grower_variety: string,
    boxes: string,
}


export interface PrereportsResponse {
    ok: boolean;
    page: number;
    totalPages: number;
    prereports: Prereport[];
}

export interface SinglePreReportResponse {
    ok: boolean;
    msg: string;
    singlePreReport: Prereport;
}


export interface Prereport {
    _id: string;
    palletRef: string;
    fruit: string;
    pallets: PrereportPallet[];
    formatGr: string;
    mainData: MainInfo;
    user: UserPop;
    score: ScoreNum;
    grade: GradeNum;
    action: ActionNum;
    startDate: string;
    endDate: string;
}

export interface PrereportPallet {
    pid: string;
    details: Details;
    score: ScoreNum;
    grade: GradeNum;
    action: ActionNum;
    images: ImageType[];
    addGrower: NewGrower | null;
}

export interface ImageType {
    imgURL: string;
    imgURL_low: string;
    key: string;
    key_low: string;
}

export interface ImageTemp {
    uri: string | undefined;
    type: string | undefined;
    name: string | undefined 

}


// DATA ----------------------------------------------

export interface DataPrereport {
    id: string,
    score: ScoreNum,
    grade: string,
    action: string,
    images: ImageTemp[],
    newGrower: NewGrower | null,
    labels: DetailObject[],
    appareance: DetailObject[],
    pallgrow: DetailObject[],
}

export interface PalletState {
    id: string;
    samples: number | string,
    score: ScoreNum;
    images: {
        uri: string | undefined;
        type: string | undefined;
        name: string | undefined;
    }[];
    labels: DetailObject[];
    appareance: DetailObject[];
    pallgrow: DetailObject[];
    prereport?: PrereportPallet | null
    addGrower?: NewGrower | null

    newGrower?: NewGrower | null
}

export interface DataReports {
    id: string,
    samples?: number | string,
    score: ScoreNum,
    grade?: string,
    action?: string,
    images: object[],
    newGrower?: NewGrower | null,
    prereport?: PrereportPallet | null
    addGrower?: NewGrower | null
    labels: DetailObject[],
    appareance: DetailObject[],
    pallgrow: DetailObject[],
}