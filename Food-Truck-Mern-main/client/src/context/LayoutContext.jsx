import React, { useState, useEffect } from 'react';

// Create the LayoutContext
export const LayoutContext = React.createContext();

// LayoutProvider component
export const LayoutProvider = (props) => {
    // State for layout configuration
    const [layoutConfig, setLayoutConfig] = useState({
        ripple: false,
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'light',
        theme: 'lara-light-indigo',
        scale: 14
    });

    // State for layout-specific states
    const [layoutState, setLayoutState] = useState({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    });

    // State for screen width (for responsiveness)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // Effect to listen for window resize events and update screenWidth
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Menu toggle function
    const onMenuToggle = () => {
        if (isOverlay()) {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                overlayMenuActive: !prevLayoutState.overlayMenuActive
            }));
        }

        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive
            }));
        } else {
            setLayoutState((prevLayoutState) => ({
                ...prevLayoutState,
                staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive
            }));
        }
    };

    // Toggle profile sidebar visibility
    const showProfileSidebar = () => {
        setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            profileSidebarVisible: !prevLayoutState.profileSidebarVisible
        }));
    };

    // Check if the menu mode is overlay
    const isOverlay = () => {
        return layoutConfig.menuMode === 'overlay';
    };

    // Check if the screen width is greater than 991px (Desktop)
    const isDesktop = () => {
        return screenWidth > 991;
    };

    // Context value
    const value = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        onMenuToggle,
        showProfileSidebar
    };

    // Return the context provider with value passed to children
    return <LayoutContext.Provider value={value}>{props.children}</LayoutContext.Provider>;
};
