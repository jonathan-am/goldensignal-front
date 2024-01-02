import axios from "axios";
import getConfig from "./config/config";

export default function getCurrentGame(plataform_id, game_id, setCurrentGame) {
    axios.get(`${getConfig().backend_url}/game/${game_id}`, {headers: { affiliateid: getConfig().affiliateId , plataformid: plataform_id}}).then((response)=> {
        setCurrentGame(response.data);
    }).catch((error)=> {
        console.log(error);
    });
}