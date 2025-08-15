
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { IconButton } from './components/IconButton';
import { SettingsMenu } from './components/SettingsMenu';
import { UploadIcon, ExportIcon, PauseIcon, PlayIcon, SettingsIcon, ShareIcon } from './components/icons';
import { DEFAULT_STORY, FONT_OPTIONS, BACKGROUND_OPTIONS } from './constants';
import { NEW_STORY_PROMPT } from './env';
import type { FontOption, BackgroundOption } from './types';

const App: React.FC = () => {
    const [fullStoryText, setFullStoryText] = useState('');
    const [chunks, setChunks] = useState<string[]>([]);
    const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [readingSpeed, setReadingSpeed] = useState(3000); // ms
    const [fontSize, setFontSize] = useState(40); // px
    const [font, setFont] = useState<FontOption>(FONT_OPTIONS[0]);
    const [textColor, setTextColor] = useState('#ffc200');
    const [backgroundOption, setBackgroundOption] = useState<BackgroundOption>(BACKGROUND_OPTIONS[0]);
    const [filename, setFilename] = useState("SpaceReader");
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isTextVisible, setIsTextVisible] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);

    const autoAdvanceTimer = useRef<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const sentenceRef = useRef<HTMLParagraphElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const settingsButtonRef = useRef<HTMLButtonElement>(null);

    const chunkText = useCallback((text: string, baseFontSize: number, currentFontSize: number, baseChars: number): string[] => {
        if (!text) return [];
        const targetChars = (baseFontSize / currentFontSize) * baseChars * 1.8; // Adjusted for ~2 lines
        const words = text.split(/\s+/).filter(w => w.length > 0);
        const newChunks: string[] = [];
        let currentChunk = "";

        for (const word of words) {
            if (currentChunk.length > 0 && currentChunk.length + word.length + 1 > targetChars) {
                newChunks.push(currentChunk.trim());
                currentChunk = "";
            }
            currentChunk += word + " ";
        }
        if (currentChunk.trim().length > 0) {
            newChunks.push(currentChunk.trim());
        }
        return newChunks;
    }, []);

    useEffect(() => {
        const newChunks = chunkText(fullStoryText, 40, fontSize, 75);
        setChunks(newChunks);
        if (currentChunkIndex >= newChunks.length) {
            setCurrentChunkIndex(Math.max(0, newChunks.length - 1));
        }
    }, [fullStoryText, fontSize, chunkText, currentChunkIndex]);

    const processAndSetText = useCallback((text: string, newFilename = "SpaceReader") => {
        const cleanedText = text.replace(/\n/g, ' ').replace(/\s+/g, ' ');
        setFullStoryText(cleanedText);
        setFilename(newFilename);
        setCurrentChunkIndex(0);
        setIsPaused(false);
        setIsMenuVisible(false);
    }, []);

    useEffect(() => {
        processAndSetText(DEFAULT_STORY);
    }, [processAndSetText]);
    
    // "Click outside to close" logic for settings menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isMenuVisible &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                settingsButtonRef.current &&
                !settingsButtonRef.current.contains(event.target as Node)
            ) {
                setIsMenuVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuVisible]);


    const displayChunk = useCallback((index: number) => {
        setIsTextVisible(false);
        setTimeout(() => {
            setCurrentChunkIndex(index);
            setIsTextVisible(true);
        }, 300); // slightly faster transition
    }, []);

    const displayNextChunk = useCallback(() => {
        displayChunk((currentChunkIndex + 1) % (chunks.length || 1));
    }, [currentChunkIndex, chunks.length, displayChunk]);

    const displayPreviousChunk = useCallback(() => {
        displayChunk((currentChunkIndex - 1 + chunks.length) % (chunks.length || 1));
    }, [currentChunkIndex, chunks.length, displayChunk]);
    
    useEffect(() => {
        if (autoAdvanceTimer.current) clearInterval(autoAdvanceTimer.current);
        if (!isPaused && chunks.length > 0) {
            autoAdvanceTimer.current = window.setInterval(displayNextChunk, readingSpeed);
        }
        return () => {
            if (autoAdvanceTimer.current) clearInterval(autoAdvanceTimer.current);
        };
    }, [isPaused, readingSpeed, chunks, displayNextChunk]);

    const togglePause = useCallback(() => {
        setIsPaused(prev => {
            if (prev && sentenceRef.current) { // Was paused, now playing
                const editedText = sentenceRef.current.innerText.trim();
                const newChunks = [...chunks];
                newChunks[currentChunkIndex] = editedText;
                setFullStoryText(newChunks.join(' ')); // This triggers re-chunking
            }
            return !prev;
        });
    }, [chunks, currentChunkIndex]);

    const handleKeydown = useCallback((e: KeyboardEvent) => {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'SELECT' || activeElement.isContentEditable)) {
            return;
        }
        
        e.preventDefault();
        switch(e.code) {
            case 'Space':
                if(isPaused) togglePause();
                else displayNextChunk();
                break;
            case 'KeyP':
                togglePause();
                break;
            case 'ArrowRight':
                displayNextChunk();
                break;
            case 'ArrowLeft':
                displayPreviousChunk();
                break;
            case 'ArrowUp':
                setReadingSpeed(s => Math.max(s - 250, 500)); 
                break;
            case 'ArrowDown':
                setReadingSpeed(s => Math.min(s + 250, 5000));
                break;
            case 'KeyM':
                setIsMenuVisible(prev => !prev);
                break;
            case 'Equal': // +
                setFontSize(s => Math.min(s + 2, 80));
                break;
            case 'Minus': // -
                setFontSize(s => Math.max(s - 2, 20));
                break;
        }
    }, [isPaused, displayNextChunk, displayPreviousChunk, togglePause]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
    }, [handleKeydown]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        displayChunk(parseInt(e.target.value, 10));
    };

    const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                processAndSetText(event.target?.result as string, file.name);
            };
            reader.readAsText(file);
        }
    };

    const handleExport = () => {
        const blob = new Blob([fullStoryText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename.replace(/\.[^/.]+$/, "") + '_export.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    
    const handleShare = () => {
        const text = encodeURIComponent("Check out this awesome reading app!\n");
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    };

    const handleGenerateStory = async () => {
        if (!process.env.API_KEY) {
            alert("API key is not configured.");
            return;
        }
        setIsGenerating(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = NEW_STORY_PROMPT;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            story: { type: Type.STRING },
                        },
                        required: ["title", "story"],
                    },
                }
            });

            const responseText = response.text;
            if (responseText) {
                const storyData = JSON.parse(responseText);
                processAndSetText(storyData.story, storyData.title);
            } else {
                throw new Error("Received an empty response from the AI.");
            }
        } catch (error) {
            console.error("Error generating story:", error);
            alert("Failed to generate a new story. Please check the console for details.");
        } finally {
            setIsGenerating(false);
        }
    };
    
    const progress = chunks.length > 1 ? (currentChunkIndex / (chunks.length - 1)) * 100 : 0;
    const sliderBackground = `linear-gradient(to right, #ffc200 ${progress}%, rgba(255,255,255,0.1) ${progress}%)`;

    return (
        <div 
            className="h-screen w-screen font-mono text-center flex justify-center items-center transition-colors duration-1000"
            style={{ backgroundColor: backgroundOption.color }}
        >
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-lg text-amber-400/60 z-20 whitespace-nowrap px-4">
                {filename}
            </div>

            <div className="relative z-10 p-8 max-w-[90%] flex justify-center items-center animate-pulse-custom">
                <p
                    ref={sentenceRef}
                    className={`transition-opacity duration-300 ease-in-out cursor-default text-4xl md:text-5xl lg:text-6xl font-bold text-shadow-blur ${isTextVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ 
                        fontFamily: font.value, 
                        fontSize: `${fontSize}px`,
                        color: textColor,
                    }}
                    contentEditable={isPaused}
                    suppressContentEditableWarning={true}
                >
                    {chunks[currentChunkIndex] || ''}
                </p>
            </div>

            <div className="absolute top-5 left-5 z-20">
                <IconButton ariaLabel="Import Text File" onClick={() => fileInputRef.current?.click()}>
                    <UploadIcon />
                </IconButton>
                <input type="file" ref={fileInputRef} onChange={handleFileImport} accept=".txt" className="hidden" />
            </div>

            <div className="absolute top-5 right-5 z-20">
                <IconButton ariaLabel="Export Text File" onClick={handleExport}>
                    <ExportIcon />
                </IconButton>
            </div>

            <div className="absolute bottom-5 right-5 z-20">
                <button 
                    aria-label="Share on X" 
                    onClick={handleShare}
                    className="cursor-pointer w-10 h-10 bg-transparent border border-amber-400 rounded-lg flex justify-center items-center opacity-60 hover:opacity-90 transition-all hover:scale-105"
                >
                    <ShareIcon />
                </button>
            </div>

            <div className="absolute bottom-5 left-5 z-20 flex gap-2.5">
                <IconButton ariaLabel={isPaused ? "Play" : "Pause"} onClick={togglePause}>
                    {isPaused ? <PlayIcon /> : <PauseIcon />}
                </IconButton>
                <IconButton ref={settingsButtonRef} ariaLabel="Open Settings" onClick={() => setIsMenuVisible(!isMenuVisible)}>
                    <SettingsIcon />
                </IconButton>
            </div>

            <SettingsMenu 
                ref={menuRef}
                isVisible={isMenuVisible}
                font={font}
                onFontChange={setFont}
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                readingSpeed={readingSpeed}
                onReadingSpeedChange={setReadingSpeed}
                textColor={textColor}
                onTextColorChange={setTextColor}
                backgroundOption={backgroundOption}
                onBackgroundChange={setBackgroundOption}
                isGenerating={isGenerating}
                onGenerateStory={handleGenerateStory}
            />

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col gap-2.5 items-center w-4/5 max-w-xl">
                <input 
                    type="range" 
                    min="0" 
                    max={chunks.length > 0 ? chunks.length - 1 : 0} 
                    value={currentChunkIndex}
                    onChange={handleSliderChange}
                    style={{ background: sliderBackground }}
                    className="w-full"
                    disabled={chunks.length <= 1}
                />
                <div className="text-lg text-amber-400/50 whitespace-nowrap">
                    Press spacebar to advance
                </div>
            </div>
        </div>
    );
};

export default App;
