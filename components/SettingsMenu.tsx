
import React, { useState, forwardRef } from 'react';
import type { FontOption, BackgroundOption } from '../types';
import { FONT_OPTIONS, BACKGROUND_OPTIONS } from '../constants';
import { OpenAIIcon, HotkeysIcon, ColorPaletteIcon } from './icons';

interface SettingsMenuProps {
    isVisible: boolean;
    font: FontOption;
    onFontChange: (font: FontOption) => void;
    fontSize: number;
    onFontSizeChange: (size: number) => void;
    readingSpeed: number;
    onReadingSpeedChange: (speed: number) => void;
    textColor: string;
    onTextColorChange: (color: string) => void;
    backgroundOption: BackgroundOption;
    onBackgroundChange: (option: BackgroundOption) => void;
    isGenerating: boolean;
    onGenerateStory: () => Promise<void>;
}

const HotkeyInfo: React.FC = () => (
    <div className="text-xs text-amber-200/80 mt-2 p-2 bg-black/30 rounded-md">
        <ul className="space-y-1">
            <li><kbd className="font-sans font-semibold">Space</kbd>: Next chunk / Play</li>
            <li><kbd className="font-sans font-semibold">P</kbd>: Toggle Pause/Play</li>
            <li><kbd className="font-sans font-semibold">←</kbd> / <kbd className="font-sans font-semibold">→</kbd>: Prev/Next Chunk</li>
            <li><kbd className="font-sans font-semibold">↑</kbd> / <kbd className="font-sans font-semibold">↓</kbd>: Faster/Slower Speed</li>
            <li><kbd className="font-sans font-semibold">M</kbd>: Toggle Menu</li>
            <li><kbd className="font-sans font-semibold">-</kbd> / <kbd className="font-sans font-semibold">+</kbd>: Change Font Size</li>
        </ul>
    </div>
);

export const SettingsMenu = forwardRef<HTMLDivElement, SettingsMenuProps>(({
    isVisible,
    font, onFontChange,
    fontSize, onFontSizeChange,
    readingSpeed, onReadingSpeedChange,
    textColor, onTextColorChange,
    backgroundOption, onBackgroundChange,
    isGenerating, onGenerateStory,
}, ref) => {
    const [showHotkeys, setShowHotkeys] = useState(false);
    
    if (!isVisible) return null;
    
    const handleFontSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFont = FONT_OPTIONS.find(f => f.value === e.target.value);
        if(selectedFont) onFontChange(selectedFont);
    }
    
    const handleBackgroundSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = BACKGROUND_OPTIONS.find(p => p.name === e.target.value);
        if(selectedOption) onBackgroundChange(selectedOption);
    }

    const MIN_SPEED_MS = 500;
    const MAX_SPEED_MS = 5000;

    const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const percent = Number(e.target.value);
        onReadingSpeedChange(MAX_SPEED_MS - (percent / 100) * (MAX_SPEED_MS - MIN_SPEED_MS));
    };
    
    const speedPercent = Math.round(((MAX_SPEED_MS - readingSpeed) / (MAX_SPEED_MS - MIN_SPEED_MS)) * 100);

    return (
        <div ref={ref} className={`absolute bottom-[78px] left-5 bg-black/50 backdrop-blur-sm rounded-lg p-4 z-30 flex flex-col gap-4 w-64 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Font Style */}
            <div className="flex flex-col w-full items-start text-white text-sm">
                <label htmlFor="font-select" className="mb-1.5 text-amber-400">Font Style</label>
                <select id="font-select" value={font.value} onChange={handleFontSelect} className="w-full bg-transparent text-amber-400 border border-amber-400/50 p-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400">
                    {FONT_OPTIONS.map(opt => (<option key={opt.name} value={opt.value} className="bg-gray-800">{opt.name}</option>))}
                </select>
            </div>
            {/* Background Style */}
            <div className="flex flex-col w-full items-start text-white text-sm">
                <label htmlFor="bg-select" className="mb-1.5 text-amber-400">Background Color</label>
                <select id="bg-select" value={backgroundOption.name} onChange={handleBackgroundSelect} className="w-full bg-transparent text-amber-400 border border-amber-400/50 p-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400">
                    {BACKGROUND_OPTIONS.map(opt => (<option key={opt.name} value={opt.name} className="bg-gray-800">{opt.name}</option>))}
                </select>
            </div>
            {/* Text Customization Row */}
            <div className="flex gap-4 w-full">
                <div className="flex flex-col w-2/3 items-start text-white text-sm">
                    <label htmlFor="text-size-slider" className="mb-1.5 text-amber-400">Size ({fontSize}px)</label>
                    <input type="range" id="text-size-slider" min="20" max="80" value={fontSize} onChange={(e) => onFontSizeChange(Number(e.target.value))} />
                </div>
                 <div className="flex flex-col w-1/3 items-start text-white text-sm">
                    <label htmlFor="text-color-picker" className="mb-1.5 text-amber-400">Color</label>
                    <div className="relative w-full h-8">
                       <ColorPaletteIcon />
                       <input type="color" id="text-color-picker" value={textColor} onChange={(e) => onTextColorChange(e.target.value)} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                    </div>
                </div>
            </div>
            {/* Reading Speed */}
            <div className="flex flex-col w-full items-start text-white text-sm">
                <label htmlFor="speed-slider" className="mb-1.5 text-amber-400">Reading Speed ({speedPercent}%)</label>
                <input type="range" id="speed-slider" min="0" max="100" value={speedPercent} onChange={handleSpeedChange}/>
            </div>
            {/* Divider */}
            <div className="border-t border-amber-400/20 my-1"></div>
            {/* Action Buttons */}
            <div className="flex gap-2">
                <button onClick={onGenerateStory} disabled={isGenerating} className="flex-grow bg-amber-400/80 text-black font-bold py-2 px-3 rounded-md flex items-center justify-center gap-2 hover:bg-amber-400 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm">
                    {isGenerating ? '...' : <OpenAIIcon />}
                    <span>{isGenerating ? 'Generating' : 'AI Story'}</span>
                </button>
                <button onClick={() => setShowHotkeys(s => !s)} className="bg-amber-400/80 text-black font-bold p-2 rounded-md hover:bg-amber-400 transition-colors">
                    <HotkeysIcon />
                </button>
            </div>
            {showHotkeys && <HotkeyInfo />}
        </div>
    );
});
