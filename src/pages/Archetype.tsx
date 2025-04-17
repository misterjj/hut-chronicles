import {Page} from "../App.tsx";
import {Archetype as ArchetypeEnum} from "../data/Archetype.tsx";

interface HomeProps {
    goToPage: (page: Page) => void;
    archetype: ArchetypeEnum
}

export const Archetype = ({ goToPage, archetype }: HomeProps) => {
    return (
        <>
            <div className="container mx-auto py-12 px-4">
                <h1 className="text-4xl font-bold mb-8 text-center text-red-300">
                    Ton archétype : {archetype}
                </h1>
                <div className="bg-zinc-800 rounded-lg p-8 max-w-3xl mx-auto shadow-xl">
                    <div className="mb-6">
                        {archetype === ArchetypeEnum.BARD && (
                            <div className="text-center">
                                <div className="text-red-300 text-5xl mb-4">🎭</div>
                                <p className="text-lg mb-4">
                                    Votre charisme naturel et votre amour des histoires font de vous le cœur vibrant de la fête.
                                    Vous savez mettre l'ambiance, connecter les gens et vous assurer que les rires fusent.
                                    Préparez vos meilleures anecdotes !
                                </p>
                            </div>
                        )}

                        {archetype === ArchetypeEnum.WARRIOR && (
                            <div className="text-center">
                                <div className="text-red-300 text-5xl mb-4">🍖</div>
                                <p className="text-lg mb-4">
                                    Votre mission, si vous l'acceptez : conquérir le buffet !
                                    Pour vous, une fête réussie passe par des mets délicieux et des boissons généreuses.
                                    Vous savourez chaque instant (et chaque bouchée) avec une détermination héroïque.
                                </p>
                            </div>
                        )}

                        {archetype === ArchetypeEnum.MAGE && (
                            <div className="text-center">
                                <div className="text-red-300 text-5xl mb-4">🧪</div>
                                <p className="text-lg mb-4">
                                    Potions, élixirs, breuvages... Votre domaine, c'est la magie liquide !
                                    Que vous aimiez déguster, analyser ou même créer des mélanges,
                                    vous apportez une touche d'alchimie à la fête. Santé !
                                </p>
                            </div>
                        )}

                        {archetype === ArchetypeEnum.PALADIN && (
                            <div className="text-center">
                                <div className="text-red-300 text-5xl mb-4">🛡️</div>
                                <p className="text-lg mb-4">
                                    Fiable et attentionné, vous êtes le pilier discret de la soirée.
                                    Vous veillez au bien-être de tous, n'hésitez pas à prêter main-forte
                                    et votre présence rassurante assure l'harmonie du groupe.
                                    Votre sens du devoir festif est légendaire !
                                </p>
                            </div>
                        )}

                        {archetype === ArchetypeEnum.ROGUE && (
                            <div className="text-center">
                                <div className="text-red-300 text-5xl mb-4">🏹</div>
                                <p className="text-lg mb-4">
                                    Vous préférez peut-être les ombres douces aux feux de la rampe,
                                    mais votre présence n'en est pas moins appréciée. Observateur et réfléchi,
                                    vous savourez l'ambiance à votre rythme, souvent engagé dans des conversations
                                    plus profondes ou simplement en train d'apprécier la scène.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => goToPage(Page.character)}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg flex items-center transition-all duration-300"
                        >
                            Remplir ma fiche de personnage
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}