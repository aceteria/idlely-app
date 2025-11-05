// Theme-based text color utility
// Automatically adjusts text colors based on theme mode (light/dark)

/**
 * Gets the appropriate text color class based on theme mode and context
 * @param isDark - Whether the current theme is dark mode
 * @param variant - Text variant (primary, secondary, muted, inverse)
 * @returns Tailwind class string for text color
 */
export function getThemeTextColor(
  isDark: boolean,
  variant: 'primary' | 'secondary' | 'muted' | 'inverse' | 'accent' = 'primary'
): string {
  const colors = {
    light: {
      primary: 'text-gray-900',
      secondary: 'text-gray-700',
      muted: 'text-gray-600',
      inverse: 'text-white',
      accent: 'text-blue-600',
    },
    dark: {
      primary: 'text-white',
      secondary: 'text-gray-200',
      muted: 'text-gray-400',
      inverse: 'text-gray-900',
      accent: 'text-blue-400',
    },
  };

  return isDark ? colors.dark[variant] : colors.light[variant];
}

/**
 * Gets dual-mode text color classes (automatically switches with dark mode)
 * @param variant - Text variant
 * @returns Tailwind class string with dark mode support
 */
export function getAdaptiveTextColor(
  variant: 'primary' | 'secondary' | 'muted' | 'inverse' | 'accent' = 'primary'
): string {
  const colors = {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-700 dark:text-gray-200',
    muted: 'text-gray-600 dark:text-gray-400',
    inverse: 'text-white dark:text-gray-900',
    accent: 'text-blue-600 dark:text-blue-400',
  };

  return colors[variant];
}

/**
 * Gets border color that adapts to theme
 */
export function getAdaptiveBorderColor(variant: 'default' | 'muted' | 'accent' = 'default'): string {
  const colors = {
    default: 'border-gray-200 dark:border-gray-700',
    muted: 'border-gray-100 dark:border-gray-800',
    accent: 'border-blue-200 dark:border-blue-800',
  };

  return colors[variant];
}

/**
 * Gets background color that adapts to theme
 */
export function getAdaptiveBackgroundColor(
  variant: 'default' | 'muted' | 'subtle' | 'accent' = 'default'
): string {
  const colors = {
    default: 'bg-white dark:bg-gray-800',
    muted: 'bg-gray-50 dark:bg-gray-900',
    subtle: 'bg-gray-100 dark:bg-gray-700',
    accent: 'bg-blue-50 dark:bg-blue-900/20',
  };

  return colors[variant];
}

/**
 * Gets hover background color that adapts to theme
 */
export function getAdaptiveHoverBackground(
  variant: 'default' | 'subtle' | 'accent' = 'default'
): string {
  const colors = {
    default: 'hover:bg-gray-50 dark:hover:bg-gray-700',
    subtle: 'hover:bg-gray-100 dark:hover:bg-gray-600',
    accent: 'hover:bg-blue-50 dark:hover:bg-blue-900/30',
  };

  return colors[variant];
}

/**
 * Checks if a background color is dark
 * @param color - Hex color code
 * @returns true if color is dark
 */
export function isColorDark(color: string): boolean {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate relative luminance using sRGB
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Dark if luminance is less than 0.5
  return luminance < 0.5;
}

/**
 * Gets appropriate text color for a given background color
 * @param backgroundColor - Hex color code of background
 * @returns 'light' or 'dark' text color recommendation
 */
export function getContrastingTextColor(backgroundColor: string): 'light' | 'dark' {
  return isColorDark(backgroundColor) ? 'light' : 'dark';
}

/**
 * Gets complete adaptive styling for a card/section
 */
export function getAdaptiveCardStyles(): string {
  return `
    ${getAdaptiveBackgroundColor('default')}
    ${getAdaptiveBorderColor('default')}
    ${getAdaptiveTextColor('primary')}
  `.trim();
}

/**
 * Priority badge colors that adapt to theme
 */
export function getPriorityBadgeColor(priority: 'low' | 'medium' | 'high'): string {
  const colors = {
    low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return colors[priority];
}

/**
 * Status badge colors that adapt to theme
 */
export function getStatusBadgeColor(
  status: 'completed' | 'in_progress' | 'pending' | 'active' | 'archived'
): string {
  const colors = {
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    in_progress: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    pending: 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300',
    active: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    archived: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
  };

  return colors[status];
}

/**
 * React hook to get current theme mode
 */
export function useThemeMode(): 'light' | 'dark' {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      const darkMode = document.documentElement.classList.contains('dark');
      setIsDark(darkMode);
    };

    checkDarkMode();

    // Watch for changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return isDark ? 'dark' : 'light';
}

// Re-export React for the hook
import * as React from 'react';