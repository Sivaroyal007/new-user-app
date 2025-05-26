"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const USMapWithStates: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tooltip, setTooltip] = useState<{
    content: string;
    x: number;
    y: number;
  } | null>(null);

  const hoverColor = "#0D3276";

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const containerHeight = containerRef.current.getBoundingClientRect().height;

    const svg = d3
      .select(svgRef.current)
      .attr("width", containerWidth)
      .attr("height", containerHeight)
      .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`);

    // Define projection
    const projection = d3
      .geoAlbersUsa()
      .translate([containerWidth / 2, containerHeight / 2])
      .scale(Math.max(containerWidth, containerHeight) );

    // Define path generator
    const path = d3.geoPath().projection(projection);

    // Load GeoJSON data
    fetch("./updated_newstates.json")
      .then((response) => response.json())
      .then((data: any) => {
        svg
          .selectAll("path")
          .data(data.features)
          .enter()
          .append("path")
          .attr("d", (d: any) => path(d))
          .attr("fill", "#8FA1C0")
          .attr("stroke", "#ffffff")
          .attr("stroke-width", 1)
          .style("transition", "fill 0.5s ease")
          .style("cursor", "pointer")
          .on("mouseover", function (event: any, d: any) {
            d3.select(this).attr("fill", hoverColor);
            const [x, y] = d3.pointer(event, svgRef.current);
            setTooltip({
              content: d.properties.name,
              x: x + 10,
              y: y - 30,
            });
          })
          .on("mouseout", function () {
            d3.select(this).attr("fill", "#8FA1C0");
            setTooltip(null);
          })
          .on("click", function (event:any, d:any) {
            if(d.properties.url) {
              window.open(d.properties.url, "_blank")
            }
          });
      })
      .catch((error) => console.error("Error loading GeoJSON data:", error));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative m-auto w-full h-[200px] md:h-[400px]"
    >
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full"
      />
      {tooltip && (
        <div
          className="tooltip"
          style={{
            position: "absolute",
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            pointerEvents: "none",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default USMapWithStates;
