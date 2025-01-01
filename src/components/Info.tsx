import { CiCircleInfo } from "react-icons/ci";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import keyImg from "@/assets/key.webp";

const Info = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => {
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <button onClick={openDialog} className="fixed right-4 top-4">
                <CiCircleInfo className="w-10 h-10" />
            </button>

            {isOpen && (
                <div className="bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed p-4 shadow-lg rounded-lg z-50 md:w-2/3 md:h-2/3 w-10/12 h-2/6">
                    <div>
                        <button
                            onClick={closeDialog}
                            className="absolute right-4 top-4"
                        >
                            <IoMdClose className="w-10 h-10" />
                        </button>
                    </div>
                    <div className="w-full h-full flex justify-center items-center">
                        <img className="md:w-3/4 w-11/12" src={keyImg} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Info;
