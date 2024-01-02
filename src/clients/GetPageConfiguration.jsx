import axios from "axios";
import getConfig from "./config/config";

export default function getPageConfiguration(setPageInformation) {
    axios.get(`${getConfig().backend_url}/configuration`, {headers: {"affiliateid": getConfig().affiliateId}}).then((response)=> {
        setPageInformation(response.data);
    }).catch((error)=> {
        console.log(error);
    });
}