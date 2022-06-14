import { v4 as uuidv4 } from 'uuid';

export interface PreReport {
    id: string,
    qcScore?: string | null,
    qcGrade?: string | null,
    action?: string | null,
}

export interface PreReportComments {
    qcScore?: string | null,
    qcGrade?: string | null,
    action?: string | null,
}
// export interface PreReport {
//     id: string,
//     qcScore: "bad" | "poor" | "fair" | "good" | "very good" | null,
//     qcGrade: "extra" | "cat1" | "borderline cat1" | "cat2" | "borderline cat2" | "industry" | null,
//     action: "suitable for storage" | "suitable for departure" | "suitable for QC check" | "hold" | "rejected" | null,
// }


export const palletPreReport = (): PreReport => {
    return {
        id: uuidv4(),
        qcScore: "0",
        qcGrade: "0",
        action: "0",
    }
}

export const scoreComment = (score = 0): JSX.Element => {

    if (score === 1) {
        return <p>
            The Obtained Score during inspection is <strong>"Bad"</strong>, <u>This batch is not suitable for fresh consumption</u>, a credit note for the value of the rejected fruit will be requested, please contact our commercial representative.
        </p>
    }
    if (score === 2) {
        return <p>The Obtained Score during inspection is <strong>"Poor"</strong>, this batch represents <u>Severe risk</u>, sorting costs will be deducted from the related invoice, in case of rejection a credit note for the value of the rejected fruit will be requested. please contact our commercial representative.
        </p>

    }
    if (score === 3) {
        return <p>The Obtained Score during inspection is <strong>"Fair"</strong>, this batch represents <u>Moderate risk</u>. In case of sorting costs will be deducted from the related invoice, in case of rejection a credit note for the value of the rejected fruit will be requested. please contact our commercial representative.</p>


    }
    if (score === 5) {
        return <p>No comments</p>

    }
    if (score === 6) {
        return <p>No comments</p>

    } else {
        return <p>No comments</p>
    }

}

export const gradeComment = (score = 0) => {

    if (score === 1) {
        return <p>Product is not suitable for fresh consumption, Please take corrective action.</p>
    }
    if (score === 2) {
        return <p>Product is "Borderline CAT2", This product is almost out of specification for CAT2, please take corrective action.</p>

    }
    if (score === 3) {
        return <p>Product is "CAT2", This product is out of specification for CAT1, please take corrective action.</p>

    }
    if (score === 4) {
        return <p>Product is "Borderline CAT1", This product is almost out of specification for CAT1, please take corrective action.</p>

    }
    if (score === 5) {
        return <p>No comments</p>
    }

    if (score === 6) {
        return <p>No comments</p>

    } else {
        return <p>No comments</p>
    }

}

export const actionComment = (score = 0) => {

    if (score === 1) {
        return <p>Fruit is Rejected, please contact our commercial department. A credit note will be requiered for the total amount of the related invoice.</p>
    }
    if (score === 2) {
        return <p>Fruit is on Hold, please contact our commercial department. Fruit represents <u>Severe Risk</u></p>

    }
    if (score === 3) {
        return <p>Fruit can not go out before quality check is made. Fruit represents <u>Moderate Risk</u></p>

    }
    if (score === 4) {
        return <p>No comments</p>

    }
    if (score === 5) {
        return <p>No comments</p>

    } else {
        return <p>No comments</p>
    }

}