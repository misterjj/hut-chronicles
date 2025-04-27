import {Page, PlayerInfo} from "../App.tsx";
import {Archetype} from "../data/Archetype.tsx";
import {MouseEventHandler, useEffect, useState} from "react";
import DiceRoller from "../components/DiceRoller.tsx";

interface HomeProps {
    goToPage: (page: Page) => void;
    archetype: Archetype,
    playerInfo: PlayerInfo,
    setPlayerInfo: (p: PlayerInfo) => void
}

interface Sheet {
    positionRight: number
    positionTop: number,
    rotate: number
}

interface FakeInputInterface {
    className?: String,
    x: number,
    y: number,
    value: string,
    delay: number,
    index: number,
}

function FakeInput(props: FakeInputInterface) {
    const [displayedText, setDisplayedText] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const appearTimeout = setTimeout(() => {
            setIsVisible(true);

            let currentIndex = 0;
            const typingInterval = setInterval(() => {
                if (currentIndex < props.value.length) {
                    setDisplayedText(props.value.substring(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 100);

            return () => clearInterval(typingInterval);
        }, 1000 + props.delay);

        return () => clearTimeout(appearTimeout);
    }, [props.value, props.delay]);

    if (!isVisible) return null;

    return (
        <div className={"patrick absolute " + props.className}
             style={{top: props.y, left: props.x}}>{displayedText}</div>
    )
}

const races = [
    "Nain",
    "Elfe",
    "Halfelin",
    "Humain",
    "Sangdragon",
    "Gnome",
    "Demi-Elfe",
    "Demi-Orque",
    "Tieffelin"
]
const race = races[Math.floor(Math.random() * races.length)];

const orders = ["Loyal", "Neutre", "Chaotique"];
const morality = ["bon", "neutre", "mauvais"];
const alignment = orders[Math.floor(Math.random() * orders.length)] + " " + morality[Math.floor(Math.random() * morality.length)]
const strength = 3 + Math.floor(Math.random() * 15)
const dexterity = 3 + Math.floor(Math.random() * 15)
const constitution = 3 + Math.floor(Math.random() * 15)
const intelligence = 3 + Math.floor(Math.random() * 15)
const wisdom = 3 + Math.floor(Math.random() * 15)
const charisma = 3 + Math.floor(Math.random() * 15)

const modifier = (value: number) => {
    if (value < 4) return "-4"
    else if (value < 6) return "-3"
    else if (value < 8) return "-2"
    else if (value < 10) return "-1"
    else if (value < 12) return "+0"
    else if (value < 14) return "+1"
    else if (value < 16) return "+2"
    else if (value < 18) return "+3"
    else return "+4"
}

export const Character = ({goToPage, archetype, playerInfo, setPlayerInfo}: HomeProps) => {
    const initSheet: Sheet = {
        positionRight: -900,
        positionTop: 1000,
        rotate: 45
    };
    const [sheet, setSheet] = useState(initSheet);
    const [validationErrors, setValidationErrors] = useState({
        playerName: false,
        characterName: false,
        companions: false
    });

    useEffect(() => {
        setTimeout(() => {
            setSheet((sheet: Sheet) => ({...sheet, positionRight: -100, positionTop: 100, rotate: -10}))
        }, 50)
    }, []);

    const submitCharacterInfo = () => {
        const errors = {
            playerName: !playerInfo.playerName,
            characterName: !playerInfo.characterName,
            companions: playerInfo.companions < 0 || playerInfo.companions === undefined
        };

        setValidationErrors(errors);

        if (!errors.playerName && !errors.characterName && !errors.companions) {
            goToPage(Page.recap);
        }
    };

    const handleInputChange = (field: keyof typeof validationErrors, value: string | number) => {
        setPlayerInfo({
            ...playerInfo,
            [field]: value
        });

        if ((field === 'playerName' || field === 'characterName') && value) {
            setValidationErrors({
                ...validationErrors,
                [field]: false
            });
        } else if (field === 'companions' && value !== undefined && Number(value) >= 0) {
            setValidationErrors({
                ...validationErrors,
                [field]: false
            });
        }
    };

    const fakeInputs = [
        { x: 360, y: 60, value: archetype, className: "", delay: 1000, index: 0 },
        { x: 360, y: 95, value: race, className: "", delay: 2000, index: 1 },
        { x: 500, y: 95, value: alignment, className: "", delay: 3000, index: 2 },
        { x: 55, y: 195, value: strength.toString(), className: "text-4xl w-15 text-center", delay: 4500, index: 3 },
        { x: 55, y: 235, value: modifier(strength), className: "text-xl w-15 text-center", delay: 5000, index: 4 },
        { x: 55, y: 285, value: dexterity.toString(), className: "text-4xl w-15 text-center", delay: 5500, index: 5 },
        { x: 55, y: 327, value: modifier(dexterity), className: "text-xl w-15 text-center", delay: 6000, index: 6 },
        { x: 55, y: 380, value: constitution.toString(), className: "text-4xl w-15 text-center", delay: 6500, index: 7 },
        { x: 55, y: 420, value: modifier(constitution), className: "text-xl w-15 text-center", delay: 7000, index: 8 },
        { x: 55, y: 475, value: intelligence.toString(), className: "text-4xl w-15 text-center", delay: 7500, index: 9 },
        { x: 55, y: 510, value: modifier(intelligence), className: "text-xl w-15 text-center", delay: 8000, index: 10 },
        { x: 55, y: 565, value: wisdom.toString(), className: "text-4xl w-15 text-center", delay: 8500, index: 11 },
        { x: 55, y: 603, value: modifier(wisdom), className: "text-xl w-15 text-center", delay: 9000, index: 12 },
        { x: 55, y: 655, value: charisma.toString(), className: "text-4xl w-15 text-center", delay: 9500, index: 13 },
        { x: 55, y: 695, value: modifier(charisma), className: "text-xl w-15 text-center", delay: 10000, index: 14 },
    ];

    const getInputStyle = (fieldName: keyof typeof validationErrors) => {
        return validationErrors[fieldName]
            ? { backgroundColor: 'rgba(254, 202, 202, 0.9)' }
            : {};
    };

    return (
        <>
            <div id="characterSheet" className="relative h-screen w-full bg-blue-500">
                <DiceRoller/>
                <form
                    className="sheet absolute w-[800px] bg-white h-[1131px] transition-all duration-800 ease-in-out text-gray-500"
                    style={{
                        right: sheet.positionRight,
                        top: sheet.positionTop,
                        transform: 'rotate(' + sheet.rotate + 'deg)'
                    }}>
                    <input
                        type="text"
                        className="patrick absolute top-20 left-20 text-xl"
                        style={getInputStyle('playerName')}
                        value={playerInfo.playerName}
                        onChange={(e) => handleInputChange('playerName', e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="patrick absolute top-14 left-156 w-30 text-lg"
                        style={getInputStyle('characterName')}
                        value={playerInfo.characterName}
                        onChange={(e) => handleInputChange('characterName', e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        min="0"
                        className="patrick absolute top-23 left-156 w-30 text-lg"
                        style={getInputStyle('companions')}
                        value={playerInfo.companions}
                        onChange={(e) => handleInputChange('companions', parseInt(e.target.value) || 0)}
                        placeholder="Nombre de compagnons"
                        required
                    />

                    {fakeInputs.map((input, idx) => (
                        <FakeInput
                            key={idx}
                            x={input.x}
                            y={input.y}
                            value={input.value}
                            className={input.className}
                            delay={input.delay}
                            index={input.index}
                        />
                    ))}
                </form>
                <button
                    onClick={submitCharacterInfo}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Valider la fiche
                </button>
            </div>
        </>
    )
}