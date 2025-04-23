import { Page } from "../App.tsx";
import DiceRoller from "../components/DiceRoller.tsx";

interface HomeProps {
    goToPage: (page: Page) => void;
}

export const Home = ({ goToPage }: HomeProps) => {
    return (
        <>
            <div id="home" className="relative h-screen w-full flex justify-center items-center overflow-hidden">
                <div
                    className="absolute w-full h-full"
                />

                <div className="absolute z-20 text-center px-6 w-2/3 left-0">
                    <h1 className="text-6xl font-bold mb-6 text-shadow-lg uppercase anton-bold">
                        Les Chroniques de la Cabane
                    </h1>
                    <h2 className="text-3xl mb-6 font-serif anton-regular text-shadow-md">
                        Chapitre 1 - La Crémaillère
                    </h2>
                    <button
                        onClick={() => goToPage(Page.quizz)}
                        className="bg-transparent border border-white bg-white/10 hover:bg-white/20 cursor-pointer text-white font-bold text-xl py-4 px-8 rounded-full flex items-center justify-center mx-auto transition-all duration-300 transform hover:scale-105"
                    >
                        Accepter la quête
                    </button>
                </div>
            </div>
        </>
    )
}