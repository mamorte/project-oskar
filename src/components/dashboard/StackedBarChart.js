import React from "react";
import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const getPercent = (value, total) => {
	const ratio = total > 0 ? value / total : 0;
  
  return toPercent(ratio, 2);
};

const toPercent = (decimal, fixed = 2) => {
	return `${(decimal).toFixed(fixed)}%`;
};

const renderTooltipContent = (o) => {
    const { payload, label } = o;
    const total = payload.reduce((result, entry) => (result + entry.value), 0);

    return (
        <div className="customized-tooltip-content">
            <p className="total">{`Market Price: ${total}`}</p>
        <ul className="list">
            {
                payload.map((entry, index) => (
                <li key={`item-${index}`} style={{color: entry.color}}>
                    {`${entry.name}: ${entry.value}`}
                </li>
            ))
            }
        </ul>
        </div>
    );
};

const StackedBarChart = data => {
    if(data.data.length <= 0) {
        return null;
    }
    return (
        <div>
        <BarChart width={600} height={300} data={data.data}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="trackingTimeShort"/>
       <YAxis/>
       <Tooltip content={renderTooltipContent}/>
       <Legend />
       <Bar dataKey="costPrice" stackId="a" fill="#8884d8" />
       <Bar dataKey="yieldValue" stackId="a" fill="#82ca9d" />
      </BarChart>
      </div>
    );
};

StackedBarChart.propTypes = {
    data: PropTypes.array.isRequired
};
  
export default StackedBarChart;