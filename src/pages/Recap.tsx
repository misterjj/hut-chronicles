import {Page, PlayerInfo} from "../App.tsx";
import {Archetype} from "../data/Archetype.tsx";
import map from '../assets/map.jpg'

interface HomeProps {
    goToPage: (page: Page) => void;
    playerInfo: PlayerInfo,
    archetype: Archetype
}

export const Recap = ({goToPage, playerInfo, archetype }: HomeProps) => {
    const eventDate = "Samedi 3 Mai 2025";
    const eventTime = "19h00";
    const eventLocation = "La Cabane Enchantée, 14 Chemin des Sylves, Forêt de Brocéliande";

    return (
        <>
            <div className="h-screen flex items-center bg-zinc-950 p-5">
                <div className="p-5 w-1/2 ">
                    <div className="border-10 relative">
                        <img src={map} alt="" className=""/>
                        <div className="absolute bg-red-500 w-7 h-10 top-[66%] left-[28%] -translate-x-1/2 -translate-y-full"></div>
                    </div>
                </div>
                <div>
                    <h1 className="text-4xl font-bold mb-8 text-center anton-bold">
                        Votre Quête Vous Attend !
                    </h1>
                    <div className="rounded-lg p-5 mx-auto shadow-xl">
                        <div className="text-center mb-8">
                            <div className="bg-red-900/30 p-6 rounded-lg border border-red-700/50 mb-6">
                                <p className="text-xl leading-relaxed">
                                    <span className="font-bold text-red-300">{playerInfo.characterName}</span> le <span
                                    className="italic">{archetype}</span> est attendu{" "}
                                    le <span className="font-bold">{eventDate}</span> à <span
                                    className="font-bold">{eventTime}</span> à{" "}
                                    <span className="font-bold">La Cabane Enchantée</span> pour commencer sa nouvelle
                                    quête.
                                </p>
                                {playerInfo.companions > 0 && (
                                    <p className="mt-2 text-red-200">
                                        Avec {playerInfo.companions} fidèle{playerInfo.companions > 1 ? 's' : ''} compagnon{playerInfo.companions > 1 ? 's' : ''} d'aventure
                                        !
                                    </p>
                                )}
                            </div>

                            <div className="bg-zinc-700 p-4 rounded-lg mb-8">
                                <h3 className="text-xl font-bold mb-4 text-red-300">Détails de la mission</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-center">
                                        <span>{eventDate}</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span>{eventTime}</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span>{eventLocation}</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span>Confirmé : {playerInfo.companions + 1} personne{(playerInfo.companions + 1) > 1 ? 's' : ''}</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => goToPage(Page.character)}>Moddifier</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}