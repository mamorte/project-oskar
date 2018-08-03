import React from "react";
import PropTypes from "prop-types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const toPercent = (decimal, fixed = 2) => {
	return `${(decimal).toFixed(fixed)}%`;
};

const SimpleLineChart = data => {
    if(data.data.length <= 0) {
        return null;
    }
    return (
        <div>
            <LineChart width={600} height={300} data={data.data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="trackingTimeShort"/>
            <YAxis tickFormatter={toPercent}/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" dataKey="yieldPercent" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
      </div>
    );
};

SimpleLineChart.propTypes = {
    data: PropTypes.array.isRequired
};
  
export default SimpleLineChart;