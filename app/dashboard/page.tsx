import { readFile } from "node:fs/promises";
import path from "node:path";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { getWeatherPageData } from "@/lib/weather";
import { parseCropInsightsCsv } from "@/lib/crop-insights";
import { WATER_FARM_SCENARIO, estimateWaterReport } from "@/constants/water";

export default async function DashboardOverviewPage() {
  const datasetPath = path.join(process.cwd(), "public", "data", "07_crop_insights_summary.csv");
  const csv = await readFile(datasetPath, "utf8");
  const crops = parseCropInsightsCsv(csv);
  const weather = getWeatherPageData();

  const waterReport = estimateWaterReport({
    cropId: WATER_FARM_SCENARIO.cropId,
    hectares: WATER_FARM_SCENARIO.hectares,
    droughtDays: WATER_FARM_SCENARIO.droughtDays,
    reservoirCapacityLiters: WATER_FARM_SCENARIO.reservoirCapacityLiters,
  });

  const dateLabel = new Intl.DateTimeFormat("en-PH", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Manila",
  }).format(new Date());

  return (
    <DashboardOverview
      weather={weather}
      crops={crops}
      dateLabel={dateLabel}
      water={{
        hectares: waterReport.hectares,
        droughtDays: waterReport.droughtDays,
        coverageDays: waterReport.coverageDays,
        sufficient: waterReport.sufficient,
        reservoirCapacityLiters: waterReport.reservoirCapacityLiters,
        additionalNeededLiters: waterReport.additionalNeededLiters,
        cropLabel: waterReport.cropLabel,
      }}
    />
  );
}