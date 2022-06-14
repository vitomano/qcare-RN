
export interface CVSResponse {
    product: string;
    pallet: string;
    format: string;
    supplier: string;
    grower: string;
    origin: string;
    ['gln/ggn number']: string;
    ["variety(ies)"]: string;
    ["unit label"]: string;
    ["total boxes"]: string;
    ["total pallets"]: number;
    quality: string;
    transport: string;
    ["purchase order"]: string;
    ["delivery note / awb number"]: string;
    warehouse: string;
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
    total_pallets: number;
    quality: string;
    transport: string;
    purchase_order: string;
    delivery_note: string;
    warehouse: string;

    samples?: number,
    kilos?: number,
    formatGr?: number
}

export interface MainInfo extends BatchInfo {
    samples?: number,
    kilos?: number,
    formatGr?: number,
}

export interface IntakesResponse {
    ok: boolean;
    msg: string;
    intakes?: Intake[];
    prereports?: Intake[];
    repacks?: Intake[];
}

export interface EntriesResponse {
    ok: boolean;
    msg: string;
    entries: Intake[];
}

export interface IntakeResponse {
    ok: boolean;
    msg: string;
    intakeReport: Intake;
}

export interface Intake {
    _id: string;
    data: BatchInfo;
    preReport: PreReport;
    user: string | UserPop;
    fruit: string
}

export interface UserPop {
    name: string,
    uid: string
}

export interface PreReport {
    done: boolean;
    score?: string;
    grade?: string;
    action?: string;
}


export interface PreReportResponse {
    ok: boolean;
    msg: string;
    intake: Intake;
}