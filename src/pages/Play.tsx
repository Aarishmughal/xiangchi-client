import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socketService } from "../lib/socket";

function Play() {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("");

    // Socket-related state
    const [isConnected, setIsConnected] = useState(false);
    const [isCreatingRoom, setIsCreatingRoom] = useState(false);
    const [connectionError, setConnectionError] = useState("");

    // Initialize socket connection on component mount
    useEffect(() => {
        // Get JWT token from localStorage (or wherever you store it after login)
        const token =
            localStorage.getItem("accessToken") ||
            sessionStorage.getItem("accessToken") ||
            undefined;

        const socket = socketService.connect(
            "https://xiangchi-api.onrender.com",
            token
        );
        setIsConnected(socketService.isConnected());

        // Listen for connection events
        socket.on("connect", () => {
            setIsConnected(true);
            setConnectionError("");
        });

        socket.on("xiangqi-connected", (data) => {
            console.log("Xiangqi connection status:", data);
            setIsConnected(true);
            setConnectionError("");
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        socket.on("connect_error", (error) => {
            setIsConnected(false);
            setConnectionError(
                "Failed to connect to server. Please try again."
            );
            console.error("Connection error:", error);
        });

        return () => {
            // Don't disconnect on unmount, keep connection for game
            socketService.removeAllListeners();
        };
    }, []);

    const handleStartNewGame = () => {
        navigate("/play/new/game");
    };

    const handleJoinRoom = () => {
        if (roomId.trim()) {
            navigate(`/play/room/${roomId.trim()}`);
        }
    };

    const handleCreateMultiplayerRoom = async () => {
        if (!isConnected) {
            setConnectionError("Not connected to server");
            return;
        }

        setIsCreatingRoom(true);
        setConnectionError("");

        try {
            const result = await socketService.createRoom();
            // Navigate to game with the created room
            navigate(`/play/room/${result.roomId}`);
        } catch (error) {
            setConnectionError(`Error creating room: ${error}`);
        } finally {
            setIsCreatingRoom(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">
                        Play Xiangqi
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-md">
                        Ready to start a new game? Click the button below to
                        begin your Xiangqi adventure.
                    </p>
                </div>

                <div className="w-full max-w-md space-y-6">
                    {/* Single Player Game Option */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-center">
                            Single Player
                        </h3>
                        <Button
                            onClick={handleStartNewGame}
                            size="lg"
                            className="w-full px-8 py-3 text-lg font-semibold"
                        >
                            Start New Game
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or
                            </span>
                        </div>
                    </div>

                    {/* Multiplayer Section */}
                    <div className="space-y-4 border rounded-lg p-4 bg-card">
                        <h3 className="text-lg font-semibold text-center">
                            Multiplayer
                        </h3>

                        {/* Connection Status */}
                        <div className="flex items-center justify-center gap-2 text-sm">
                            <div
                                className={`w-3 h-3 rounded-full ${
                                    isConnected ? "bg-green-500" : "bg-red-500"
                                }`}
                            ></div>
                            <span
                                className={
                                    isConnected
                                        ? "text-green-600"
                                        : "text-red-600"
                                }
                            >
                                {isConnected
                                    ? "Connected to server"
                                    : "Disconnected from server"}
                            </span>
                        </div>

                        {/* Error Message */}
                        {connectionError && (
                            <div className="text-sm text-red-600 text-center bg-red-50 p-2 rounded">
                                {connectionError}
                            </div>
                        )}

                        {/* Create Room Button */}
                        <Button
                            onClick={handleCreateMultiplayerRoom}
                            disabled={!isConnected || isCreatingRoom}
                            size="lg"
                            className="w-full px-8 py-3 text-lg font-semibold"
                            variant="default"
                        >
                            {isCreatingRoom
                                ? "Creating Room..."
                                : "Create Multiplayer Room"}
                        </Button>

                        {/* Divider for join room */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    Or
                                </span>
                            </div>
                        </div>

                        {/* Join Room Option */}
                        <div className="space-y-3">
                            <Input
                                type="text"
                                placeholder="Enter Room ID"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                                className="text-center"
                                disabled={!isConnected}
                            />
                            <Button
                                onClick={handleJoinRoom}
                                variant="outline"
                                size="lg"
                                className="w-full px-8 py-3 text-lg font-semibold"
                                disabled={!roomId.trim() || !isConnected}
                            >
                                Join Room
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Play;
