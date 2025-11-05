import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

// Base Customization Settings (Free)
export interface BaseCustomization {
  theme_mode: 'light' | 'dark' | 'auto';
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  font_size: 'small' | 'medium' | 'large' | 'extra-large';
  layout_density: 'compact' | 'comfortable' | 'spacious';
  icon_style: 'outline' | 'filled' | 'mixed';
  preset_theme_name?: string;
}

// Advanced Customization Settings (Premium)
export interface AdvancedCustomization {
  background_type: 'solid' | 'gradient' | 'image';
  background_gradient?: string;
  background_image_url?: string;
  gradient_color_1?: string;
  gradient_color_2?: string;
  gradient_type?: 'linear' | 'radial';
  gradient_angle?: string;
  custom_logo_url?: string;
  logo_position: 'top-left' | 'top-center' | 'top-right';
  custom_icon_pack?: string;
  custom_font_family?: string;
  custom_font_url?: string;
  animation_speed: 'slow' | 'normal' | 'fast' | 'none';
  animation_type: 'smooth' | 'bouncy' | 'sharp' | 'none';
  custom_css?: string;
  widget_layout?: any;
  layout_positions?: any;
  layout_template?: 'default' | 'dashboard-focused' | 'compact' | 'spacious';
}

export interface CustomizationSettings extends BaseCustomization, Partial<AdvancedCustomization> {
  user_id?: string;
  is_premium: boolean;
}

export interface SubscriptionInfo {
  subscription_tier: 'free' | 'premium';
  subscription_status: 'active' | 'inactive' | 'cancelled' | 'expired';
  reference_key?: string;
  activated_at?: string;
  expires_at?: string;
}

interface CustomizationContextType {
  settings: CustomizationSettings;
  isPremium: boolean;
  subscription: SubscriptionInfo | null;
  updateSettings: (newSettings: Partial<CustomizationSettings>) => Promise<void>;
  activatePremium: (referenceKey: string) => Promise<{ success: boolean; message: string }>;
  loadSettings: () => Promise<void>;
  applyPresetTheme: (presetName: string) => void;
  exportTheme: () => string;
  importTheme: (themeData: string) => void;
  resetToDefaults: () => void;
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

// Preset themes for quick customization
export const PRESET_THEMES: Record<string, Partial<BaseCustomization>> = {
  ocean: {
    preset_theme_name: 'Ocean Breeze',
    primary_color: '#0891b2',
    secondary_color: '#0ea5e9',
    accent_color: '#06b6d4',
    theme_mode: 'light',
  },
  forest: {
    preset_theme_name: 'Forest Green',
    primary_color: '#059669',
    secondary_color: '#10b981',
    accent_color: '#34d399',
    theme_mode: 'light',
  },
  sunset: {
    preset_theme_name: 'Sunset Glow',
    primary_color: '#f59e0b',
    secondary_color: '#f97316',
    accent_color: '#fb923c',
    theme_mode: 'light',
  },
  midnight: {
    preset_theme_name: 'Midnight Purple',
    primary_color: '#7c3aed',
    secondary_color: '#8b5cf6',
    accent_color: '#a78bfa',
    theme_mode: 'dark',
  },
  rose: {
    preset_theme_name: 'Rose Garden',
    primary_color: '#e11d48',
    secondary_color: '#f43f5e',
    accent_color: '#fb7185',
    theme_mode: 'light',
  },
  professional: {
    preset_theme_name: 'Professional',
    primary_color: '#1e40af',
    secondary_color: '#3b82f6',
    accent_color: '#60a5fa',
    theme_mode: 'light',
  },
};

const DEFAULT_SETTINGS: CustomizationSettings = {
  theme_mode: 'light',
  primary_color: '#3b82f6',
  secondary_color: '#8b5cf6',
  accent_color: '#10b981',
  font_size: 'medium',
  layout_density: 'comfortable',
  icon_style: 'outline',
  background_type: 'solid',
  gradient_color_1: '#667eea',
  gradient_color_2: '#764ba2',
  gradient_type: 'linear',
  gradient_angle: '135deg',
  logo_position: 'top-left',
  animation_speed: 'normal',
  animation_type: 'smooth',
  layout_template: 'default',
  layout_positions: {},
  is_premium: false,
};

export function CustomizationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [settings, setSettings] = useState<CustomizationSettings>(DEFAULT_SETTINGS);
  const [isPremium, setIsPremium] = useState(false);
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [supabaseUrl] = useState(() => import.meta.env.VITE_SUPABASE_URL);
  const [supabaseAnonKey] = useState(() => import.meta.env.VITE_SUPABASE_ANON_KEY);

