// Client/src/services/reportService.js
import apiClient from "./apiClient";

/**
 * Basic summary for the Reports page.
 * Backend will live under /api/reports/summary.
 */
const reportService = {
  getBasicSummary: () =>
    apiClient.get("/reports/summary").then((res) => res.data),
};

export default reportService;
