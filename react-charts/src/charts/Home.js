import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to React Charts</h1>
            <div className="home-buttons">
                <button onClick={() => handleClick("/chartJS")}>Chart JS</button>
                <button onClick={() => handleClick("/echarts")}>Echarts</button>
                <button onClick={() => handleClick("/high-chart")}>High Chart</button>
            </div>
        </div>
    );
}

export default Home;
