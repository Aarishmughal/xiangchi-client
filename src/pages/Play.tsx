import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Play() {
    const navigate = useNavigate();
    return (
        <>
            <div>
                This is for Play when user click on play button in side bar
            </div>
            <Button onClick={() => navigate("/play-xiangqi/play/game")}>
                Play Game
            </Button>
        </>
    );
}

export default Play;
