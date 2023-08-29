import { ListType } from "../components/modals/PickerModal";
import { ObjectType } from "../interfaces/intakes.reports";
import { capitalize } from "./eliminarEs";

export const jsonToArraySelect = (json:ObjectType):string[] => {
  const array = [];
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      array.push(key);
    }
  }
  return array;
}

export const jsonToPickerSelect = (mainData:ObjectType):ListType[] => {
  const array:ListType[] = [];
  for (const key in mainData) {
    if (mainData.hasOwnProperty(key)) {
      array.push({label: jsonKeyToString(key), value: key});
    }
  }
  return array;
}

export const jsonKeyToString = ( key:string ):string => {

  const names:ObjectType = {
    "pallet_ref": "Pallet",
    "variety(ies)": "Varieties",
    "kilos": "Total kilos",
    "gln_ggn": "GLN/GGN",
    "gln_ggn_number": "GLN/GGN number",
    "gln": "GLN",
    "ggn": "GGN",
    "coc": "CoC",
    "delivery_note_awb_number": "Delivery note / AWB number",
    "type_gps_tracker": "Type GPS tracker",
  }

  return names[key] ? names[key] : capitalize(key.split("_").join(" "));
}