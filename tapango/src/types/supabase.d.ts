declare module '@supabase/supabase-js' {
  export interface SupabaseClient {
    [key: string]: any;
  }

  export function createClient(
    url: string,
    key: string,
    options?: any
  ): SupabaseClient;

  export * from '@supabase/supabase-js/dist/main/types';
}
