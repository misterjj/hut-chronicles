import {Page, PlayerInfo} from "../App.tsx";
import {Archetype} from "../data/Archetype.tsx";
import {FormEvent} from "react";

interface HomeProps {
    goToPage: (page: Page) => void;
    archetype: Archetype,
    playerInfo: PlayerInfo,
    setPlayerInfo: (p: PlayerInfo) => void
}

export const Character = ({goToPage, archetype, playerInfo, setPlayerInfo}: HomeProps) => {

    const submitCharacterInfo = (e: FormEvent<HTMLFormElement>) : void => {
        e.preventDefault();
        if (playerInfo.playerName && playerInfo.characterName && playerInfo.companions >= 0) {
            goToPage(Page.recap);
        } else {
            alert("Veuillez remplir tous les champs obligatoires.");
        }
    };

    return (
        <>
            <div className="container mx-auto py-12 px-4">
                <h1 className="text-4xl font-bold mb-8 text-center anton-bold">
                    Fiche de personnage
                </h1>
                <div className="bg-zinc-800 rounded-lg p-8 max-w-2xl mx-auto shadow-xl">
                    <form onSubmit={submitCharacterInfo} className="space-y-6">
                        <div>
                            <label htmlFor="playerName" className="block text-lg font-medium mb-2">
                                Joueur (prénom) *
                            </label>
                            <input
                                type="text"
                                id="playerName"
                                className="w-full bg-zinc-700 text-white p-3 rounded-lg border border-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none"
                                value={playerInfo.playerName}
                                onChange={(e) => setPlayerInfo({...playerInfo, playerName: e.target.value})}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="archetype" className="block text-lg font-medium mb-2">
                                Archétype
                            </label>
                            <input
                                type="text"
                                id="archetype"
                                className="w-full bg-zinc-700 text-white p-3 rounded-lg border border-zinc-600"
                                value={archetype}
                                readOnly
                            />
                        </div>

                        <div>
                            <label htmlFor="characterName" className="block text-lg font-medium mb-2">
                                Nom de personnage *
                            </label>
                            <input
                                type="text"
                                id="characterName"
                                className="w-full bg-zinc-700 text-white p-3 rounded-lg border border-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none"
                                value={playerInfo.characterName}
                                onChange={(e) => setPlayerInfo({...playerInfo, characterName: e.target.value})}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="companions" className="block text-lg font-medium mb-2">
                                Nombre d'accompagnants *
                            </label>
                            <input
                                type="number"
                                id="companions"
                                min="0"
                                className="w-full bg-zinc-700 text-white p-3 rounded-lg border border-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none"
                                value={playerInfo.companions}
                                onChange={(e) => setPlayerInfo({
                                    ...playerInfo,
                                    companions: parseInt(e.target.value) || 0
                                })}
                                required
                            />
                        </div>

                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg flex items-center transition-all duration-300"
                            >
                                Me lancer dans l'aventure
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}