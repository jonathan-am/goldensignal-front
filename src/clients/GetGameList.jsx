import axios from "axios";
import getConfig from "./config/config";

export default function getGameList(setGameList) {
    axios.get(`${getConfig().backend_url}/games/${getConfig().affiliateId}`).then((response)=> {
        setGameList(response.data);
    }).catch((error)=> {
        console.log(error);
    });
}