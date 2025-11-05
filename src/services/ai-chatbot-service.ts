// AI Chatbot Service
// Enhanced wrapper for edge functions with intelligent fallbacks and error handling

import { SupabaseConfig } from './supabase-client';

// Type definitions for AI services
export interface LanguageDetection {
  detected: string;
  confidence: number;
  confidenceLevel: 'low' | 'medium' | 'high';
  alternatives: Array<{ language: string; confidence: number }>;
  processingTime: number;
}

export interface TaskCategorization {
  suggestedCategory: string;
  confidenceScore: number;
  detectedTerms: string[];
  alternativeCategories: Array<{ category: string; confidence: number }>;
  language: string;
  processingTime: number;
}

export interface FileUploadResult {
  success: boolean;
  filePath: string;
  publicUrl: string;
  extractedText?: string;
  fileSize: number;
  message: string;
}

export interface ProcessingProgress {
  stage: 'upload' | 'language' | 'categorization' | 'complete';
  progress: number;
  message: string;
  error?: string;
}

export interface AIResponse {
  success: boolean;
  data?: any;
  error?: {
    code: string;
    message: string;
    stage?: string;
  };
  processingTime: number;
}