import { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/GameContextProvider";

const Header = () => {
    const { score, restartGame } = useContext(GameContext);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (score > 0) {
            setAnimate(true);
            const timer = setTimeout(() => {
                setAnimate(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [score]);

    return (
        <div className="flex justify-between items-center border mb-6 px-10 py-4">
            <div className="flex items-center justify-center uppercase">
                <div className="font-bold bg-blue-500 px-3 py-1 text-white">Score</div>
                <div className={`font-bold px-3 py-1 text-white transition-all duration-300 ${animate ? 'scale-125 bg-blue-500' : 'bg-blue-700'}`}>
                    {score}
                </div>
            </div>

            <button
                onClick={restartGame}
                className="uppercase cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
                <div className="font-bold bg-gradient-to-r from-orange-500 to-red-600 px-3 py-1 text-white hover:from-orange-600 hover:to-red-700">
                    Restart
                </div>
            </button>
        </div>
    );
};

export default Header;
