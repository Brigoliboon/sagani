export type CropInsight = {
  cropId: string;
  cropName: string;
  plantingSummary: string;
  fertilizationSummary: string;
  harvestSummary: string;
  wateringSummary: string;
  marketPriceSummary: string;
  localizationPriority: string;
};

export type MonthRange = {
  start: number;
  end: number;
};

export type CropTimeline = {
  planting: MonthRange[];
  fertilization: MonthRange[];
  harvest: MonthRange[];
};

export const cropTimelines: Record<string, CropTimeline> = {
  PHC001: {
    planting: [{ start: 6, end: 7 }, { start: 12, end: 12 }, { start: 1, end: 1 }],
    fertilization: [{ start: 6, end: 9 }, { start: 12, end: 12 }],
    harvest: [{ start: 4, end: 5 }, { start: 10, end: 12 }],
  },
  PHC002: {
    planting: [{ start: 4, end: 5 }],
    fertilization: [{ start: 4, end: 7 }],
    harvest: [{ start: 8, end: 9 }],
  },
  PHC003: {
    planting: [{ start: 6, end: 8 }],
    fertilization: [{ start: 6, end: 10 }],
    harvest: [{ start: 1, end: 12 }],
  },
  PHC004: {
    planting: [{ start: 1, end: 5 }, { start: 10, end: 12 }],
    fertilization: [{ start: 1, end: 7 }, { start: 10, end: 12 }],
    harvest: [{ start: 7, end: 12 }],
  },
  PHC005: {
    planting: [{ start: 6, end: 8 }],
    fertilization: [{ start: 1, end: 12 }],
    harvest: [{ start: 1, end: 12 }],
  },
  PHC006: {
    planting: [{ start: 1, end: 12 }],
    fertilization: [{ start: 1, end: 9 }],
    harvest: [{ start: 3, end: 12 }],
  },
  PHC007: {
    planting: [{ start: 6, end: 8 }],
    fertilization: [{ start: 7, end: 12 }],
    harvest: [{ start: 3, end: 6 }],
  },
  PHC008: {
    planting: [{ start: 5, end: 6 }],
    fertilization: [{ start: 5, end: 9 }],
    harvest: [{ start: 1, end: 4 }],
  },
  PHC009: {
    planting: [{ start: 1, end: 12 }],
    fertilization: [{ start: 1, end: 12 }],
    harvest: [{ start: 1, end: 12 }],
  },
  PHC010: {
    planting: [{ start: 1, end: 5 }, { start: 9, end: 10 }],
    fertilization: [{ start: 1, end: 7 }, { start: 9, end: 12 }],
    harvest: [{ start: 3, end: 7 }, { start: 11, end: 12 }],
  },
  PHC011: {
    planting: [{ start: 1, end: 1 }, { start: 12, end: 12 }],
    fertilization: [{ start: 1, end: 3 }, { start: 12, end: 12 }],
    harvest: [{ start: 3, end: 5 }],
  },
  PHC012: {
    planting: [{ start: 1, end: 12 }],
    fertilization: [{ start: 1, end: 12 }],
    harvest: [{ start: 1, end: 12 }],
  },
};

export function parseCropInsightsCsv(csv: string): CropInsight[] {
  const rows = parseCsv(csv);
  const headers = rows[0] ?? [];
  const column = (row: string[], name: string) => row[headers.indexOf(name)] ?? "";

  return rows.slice(1).filter((row) => row.some(Boolean)).map((row) => ({
    cropId: column(row, "crop_id"),
    cropName: column(row, "crop_name"),
    plantingSummary: column(row, "planting_summary"),
    fertilizationSummary: column(row, "fertilization_summary"),
    harvestSummary: column(row, "harvest_summary"),
    wateringSummary: column(row, "watering_summary"),
    marketPriceSummary: column(row, "market_price_summary"),
    localizationPriority: column(row, "localization_priority"),
  }));
}

function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];

    if (character === '"') {
      if (quoted && csv[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      row.push(field.trim());
      field = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && csv[index + 1] === "\n") index += 1;
      row.push(field.trim());
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (field || row.length) {
    row.push(field.trim());
    rows.push(row);
  }

  return rows;
}
