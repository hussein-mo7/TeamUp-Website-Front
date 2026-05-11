export interface University {
  id: string;
  name: string;
  code: string;
  country: string | null;
  apiEndpoint: string | null;
  isActive: boolean;
}

export interface UniversitiesListResponse {
  success: boolean;
  message: string;
  results: number;
  universities: University[];
}