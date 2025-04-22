import {Page} from "../App.tsx";
import {Archetype as ArchetypeEnum} from "../data/Archetype.tsx";
import {PencilIcon} from '@heroicons/react/24/outline'

interface HomeProps {
    goToPage: (page: Page) => void;
    archetype: ArchetypeEnum
}

export const Archetype = ({goToPage, archetype}: HomeProps) => {
    const getClass = (archetype: ArchetypeEnum): string => {
        switch (archetype) {
            case ArchetypeEnum.BARD: return 'bard'
            case ArchetypeEnum.WARRIOR: return 'warrior'
            case ArchetypeEnum.MAGE: return 'mage'
            case ArchetypeEnum.PALADIN: return 'paladin'
            case ArchetypeEnum.ROGUE: return 'rogue'
        }
    }


    return (
        <>
            <div className="container mx-auto py-12 px-4">
                <div className="flex gap-4 items-center">
                    <div className={"archetype-illustration w-125 shrink-0 " + getClass(archetype)}></div>
                    <div className="grow">
                        <h1 className="text-3xl font-bold mb-8 text-center block anton-bold uppercase">
                            Tu es un <span className="text-red-800 text-4xl">{archetype}</span>
                        </h1>
                        <div className="text-center w-1/2 mx-auto mb-8">
                            <p className="text-lg">
                                {archetype === ArchetypeEnum.BARD && (
                                    <>
                                        Votre charisme naturel et votre amour des histoires font de vous le cœur vibrant
                                        de
                                        la fête.
                                        Vous savez mettre l'ambiance, connecter les gens et vous assurer que les rires
                                        fusent.
                                        Préparez vos meilleures anecdotes !
                                    </>
                                )}

                                {archetype === ArchetypeEnum.WARRIOR && (
                                    <>
                                        Votre mission, si vous l'acceptez : conquérir le buffet !
                                        Pour vous, une fête réussie passe par des mets délicieux et des boissons
                                        généreuses.
                                        Vous savourez chaque instant (et chaque bouchée) avec une détermination
                                        héroïque.
                                    </>
                                )}

                                {archetype === ArchetypeEnum.MAGE && (
                                    <>
                                        Potions, élixirs, breuvages... Votre domaine, c'est la magie liquide !
                                        Que vous aimiez déguster, analyser ou même créer des mélanges,
                                        vous apportez une touche d'alchimie à la fête. Santé !
                                    </>
                                )}

                                {archetype === ArchetypeEnum.PALADIN && (
                                    <>
                                        Fiable et attentionné, vous êtes le pilier discret de la soirée.
                                        Vous veillez au bien-être de tous, n'hésitez pas à prêter main-forte
                                        et votre présence rassurante assure l'harmonie du groupe.
                                        Votre sens du devoir festif est légendaire !
                                    </>
                                )}

                                {archetype === ArchetypeEnum.ROGUE && (
                                    <>
                                        Vous préférez peut-être les ombres douces aux feux de la rampe,
                                        mais votre présence n'en est pas moins appréciée. Observateur et réfléchi,
                                        vous savourez l'ambiance à votre rythme, souvent engagé dans des conversations
                                        plus profondes ou simplement en train d'apprécier la scène.
                                    </>
                                )}
                            </p>
                        </div>
                        <button
                            onClick={() => goToPage(Page.character)}
                            className="bg-transparent uppercase border border-white bg-white/10 hover:bg-white/20 cursor-pointer text-white font-bold text-xl py-4 px-8 rounded-full flex items-center justify-center mx-auto transition-all duration-300 transform hover:scale-105"
                        >
                            Remplir ma fiche de personnage <PencilIcon className="size-6 ms-4"/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}