import { useRef, useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menu = useRef();
    return (
        <nav className="fixed top-0 w-full flex justify-between items-center px-3 py-1 bg-violet-900 text-white">
            <div className="uppercase font-bold font-serif">
                To - DO list app
            </div>
            <div
                onClick={
                    () => {
                        setMenuOpen(previousState => !previousState);
                    }
                }
                className={(menuOpen ? 'rotate-90' : 'rotate-0') + " cursor-pointer transition-all md:hidden relative z-50"}
            >
                <div className={(menuOpen ? 'opacity-0 hidden' : 'opacity-100 block') + ' transition-all'}>
                    <IoMenuSharp />
                </div>
                <div className={(menuOpen ? 'opacity-100 block' : 'opacity-0 hidden') + ' transition-all'}>
                    <IoMdClose />
                </div>
            </div>
            <ul ref={menu} className={(menuOpen ? 'translate-y-0' : '-translate-y-full') + " transition-all duration-500 md:translate-y-0 fixed top-0 left-0 items-center md:static justify-center w-full md:w-auto flex flex-col sm:bg-inherit sm:flex-row gap-4 bg-inherit"}>
                {
                    ['home', 'todos'].map(
                        menu => <li key={menu} className="uppercase hover:bg-violet-700 p-2 rounded-xl cursor-pointer">{menu}</li>
                    )
                }
            </ul>
        </nav>
    );
}