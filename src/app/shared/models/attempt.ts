
export interface AttemptResponse {
  black_pegs: number;
  white_pegs: number;
  attempt_number: number;
  remaining_attempts: number;
  solved?: boolean;
  finished?: boolean;
  message?: string;
  attempts_used?: number;
  elapsed_seconds?: number;
  score?: number;
}
