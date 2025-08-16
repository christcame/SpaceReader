
import React, { forwardRef } from 'react';

interface IconButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    ariaLabel: string;
    className?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ onClick, children, ariaLabel, className = '' }, ref) => {
        return (
            <button
                ref={ref}
                onClick={onClick}
                aria-label={ariaLabel}
                className={`cursor-pointer w-10 h-10 bg-amber-400 rounded-lg flex justify-center items-center opacity-70 hover:opacity-90 transition-all shadow-lg shadow-amber-400/50 hover:scale-105 ${className}`}
            >
                {children}
            </button>
        );
    }
);
