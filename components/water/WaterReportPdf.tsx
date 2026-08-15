import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { WaterReport } from "@/constants/water";

const COLORS = {
  sagani: "#1f6b45",
  field: "#3f8f5f",
  gold: "#d9a441",
  soil: "#17251e",
  mist: "#f3f7f4",
  earth: "#e6ece7",
  critical: "#c84b4b",
  safe: "#3e8e5b",
  muted: "#6c7a70",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
    color: COLORS.soil,
    paddingHorizontal: 36,
    paddingVertical: 32,
  },
  topBar: {
    height: 8,
    backgroundColor: COLORS.sagani,
    borderRadius: 4,
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  brand: { flexDirection: "row", alignItems: "center" },
  brandMark: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: COLORS.sagani,
    marginRight: 8,
  },
  brandName: { fontSize: 16, fontWeight: "bold", color: COLORS.sagani },
  headerRight: { alignItems: "flex-end" },
  headerEyebrow: {
    fontSize: 8,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: COLORS.muted,
  },
  headerDoc: { fontSize: 8, letterSpacing: 1.5, textTransform: "uppercase", color: COLORS.gold },
  eyebrow: {
    fontSize: 8,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: COLORS.sagani,
    fontWeight: "bold",
    marginBottom: 6,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  subtitle: { fontSize: 10, color: COLORS.muted, marginBottom: 20 },
  card: {
    borderWidth: 1,
    borderColor: COLORS.earth,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 9,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: COLORS.muted,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.earth,
  },
  rowLabel: { color: COLORS.muted },
  rowValue: { fontWeight: "bold" },
  verdict: {
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  verdictOk: { backgroundColor: "#eaf3ee" },
  verdictBad: { backgroundColor: "#fbeceb" },
  verdictHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  verdictTitle: { fontSize: 13, fontWeight: "bold" },
  verdictDot: { width: 9, height: 9, borderRadius: 5 },
  verdictText: { fontSize: 10, color: COLORS.soil, marginTop: 6 },
  barTrack: {
    height: 8,
    width: "100%",
    backgroundColor: COLORS.earth,
    borderRadius: 4,
    marginTop: 10,
  },
  barFill: { height: 8, borderRadius: 4 },
  footer: {
    marginTop: 24,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.earth,
    paddingTop: 12,
    fontSize: 8,
    color: COLORS.muted,
  },
  tagline: { color: COLORS.sagani, fontWeight: "bold", marginTop: 6 },
});

type WaterReportPdfProps = {
  report: WaterReport;
  farmName: string;
};

export default function WaterReportPdf({ report, farmName }: WaterReportPdfProps) {
  const coveragePercent = Math.min(100, (report.coverageDays / report.droughtDays) * 100);
  const formatLiters = (value: number) => new Intl.NumberFormat("en-US").format(Math.round(value));

  return (
    <Document
      title="Sagani Water Report"
      author="Sagani"
      subject={`Drought sufficiency report for ${farmName}`}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.topBar} />
        <View style={styles.header}>
          <View style={styles.brand}>
            <View style={styles.brandMark} />
            <Text style={styles.brandName}>Sagani</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerEyebrow}>Water Management</Text>
            <Text style={styles.headerDoc}>Drought Sufficiency Report</Text>
          </View>
        </View>

        <Text style={styles.eyebrow}>Sagani Report</Text>
        <Text style={styles.title}>Drought sufficiency report</Text>
        <Text style={styles.subtitle}>
          Generated for {farmName} · {report.cropLabel}
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Farm Scenario</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Crop</Text>
            <Text style={styles.rowValue}>{report.cropLabel}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Farm area</Text>
            <Text style={styles.rowValue}>{report.hectares} ha</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Water requirement</Text>
            <Text style={styles.rowValue}>{formatLiters(report.rateLitersPerHaPerDay)} L/ha/day</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Drought duration</Text>
            <Text style={styles.rowValue}>{report.droughtDays} days</Text>
          </View>
        </View>

        <View style={[styles.verdict, report.sufficient ? styles.verdictOk : styles.verdictBad]}>
          <Text style={styles.verdictTitle}>
            {report.sufficient ? "Reservoir is sufficient" : "Reservoir is not sufficient"}
          </Text>
          <View
            style={[
              styles.verdictDot,
              { backgroundColor: report.sufficient ? COLORS.safe : COLORS.critical },
            ]}
          />
          <Text style={styles.verdictText}>
            {report.sufficient
              ? `The reservoir can cover the ${report.droughtDays}-day drought with ${formatLiters(report.surplusLiters)} L to spare.`
              : `Approximately ${formatLiters(report.additionalNeededLiters)} L more is needed to cover the full ${report.droughtDays}-day drought.`}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Estimated Water Budget</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Reservoir capacity</Text>
            <Text style={styles.rowValue}>{formatLiters(report.reservoirCapacityLiters)} L</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Daily water need</Text>
            <Text style={styles.rowValue}>{formatLiters(report.dailyNeedLiters)} L/day</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Total for {report.droughtDays} days</Text>
            <Text style={styles.rowValue}>{formatLiters(report.totalNeedLiters)} L</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Coverage</Text>
          <Text>
            At the current daily need, the reservoir covers approximately {report.coverageDays.toFixed(1)}{" "}
            of {report.droughtDays} drought days.
          </Text>
          <View style={styles.barTrack}>
            <View
              style={[
                styles.barFill,
                {
                  width: `${coveragePercent}%`,
                  backgroundColor: report.sufficient ? COLORS.safe : COLORS.critical,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Estimate based on typical crop water requirements and reservoir capacity.</Text>
          <Text>AI assessment — requires field validation.</Text>
          <Text style={styles.tagline}>With Sagani, makakasiguro ka sa iyong ani.</Text>
        </View>
      </Page>
    </Document>
  );
}