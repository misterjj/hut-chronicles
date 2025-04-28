import {useState, useEffect} from 'react'
import './App.css'
import {Home} from "./pages/Home.tsx";
import {Quizz} from "./pages/Quizz.tsx";
import {Archetype} from "./pages/Archetype.tsx";
import {Archetype as ArchetypeEnum} from "./data/Archetype.tsx";
import {Character} from "./pages/Character.tsx";
import {Recap} from "./pages/Recap.tsx";

export enum Page {
    home,
    quizz,
    archetype,
    character,
    recap
}

export interface PlayerInfo {
    playerName: string,
    characterName: string,
    companions: number,
}

function App() {
    const [currentPage, setCurrentPage] = useState(Page.home);
    const [archetype, setArchetype] = useState(ArchetypeEnum.WARRIOR);
    const [playerInfo, setPlayerInfo] = useState({
        playerName: "",
        characterName: "",
        companions: 0,
    });
    const [isPageTransitioning, setIsPageTransitioning] = useState(false);
    const [nextPage, setNextPage] = useState<Page | null>(null);

    useEffect(() => {
        if (nextPage !== null) {
            // Réinitialiser pour la prochaine transition
            setNextPage(null);
            setCurrentPage(nextPage);
        }
    }, [nextPage]);

    const goToPage = (page: Page) => {
        if (page === currentPage) return;

        setIsPageTransitioning(true);

        // Attendre que l'animation de sortie se termine
        setTimeout(() => {
            setNextPage(page);
            // Attendre un peu pour que la nouvelle page soit rendue
            setTimeout(() => {
                setIsPageTransitioning(false);
            }, 50);
        }, 500); // Correspond à la durée de l'animation CSS
    };

    // Classes d'animation pour la transition
    const pageClasses = `page-container ${isPageTransitioning ? 'page-exit' : ''}`;

    return (
        <>
            <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
                <div className={pageClasses}>
                    {currentPage === Page.home && (
                        <Home goToPage={goToPage}/>
                    )}
                    {currentPage === Page.quizz && (
                        <Quizz goToPage={goToPage} setArchetype={setArchetype}/>
                    )}
                    {currentPage === Page.archetype && (
                        <Archetype goToPage={goToPage} archetype={archetype}/>
                    )}
                    {currentPage === Page.character && (
                        <Character goToPage={goToPage} archetype={archetype} playerInfo={playerInfo} setPlayerInfo={setPlayerInfo}/>
                    )}
                    {currentPage === Page.recap && (
                        <Recap goToPage={goToPage} archetype={archetype} playerInfo={playerInfo}/>
                    )}
                </div>
            </div>
        </>
    )
}

export default App