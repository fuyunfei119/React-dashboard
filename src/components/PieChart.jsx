import React, {useState, useCallback} from "react";
import { PieChart, Pie, ResponsiveContainer, Sector } from "recharts";

export default function Piechart(props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
        (...index) => {
          setActiveIndex(index);
        },
        [setActiveIndex]
      );

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const {cx,cy,midAngle,innerRadius,outerRadius,startAngle,endAngle,fill,payload,percent,value} = props;

        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? "start" : "end";
      
        return (
          <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={13}>
              {payload.name}
            </text>
            <Sector
              cx={cx}
              cy={cy}
              isAnimationActive = {false}
              innerRadius={innerRadius + 3}
              outerRadius={outerRadius + 3}
              startAngle={startAngle}
              endAngle={endAngle}
              fill={fill}
              className="piechart"
            />
            <text
              x={ex - (cos >= 0 ? 1 : -1) * 48}
              y={ey}
              textAnchor={textAnchor}
              fill="black"
              fontSize={12}
            >{`${value}`}</text>
            <text
              x={ex - (cos >= 0 ? 1 : -1) * 36}
              y={ey}
              dy={18}
              fontSize={12}
              textAnchor={textAnchor}
              fill="black"
            >
              {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
          </g>
        );
      };
    
    return (
        <div className="piechart-container">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart >
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={props.datasource}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={0}
                        fill="#aedbec"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}