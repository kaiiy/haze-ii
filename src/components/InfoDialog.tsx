import { CiCircleInfo } from "react-icons/ci";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import keyImg from "@/assets/key.webp";
import { vStorage } from "@/lib/storage";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

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
                <div className="bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed shadow-lg rounded-lg z-50 w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] ">
                    <div>
                        <button
                            onClick={closeDialog}
                            className="absolute right-4 top-4"
                        >
                            <IoMdClose className="w-10 h-10" />
                        </button>
                    </div>
                    <div className="flex items-center pl-4 pt-4">
                        <MdOutlineKeyboardDoubleArrowRight
                            size={45}
                            className="inline-block align-middle"
                        />
                        <span className="text-3xl ml-2">操作ガイド</span>
                    </div>
                    <div className="">
                        <div className="flex justify-center items-center w-full h-full px-8 py-20 sm:px-16 sm:py-20 md:px-16 md:py-24 xl:px-24 xl:py-36">
                            <img src={keyImg} loading="eager" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfoDialog;
