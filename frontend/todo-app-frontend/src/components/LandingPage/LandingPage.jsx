import "./LandingPage.css"
import image from "../../assets/char.svg"
import { Link } from "react-router-dom"

export const LandingPage = () => {

    return (
        <Link to={"/todos"}><div className="landingPage-container">
            <div className="logo-container">
                    <h2 className="logo-title">Aha!</h2>
                    <p className="logo-subtitle">A Todo App</p>
                </div>
                <div className="image-container">
                    <img src={image} alt="image" />
                </div>
            </div>
        </Link>
    )
}