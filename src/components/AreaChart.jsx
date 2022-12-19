import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import React, { useState } from 'react';

export default function Areachart(props) {
  const [termperature, setTermperature] = useState(0);

  const processingtooltip = (props) => {
    setTermperature(props.payload.data);
  }

  return (
      <div className='areachart-container'>
          <div className="top">
              <div className="info">
                  <h5>Termperature</h5>
                  <div className="growth">
                      <span>+{termperature}</span>
                  </div>
              </div>
          </div>
          <div className="chart">
              <ResponsiveContainer height="100%" width="100%">
                  <AreaChart
                      width={450}
                      height={250}
                      data={props.datasource}
                      margin={{ top:0, left:0, right:0, bottom:0 }}
                  >
                      <Tooltip 
                        cursor={false} 
                        active={true}
                      />
                      <Area
                          activeDot={processingtooltip} 
                          animationBegin={800}
                          animationDuration={1500}
                          type="monotone"
                          dataKey="data"
                          stroke="black"
                          fill='#aedbec'
                          strokeWidth={4}
                      />
                  </AreaChart>
              </ResponsiveContainer>
          </div>
      </div>
    )
}