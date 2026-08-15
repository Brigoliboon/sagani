import { readFile } from "node:fs/promises";
import path from "node:path";
import CropInsights from "@/components/dashboard/CropInsights";
import { parseCropInsightsCsv } from "@/lib/crop-insights";

export default async function CropInsightsPage() {
  const datasetPath = path.join(process.cwd(), "public", "data", "07_crop_insights_summary.csv");
  const csv = await readFile(datasetPath, "utf8");
  const crops = parseCropInsightsCsv(csv);

  return <CropInsights crops={crops} />;
}
