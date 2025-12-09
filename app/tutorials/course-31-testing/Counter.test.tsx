import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Counter } from './Counter';

// 這是一個範例測試文件 (不會被 Next.js 執行，除非配置了 Vitest)
describe('Counter Component', () => {
    it('renders initial count', () => {
        render(<Counter />);
        // 檢查是否有文字 "Count:"
        expect(screen.getByText(/Count:/)).toBeInTheDocument();
        // 檢查數值是否為 0
        expect(screen.getByTestId('count-value')).toHaveTextContent('0');
    });

    it('increments count when button is clicked', () => {
        render(<Counter />);

        // 找到按鈕並點擊
        const button = screen.getByText('Increment');
        fireEvent.click(button);

        // 檢查數字是否變為 1
        // 這裡我們用了 data-testid="count-value" 來精準定位
        expect(screen.getByTestId('count-value')).toHaveTextContent('1');
    });

    it('decrements count', () => {
        render(<Counter />);
        const button = screen.getByText('Decrement');
        fireEvent.click(button);
        expect(screen.getByTestId('count-value')).toHaveTextContent('-1');
    });
});
