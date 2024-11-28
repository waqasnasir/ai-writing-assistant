export interface RewriteHistory {
  id: string;
  originalText: string;
  rewrittenText: string;
  tone: string;
  length: string;
  timestamp: number;
  explanation?: string;
}

export interface RewriteSettings {
  tone: string;
  length: string;
} 