  // Apply settings to DOM
  const applySettingsToDOM = useCallback((newSettings: CustomizationSettings) => {
    const root = document.documentElement;

    // Apply colors
    root.style.setProperty('--color-primary', newSettings.primary_color);
    root.style.setProperty('--color-secondary', newSettings.secondary_color);
    root.style.setProperty('--color-accent', newSettings.accent_color);

    // Apply font size
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'extra-large': '20px',
    };
    root.style.setProperty('--base-font-size', fontSizeMap[newSettings.font_size]);

    // Apply layout density
    const densityMap = {
      compact: { padding: '0.5rem', gap: '0.5rem' },
      comfortable: { padding: '1rem', gap: '1rem' },
      spacious: { padding: '1.5rem', gap: '1.5rem' },
    };
    const density = densityMap[newSettings.layout_density];
    root.style.setProperty('--layout-padding', density.padding);
    root.style.setProperty('--layout-gap', density.gap);

    // Apply layout template settings
    const templateMap = {
      default: {
        containerWidth: '1280px',
        cardSpacing: '1.5rem',
        sectionSpacing: '2rem',
        contentPadding: '1.5rem'
      },
      'dashboard-focused': {
        containerWidth: '1536px',
        cardSpacing: '1rem',
        sectionSpacing: '1.5rem',
        contentPadding: '1rem'
      },
      compact: {
        containerWidth: '1024px',
        cardSpacing: '0.75rem',
        sectionSpacing: '1rem',
        contentPadding: '0.75rem'
      },
      spacious: {
        containerWidth: '1280px',
        cardSpacing: '2rem',
        sectionSpacing: '3rem',
        contentPadding: '2rem'
      }
    };
    const template = templateMap[newSettings.layout_template || 'default'];
    root.style.setProperty('--container-max-width', template.containerWidth);
    root.style.setProperty('--card-spacing', template.cardSpacing);
    root.style.setProperty('--section-spacing', template.sectionSpacing);
    root.style.setProperty('--content-padding', template.contentPadding);

    // Apply theme mode
    if (newSettings.theme_mode === 'dark') {
      root.classList.add('dark');
    } else if (newSettings.theme_mode === 'light') {
      root.classList.remove('dark');
    } else {
      // Auto mode
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }

    // Apply premium features if available
    if (newSettings.is_premium) {
      // Background - Generate gradient from two colors if gradient type is selected
      if (newSettings.background_type === 'gradient') {
        const color1 = newSettings.gradient_color_1 || '#667eea';
        const color2 = newSettings.gradient_color_2 || '#764ba2';
        const angle = newSettings.gradient_angle || '135deg';
        const gradientType = newSettings.gradient_type || 'linear';
        
        let generatedGradient: string;
        if (gradientType === 'linear') {
          generatedGradient = `linear-gradient(${angle}, ${color1}, ${color2})`;
        } else {
          generatedGradient = `radial-gradient(circle, ${color1}, ${color2})`;
        }
        
        root.style.setProperty('--background-gradient', generatedGradient);
        document.body.classList.add('theme-gradient');
        document.body.classList.remove('theme-image');
        // Also update the background_gradient field for backward compatibility
        if (newSettings.background_gradient !== generatedGradient) {
          newSettings.background_gradient = generatedGradient;
        }
      } else if (newSettings.background_type === 'image' && newSettings.background_image_url) {
        root.style.setProperty('--background-image', `url(${newSettings.background_image_url})`);
        document.body.classList.add('theme-image');
        document.body.classList.remove('theme-gradient');
      } else {
        // Solid background - remove theme classes
        document.body.classList.remove('theme-gradient', 'theme-image');
      }

      // Custom font
      if (newSettings.custom_font_family) {
        root.style.setProperty('--custom-font', newSettings.custom_font_family);
      }

      // Animation settings
      const animationSpeedMap = {
        slow: '0.5s',
        normal: '0.3s',
        fast: '0.15s',
        none: '0s',
      };
      root.style.setProperty('--animation-duration', animationSpeedMap[newSettings.animation_speed || 'normal']);

      // Custom CSS
      if (newSettings.custom_css) {
        let styleEl = document.getElementById('custom-user-css');
        if (!styleEl) {
          styleEl = document.createElement('style');
          styleEl.id = 'custom-user-css';
          document.head.appendChild(styleEl);
        }
        styleEl.textContent = newSettings.custom_css;
      }
    } else {
      // Remove premium theme classes if not premium
      document.body.classList.remove('theme-gradient', 'theme-image');
    }
  }, []);

  // Load subscription info
  const loadSubscription = useCallback(async () => {
    if (!user || !user.id || !supabaseUrl || !supabaseAnonKey) return;

    try {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/user_subscriptions?user_id=eq.${user.id}&select=*`,
        {
          headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          const sub = data[0];
          setSubscription(sub);
          const premium = sub.subscription_tier === 'premium' && sub.subscription_status === 'active';
          setIsPremium(premium);
          return premium;
        }
      }
    } catch (error) {
      console.error('Failed to load subscription:', error);
    }
    return false;
  }, [user, supabaseUrl, supabaseAnonKey]);

  // Load settings from database or localStorage
  const loadSettings = useCallback(async () => {
    // Try localStorage first
    const localSettings = localStorage.getItem('idlely-customization');
    if (localSettings) {
      try {
        const parsed = JSON.parse(localSettings);
        setSettings(parsed);
        applySettingsToDOM(parsed);
      } catch (error) {
        console.error('Failed to parse local settings:', error);
      }
    }

    // If user is logged in, load from database
    if (user && user.id && supabaseUrl && supabaseAnonKey) {
      try {
        const premium = await loadSubscription();

        const response = await fetch(
          `${supabaseUrl}/rest/v1/customization_settings?user_id=eq.${user.id}&select=*`,
          {
            headers: {
              apikey: supabaseAnonKey,
              Authorization: `Bearer ${supabaseAnonKey}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const dbSettings = { ...data[0], is_premium: premium };
            setSettings(dbSettings);
            applySettingsToDOM(dbSettings);
            localStorage.setItem('idlely-customization', JSON.stringify(dbSettings));
          }
        }
      } catch (error) {
        console.error('Failed to load settings from database:', error);
      }
    }
  }, [user, supabaseUrl, supabaseAnonKey, loadSubscription, applySettingsToDOM]);

  // Update settings
  const updateSettings = useCallback(async (newSettings: Partial<CustomizationSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    // Apply settings to DOM immediately
    applySettingsToDOM(updatedSettings);

    // Save to localStorage
    localStorage.setItem('idlely-customization', JSON.stringify(updatedSettings));

    // Save to database if user is logged in
    if (user && user.id && supabaseUrl) {
      try {
        const updateFunctionUrl = `${supabaseUrl}/functions/v1/update-customization`;
        await fetch(updateFunctionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: supabaseAnonKey || '',
          },
          body: JSON.stringify({
            userId: user.id,
            settings: updatedSettings,
          }),
        });
      } catch (error) {
        console.error('Failed to save settings to database:', error);
      }
    }

    // Force a repaint to ensure CSS variables are applied
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';
  }, [settings, user, supabaseUrl, supabaseAnonKey, applySettingsToDOM]);

  // Activate premium with reference key
  const activatePremium = useCallback(async (referenceKey: string): Promise<{ success: boolean; message: string }> => {
    if (!user || !user.id) {
      return { success: false, message: 'Please sign in to activate premium access' };
    }

    try {
      const activateFunctionUrl = `${supabaseUrl}/functions/v1/activate-premium`;
      const response = await fetch(activateFunctionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseAnonKey || '',
        },
        body: JSON.stringify({
          referenceKey,
          userId: user.id,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsPremium(true);
        await loadSettings();
        return { success: true, message: result.data.message || 'Premium activated successfully!' };
      } else {
        return { success: false, message: result.error?.message || 'Failed to activate premium' };
      }
    } catch (error: any) {
      return { success: false, message: error.message || 'Network error' };
    }
  }, [user, supabaseUrl, supabaseAnonKey, loadSettings]);

  // Apply preset theme
  const applyPresetTheme = useCallback((presetName: string) => {
    const preset = PRESET_THEMES[presetName];
    if (preset) {
      updateSettings(preset);
    }
  }, [updateSettings]);

  // Export theme
  const exportTheme = useCallback(() => {
    return JSON.stringify(settings, null, 2);
  }, [settings]);

  // Import theme
  const importTheme = useCallback((themeData: string) => {
    try {
      const parsed = JSON.parse(themeData);
      updateSettings(parsed);
    } catch (error) {
      console.error('Failed to import theme:', error);
    }
  }, [updateSettings]);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    updateSettings(DEFAULT_SETTINGS);
  }, [updateSettings]);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return (
    <CustomizationContext.Provider
      value={{
        settings,
        isPremium,
        subscription,
        updateSettings,
        activatePremium,
        loadSettings,
        applyPresetTheme,
        exportTheme,
        importTheme,
        resetToDefaults,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization() {
  const context = useContext(CustomizationContext);
  if (context === undefined) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
}