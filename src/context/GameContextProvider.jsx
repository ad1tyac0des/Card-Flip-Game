import { nanoid } from "nanoid";
import { createContext, useState } from "react";
import { shuffle } from "../utils/shuffle";

export const GameContext = createContext(null);

const GameContextProvider = ({ children }) => {
    const data = [
        {
            image:
                "https://i.pinimg.com/1200x/dc/eb/93/dceb939dec86bc011a1159bace7d2b99.jpg",
            flipped: false,
            pairId: 1,
        },
        {
            image:
                "https://i.pinimg.com/736x/35/92/4e/35924e354e53647dedbf34cd36911794.jpg",
            flipped: false,
            pairId: 2,
        },
        {
            image:
                "https://i.pinimg.com/1200x/ed/fb/9f/edfb9f53f30a80514651c4310255b7b7.jpg",
            flipped: false,
            pairId: 3,
        },
        {
            image:
                "https://i.pinimg.com/736x/11/a6/41/11a641d72620007e9efd9881d0fc7167.jpg",
            flipped: false,
            pairId: 4,
        },
        {
            image:
                "https://i.pinimg.com/1200x/6b/4b/b8/6b4bb8b404735f5caafb59e9a388369d.jpg",
            flipped: false,
            pairId: 5,
        },
        {
            image:
                "https://i.pinimg.com/736x/f4/fa/a7/f4faa7feb550320250fa33d91bf646f4.jpg",
            flipped: false,
            pairId: 6,
        },
    ];

    const [cards, setCards] = useState(() => {
        return shuffle(
            [...data, ...data].map((card) => ({
                ...card,
                id: nanoid(),
            }))
        );
    });

    const [score, setScore] = useState(0);

    const restartGame = () => {
        setScore(0);
        setCards(() =>
            shuffle(
                [...data, ...data].map((card) => ({
                    ...card,
                    flipped: false,
                    id: nanoid(),
                }))
            )
        );
    };

    return (
        <GameContext.Provider value={{ cards, setCards, score, setScore, restartGame }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContextProvider;
