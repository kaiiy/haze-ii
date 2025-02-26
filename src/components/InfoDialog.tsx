import { CiCircleInfo } from "react-icons/ci";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import keyImg from "@/assets/key.webp";
import { vStorage } from "@/lib/storage";

const InfoDialog = () => {
    const [isOpen, setIsOpen] = useState(false);

    const storage = vStorage.load();
    const isDark = storage.theme === "dark";
    const iconColor = isDark ? "white" : "black";

    const closeDialog = () => {
        setIsOpen(false);
    };

    const toggleDialog = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const img = new Image();
        img.src = keyImg;
    }, []);

    return (
        <div>
            <button
                onClick={toggleDialog}
                className={`fixed right-4 top-4 rounded-full p-1 ${
                    isDark ? "hover:bg-black" : "hover:bg-white"
                }`}
            >
                <CiCircleInfo className="w-10 h-10" color={iconColor} />
            </button>

            <img src={keyImg} alt="preload" style={{ display: "none" }} />

            {isOpen && (
                <div className="bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed shadow-lg rounded-lg z-50 px-8 py-24 sm:px-24 sm:px-48 lg:px-48 lg:py-48">
                    <div>
                        <button
                            onClick={closeDialog}
                            className="absolute right-4 top-4"
                        >
                            <IoMdClose className="w-10 h-10" />
                        </button>
                    </div>
                    <div className="flex justify-center items-center w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw]">
                        <img src={keyImg} loading="eager" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfoDialog;
