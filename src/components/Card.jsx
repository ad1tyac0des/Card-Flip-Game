const Card = ({ card, handleClick }) => {

    const { flipped, id, image } = card;


    return (
        <div className="w-full h-65" onClick={() => handleClick(id)}>

            <div className={`card relative size-full ${flipped ? "" : "flipped"} cursor-pointer`}>
                {/* Front */}
                <div className="absolute size-full backface-hidden p-3 flex items-center justify-center border">
                    <img className="size-full object-cover object-top" src={image} />
                </div>
                {/* Back */}
                <div className="card-back absolute size-full backface-hidden p-5 flex items-center justify-center border bg-[#D7CABA]"></div>
            </div>
        </div>
    );
};

export default Card;

