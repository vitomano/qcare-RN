
type Scores = 'Bad' | 'Poor' | 'Fair' | 'Good' | 'Very Good' | 'No Score'
type Grades = 'Industry' | 'Borderline CAT2' | 'CAT2' | 'Borderline CAT1' | 'CAT1' | 'Extra' | 'No Grade'
type Actions = 'Rejected' | 'Hold' | 'Suitable for Repack' | 'Suitable for Departure' | 'Suitable for Storage' | 'No Action'
// type Actions = 'Rejected' | 'Hold' | 'Suitable for QC Check' | 'Suitable for Departure' | 'Suitable for Storage' | 'No Action'

export const numToScore = (s: string | number = '0'): Scores => {
    const num = Number(s)

    switch (num) {
        case 0: return 'No Score'
        case 1: return 'Bad'
        case 2: return 'Poor'
        case 3: return 'Fair'
        case 4: return 'Good'
        case 5: return 'Very Good'
        default: return 'No Score';
    }
}

export const numToGrade = (s: string | number = '0'): Grades => {
    const num = Number(s)

    switch (num) {
        case 0: return 'No Grade'
        case 1: return 'Industry'
        case 2: return 'Borderline CAT2'
        case 3: return 'CAT2'
        case 4: return 'Borderline CAT1'
        case 5: return 'CAT1'
        case 6: return 'Extra'
        default: return 'No Grade';
    }
}

export const numToAction = (s: string | number = '0'): Actions => {
    const num = Number(s)

    // switch (num) {
    //     case 0: return 'No Action'
    //     case 1: return 'Rejected'
    //     case 2: return 'Hold'
    //     case 3: return 'Suitable for QC Check'
    //     case 4: return 'Suitable for Departure'
    //     case 5: return 'Suitable for Storage'
    //     default: return 'No Action';
    // }
    switch (num) {
        case 0: return 'No Action'
        case 1: return 'Rejected'
        case 2: return 'Hold'
        case 3: return 'Suitable for Repack'
        case 4: return 'Suitable for Departure'
        case 5: return 'Suitable for Storage'
        default: return 'No Action';
    }
}

export const textToScore = (t: string = 'No Score') => {

    switch (t) {
        case 'No Score': return 0
        case 'Bad': return 1
        case 'Poor': return 2
        case 'Fair': return 3
        case 'Good': return 4
        case 'Very Good': return 5
        default: return 0
    }
}