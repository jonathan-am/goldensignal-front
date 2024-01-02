import React, { useEffect, useState } from 'react';
import './Style.modules.css';
import GameContainer from './components/GameContainer';
import { useCookies } from 'react-cookie';
import getPlataformList from '../../clients/GetPlataformList';
import getPageConfiguration from '../../clients/GetPageConfiguration';

function HomePage() {
    const [cookies, setCookie, removeCookie] = useCookies(["plataform"]);
    const plataform = cookies["plataform"];
    const [plataformList, setPlataformList] = useState([{ id: 1, name: "Titulo", accessLink: "url", image: "logo", hot: true }]);

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

    useEffect(() => {
        getPageConfiguration(setPageInformation);
        getPlataformList(setPlataformList);
    }, [setPageInformation, setPlataformList]);

    const definePlataform = (value) => {
        setCookie('plataform', value);
    }

    const withPlataform = () => {
        return (<div className="app-main-homepage" style={pageInformation.home_page.styles.main.image.active ? {backgroundImage: "url("+pageInformation.home_page.styles.main.image.value.backgroundImage+")"} : pageInformation.home_page.styles.main.default}>
            <GameContainer />
            <div className='plataform-container'>
                <iframe src={plataform.accessLink} frameBorder="0" allowFullScreen={true} />
                <div className='change-plataform' onClick={() => removeCookie("plataform")}>
                    <p>Alterar Plataforma</p>
                </div>
            </div>
        </div>);
    }

    const withoutPlataform = () => {
        return (
            <div className="app-main-homepage" style={pageInformation.home_page.styles.main.image.active ? {backgroundImage: "url("+pageInformation.home_page.styles.main.image.value.backgroundImage+")"} : pageInformation.home_page.styles.main.default}>
                <div className='plataform-list'>
                    <p>Selecione sua plataforma</p>
                    <div>
                        {
                            plataformList.map((v) => (
                                <div className='plataform' key={v.id} onClick={() => definePlataform(v)}>
                                    <img src={v.image} />
                                    {v.hot ? (<span className='plataform-hot-span'>Quente</span>) : null}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>);
    }

    return (
        <div className='homepage'>
            <header style={pageInformation.home_page.styles.header}>
                <h1 style={{borderColor: pageInformation.home_page.styles.header.color}}>{pageInformation.page_title}</h1>
            </header>
            {plataform === null || plataform === undefined ? withoutPlataform() : withPlataform()}
            <footer className='footer' style={pageInformation.home_page.styles.footer.global}>
                <span>{pageInformation.titles.footer.value}</span>
                <span className='insta' style={pageInformation.home_page.styles.footer.instagram}>{pageInformation.instagram}</span>
            </footer>
        </div>
    );
}

export default HomePage;