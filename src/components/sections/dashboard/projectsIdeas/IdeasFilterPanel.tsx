"use client";
import GenericFilterPanel, { FilterFieldConfig } from "@/components/ui/forms/FilterPanel";
import type { FiltersObject } from "@/components/ui/forms/FilterPanel";
import {
  IDEAS_CATEGORY_OPTIONS,
  IDEAS_PRICE_OPTIONS,
} from "@/mock/ProjectsIdeas";

export interface IdeasFilters extends FiltersObject {
  category: string;
  price: string;
  requiredSkills: string[];
}

interface IdeasFilterPanelProps {
  filters: IdeasFilters;
  onChange: (filters: IdeasFilters) => void;
  onApply: () => void;
  onCancel: () => void;
}

const FILTER_FIELDS: FilterFieldConfig[] = [
  {
    key: "category",
    label: "Project Category",
    type: "select",
    options: IDEAS_CATEGORY_OPTIONS,
    id: "ideas-filter-category",
  },
  {
    key: "requiredSkills",
    label: "Required Skills",
    type: "tags",
    placeholder: "Add skill…",
    id: "ideas-filter-skills",
  },
  {
    key: "price",
    label: "Price",
    type: "select",
    options: IDEAS_PRICE_OPTIONS,
    id: "ideas-filter-price",
  },
];

const IdeasFilterPanel = ({
  filters,
  onChange,
  onApply,
  onCancel,
}: IdeasFilterPanelProps) => {
  return (
    <GenericFilterPanel
      filters={filters}
      onChange={onChange}
      onApply={onApply}
      onCancel={onCancel}
      fields={FILTER_FIELDS}
    />
  );
};

export default IdeasFilterPanel;
