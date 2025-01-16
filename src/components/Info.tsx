import { CiCircleInfo } from "react-icons/ci";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import keyImg from "@/assets/key.webp";

const Info = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeDialog = () => {
        setIsOpen(false);
    };

    const toggleDialog = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button
                onClick={toggleDialog}
                className="fixed right-4 top-4 hover:bg-white rounded-full p-1"
            >
                <CiCircleInfo className="w-10 h-10" />
            </button>

            {isOpen && (
                <div className="bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed shadow-lg rounded-lg z-50 px-8 py-16 md:px-16 md:py-24">
                    <div>
                        <button
                            onClick={closeDialog}
                            className="absolute right-4 top-4"
                        >
                            <IoMdClose className="w-10 h-10" />
                        </button>
                    </div>
                    <div className="flex justify-center items-center w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw]">
                        <img className="" src={keyImg} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Info;
