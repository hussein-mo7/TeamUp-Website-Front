"use client";

import api from "@/lib/axios";
import type { UniversitiesListResponse } from "@/types/institution";
const INSTITUTION_BASE_PATH = "/institutions";

export interface CollegesListResponse {
  success: boolean;
  message: string;
  results: number;
  colleges: Array<{
    id: string;
    name: string;
    code: string;
    universityId: string;
    createdAt: string;
  }>;
}

export interface DepartmentsListResponse {
  success: boolean;
  message: string;
  results: number;
  departments: Array<{
    id: string;
    name: string;
    code: string;
    collegeId: string;
    createdAt: string;
  }>;
}

export const institutionService = {
  async getUniversities() {
    const { data } = await api.get<UniversitiesListResponse>(
      `${INSTITUTION_BASE_PATH}/universities`,
    );

    return data;
  },

  async getColleges(universityId: string) {
    const { data } = await api.get<CollegesListResponse>(
      `${INSTITUTION_BASE_PATH}/colleges`,
      {
        params: { universityId },
      },
    );

    return data;
  },

  async getDepartments(collegeId: string) {
    const { data } = await api.get<DepartmentsListResponse>(
      `${INSTITUTION_BASE_PATH}/departments`,
      {
        params: { collegeId },
      },
    );

    return data;
  },
};