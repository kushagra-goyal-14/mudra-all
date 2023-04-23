import React from 'react'

import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import {
  doughnutOptions,
  lineOptions,
  barOptions,
  doughnutLegends,
  lineLegends,
  barLegends,
} from '../utils/demo/chartsData'

const categories =["Food","Rent", "Health", "Luxury","Travel","Others"]

function Charts() {
  return (
    <>
      <PageTitle>Charts</PageTitle>
     
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        {/* <ChartCard title="Expenses">
          <Doughnut {...doughnutOptions} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>

        <ChartCard title="Income-Expense">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard> */}
      {
        categories.map((category)=>(
          
          <ChartCard title={"Insights on " + category}>
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
        
        ))}
      </div>
    </>
  )
}

export default Charts
