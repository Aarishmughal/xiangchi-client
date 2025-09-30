import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

function Faq() {
    return (
        <section className=" py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-center text-5xl sm:text-4xl font-medium mb-10 ">
                    FAQ:
                </h1>

                <Accordion type="single" collapsible className="w-full">
                    {/* Question 1 */}
                    <AccordionItem value="item-1" className="border-b">
                        <AccordionTrigger className="text-2xl font-medium py-10 hover:no-underline">
                            Is Chinese chess difficult?
                        </AccordionTrigger>
                        <AccordionContent className="text-black-700 pb-4 text-justify w-200 text-gray-700 text-lg">
                            The rules of Chinese chess are simple and easy to
                            understand; however, this game is also very
                            complicated, that you will never find it boring even
                            after years of play. To begin with, you can refer to
                            our ‘How to play Xiangqi’ section to know more about
                            how to play Xiangqi and its basic rules. As you
                            progress, you can also read our free Xiangqi
                            tutorial articles for more information, such as the
                            tactics in the opening, mid-game, and endgame
                            stages. Don’t forget it is of paramount importance
                            to put your knowledge into practice – You can play
                            Chinese chess against computer at your own level or
                            with other players online on Xiangqi.com. After each
                            multiplayer Chinese chess game, you can analyze your
                            game with the online AI function to make
                            improvements.
                        </AccordionContent>
                    </AccordionItem>

                    {/* Question 2 */}
                    <AccordionItem value="item-2" className="border-b">
                        <AccordionTrigger className="text-2xl font-medium py-10 hover:no-underline">
                            Where can I play Xiangqi?
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-justify w-200 text-gray-700 text-lg">
                            Chinese chess enthusiasts can click here to enter
                            our online game lobby and start playing. For those
                            who would like to play on mobile devices, you can
                            download our free Xiangqi.com App from Google Play
                            Store or App Store; it is a user-friendly Chinese
                            chess online game platform with no registration
                            needed. Players can play Chinese chess against
                            computer or with players from all over the world, as
                            well as solving endgame puzzles.
                        </AccordionContent>
                    </AccordionItem>

                    {/* Question 3 */}
                    <AccordionItem value="item-3" className="border-b">
                        <AccordionTrigger className="text-2xl font-medium py-10 hover:no-underline">
                            How can I play Xiangqi in English?
                        </AccordionTrigger>
                        <AccordionContent className=" pb-4 text-justify w-200 text-gray-700 text-lg">
                            Xiangqi.com provides English interface to
                            international players. As the most international
                            online Chinese chess game platform, Xiangqi.com has
                            players from over 40 countries around the world; we
                            understand that the Chinese characters on the pieces
                            might be difficult for players who are not familiar
                            with Chinese to learn, therefore pieces with
                            substitute graphics are also available.
                        </AccordionContent>
                    </AccordionItem>

                    {/* Question 4 */}
                    <AccordionItem value="item-4" className="border-b">
                        <AccordionTrigger className="text-2xl font-medium py-10 hover:no-underline">
                            What is the best site to play Chinese chess
                            (Xiangqi)?
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-justify w-200 text-gray-700 text-lg">
                            Xiangqi.com offers a web version for you to play
                            free Chinese chess online on your desktop computers,
                            laptops, tablets, and smartphones by opening the
                            platform directly via browsers. The free Xiangqi.com
                            app can also be downloaded from Google Play Store or
                            App Store on tablets and smartphones for a better
                            user experience. Both the app and web versions
                            provide untimed games that allow registered players
                            to create or join online Xiangqi games without
                            timing, so you can enjoy the fun of playing Chinese
                            chess anywhere at any time. Although there is no
                            move timer for untimed multiplayer Chinese chess
                            games, players still need to choose the move timer
                            when creating the game; the minimum move timer is 1
                            day while the maximum is 14 days.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    );
}

export default Faq;
