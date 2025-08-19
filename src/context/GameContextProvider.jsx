import { nanoid } from "nanoid";
import { createContext, useEffect, useState } from "react";
import { shuffle } from "../utils/shuffle";
import axios from "axios";

export const GameContext = createContext(null);

const GameContextProvider = ({ children }) => {
    const [score, setScore] = useState(0);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    async function createCards() {
        setLoading(true);

        const uniqueCards = [];
        const urls = [];
        let i = 0;

        async function getImage() {
            const params = new URLSearchParams();
            params.append("included_tags", "oppai");
            params.append("included_tags", "waifu");
            params.append("height", ">720");

            const { data } = await axios.get("https://api.waifu.im/search?" + params);
            return data.images[0].url;
        }

        while (urls.length < 6) {
            const image = await getImage();

            if (!urls.includes(image)) {
                urls.push(image)
                i++;

                uniqueCards.push({
                    image: image,
                    flipped: false,
                    pairId: i,
                });
            }
        }

        const deck = shuffle(
            [...uniqueCards, ...uniqueCards].map((card) => {
                return {
                    ...card,
                    id: nanoid(),
                };
            })
        );

        setCards(deck);
        setLoading(false);
    }

    useEffect(() => {
        createCards();
    }, []);

    const restartGame = () => {
        setScore(0);
        createCards();
    };

    return (
        <GameContext.Provider
            value={{ cards, setCards, score, setScore, restartGame, loading }}
        >
            {children}
        </GameContext.Provider>
    );
};

export default GameContextProvider;
