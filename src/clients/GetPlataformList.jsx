import axios from "axios";
import getConfig from "./config/config";

export default function getPlataformList(setPlataformList) {
    axios.get(`${getConfig().backend_url}/plataforms/${getConfig().affiliateId}`).then((response)=> {
        setPlataformList(response.data);
    }).catch((error)=> {
        console.log(error);
    });
}