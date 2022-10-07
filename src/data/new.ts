import { ImageSourcePropType } from "react-native";
import { Fruit } from "../interfaces/interfaces";

export interface New {
    id: string,
    product: Fruit,
    url: ImageSourcePropType,
}

export const newReport:New[] = [
    {
        id: '1',
        product: 'blueberries',
        url: require("../assets/new-bb.jpg"),
    },
    {
        id: '2',
        product: 'raspberries',
        url: require("../assets/new-rb.jpg"),
    },
    {
        id: '3',
        product: 'blackberries',
        url: require("../assets/new-blb.jpg"),
    },
    {
        id: '4',
        product: 'strawberries',
        url: require("../assets/new-sb.jpg"),
    },
    {
        id: '5',
        product: 'cherries',
        url: require("../assets/new-ch.jpg"),
    },
    {
        id: '6',
        product: 'figs',
        url: require("../assets/new-figs.jpg"),
    },
    {
        id: '7',
        product: 'kiwiberries',
        url: require("../assets/new-kw.jpg"),
    },
    {
        id: '8',
        product: 'pears',
        url: require("../assets/new-cp.jpg"),
    },
    // {
    //     id: '9',
    //     product: 'apples',
    //     url: require("../assets/new-apples.jpg"),
    // },
]