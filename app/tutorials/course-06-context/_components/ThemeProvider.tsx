'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * [Course-06] Context 定義檔
 * 
 * 這裡我們定義一個 ThemeContext，用來在組件樹中共享 "主題" 資訊 (Light/Dark)。
 */

// 1. 定義 Context 的資料型別
type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

// 2. 建立 Context 物件
// 初始值通常設為 undefined 或 null，實際值會由 Provider 提供。
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. 建立 Provider 組件
// 這個組件負責 "包住" 子組件，並提供 State 給它們。
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        // [教學重點] Provider 的 value 屬性就是我們要分享出去的數據
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {/* 
         這裡其實可以做更多事，例如在這裡加一個最外層的 div 來切換 CSS class。
         但為了教學單純，我們只負責傳遞數據。
      */}
            {children}
        </ThemeContext.Provider>
    );
}

// 4. 自定義 Hook (Custom Properties)
// 這樣做的好處是：
// (1) 使用者不用每次都 import ThemeContext 和 useContext
// (2) 可以集中處理 "忘記加 Provider" 的錯誤
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
