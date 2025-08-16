
import React from 'react';

const iconProps = {
    className: "fill-black w-3/4 h-3/4",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
};

export const UploadIcon: React.FC = () => (
    <svg {...iconProps} stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M12 12L12 3M12 3L16 7M12 3L8 7M5 16C5 17.6569 6.34315 19 8 19H16C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C15.5492 13 15.1118 13.1118 14.7176 13.3197C14.1206 11.2335 12.1868 9.77123 9.94025 9.87328C7.94096 9.96781 6.2758 11.6443 6.00031 13.6469C5.53989 13.4116 5.01188 13.3333 4.5 13.3333C2.84315 13.3333 1.5 14.6765 1.5 16.3333C1.5 17.9902 2.84315 19.3333 4.5 19.3333H7" />
    </svg>
);

export const ExportIcon: React.FC = () => (
    <svg {...iconProps} stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

export const PauseIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M6 5H8V19H6V5ZM16 5H18V19H16V5Z" />
    </svg>
);

export const PlayIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M8 5V19L19 12L8 5Z" />
    </svg>
);

export const PreviousIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/>
    </svg>
);

export const NextIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/>
    </svg>
);

export const SettingsIcon: React.FC = () => (
    <svg {...iconProps}>
        <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
    </svg>
);

export const OpenAIIcon: React.FC = () => (
    <svg viewBox="0 0 41 41" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-black">
      <path d="M38.13,38.13,20.5,40.52,2.87,38.13,0,20.5,2.87,2.87,20.5,0,38.13,2.87,41,20.5ZM16.48,16.48l-4.1,4.1,4.1,4.1-4.1,4.1,4.1,4.1-4.1,4.1,4.1,4.1,4.1-4.1,4.1-4.1-4.1-4.1,4.1-4.1-4.1-4.1-4.1,4.1ZM24.52,2.87l4.1,4.1-4.1,4.1,4.1,4.1-4.1,4.1,4.1,4.1-4.1,4.1-4.1-4.1-4.1-4.1,4.1-4.1-4.1-4.1,4.1-4.1,4.1-4.1Z" />
    </svg>
);

export const ShareIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-black">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export const HotkeysIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-black">
       <path d="M20 5H4c-1.11 0-2 .9-2 2v10c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m-9 10H5v-2h6v2m0-3H5V9h6v2m7 3h-6v-2h6v2m0-3h-6V9h6v2Z" />
    </svg>
);

export const ColorPaletteIcon: React.FC = () => (
     <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 fill-amber-400 pointer-events-none">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
);
