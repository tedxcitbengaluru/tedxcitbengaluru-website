import React, { useRef, useCallback, useState } from 'react';
import './ProfileCard.css';

interface ProfileCardProps {
  avatarUrl: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string; // Optional: If provided, shows a button
  className?: string;
  enableTilt?: boolean; // Kept for API compatibility, but we use subtle CSS tilt now
  enableMobileTilt?: boolean; 
  behindGlowEnabled?: boolean;
  innerGradient?: string;
  // unused props kept to prevent typescript errors in Team.tsx
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  showUserInfo?: boolean;
  iconUrl?: string; 
  onContactClick?: () => void;
}

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  avatarUrl,
  name,
  title,
  contactText,
  onContactClick,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  // Mouse Move: Calculates X/Y position for the spotlight gradient
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  // Handle click for mobile "active" state or button click
  const handleClick = (e: React.MouseEvent) => {
    // If clicking the button, don't toggle active state, just fire callback
    // (This logic handled by button's onClick bubbling, but we handle container click here)
    if (onContactClick && !contactText) {
       onContactClick();
    }
    // Toggle active state for mobile styles
    setIsActive(!isActive);
  };

  return (
    <div className={`spotlight-wrapper ${className}`}>
      <div 
        ref={cardRef}
        className={`spotlight-card ${isActive ? 'active' : ''}`}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        {/* The Image */}
        <div className="card-image-container">
          <img 
            src={avatarUrl} 
            alt={name || "Profile"} 
            className="card-image"
            loading="lazy"
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.opacity = "0.2"; // Fade out broken images
            }}
          />
        </div>

        {/* Textures & Overlays */}
        <div className="card-noise"></div>
        <div className="card-overlay"></div>

        {/* TEDx Watermark (Top Right) */}
        <div className="card-watermark">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 20 L40 50 L20 80 H35 L50 58 L65 80 H80 L60 50 L80 20 H65 L50 42 L35 20 Z" fill="#EB0028"/>
            </svg>
        </div>

        {/* Content Info */}
        <div className="card-content">
          {title && <span className="card-role">{title}</span>}
          {name && <h3 className="card-name">{name}</h3>}
          
          {/* Action Button Area */}
          {contactText && (
            <div className="card-action">
                <button 
                    className="action-btn"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent card click logic
                        onContactClick?.();
                    }}
                >
                    {contactText}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Memoize to prevent re-renders on parent state changes
const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;