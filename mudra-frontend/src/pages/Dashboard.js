import React, { useState, useEffect } from "react";
import InfoCard from "../components/Cards/InfoCard";
import ChartCard from "../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../components/Chart/ChartLegend";
import PageTitle from "../components/Typography/PageTitle";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import response from "../utils/demo/tableData";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
} from "@windmill/react-ui";

import {
  // doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../utils/demo/chartsData";

function Dashboard() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page]);

  const initialState = [
    {
      id: "1",
      title: "kush",
      amount: "200",
      type: "income",
      category: "food",
    },
    {
      id: "2",
      title: "kush",
      amount: "2000",
      type: "incomewer",
      category: "foodfsd",
    },
  ];

  const [users, setUsers] = useState(initialState);
  const [eexpense, seteexpense] = useState(0);
  const [inncome, setinncome] = useState(0);
  const [predict, setpredict] = useState(0);
  const [wallet, setwallet] = useState(0);
  const [doughnutOptions, setdoughnutOptions] = useState({
    data: {
      datasets: [
        {
          data: [20, 30, 40, 50, 20, 32],
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizapp/charts#ing-colors/#default-color-palette
           */
          backgroundColor: [
            "#0694a2",
            "#ca8a04",
            "#1c64f2",
            "#7e3af2",
            "#dc2626",
            "#4b5563",
          ],
          label: "Dataset 1",
        },
      ],
      labels: ["Food", "Rent", "Health", "Travel", "Luxury", "Others"],
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: false,
    },
  });

  const elementCounts = {};
  useEffect(() => {
    async function dowork() {
      let datai;
      let datai2;
      async function getApiData() {
        let response = await fetch(
          "http://localhost:4000/api/v1/transactions-all",
          {
            headers: {
              "x-access-token": localStorage.getItem("ResponseToken"),
            },
          }
        );
        // do something
        response = await response.json();
        datai = response.data;
        // update the state
        setUsers((users) => response.data);
      }
      async function getApiiData() {
        let response = await fetch("http://localhost:4000/api/v1/predict", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("ResponseToken"),
          },
        });
        // do something
        response = await response.json();
        datai2 = response.data.prev_predction;
        console.log(response);
        // update the state

        setpredict(datai2);
      }

      await getApiData();
      await getApiiData();
      const allincome = datai.map((idx) => {
        if (idx.type == "Income") return idx.amount;
      });
      const totalincome = [];
      allincome.forEach((idx) => {
        if (idx) {
          console.log(idx);
          totalincome.push(Number(idx));
        }
      });
      const totalinncome = totalincome.reduce(
        (partialSum, a) => partialSum + a,
        0
      );

      const allexpense = datai.map((idx) => {
        if (idx.type == "Expense") return idx.amount;
      });
      const totalexpense = [];
      allexpense.forEach((idx) => {
        if (idx) {
          console.log(idx);
          totalexpense.push(Number(idx));
        }
      });
      console.log(totalexpense);
      const sum = totalexpense.reduce((partialSum, a) => partialSum + a, 0);
      // allincome.forEach((element) => {
      //   incomeCounts[element] = (incomeCounts[element] || 0) + 1;
      // });
      const ans = datai.map((idx) => idx.category);

      ans.forEach((element) => {
        elementCounts[element] = (elementCounts[element] || 0) + 1;
      });
      // setelementCounts(elementCounts);
      console.log(elementCounts.Food);
      let doughnutOptionss = {
        data: {
          datasets: [
            {
              data: [
                elementCounts.Food,
                elementCounts.Rent,
                elementCounts.Health,
                elementCounts.Travel,
                elementCounts.Luxury,
                elementCounts.Others,
              ],
              backgroundColor: [
                "#0694a2",
                "#1c64f2",
                "#7e3af2",
                "#fff",
                "#1c64f1",
                "#fff3",
              ],
            },
          ],
        },
      };
      setdoughnutOptions(doughnutOptionss);
      seteexpense(sum);
      setinncome(totalinncome);
      setwallet(totalinncome - sum);
    }
    dowork();
  }, []);
  {
    console.log(users);
  }
  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* <!-- Cards --> */}
      {/* <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {users.map((user) => (
          <div className="user" key={user._id}>
            <InfoCard title="Title" value={user.title}>
              <RoundIcon
                icon={PeopleIcon}
                iconColorClass="text-orange-500 dark:text-orange-100"
                bgColorClass="bg-orange-100 dark:bg-orange-500"
                className="mr-4"
              />
            </InfoCard>
            <InfoCard title="Amount" value={user.amount}>
              <RoundIcon
                icon={MoneyIcon}
                iconColorClass="text-green-500 dark:text-green-100"
                bgColorClass="bg-green-100 dark:bg-green-500"
                className="mr-4"
              />
            </InfoCard>
            <InfoCard title="Type" value={user.type}>
              <RoundIcon
                icon={CartIcon}
                iconColorClass="text-blue-500 dark:text-blue-100"
                bgColorClass="bg-blue-100 dark:bg-blue-500"
                className="mr-4"
              />
            </InfoCard>
            <InfoCard title="Category" value={user.category}>
              <RoundIcon
                icon={ChatIcon}
                iconColorClass="text-teal-500 dark:text-teal-100"
                bgColorClass="bg-teal-100 dark:bg-teal-500"
                className="mr-4"
              />
            </InfoCard>
          </div>
        ))}
      </div> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Income" value={inncome}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Expenses" value={eexpense}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-red-500 dark:text-red-100"
            bgColorClass="bg-red-100 dark:bg-red-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Wallet" value={wallet}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Predicted Expenses" value={predict}>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {users.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar
                      className="hidden mr-3 md:block"
                      src={user.avatar}
                      alt="User image"
                    /> */}
                    <span className="text-sm">{user.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm"> {user.type}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm"> {user.amount}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.category}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <TableFooter>
           <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          /> 
        </TableFooter> */}
      </TableContainer>

      <PageTitle>Charts</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Expenses">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Income-Expense">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>
    </>
  );
}

export default Dashboard;
