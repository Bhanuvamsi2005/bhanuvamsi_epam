import { useNavigate } from "react-router-dom";
import './Home.css';
import backgroundVideo from './assets/fdfwhomepage.mp4';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="homemain">
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="content">
        <h1>AI-Powered News Aggregator</h1>
        <p>Stay updated with personalized news recommendations.</p>
        <button onClick={() => navigate("/first")}>Get Started</button>
      </div>
    </div>
  );
}
