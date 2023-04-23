export const doughnutLegends = [
  { title: "Food", color: "bg-blue-500" },
  { title: "Rent", color: "bg-yellow-600" },
  { title: "Health", color: "bg-teal-600" },
  { title: "Travel", color: "bg-red-600" },
  { title: "Luxury", color: "bg-purple-600" },
  { title: "Others", color: "bg-gray-600" },
];

export const lineLegends = [
  { title: "Income", color: "bg-green-600" },
  { title: "Expense", color: "bg-red-600" },
];

export const barLegends = [
  { title: "Insights", color: "bg-teal-600" },
  { title: "Expenses", color: "bg-red-600" },
];
// let datai;

// async function find() {
//   async function getApiData() {
//     let response = await fetch(
//       "http://localhost:4000/api/v1/transactions-all",
//       {
//         headers: {
//           "x-access-token": localStorage.getItem("ResponseToken"),
//         },
//       }
//     );
//     // do something
//     response = await response.json();

//     // update the state
//     datai = response.data;
//   }
//   await getApiData();
//   const ans = datai.map((idx) => idx.category);

//   ans.forEach((element) => {
//     elementCounts[element] = (elementCounts[element] || 0) + 1;
//   });
//   console.log(elementCounts);
// }
// find();

export const doughnutOptions = {
  data: {
    datasets: [
      {
        data: [
          // elementCounts.Food,
          // elementCounts.Health,
          // elementCounts.Luxury,
          // elementCounts.Travel,
          // elementCounts.Others,
          20, 30, 40, 50, 20,50
        ],
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#dpurpleefault-color-palette
         */
        backgroundColor: ["#0694a2","#ca8a04", "#1c64f2", "#7e3af2",'#dc2626','#4b5563'],
        label: "Dataset 1",
      },
    ],
    labels: ["Food","Rent", "Health", "Luxury","Travel","Others"],
  },
  options: {
    responsive: true,
    cutoutPercentage: 80,
  },
  legend: {
    display: false,
  },
};

export const lineOptions = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
    datasets: [
      {
        label: "Income",
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: "#16a34a",
        borderColor: "#16a34a",
        data: [43, 48, 40, 54, 67, 73, 70, 75,78,72,80,72],
        fill: false,
      },
      {
        label: "Expense",
        fill: false,
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: "#dc2626",
        borderColor: "#dc2626",
        data: [24, 50, 64, 74, 52, 51, 65,67,60,69,70,73],
      },
    ],
  },
  options: {
    responsive: true,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Month",
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Value",
        },
      },
    },
  },
  legend: {
    display: false,
  },
};

export const barOptions = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
    datasets: [
      {
        label: "Expenses",
        backgroundColor: "#dc2626",
        // borderColor: window.chartColors.red,
        borderWidth: 1,
        data: [-3, 14, 52, 74, 33, 90, 70,71,50,32,56,33],
      },
      {
        label: "Insights",
        backgroundColor: "#0694a2",
        // borderColor: window.chartColors.blue,
        borderWidth: 1,
        data: [66, 33, 43, 12, 54, 62, 84,73,94,53,64,32],
      },
    ],
  },
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
};
