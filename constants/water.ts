export type CropOption = {
  id: string;
  label: string;
  waterRequirementLitersPerHectarePerDay: number;
};

export const CROP_OPTIONS = [
  { id: "corn", label: "Corn", waterRequirementLitersPerHectarePerDay: 60_000 },
  { id: "rice", label: "Rice (paddy)", waterRequirementLitersPerHectarePerDay: 120_000 },
  { id: "vegetables", label: "Vegetables", waterRequirementLitersPerHectarePerDay: 80_000 },
  { id: "root-crops", label: "Root crops", waterRequirementLitersPerHectarePerDay: 45_000 },
  { id: "sugarcane", label: "Sugarcane", waterRequirementLitersPerHectarePerDay: 75_000 },
] satisfies CropOption[];

export const WATER_FARM_SCENARIO = {
  farmName: "Camotes Family Farm",
  cropId: "corn",
  hectares: 1.5,
  reservoirCapacityLiters: 1_000_000,
  droughtDays: 14,
} as const;

export type WaterReport = {
  cropId: string;
  cropLabel: string;
  rateLitersPerHaPerDay: number;
  hectares: number;
  droughtDays: number;
  dailyNeedLiters: number;
  totalNeedLiters: number;
  reservoirCapacityLiters: number;
  coverageDays: number;
  sufficient: boolean;
  additionalNeededLiters: number;
  surplusLiters: number;
};

export function estimateWaterReport(input: {
  cropId: string;
  hectares: number;
  droughtDays: number;
  reservoirCapacityLiters: number;
}): WaterReport {
  const crop = CROP_OPTIONS.find((option) => option.id === input.cropId) ?? CROP_OPTIONS[0];

  const dailyNeedLiters = crop.waterRequirementLitersPerHectarePerDay * input.hectares;
  const totalNeedLiters = dailyNeedLiters * input.droughtDays;

  const coverageDays = dailyNeedLiters > 0 ? input.reservoirCapacityLiters / dailyNeedLiters : 0;
  const surplusLiters = input.reservoirCapacityLiters - totalNeedLiters;
  const sufficient = surplusLiters >= 0;

  return {
    cropId: crop.id,
    cropLabel: crop.label,
    rateLitersPerHaPerDay: crop.waterRequirementLitersPerHectarePerDay,
    hectares: input.hectares,
    droughtDays: input.droughtDays,
    dailyNeedLiters,
    totalNeedLiters,
    reservoirCapacityLiters: input.reservoirCapacityLiters,
    coverageDays,
    sufficient,
    additionalNeededLiters: sufficient ? 0 : Math.abs(surplusLiters),
    surplusLiters: sufficient ? surplusLiters : 0,
  };
}