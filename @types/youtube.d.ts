// youtube.d.ts
declare namespace YT {
    interface Player {
        new (element: HTMLIFrameElement, options: PlayerOptions): Player;
        playVideo(): void;
        pauseVideo(): void;
        mute(): void;
        unMute(): void;
        // Add other methods as needed
    }

    interface PlayerOptions {
        height?: string;
        width?: string;
        videoId: string;
        events?: {
            onReady?: (event: PlayerEvent) => void;
            onError?: (event: ErrorEvent) => void;
            // Add other event handlers as needed
        };
    }

    interface PlayerEvent {
        target: Player;
    }

    interface ErrorEvent {
        data: number; // Error code
    }
}