import axios from "axios";
import getConfig from "./config/config";

export default function getCurrentEntranceInformation(setCurrentEntrance) {
    axios.get(`${getConfig().backend_url}/verify`).then((response)=> {
        setCurrentEntrance(response.data);
    }).catch((error)=> {
        console.log(error);
    });
}