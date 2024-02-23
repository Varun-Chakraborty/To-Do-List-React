import Navbar from "./components/navbar";
import MainWindow from "./components/mainWindow";

export default function App() {
    return (
        <div className="bg-violet-100 h-screen w-screen flex justify-center items-center">
            <Navbar />
            <section className="bg-violet-200 rounded-2xl p-4 flex flex-col justify-between h-5/6">
                <MainWindow />
            </section>
        </div>
    );
}