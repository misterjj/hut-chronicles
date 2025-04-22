import {Page} from "../App.tsx";
import {useState} from "react";
import {AnswerType, questions} from "../data/Questions.tsx";
import {Archetype} from "../data/Archetype.tsx";
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'

interface QuizzProps {
    goToPage: (page: Page) => void;
    setArchetype: (archetype: Archetype) => void
}


type AnswersState = Record<number, AnswerType>;

export const Quizz = ({goToPage, setArchetype}: QuizzProps) => {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState<AnswersState>({});

    const renderProgressBar = () => {
        const percentage = Math.floor(((currentQuestion - 1)  / 5) * 100);
        return (
            <>
                <div className="w-full h-3 rounded-full bg-zinc-800 mb-3">
                    <div className="h-3 rounded-full bg-zinc-100 relative transition-all duration-300" style={{ width: percentage + "%" }}>
                        <span className="absolute right-0 -top-6 translate-x-1/2 text-nowrap text-sm text-white/50"> {percentage} %</span>
                    </div>
                </div>
                <div className="text-white/50">
                    Question {currentQuestion}/5
                </div>
            </>
        );
    };

    const handleAnswer = (questionId: number, answer: AnswerType): void => {
        setAnswers({
            ...answers,
            [questionId]: answer,
        });

        // Passer à la question suivante ou terminer le quiz
        if (questionId < 5) {
            setCurrentQuestion(questionId + 1);
        } else {
            // Terminer le quiz et déterminer l'archétype
            setArchetype(determineArchetype());
            goToPage(Page.archetype);
        }
    };

    const determineArchetype = (): Archetype  => {
        const counts = {A: 0, B: 0, C: 0, D: 0, E: 0};

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

        switch (maxType) {
            case "A": return Archetype.BARD
            case "B": return Archetype.WARRIOR
            case "C": return Archetype.MAGE
            case "D": return Archetype.PALADIN
            case "E": return Archetype.ROGUE
            default: return Archetype.BARD;
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    return (
        <>
            <div id="quizz" className="container mx-auto py-12 px-4">
                <div className="head h-64 rounded-lg w-full mb-12 relative">
                    <h1 className="text-4xl font-bold absolute bottom-8 left-8 anton-regular">
                        Quel aventurier es-tu ?
                    </h1>
                </div>
                {renderProgressBar()}
                <div className="max-w-4xl mx-auto">

                    <div className="question-container">
                        <h3 className="text-2xl font-bold mt-3 mb-6 text-center">
                            {questions[currentQuestion - 1].question}
                        </h3>

                        <div className="space-y-4">
                            {questions[currentQuestion - 1].options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleAnswer(currentQuestion, option.value)}
                                    className={`w-3/4 mx-auto block text-center p-4 rounded-lg transition-all duration-200 cursor-pointer 
                              ${answers[currentQuestion] === option.value
                                        ? 'bg-red-800 text-white'
                                        : 'bg-zinc-800 hover:bg-zinc-600 text-white'}`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-between mt-8 items-center w-3/4 mx-auto">
                            {currentQuestion > 1 && (
                                <button
                                    onClick={goToPreviousQuestion}
                                    className="text-white/50 hover:text-white rounded-lg flex items-center transition-all duration-300 cursor-pointer"
                                >
                                    <ArrowLongLeftIcon className="size-5 me-3"/> Question précédente
                                </button>
                            )}
                            {currentQuestion === 1 && <div></div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}