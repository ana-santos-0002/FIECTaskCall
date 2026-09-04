import Alerta from "./alerta"
function FakeLayers() {
    return (
        <>
            <div className="flex items-center justify-center relative top-98.75 -left-54.25">
                <img className="ml-3 transition-transform duration-100 ease-in-out hover:scale-[1.01] hover:drop-shadow-[0px_2px_3px_rgba(0,0,0,0.185)] hover:cursor-pointer" src="/assets/button0.png" alt="Button 0" />
                <img className="ml-3 transition-transform duration-100 ease-in-out hover:scale-[1.01] hover:drop-shadow-[0px_2px_3px_rgba(0,0,0,0.185)] hover:cursor-pointer" src="/assets/button1.png" alt="Button 1" />
                <img className="ml-3 transition-transform duration-100 ease-in-out hover:scale-[1.01] hover:drop-shadow-[0px_2px_3px_rgba(0,0,0,0.185)] hover:cursor-pointer" src="/assets/button2.png" alt="Button 2" />
                <button onClick={Alerta}>
                    <img className="ml-3 transition-transform duration-100 ease-in-out hover:scale-[1.01] hover:drop-shadow-[0px_2px_3px_rgba(0,0,0,0.185)] hover:cursor-pointer" src="/assets/button3.png" alt="Button 3" />
                </button>
            </div>
        </>
    )
}

export default FakeLayers