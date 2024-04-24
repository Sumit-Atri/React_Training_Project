// import React from "react";
// import { Bar } from "react-chartjs-2";

// import { Chart, registerables} from 'chart.js';

// Chart.register(...registerables);


// const BarGraph = ({ data }) => {
// if (!data || data.length === 0) {
//     return <div>No data available</div>;
//   }

// else
// {

//     console.log(data[0].original.toppings);

//   const toppingsData = data.flatMap((row) => row.original.toppings);

//   console.log(toppingsData);
//   const toppingsFrequency = {};

//   toppingsData.forEach((topping) => {
//     toppingsFrequency[topping] = (toppingsFrequency[topping] || 0) + 1;
//   });

//   // Sorting toppings by frequency
//   const sortedToppings = Object.keys(toppingsFrequency).sort(
//     (a, b) => toppingsFrequency[b] - toppingsFrequency[a]
//   );

//   // Building data for the bar chart
//   const chartData = {
//     labels: sortedToppings,
//     datasets: [
//       {
//         label: "Frequency",
//         backgroundColor: "rgba(75,192,192,1)",
//         borderColor: "rgba(0,0,1,1)",
//         borderWidth: 1,
//         data: sortedToppings.map((topping) => toppingsFrequency[topping]),
//       },
//     ],
//   };

//   // Bar chart options
//   const chartOptions = {
//     responsive: true, 
//   maintainAspectRatio: false,
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   };

//   return (
//     <div className="bar-graph">
//       <Bar data={chartData} options={chartOptions} />
//     </div>
//   );
// };

// }
  

// export default BarGraph;

import { ResponsiveBar } from '@nivo/bar';

const BarGraph = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const toppingsData = data.flatMap((row) => row.original.toppings);

  const toppingsFrequency = {};

  toppingsData.forEach((topping) => {
    toppingsFrequency[topping] = (toppingsFrequency[topping] || 0) + 1;
  });

  // Sorting toppings by frequency
  const sortedToppings = Object.keys(toppingsFrequency).sort(
    (a, b) => toppingsFrequency[b] - toppingsFrequency[a]
  );

  // Building data for the bar chart
  const chartData = sortedToppings.map((topping) => ({
    topping: topping,
    frequency: toppingsFrequency[topping],
  }));

  // Nivo Bar chart options
  const chartOptions = {
    indexBy: "topping", // Toppings on x-axis
    margin: { top: 50, right: 130, bottom: 50, left: 60 },
    padding: 0.3,
    layout: "horizontal", // Horizontal layout
    colors: { scheme: "nivo" },
    axisBottom: {
      tickRotation: -45,
    },
    labelSkipWidth: 12,
    labelSkipHeight: 12,
    enableGridX: true,
    enableGridY: false,
    labelTextColor: { from: "color", modifiers: [["darker", 1.6]] },
    legends: [
      {
        dataFrom: "keys",
        anchor: "top-right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ],
  };

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveBar
        data={chartData}
        keys={["frequency"]} // Frequency on y-axis
        indexBy= "topping" // Toppings on x-axis
        margin={{ top: 50, right: 50, bottom: 50, left: 130 }}
        padding={0.3}
        layout="vertical"
        colors={{ scheme: "nivo" }}
        axisBottom={{
          tickRotation: -45,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        enableGridX={true}
        enableGridY={false}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default BarGraph;

