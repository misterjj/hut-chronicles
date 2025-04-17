import { Page } from "../App.tsx";
import {useState} from "react";
import {questions} from "../data/Questions.tsx";
import {Archetype} from "../data/Archetype.tsx";

interface QuizzProps {
    goToPage: (page: Page) => void;
    setArchetype: (archetype: Archetype) => void
}


export const Quizz = ({goToPage, setArchetype}: QuizzProps) => {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState({});

    const renderProgressBar = () => {
        return (
            <div className="flex justify-between items-center mb-6 mx-24">
                {[1, 2, 3, 4, 5].map((step) => (
                    <div
                        key={step}
                        className={`w-8 h-8 rounded-full flex items-center justify-center select-none
                      ${step < currentQuestion ? 'bg-red-950 text-white' :
                            step === currentQuestion ? 'bg-red-800 ring-red-950' :
                                'bg-zinc-700 text-zinc-400'}`}
                    >
                        {step}
                    </div>
                ))}
            </div>
        );
    };

    const handleAnswer = (questionId, answer) => {
        setAnswers({
            ...answers,
            [questionId]: answer,
        });

        // Passer à la question suivante ou terminer le quiz
        if (questionId < 5) {
            setCurrentQuestion(questionId + 1);
        } else {
            // Terminer le quiz et déterminer l'archétype
            const result = determineArchetype();
            goToPage(Page.archetype);
        }
    };

    const determineArchetype = () => {
        const counts = { A: 0, B: 0, C: 0, D: 0, E: 0 };

        Object.values(answers).forEach(answer => {
            counts[answer]++;
        });

        let maxCount = 0;
        let maxType = "";

        Object.entries(counts).forEach(([type, count]) => {
            if (count > maxCount) {
                maxCount = count;
                maxType = type;
            }
        });

        const archetypes = {
            A: Archetype.BARD,
            B: Archetype.WARRIOR,
            C: Archetype.MAGE,
            D: Archetype.PALADIN,
            E: Archetype.ROGUE
        };

        setArchetype(archetypes[maxType]);
        return archetypes[maxType];
    };

    const goToPreviousQuestion = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    return (
        <>
            <div className="container mx-auto py-12 px-4">
                <h1 className="text-4xl font-bold mb-8 text-center text-red-800">
                    Quel aventurier es-tu ?
                </h1>
                <div className="bg-zinc-800 rounded-lg p-6 max-w-4xl mx-auto shadow-xl">
                    {renderProgressBar()}

                    <div className="question-container">
                        <h3 className="text-2xl font-bold mb-6 text-center">
                            {questions[currentQuestion - 1].question}
                        </h3>

                        <div className="space-y-4">
                            {questions[currentQuestion - 1].options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleAnswer(currentQuestion, option.value)}
                                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 cursor-pointer 
                              ${answers[currentQuestion] === option.value
                                        ? 'bg-red-800 text-white'
                                        : 'bg-zinc-700 hover:bg-zinc-600 text-white'}`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-between mt-8 items-center">
                            {currentQuestion > 1 && (
                                <button
                                    onClick={goToPreviousQuestion}
                                    className="bg-zinc-700/50 hover:bg-zinc-700 text-white/50 hover:text-white font-bold py-3 px-6 rounded-lg flex items-center transition-all duration-300 cursor-pointer"
                                >
                                    Question précédente
                                </button>
                            )}
                            {currentQuestion === 1 && <div></div>}

                            <div className="text-red-800 font-bold">
                                Question {currentQuestion}/5
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}