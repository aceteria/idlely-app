// Notification utility for Idlely PWA
// This file manages notification settings and scheduling
// All actual notifications are now shown via NotificationContext

export interface NotificationSettings {
  enabled: boolean;
  assignments: boolean;
  exams: boolean;
  goals: boolean;
  dailySummary: boolean;
  assignmentReminder24h: boolean;
  assignmentReminder1h: boolean;
  examReminder24h: boolean;
  examReminder1h: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
}

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  enabled: true, // Default to enabled since we use custom notifications
  assignments: true,
  exams: true,
  goals: true,
  dailySummary: true,
  assignmentReminder24h: true,
  assignmentReminder1h: true,
  examReminder24h: true,
  examReminder1h: true,
  quietHoursEnabled: false,
  quietHoursStart: '22:00',
  quietHoursEnd: '08:00',
};

// Notification callback type
type NotificationCallback = (title: string, body: string, type?: 'success' | 'error' | 'warning' | 'info') => void;

// Global notification handler (set by App.tsx)
let globalNotificationHandler: NotificationCallback | null = null;

export function setNotificationHandler(handler: NotificationCallback) {
  globalNotificationHandler = handler;
}

// Initialize notification monitoring
export function initNotificationMonitoring() {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service worker not supported');
    return;
  }