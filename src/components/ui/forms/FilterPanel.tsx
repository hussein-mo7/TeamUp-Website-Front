"use client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/buttons";
import { Select } from "@/components/ui/forms";
import TagInput from "@/components/ui/forms/TagInput";

/**
 * Configuration for a single filter field
 */
export interface FilterFieldConfig {
  /** Unique key for the filter field */
  key: string;
  /** Display label */
  label: string;
  /** Field type: "select" | "tags" */
  type: "select" | "tags";
  /** Select options (required for type="select") */
  options?: Array<{ label: string; value: string }>;
  /** Placeholder text (for TagInput) */
  placeholder?: string;
  /** Input ID for accessibility */
  id?: string;
}

/**
 * Generic normalized filter state object
 */
export type FiltersObject = Record<string, string | string[]>;

interface GenericFilterPanelProps<T extends FiltersObject> {
  /** Current filter values */
  filters: T;
  /** Handler for filter changes */
  onChange: (filters: T) => void;
  /** Handler for apply button */
  onApply: () => void;
  /** Handler for cancel button */
  onCancel: () => void;
  /** Array of filter field configurations */
  fields: FilterFieldConfig[];
  /** Optional title (defaults to "Filter") */
  title?: string;
}

/**
 * Reusable, generic FilterPanel component that works with any filter configuration.
 * Consolidates IdeasFilterPanel and FindTeamFilterPanel into a single configurable component.
 *
 * @example
 * // Ideas filter
 * <GenericFilterPanel
 *   filters={stagedFilters}
 *   fields={[
 *     { key: "category", label: "Category", type: "select", options: CAT_OPTIONS, id: "cat" },
 *     { key: "requiredSkills", label: "Skills", type: "tags", placeholder: "Add..." },
 *     { key: "price", label: "Price", type: "select", options: PRICE_OPTIONS },
 *   ]}
 *   onChange={setStagedFilters}
 *   onApply={handleApply}
 *   onCancel={handleCancel}
 * />
 *
 * @example
 * // Team finder filter with more fields
 * <GenericFilterPanel
 *   filters={stagedFilters}
 *   fields={[
 *     { key: "category", label: "Category", type: "select", options: CAT_OPTIONS },
 *     { key: "availableRole", label: "Role", type: "select", options: ROLE_OPTIONS },
 *     { key: "requiredSkills", label: "Skills", type: "tags" },
 *     { key: "teamStatus", label: "Status", type: "select", options: STATUS_OPTIONS },
 *   ]}
 *   onChange={setStagedFilters}
 *   onApply={handleApply}
 *   onCancel={handleCancel}
 * />
 */
const GenericFilterPanel = <T extends FiltersObject>({
  filters,
  onChange,
  onApply,
  onCancel,
  fields,
  title = "Filter",
}: GenericFilterPanelProps<T>) => {
  /**
   * Helper function to update a single filter field.
   * Handles both string and string[] values.
   */
  const set = <K extends keyof T>(key: K, value: T[K]) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div
      className="w-full rounded-xl border border-gray-100 bg-white p-5
        shadow-[0_4px_24px_rgba(0,0,0,0.10)]"
    >
      {/* ── Header ── */}
      <div className="mb-5 flex items-center justify-between">
        <p className="font-primary text-lg font-medium text-content">{title}</p>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close filter"
          className="flex h-7 w-7 items-center justify-center rounded-full text-content-muted
            hover:bg-gray-100 hover:text-content transition-colors duration-150"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      {/* ── Filter Fields ── */}
      <div className="flex flex-col gap-4">
        {fields.map((field) => {
          const currentValue = filters[field.key];

          if (field.type === "select") {
            return (
              <Select
                key={field.key}
                id={field.id || `filter-${field.key}`}
                label={field.label}
                options={field.options || []}
                value={(currentValue as string) || ""}
                onChange={(e) => set(field.key as keyof T, e.target.value as T[keyof T])}
              />
            );
          }

          if (field.type === "tags") {
            return (
              <TagInput
                key={field.key}
                id={field.id || `filter-${field.key}`}
                label={field.label}
                value={(currentValue as string[]) || []}
                onChange={(tags) => set(field.key as keyof T, tags as T[keyof T])}
                placeholder={field.placeholder || "Add item…"}
                variant="bordered"
              />
            );
          }

          return null;
        })}
      </div>

      {/* ── Action Buttons ── */}
      <div className="mt-6 flex gap-3">
        <Button
          type="button"
          variant="primary"
          size="md"
          className="flex-1"
          onClick={onApply}
        >
          Apply
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default GenericFilterPanel;
