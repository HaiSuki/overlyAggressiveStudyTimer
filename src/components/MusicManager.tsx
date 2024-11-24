import songs from "@/lib/songs";
import { useEffect, useRef, useState } from "react";

const MusicManager = ({isBreaking, isTimerRunning}: {isBreaking: boolean, isTimerRunning: boolean}) => {
    const [currentSong, setCurrentSong] = useState<string | null>(null);
    const [audioPermitted, setAudioPermitted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const SelectAudio = () => {
        if (!audioRef.current) return;
        const songList = isBreaking ? songs.break : songs.study;
        const song = songList[Math.floor(Math.random() * songList.length)];
        setCurrentSong(song);
        audioRef.current.src = "backgroundMusic/" + song;
    }

    const startAudio = async () => {
        if (!audioRef.current) return;
        try {
            await audioRef.current.play();
            setAudioPermitted(true);
        } catch (error) {
            console.error("Audio playback failed:", error);
            setAudioPermitted(false);
        }
    };

    const handleTrackEnd = () => {
        SelectAudio();
        startAudio();
    };

    useEffect(() => {
        const handleFirstInteraction = () => {
            SelectAudio();
            startAudio();
            document.removeEventListener('click', handleFirstInteraction);
        };

        document.addEventListener('click', handleFirstInteraction);
        return () => document.removeEventListener('click', handleFirstInteraction);
    }, [audioPermitted]);

    useEffect(() => {
        if (!audioRef.current || !audioPermitted) return;
        SelectAudio();
        startAudio();

    }, [isBreaking, isTimerRunning, audioPermitted]);

    return (
        <>
            <audio 
                hidden 
                ref={audioRef} 
                onEnded={handleTrackEnd}
            />
        </>
    );
}

export default MusicManager;