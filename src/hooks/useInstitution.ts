import { useQuery } from "@tanstack/react-query";
import { institutionService } from "@/services/institution.service";

export const institutionQueryKeys = {
  universities: () => ["institutions", "universities"] as const,
};

export const useUniversityName = (universityId?: string | null) => {
  const universitiesQuery = useQuery({
    queryKey: institutionQueryKeys.universities(),
    queryFn: () => institutionService.getUniversities(),
    enabled: Boolean(universityId),
  });

  const universityName =
    universitiesQuery.data?.universities.find((university) => university.id === universityId)
      ?.name ?? "";

  return {
    universityName,
    isLoading: universitiesQuery.isLoading,
  };
};