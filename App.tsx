

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { IconButton } from './components/IconButton';
import { SettingsMenu } from './components/SettingsMenu';
import { PauseIcon, PlayIcon, SettingsIcon, NextIcon, PreviousIcon } from './components/icons';
import { DEFAULT_STORY, FONT_OPTIONS, BACKGROUND_OPTIONS } from './constants';
import { NEW_STORY_PROMPT } from './env';
import type { FontOption, BackgroundOption } from './types';
import { logData, logText } from './services/tracking';

const App: React.FC = () => {
    const [fullStoryText, setFullStoryText] = useState('');
    const [chunks, setChunks] = useState<string[]>([]);
    const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [readingSpeed, setReadingSpeed] = useState(3000); // ms
    const [fontSize, setFontSize] = useState(60); // px
    const [font, setFont] = useState<FontOption>(FONT_OPTIONS.find(f => f.name === 'Raleway') || FONT_OPTIONS[0]);
    const [textColor, setTextColor] = useState('#ffc200');
    const [backgroundOption, setBackgroundOption] = useState<BackgroundOption>(BACKGROUND_OPTIONS.find(b => b.name === 'Sunset Blaze') || BACKGROUND_OPTIONS[0]);
    const [filename, setFilename] = useState("SpaceReader");
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isTextVisible, setIsTextVisible] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);

    const autoAdvanceTimer = useRef<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const sentenceRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const logVisit = async () => {
            // On initial load, perform identity resolution and log the visit.
            await logData({ event: 'visit' });
        };
        logVisit();
    }, []);

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

    const processAndSetText = useCallback(async (text: string, newFilename = "SpaceReader", shouldLogText = false) => {
        const cleanedText = text.replace(/\n/g, ' ').replace(/\s+/g, ' ');
        setFullStoryText(cleanedText);
        setFilename(newFilename);
        setCurrentChunkIndex(0);
        setIsPaused(false);
        setIsMenuVisible(false);

        // Log the tracking event.
        await logData({
            event: 'setText',
            source: newFilename,
        });

        if (shouldLogText) {
            // Log the full text content to its dedicated storage.
            await logText(newFilename, cleanedText);
        }
    }, []);

    useEffect(() => {
        processAndSetText(DEFAULT_STORY);
    }, [processAndSetText]);
    
    const displayChunk = useCallback((index: number) => {
        setIsTextVisible(false);
        setTimeout(() => {
            setCurrentChunkIndex(index);
            setIsTextVisible(true);
        }, 300); // slightly faster transition
    }, []);

    const displayNextChunk = useCallback(() => {
        if (chunks.length === 0) return;
        displayChunk((currentChunkIndex + 1) % chunks.length);
    }, [currentChunkIndex, chunks.length, displayChunk]);

    const displayPreviousChunk = useCallback(() => {
        if (chunks.length === 0) return;
        displayChunk((currentChunkIndex - 1 + chunks.length) % chunks.length);
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
    
    const handleScreenClick = () => {
        if (!isPaused) {
            displayNextChunk();
        }
    };

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
                processAndSetText(event.target?.result as string, file.name, true);
            };
            reader.readAsText(file);
        }
        // Reset file input to allow re-uploading the same file
        e.target.value = '';
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
                await processAndSetText(storyData.story, storyData.title);
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
            className="h-screen w-screen font-mono text-center flex justify-center items-center overflow-hidden"
            style={{ background: backgroundOption.gradient }}
            onClick={handleScreenClick}
        >
            <div 
                className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 z-20 pointer-events-none"
            >
                {/* Top bar */}
                <div className="flex justify-between items-center w-full pointer-events-auto">
                    <h1 className="text-lg text-amber-400/60 whitespace-nowrap px-4 truncate max-w-[calc(100%-60px)]">{filename}</h1>
                     <IconButton ariaLabel="Open Settings" onClick={() => setIsMenuVisible(v => !v)}>
                        <SettingsIcon />
                    </IconButton>
                </div>
                
                {/* Bottom bar */}
                <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-3 pointer-events-auto" onClick={e => e.stopPropagation()}>
                    <div className="text-sm sm:text-base text-amber-400/60 w-full flex justify-between px-1">
                        <span>{Math.round(60000 / readingSpeed)} WPM</span>
                        <span>{chunks.length > 0 ? currentChunkIndex + 1 : 0} / {chunks.length}</span>
                    </div>
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
                     <div className="flex items-center justify-center gap-2 sm:gap-4 w-full mt-1">
                         <IconButton ariaLabel="Previous Chunk" onClick={displayPreviousChunk}>
                             <PreviousIcon />
                         </IconButton>
                         <IconButton ariaLabel={isPaused ? "Play" : "Pause"} onClick={togglePause} className="w-16 h-16">
                             {isPaused ? <PlayIcon /> : <PauseIcon />}
                         </IconButton>
                         <IconButton ariaLabel="Next Chunk" onClick={displayNextChunk}>
                             <NextIcon />
                         </IconButton>
                     </div>
                </div>
            </div>


            <div className="relative z-10 p-8 max-w-[90%] flex justify-center items-center animate-pulse-custom">
                <p
                    ref={sentenceRef}
                    className={`transition-opacity duration-300 ease-in-out cursor-default text-4xl md:text-5xl lg:text-6xl font-bold ${isTextVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ 
                        fontFamily: font.value, 
                        fontSize: `${fontSize}px`,
                        color: textColor,
                        textShadow: `2px 2px 8px ${backgroundOption.shadowColor}`,
                    }}
                    contentEditable={isPaused}
                    suppressContentEditableWarning={true}
                    onClick={e => e.stopPropagation()} // Prevent advancing when clicking to edit
                >
                    {chunks[currentChunkIndex] || ''}
                </p>
            </div>
            
            <input type="file" ref={fileInputRef} onChange={handleFileImport} accept=".txt" className="hidden" />

            {isMenuVisible && (
                <div 
                    className="absolute inset-0 bg-black/50 z-30"
                    onClick={() => setIsMenuVisible(false)}
                />
            )}

            <SettingsMenu 
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
                onImportClick={() => fileInputRef.current?.click()}
                onExport={handleExport}
                onShare={handleShare}
            />

        </div>
    );
};

export default App;