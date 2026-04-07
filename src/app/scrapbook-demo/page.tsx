import BentoItem from "@/components/ui/scrapbook-bento-grid";

export default function ScrapbookDemo() {
    return (
            <div className="scrapbook-container">
                <div className="w-full max-w-6xl z-10 flex flex-col items-center">
                    <h1 className="scrapbook-title mb-12">Bits & Pieces</h1>

                    <div className="bento-grid">
                        <BentoItem className="item-1" rotation="-2deg">
                            <h2>Goals & Ideas</h2>
                            <ul>
                                <li>- Start a garden</li>
                                <li>- Learn to bake bread</li>
                                <li>- Plan a road trip</li>
                            </ul>
                        </BentoItem>
                        <BentoItem className="item-2" rotation="3deg">
                            <h2>Quote</h2>
                            <p>"Creativity is intelligence having fun."</p>
                        </BentoItem>
                        <BentoItem className="item-3" rotation="-1deg">
                            <h2>To-Do</h2>
                            <p>Finish reading that book!</p>
                        </BentoItem>
                        <BentoItem className="item-4" rotation="2deg">
                           <div className="w-full h-32 bg-gray-300 border-4 border-gray-200 flex items-center justify-center text-gray-500 font-sans rounded">📷 Summer '24</div>
                        </BentoItem>
                        <BentoItem className="item-5" rotation="1deg">
                            <h2>Favorite Recipe</h2>
                            <p>Lemon pasta: garlic, chili flakes, olive oil, parsley, and lots of lemon juice.</p>
                        </BentoItem>
                         <BentoItem className="item-6" rotation="-3deg">
                            <h2>Doodles</h2>
                            <p>Just some little sketches and thoughts here.</p>
                        </BentoItem>
                    </div>
                </div>
            </div>
    );
}
