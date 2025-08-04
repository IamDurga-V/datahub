import ColorThief from 'colorthief';
import React from 'react';
import styled, { useTheme } from 'styled-components'; // Change

import { REDESIGN_COLORS } from '@app/entityV2/shared/constants';
import { getLighterRGBColor } from '@app/sharedV2/icons/colorUtils';

type Props = {
    src: string;
    alt?: string;
    imgSize?: number;
    backgroundSize?: number;
    borderRadius?: number;
};

export const Icon = styled.div<{ background?: string; size: number; borderRadius: number }>`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    display: flex;
    background-color: ${({ background }) => background || 'transparent'};
    align-items: center;
    justify-content: center;
    border-radius: ${({ borderRadius }) => borderRadius}px;
    flex-shrink: 0;
`;

const PreviewImage = styled.img<{ size: number }>`
    max-height: ${({ size }) => size}px;
    width: auto;
    object-fit: contain;
    background-color: transparent;
`;

const DEFAULT_SIZE = 17;
const DEFAULT_BACKGROUND_SIZE = 25;
const DEFAULT_BORDER_RADIUS = 4;

// TODO: Make this the default component for platform icons
const ImageWithColoredBackground = ({ src, alt, imgSize, backgroundSize, borderRadius }: Props) => {
    const imgRef = React.useRef<HTMLImageElement>(null);
    const [platformBackground, setPlatformBackground] = React.useState<string | undefined>(undefined);
    const theme = useTheme(); // Change

    const logo = (
        <PreviewImage
            crossOrigin="anonymous"
            size={imgSize || DEFAULT_SIZE}
            src={src}
            alt={alt}
            ref={imgRef}
            onLoad={() => {
                const img = imgRef.current;
                if (img && img.width > 0 && img.height > 0) {
                    const colorThief = new ColorThief();
                    const [r, g, b] = colorThief.getColor(img, 25);
                    setPlatformBackground(`rgb(${getLighterRGBColor(r, g, b).join(', ')})`);
                }
            }}
            onError={() => {
                const img = imgRef.current;
                if (img) {
                    img.removeAttribute('crossOrigin');
                    setPlatformBackground(theme.styles['component-background']); // Change
                }
            }}
        />
    );
    return (
        <Icon
            size={backgroundSize || DEFAULT_BACKGROUND_SIZE}
            background={platformBackground}
            borderRadius={borderRadius || DEFAULT_BORDER_RADIUS}
        >
            {logo}
        </Icon>
    );
};

export default ImageWithColoredBackground;