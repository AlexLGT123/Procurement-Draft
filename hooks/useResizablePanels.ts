// Fix: Import React to use React types like React.MouseEvent.
import React, { useState, useCallback, useEffect } from 'react';
import { RESIZABLE_PANEL_STORAGE_KEY } from '../constants';

export const useResizablePanels = (initialSize: number = 50) => {
    const [panelSize, setPanelSize] = useState(() => {
        const savedSize = localStorage.getItem(RESIZABLE_PANEL_STORAGE_KEY);
        const initial = savedSize ? parseFloat(savedSize) : initialSize;
        return Math.max(25, Math.min(75, initial));
    });

    const handleMouseDown = useCallback((mouseDownEvent: React.MouseEvent<HTMLDivElement>) => {
        mouseDownEvent.preventDefault();

        const container = mouseDownEvent.currentTarget.parentElement as HTMLElement;
        if (!container) {
            console.error("Resizable panel container not found.");
            return;
        }

        const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
            const containerRect = container.getBoundingClientRect();
            const styles = window.getComputedStyle(container);
            const paddingLeft = parseFloat(styles.paddingLeft);
            const paddingRight = parseFloat(styles.paddingRight);

            const contentWidth = containerRect.width - paddingLeft - paddingRight;
            if (contentWidth <= 0) return;

            const mouseX = mouseMoveEvent.clientX - containerRect.left - paddingLeft;
            
            const newPercentage = (mouseX / contentWidth) * 100;

            const clampedPercentage = Math.max(25, Math.min(75, newPercentage));

            setPanelSize(clampedPercentage);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    }, []);

    useEffect(() => {
        localStorage.setItem(RESIZABLE_PANEL_STORAGE_KEY, String(panelSize));
    }, [panelSize]);

    return { panelSize, handleMouseDown };
};