import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import "../../pages/chart2/chart.css";

function NeedleChart({
  selectedStartDate,
  selectedEndDate,
  data,
  color,
  boxNo,
  shiftName,
  setBox
}) {
  const [angle, setAngle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      const efficiency = data.avg_efficiency;
      const angle = (efficiency / 100) * Math.PI;
      setAngle(angle);
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while data is being fetched
  }

  return (
    <div
      className={`c2-chartbox c2-box ${boxNo} box`}
      onClick={() => setBox(boxNo)}
      style={{ position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          textAlign: "right",
          top: "5%",
          right: "5%",
          color: "#FFFFFF", // Text color
          fontSize: "30px",
          fontFamily: "Fjalla One, sans-serif"
        }}
      >
        {((angle / Math.PI) * 100).toFixed(0)}%
      </div>
      <div className="c2-d-chart">
        <h4 style={{ fontFamily: "Fjalla One, sans-serif", fontWeight: "300" }}>{`${shiftName} Shift`}</h4>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
          }}
        >
          <div style={{ width: "100%", position: "relative" }}>
            <GaugeChart
              id="gauge-chart"
              arcsLength={[
                (angle / Math.PI) * 100,
                100 - (angle / Math.PI) * 100,
              ]}
              colors={[color, "#808080"]}
              arcWidth={0.3}
              cornerRadius={10}
              arcPadding={0.02}
              percent={angle / Math.PI} // Convert angle to a 0-1 scale
              textColor={"#FFFFFF"}
              needleColor="#ffffff"
              needleBaseColor="#ffffff"
              hideText
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NeedleChart;
