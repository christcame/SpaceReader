

import React, { useState, forwardRef } from 'react';
import type { FontOption, BackgroundOption } from '../types';
import { FONT_OPTIONS, BACKGROUND_OPTIONS } from '../constants';
import { OpenAIIcon, HotkeysIcon, ColorPaletteIcon, UploadIcon, ExportIcon, ShareIcon } from './icons';

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
    onImportClick: () => void;
    onExport: () => void;
    onShare: () => void;
}

const HotkeyInfo: React.FC = () => (
    <div className="text-xs text-amber-200/80 mt-2 p-3 bg-black/30 rounded-md">
        <ul className="space-y-1.5">
            <li><kbd className="font-sans font-semibold p-1 bg-amber-400/20 rounded">Space</kbd>: Next chunk / Play</li>
            <li><kbd className="font-sans font-semibold p-1 bg-amber-400/20 rounded">P</kbd>: Toggle Pause/Play</li>
            <li><kbd className="font-sans font-semibold p-1 bg-amber-400/20 rounded">←</kbd> / <kbd className="font-sans font-semibold p-1 bg-amber-400/20 rounded">→</kbd>: Prev/Next Chunk</li>
            <li><kbd className="font-sans font-semibold p-1 bg-amber-400/20 rounded">↑</kbd> / <kbd className="font-sans font-semibold p-1 bg-amber-400/20 rounded">↓</kbd>: Faster/Slower Speed</li>
            <li><kbd className="font-sans font-semibold p-1 bg-amber-400/20 rounded">M</kbd>: Toggle Menu</li>
            <li><kbd className="font-sans font-semibold p-1 bg-amber-400/20 rounded">-</kbd> / <kbd className="font-sans font-semibold p-1 bg-amber-400/20 rounded">+</kbd>: Change Font Size</li>
        </ul>
    </div>
);

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <label className="text-sm font-bold text-amber-400/80 tracking-wider uppercase">{children}</label>
);

const ActionButton: React.FC<{ onClick?: () => void; disabled?: boolean; children: React.ReactNode; className?: string }> = ({ onClick, disabled, children, className }) => (
    <button onClick={onClick} disabled={disabled} className={`flex-grow bg-amber-400/80 text-black font-bold py-2.5 px-3 rounded-md flex items-center justify-center gap-2.5 hover:bg-amber-400 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm ${className}`}>
        {children}
    </button>
);


export const SettingsMenu = forwardRef<HTMLDivElement, SettingsMenuProps>(({
    isVisible,
    font, onFontChange,
    fontSize, onFontSizeChange,
    readingSpeed, onReadingSpeedChange,
    textColor, onTextColorChange,
    backgroundOption, onBackgroundChange,
    isGenerating, onGenerateStory,
    onImportClick, onExport, onShare
}, ref) => {
    const [showHotkeys, setShowHotkeys] = useState(false);
    
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
        <div ref={ref} className={`fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md rounded-t-2xl p-4 z-40 flex flex-col gap-4 w-full max-h-[85vh] overflow-y-auto transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-2 shrink-0"></div>
            
            <SectionLabel>Display</SectionLabel>
            <div className="flex flex-col w-full items-start text-white text-sm">
                <label htmlFor="font-select" className="mb-1.5 text-amber-400">Font Style</label>
                <select id="font-select" value={font.value} onChange={handleFontSelect} className="w-full bg-transparent text-amber-400 border border-amber-400/50 p-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400">
                    {FONT_OPTIONS.map(opt => (<option key={opt.name} value={opt.value} className="bg-gray-800">{opt.name}</option>))}
                </select>
            </div>
            <div className="flex flex-col w-full items-start text-white text-sm">
                <label htmlFor="bg-select" className="mb-1.5 text-amber-400">Background Color</label>
                <select id="bg-select" value={backgroundOption.name} onChange={handleBackgroundSelect} className="w-full bg-transparent text-amber-400 border border-amber-400/50 p-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400">
                    {BACKGROUND_OPTIONS.map(opt => (<option key={opt.name} value={opt.name} className="bg-gray-800">{opt.name}</option>))}
                </select>
            </div>
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
            <div className="flex flex-col w-full items-start text-white text-sm">
                <label htmlFor="speed-slider" className="mb-1.5 text-amber-400">Reading Speed ({Math.round(60000 / readingSpeed)} WPM)</label>
                <input type="range" id="speed-slider" min="0" max="100" value={speedPercent} onChange={handleSpeedChange}/>
            </div>

            <div className="border-t border-amber-400/20 my-1"></div>
            
            <SectionLabel>Content</SectionLabel>
            <div className="grid grid-cols-2 gap-2 w-full">
                 <ActionButton onClick={onImportClick}><UploadIcon /><span>Import</span></ActionButton>
                 <ActionButton onClick={onExport}><ExportIcon /><span>Export</span></ActionButton>
                 <ActionButton onClick={onGenerateStory} disabled={isGenerating} className="col-span-2">
                     {isGenerating ? '...' : <OpenAIIcon />}
                     <span>{isGenerating ? 'Generating...' : 'Generate AI Story'}</span>
                 </ActionButton>
             </div>

            <div className="border-t border-amber-400/20 my-1"></div>

            <div className="flex gap-2">
                 <ActionButton onClick={onShare} className="flex-grow">
                     <ShareIcon /><span>Share on X</span>
                 </ActionButton>
                <button onClick={() => setShowHotkeys(s => !s)} className="bg-amber-400/80 text-black font-bold p-2 rounded-md hover:bg-amber-400 transition-colors shrink-0">
                    <HotkeysIcon />
                </button>
            </div>
            {showHotkeys && <HotkeyInfo />}
        </div>
    );
});
