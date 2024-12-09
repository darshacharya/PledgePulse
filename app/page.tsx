'use client'

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import OathModal from '@/components/OathModal'
import SlideShow from '@/components/SlideShow'
import NewsSection from '@/components/NewsSection'
import QuoteSection from '@/components/QuoteSection'
import OathSection from '@/components/OathSection'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/utils/translations'

// Define the YT namespace
declare global {
  interface YT {
    Player: {
      new (element: HTMLIFrameElement, options: YT.PlayerOptions): YT.Player;
      playVideo(): void;
      pauseVideo(): void;
      mute(): void;
      unMute(): void;
      // Add other methods as needed
    };
    PlayerOptions: {
      height?: string;
      width?: string;
      videoId: string;
      events?: {
        onReady?: (event: YT.PlayerEvent) => void;
        onError?: (event: YT.ErrorEvent) => void;
      };
    };
    PlayerEvent: {
      target: YT.Player;
    };
    ErrorEvent: {
      data: number; // Error code
    };
  }

  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: YT; // Reference the YT namespace directly
  }
}

export default function Dashboard() {
  const { language } = useLanguage()
  const [isOathModalOpen, setIsOathModalOpen] = useState(false)
  const [oathCount, setOathCount] = useState<number | null>(null)
  const [isYouTubeAccessible, setIsYouTubeAccessible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLIFrameElement>(null)
  const playerRef = useRef<YT.Player | null>(null)

  const youtubeVideoUrl = "https://www.youtube.com/embed/ZAjd9Lh1-lA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=ZAjd9Lh1-lA";
  const videoId = "ZAjd9Lh1-lA";

  useEffect(() => {
    fetchOathCount()

    // Initialize Socket.IO connection
    const socket = io()

    // Listen for new oaths
    socket.on('newOath', (data) => {
      console.log('New oath taken!', data)
      setOathCount(data.count)
      setIsOathModalOpen(true)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const fetchOathCount = async () => {
    try {
      const response = await axios.get('/api/oath-count');
      setOathCount(response.data.count);
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };

  useEffect(() => {
    // Load the YouTube IFrame API
    const tag = document.createElement('script')
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    // Create a YouTube player instance
    window.onYouTubeIframeAPIReady = () => {
      if (videoRef.current) {
        playerRef.current = new window.YT.Player(videoRef.current, {
          videoId: videoId,
          events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError,
          },
        })
      }
    }

    return () => {
      // Cleanup if necessary
    }
  }, [])

  const onPlayerReady = () => {
    // Player is ready
  }

  const onPlayerError = (event: YT.ErrorEvent) => {
    console.error("YouTube player error:", event)
    setIsYouTubeAccessible(false)
  }

  const toggleMuteUnmute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute()
      } else {
        playerRef.current.mute()
      }
      setIsMuted(!isMuted)
    }
  }

  return (
    <main className="min-h-screen h-screen p-1 bg-gradient-to-br from-blue-50 to-cyan-100 overflow-hidden">
      <h1 className="title-scale font-bold text-blue-800 mb-2 text-center font-cinzel tracking-wide">
        {translations[language].titles.dashboard}
      </h1>
      <div className="grid grid-cols-3 grid-rows-5 gap-1 h-[calc(100vh-5rem)]">
        {/* Employee of Month - Column 1, Rows 1-4 */}
        <div className="col-start-1 col-end-2 row-start-1 row-end-5">
          <div className="bg-white p-2 rounded-lg shadow-lg h-full border-2 border-blue-200 hover:border-blue-400 transition-all overflow-auto">
            <SlideShow />
          </div>
        </div>

        {/* Video Section - Column 2, Rows 1-3 */}
        <div className="col-start-2 col-end-4 row-start-1 row-end-4 h-full">
          <div className="bg-white p-2 rounded-lg shadow-lg h-full border-2 border-blue-200">
            <div className="relative w-full h-full rounded overflow-hidden">
              {/* Check if a YouTube video URL is provided */}
              {isYouTubeAccessible && youtubeVideoUrl ? (
                <iframe
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full rounded transform scale-150"
                  src={youtubeVideoUrl}
                  title="YouTube Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onError={() => {
                    console.error("YouTube video failed to load."); // Log error
                    setIsYouTubeAccessible(false); // Set to false if URL is invalid
                  }} 
                />
              ) : (
                <video 
                  className="absolute inset-0 w-full h-full object-cover rounded"
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                >
                  <source 
                    src="/assets/water-dept1.mp4" 
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
              {/* Mute/Unmute Button */}
              <button 
                onClick={toggleMuteUnmute} 
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 opacity-0 hover:opacity-100 transition-opacity"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? '🔇' : '🔊'}
              </button>
            </div>
          </div>
        </div>

        {/* News Section - Column 2, Rows 4-5 */}
        <div className="col-start-3 col-end-3 row-start-4 row-end-6">
          <NewsSection />
        </div>

        {/* Quote Section - Column 3, Row 4 */}
        <div className="col-start-1 col-end-1 row-start-5 row-end-5">
          <QuoteSection />
        </div>

        {/* Picture Section - Column 3, Row 5 */}
        <div className="col-start-2 col-end-2 row-start-4 row-end-6">
          <OathSection oathCount={oathCount} />
        </div>
      </div>

      <OathModal 
        isOpen={isOathModalOpen}
        onClose={() => setIsOathModalOpen(false)}
        onOathTaken={() => {}} // No action needed here
        oathCount={oathCount}
      />
    </main>
  )
}


