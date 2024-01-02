import { useParams } from 'react-router-dom';
import './Style.modules.css';
import React, { useEffect, useState } from 'react';
import getCurrentGame from '../../clients/GetCurrentGameClient';
import getCurrentEntranceInformation from '../../clients/GetCurrentEntranceInformation';
import { useCookies } from 'react-cookie';
import getPageConfiguration from '../../clients/GetPageConfiguration';

function GamePage() {
    const { game_id } = useParams();
    const [ currentGame, setCurrentGame] = useState({
        "plataform": "-",
        "redirectUrl": "-"
    });
    const [ pageInformation, setPageInformation ] = useState({
        "page_title": "Sua Pagina",
        "instagram": "@seuInstagram",
        "titles": {
            "footer": {
                "value": "Este é um valor padrao de footer"
            }
        },
        "home_page": {
            "styles": {
                "header": {
                    "backgroundColor": "#757575ff",
                    "color": "gold"
                },
                "main": {
                    "image": {
                        "active": false,
                        "value": {
                            "backgroundImage": "https://i.gifer.com/Nv2.gif"
                        }
                    },
                    "default": {
                        "backgroundColor": "rgba(9, 255, 0, 0.521)"
                    }
                },
                "footer": {
                    "global": {
                        "backgroundColor": "green",
                        "color": "gold"
                    },
                    "instagram": {
                        "backgroundColor": "none",
                        "color": "rgb(71, 7, 71)"
                    }
                }
            }
        },
        "game_page": {
            "watermark": {
                "active": true,
                "value": "Esta é uma marca dagua"
            },
            "styles": {
                "header": {
                    "backgroundColor": "green",
                    "color": "gold"
                },
                "main": {
                    "image": {
                        "active": true,
                        "value": {
                            "backgroundImage": "https://i.gifer.com/Nv2.gif"
                        }
                    },
                    "default": {
                        "backgroundColor": "rgba(9, 255, 0, 0.521)"
                    }
                },
                "footer": {
                    "global": {
                        "backgroundColor": "green",
                        "color": "gold"
                    },
                    "instagram": {
                        "backgroundColor": "none",
                        "color": "rgb(71, 7, 71)"
                    }
                }
            }
        }
    });
    const [ currentEntrance, setCurrentEntrance] = useState({
        pgj: "-",
        minute: "-",
        rounds: 0,
        mode: "-"
    });
    const [ alreadyVerfied, setAlreadyVerified ] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["plataform"]);
    const plataform = cookies["plataform"];

    useEffect(()=> {
        getPageConfiguration(setPageInformation);
        getCurrentGame(plataform.id, game_id, setCurrentGame);
    }, [plataform, game_id , setCurrentGame ]);

    function verifyEntrance() {
        getCurrentEntranceInformation(setCurrentEntrance);
    }

    return (
        <div className="game-page-app">
            <header style={pageInformation.game_page.styles.header}>
                <h1 onClick={()=> {window.location.replace("/")}} style={{borderColor: pageInformation.game_page.styles.header.color}}>{pageInformation.page_title}</h1>
            </header>
            <div className="game-page-main" style={pageInformation.game_page.styles.main.image.active ? {backgroundImage: "url("+pageInformation.game_page.styles.main.image.value.backgroundImage+")"} : pageInformation.game_page.styles.main.default}>
                <div className='game-info-container'>
                    <div className='game-hack-information'>
                        <div className='game-hacks'>
                            <p>PGJ: <b>{currentEntrance.pgj}</b></p>
                            <p>Minuto: <b>{currentEntrance.minute}</b></p>
                            <p>Jogadas: <b>{currentEntrance.rounds}</b></p>
                            <p>Modo: <b>{currentEntrance.mode}</b></p>
                        </div>
                        <button onClick={()=> { alreadyVerfied ? window.alert("Aguarde para verificar novamente!") : verifyEntrance(); setAlreadyVerified(true); }}>Verificar Entradas</button>
                    </div>
                    <div className='game-frame'>
                        {pageInformation.game_page.watermark.active ? <p>{pageInformation.game_page.watermark.value}</p> : null}
                        <iframe src={currentGame.redirectUrl} loading='lazy' allowFullScreen={true}/>
                    </div>
                </div>
            </div>
            <footer className='footer' style={pageInformation.game_page.styles.footer.global}>
                <span>{pageInformation.titles.footer.value}</span>
                <span className='insta' style={pageInformation.game_page.styles.footer.instagram}>{pageInformation.instagram}</span>
            </footer>
        </div>
    );
}

export default GamePage;