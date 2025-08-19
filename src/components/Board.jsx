import { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { GameContext } from "../context/GameContextProvider";

const Board = () => {
    const { cards, setCards, setScore, loading } = useContext(GameContext);

    const [flippedCards, setFlippedCards] = useState([]);

    const handleClick = (id) => {
        const clickedCard = cards.find((card) => card.id === id);

        if (!clickedCard.flipped && flippedCards.length < 2) {
            const updatedCard = {
                ...clickedCard,
                flipped: true,
            };

            setCards(
                cards.map((card) => {
                    if (card.id === id) {
                        return updatedCard;
                    }
                    return card;
                })
            );

            setFlippedCards([...flippedCards, updatedCard]);
        }
    };

    useEffect(() => {
        if (flippedCards.length === 2) {
            if (flippedCards[0].pairId === flippedCards[1].pairId) {
                // console.log("Matched")
                setScore((prev) => prev + 1);

                setTimeout(() => {
                    setFlippedCards([]);
                }, 500);
            } else {
                // console.log("Not Matched")
                setTimeout(() => {
                    setCards(
                        cards.map((card) => {
                            if (
                                flippedCards[0].id === card.id ||
                                flippedCards[1].id === card.id
                            ) {
                                return {
                                    ...card,
                                    flipped: false,
                                };
                            }
                            return card;
                        })
                    );
                    setFlippedCards([]);
                }, 500);
            }
        }
    }, [flippedCards, cards]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            {cards.map((card) => (
                <Card key={card.id} card={card} handleClick={handleClick} />
            ))}
        </div>
    );
};

export default Board;
