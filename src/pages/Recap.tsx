import { Page, PlayerInfo } from "../App.tsx";
import {Archetype} from "../data/Archetype.tsx";

interface HomeProps {
    goToPage: (page: Page) => void;
    playerInfo: PlayerInfo,
    archetype: Archetype
}

export const Recap = ({ goToPage, playerInfo, archetype }: HomeProps) => {
    const eventDate = "Samedi 3 Mai 2025";
    const eventTime = "19h00";
    const eventLocation = "La Cabane Enchantée, 14 Chemin des Sylves, Forêt de Brocéliande";

    return (
        <>
            <div className="container mx-auto py-12 px-4">
                <h1 className="text-4xl font-bold mb-8 text-center text-red-300">
                    Votre Quête Vous Attend !
                </h1>
                <div className="bg-zinc-800 rounded-lg p-8 max-w-3xl mx-auto shadow-xl">
                    <div className="text-center mb-8">
                        <div className="bg-red-900/30 p-6 rounded-lg border border-red-700/50 mb-6">
                            <p className="text-xl leading-relaxed">
                                <span className="font-bold text-red-300">{playerInfo.characterName}</span> le <span className="italic">{archetype}</span> est attendu{" "}
                                le <span className="font-bold">{eventDate}</span> à <span className="font-bold">{eventTime}</span> à{" "}
                                <span className="font-bold">La Cabane Enchantée</span> pour commencer sa nouvelle quête.
                            </p>
                            {playerInfo.companions > 0 && (
                                <p className="mt-2 text-red-200">
                                    Avec {playerInfo.companions} fidèle{playerInfo.companions > 1 ? 's' : ''} compagnon{playerInfo.companions > 1 ? 's' : ''} d'aventure !
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

                        {/* Plan stylisé */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4 text-red-300">Plan du trésor</h3>
                            <div className="bg-red-900/30 p-2 rounded-lg border border-red-700">
                                {/* Plan stylisé simple */}
                                <div className="relative w-full h-64 bg-red-200/10 rounded overflow-hidden">
                                    <div className="absolute top-1/2 left-1/2 transform -tranzinc-x-1/2 -tranzinc-y-1/2 w-16 h-16 bg-red-500 rounded-lg rotate-45 flex items-center justify-center">
                                        <div className="transform -rotate-45 text-zinc-900 font-bold">La Cabane</div>
                                    </div>
                                    {/* Routes stylisées */}
                                    <div className="absolute top-1/2 left-0 h-1 w-1/3 bg-red-600" />
                                    <div className="absolute top-1/4 left-1/2 h-1/4 w-1 bg-red-600 transform -tranzinc-x-1/2" />
                                    <div className="absolute bottom-1/4 right-1/4 h-1/4 w-1 bg-red-600 rotate-45" />

                                    {/* Points de repère */}
                                    <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-xs text-white">Forêt</div>
                                    <div className="absolute bottom-1/4 left-1/5 w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-xs text-white">Lac</div>
                                    <div className="absolute top-3/4 right-1/4 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs text-white">Rocher</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-red-300 font-bold text-xl mb-4">L'aventure vous attend !</p>
                            <button
                                onClick={() => goToPage(Page.home)}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center transition-all duration-300"
                            >
                                Retour à l'accueil
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}