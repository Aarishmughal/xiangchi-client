import { io, Socket } from "socket.io-client";

// Types for socket events
export interface GameMove {
    fromRow: number;
    fromCol: number;
    toRow: number;
    toCol: number;
    piece: {
        type: string;
        color: "red" | "black";
        id: string;
    };
    playerId: string;
}

export interface RoomInfo {
    roomId: string;
    players: string[];
    currentPlayer: "red" | "black";
}

export interface PlayerJoinedData {
    playerId: string;
    playerColor: "red" | "black";
    roomInfo: RoomInfo;
}

// Socket service class
class SocketService {
    private socket: Socket | null = null;
    private roomId: string | null = null;
    private playerId: string | null = null;
    private playerColor: "red" | "black" | null = null;

    // Initialize socket connection
    connect(
        serverUrl: string = "https://xiangchi-api.onrender.com",
        token?: string
    ): Socket {
        // If socket exists and is connected, return it
        if (this.socket?.connected) {
            console.log("Socket already connected, reusing existing connection");
            return this.socket;
        }

        // If socket exists but is disconnected, clean it up without trying to disconnect again
        if (this.socket) {
            console.log("Socket exists but not connected, cleaning up...");
            this.socket.removeAllListeners();
            // Don't call disconnect() on an already disconnected socket
            this.socket = null;
        }

        console.log("Creating new socket connection to:", serverUrl);
        console.log("Auth token available:", !!token);

        this.socket = io(serverUrl, {
            transports: ["websocket", "polling"],
            autoConnect: true,
            auth: {
                token: token,
            },
        });

        this.socket.on("connect", () => {
            console.log("Connected to server with ID:", this.socket?.id);
            this.playerId = this.socket?.id || null;
        });

        this.socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

        this.socket.on("connect_error", (error) => {
            console.error("Connection error:", error);
        });

        // Listen for xiangqi-specific connection confirmation
        this.socket.on("xiangqi-connected", (data) => {
            console.log("Xiangqi server connection:", data);
        });

        return this.socket;
    }

    // Create a new room
    createRoom(): Promise<{ roomId: string; playerColor: "red" | "black" }> {
        return new Promise((resolve, reject) => {
            if (!this.socket) {
                reject(new Error("Socket not connected"));
                return;
            }

            console.log("Creating room - Socket connected:", this.socket.connected);
            console.log("Socket ID:", this.socket.id);

            let isResolved = false;

            const roomCreatedHandler = (data: { roomId: string; playerColor: "red" | "black" }) => {
                if (isResolved) return;
                isResolved = true;
                clearTimeout(timeoutId);
                this.socket?.off("error", errorHandler);
                
                this.roomId = data.roomId;
                this.playerColor = data.playerColor;
                console.log(
                    `Room created: ${data.roomId}, You are: ${data.playerColor}`
                );
                resolve(data);
            };

            const errorHandler = (error: string) => {
                if (isResolved) return;
                isResolved = true;
                clearTimeout(timeoutId);
                this.socket?.off("room-created", roomCreatedHandler);
                
                console.error("Socket error event:", error);
                reject(new Error(error || "Failed to create room"));
            };

            const timeoutId = setTimeout(() => {
                if (isResolved) return;
                isResolved = true;
                this.socket?.off("room-created", roomCreatedHandler);
                this.socket?.off("error", errorHandler);
                
                reject(new Error("Room creation timeout - no response from server"));
            }, 10000); // 10 second timeout

            this.socket.emit("create-room");
            
            this.socket.once("room-created", roomCreatedHandler);
            this.socket.once("error", errorHandler);
        });
    }

    // Join an existing room
    joinRoom(roomId: string): Promise<PlayerJoinedData> {
        return new Promise((resolve, reject) => {
            if (!this.socket) {
                reject(new Error("Socket not connected"));
                return;
            }

            this.socket.emit("join-room", { roomId });

            this.socket.once("room-joined", (data: PlayerJoinedData) => {
                this.roomId = roomId;
                this.playerColor = data.playerColor;
                console.log(
                    `Joined room: ${roomId}, You are: ${data.playerColor}`
                );
                resolve(data);
            });

            this.socket.once("room-error", (error: string) => {
                reject(new Error(error));
            });
        });
    }

    // Send a move to other players in the room
    sendMove(move: Omit<GameMove, "playerId">): void {
        if (!this.socket || !this.roomId || !this.playerId) {
            console.error(
                "Cannot send move: socket not connected or not in a room"
            );
            return;
        }

        const moveWithPlayer: GameMove = {
            ...move,
            playerId: this.playerId,
        };

        this.socket.emit("game-move", {
            roomId: this.roomId,
            move: moveWithPlayer,
        });
    }

    // Listen for moves from other players
    onMove(callback: (move: GameMove) => void): void {
        if (!this.socket) {
            console.error("Socket not connected");
            return;
        }

        this.socket.on("move-received", callback);
    }

    // Listen for player joined events
    onPlayerJoined(callback: (data: PlayerJoinedData) => void): void {
        if (!this.socket) {
            console.error("Socket not connected");
            return;
        }

        this.socket.on("player-joined", callback);
    }

    // Listen for player left events
    onPlayerLeft(callback: (playerId: string) => void): void {
        if (!this.socket) {
            console.error("Socket not connected");
            return;
        }

        this.socket.on("player-left", callback);
    }

    // Leave current room
    leaveRoom(): void {
        if (!this.socket || !this.roomId) {
            return;
        }

        this.socket.emit("leave-room", { roomId: this.roomId });
        this.roomId = null;
        this.playerColor = null;
    }

    // Disconnect socket
    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.roomId = null;
            this.playerId = null;
            this.playerColor = null;
        }
    }

    // Getters
    getRoomId(): string | null {
        return this.roomId;
    }

    getPlayerId(): string | null {
        return this.playerId;
    }

    getPlayerColor(): "red" | "black" | null {
        return this.playerColor;
    }

    isConnected(): boolean {
        return this.socket?.connected || false;
    }

    getSocket(): Socket | null {
        return this.socket;
    }

    // Remove event listeners
    removeAllListeners(): void {
        if (this.socket) {
            this.socket.removeAllListeners();
        }
    }
}

// Export singleton instance
export const socketService = new SocketService();
export default socketService;
