
function objToArray(objeto) {
    const restArray = Object.entries(objeto)
    return restArray
}

export default objToArray



/* const DataSet = [
    {
        //xSteps: 1, // Will start putting cell with 1 empty cell on left most
        ySteps: 3, 
        columns: [{ title: "Label" }],
        data: [
            [{ value: "Johnson" }, { value: "Finance" }],
            [{ value: "Monika" }, { value: "IT" }],
            [{ value: "Konstantina" }, { value: "IT Billing" }],
            [{ value: "John" }, { value: "HR" }],
            [{ value: "Josef" }, { value: "Testing" }],
        ]
    },

    {
        ySteps: 3, 
        columns: [{ title: "Appareance" }],
        data: [
            [{ value: "Johnson" }, { value: "Finance" }],
            [{ value: "Monika" }, { value: "IT" }],
            [{ value: "Konstantina" }, { value: "IT Billing" }],
            [{ value: "John" }, { value: "HR" }],
            [{ value: "Josef" }, { value: "Testing" }],
        ]
    },

] */