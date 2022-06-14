
export const fruitType = ( fruta = "other" ) => {
    
    const fru = fruta.toLowerCase()

    if(fru.includes('blueberr')){return "blueberries"}
    else if(fru.includes('strawberr')){return "strawberries"}
    else if(fru.includes('raspberr')){return "raspberries"}
    else if(fru.includes('blackberr')){return "blackberries"}
    else if(fru.includes('pear')){return "pears"}
    else if(fru.includes('fig')){return "figs"}
    else if(fru.includes('kiwi')){return "kiwiberries"}
    else if(fru.includes('apple')){return "apples"}
    else if(fru.includes('cherr')){return "cherries"}
    else {return "other"}

};