import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";

interface SwitchPageProps {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    pageNum: number;
}

const SwitchPage = ({
    currentPage,
    setCurrentPage,
    pageNum,
}: SwitchPageProps) => {
    return (
        <div className="flex justify-center items-center gap-1 font-notoSans">
            <Button
                variant="outline"
                size="icon"
                className={`${currentPage == 0 ? "invisible" : ""}`}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                <MdOutlineChevronLeft size={24} />
            </Button>
            <span
                style={{
                    fontSize: "24px",
                    lineHeight: "36px",
                    marginTop: "-4px",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                    width: "10px",
                    textAlign: "center",
                    justifyContent: "center",
                    fontWeight: 500,
                }}
            >
                {"|".repeat(currentPage + 1)}
            </span>
            <Button
                variant="outline"
                size="icon"
                className={`${currentPage == pageNum - 1 ? "invisible" : ""}`}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                <MdOutlineChevronRight size={24} />
            </Button>
        </div>
    );
};

const Scenes = (scenes: Readonly<string[]>) => {
    return (
        <div>
            <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-3">
                {scenes.slice(0, 4).map((scene, index) => (
                    <Link to={`/${scene}`} key={index}>
                        <div className="w-32 h-32 border border-charcoal bg-white text-center text-2xl flex items-center justify-center cursor-pointer transition duration-300 hover:text-lime hover:bg-charcoal">
                            {scene}
                        </div>
                    </Link>
                ))}
            </div>
            <div className="flex flex-wrap gap-3 justify-center font-notoSerif mb-12">
                {scenes.slice(4).map((scene, index) => (
                    <Link to={`/${scene}`} key={index}>
                        <div className="w-32 h-32 border border-charcoal bg-white text-center text-2xl flex items-center justify-center cursor-pointer transition duration-300 hover:text-lime hover:bg-charcoal">
                            {scene}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export { Scenes, SwitchPage };
