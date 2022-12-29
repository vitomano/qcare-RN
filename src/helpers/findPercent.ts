
export const findPercent = (arr:number[], percent:number) => {
    const sum = arr.reduce((acc, val) => acc+val);
    const part = [];
    let curr = 0;
    for(let i = 0; i < arr.length; i++){
       curr += arr[i];
       if(curr <= (sum*percent)/100){
          part.push(arr[i]);
       } else {
          break;
       };
    };
    return part;
 };

