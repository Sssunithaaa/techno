// CustomLeftBar.jsx
import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Import LeftBarData from the correct location
import { BarData } from "../../chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const barChartData = {
      labels: BarData.map((bar) => bar.label),
      datasets: [
        {
          label: "Jobs",
          data: BarData.map((data) => data.jobs),
        },
      ],
    };

    if (barChartData && chartContainer.current) {
      const updatedData = {
        labels: barChartData.labels,
        datasets: barChartData.datasets.map((dataset) => ({
          ...dataset,
          borderColor: "rgba(128, 0, 128, 1)",
          borderWidth: 1,
          backgroundColor: createGradient(
            chartContainer.current.getContext("2d")
          ),
        })),
      };

      // Destroy the previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create a new chart instance
      chartInstance.current = new ChartJS(
        chartContainer.current.getContext("2d"),
        {
          type: "bar",
          data: updatedData,
          options: {
            scales: {
              x: {
                type: "category",
                labels: barChartData.labels,
                ticks: {
                  color: "white",
                },
                grid: {
                  display: false,
                },
              },
              y: {
                ticks: {
                  color: "white",
                },
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        }
      );
    }
  }, []);

  // Helper function to create a super light blue gradient fill
  const createGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(
      0,
      0,
      0,
      chartContainer.current.height
    );
    gradient.addColorStop(0, "rgba(173, 216, 230, 0.1)");
    gradient.addColorStop(1, "rgba(173, 216, 230, 0.3)");
    return gradient;
  };

  return <canvas ref={chartContainer} />;
};

export default BarChart;
