import logo from "../assets/logo.svg"
import cog from "../assets/cog.svg"

const AppHead = () => {

    return (
        <div className="app-head">
            <img src={logo} className="logo" alt="Vite logo" />
            <button className="units">
                <img className="cog" src={cog} />
                Units
            </button>
        </div>
    )
}

export default AppHead