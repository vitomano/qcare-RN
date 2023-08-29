import { ObjectArray, ObjectType } from "../interfaces/intakes.reports";
import { headerToJSON } from "./eliminarEs";

export interface MainDataSelect {
    check: boolean;
    key: string;
    value: string;
}

function objToArray(objeto:Object) {
    const restArray = Object.entries(objeto)
    return restArray
}

export default objToArray

export const objectToCheckArray = ( object:ObjectType ): MainDataSelect[] => {

    const array = [];
    const exclude = [ "supplier", "grower", "gln_ggn", "samples", "pallet_ref", "unit_label" ]

    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        array.push({check: exclude.includes(key) ? false : true, key, value: object[key]});
      }
    }
    return array;
  };

  export const objectToArray = ( objectType:ObjectType ) => {
    const array:ObjectArray[] = [];
    for (const key in objectType) {
      if( !objectType[key]) continue;
      if( objectType.hasOwnProperty(key) ) {
        array.push({ key, value: objectType[key] || "" });
      }
    }
    return array;
  };


  export const objectToJson = ( object:ObjectType ) => {
    const newJson:ObjectType = {};
    for (const key in object) {
      if( object.hasOwnProperty(key) ) {
        newJson[headerToJSON(key)] = (object[key] || "")
      }
    }
    return newJson;
  };