import React, { useEffect ,useState } from 'react';
import axios from 'axios';
import ReactTooltip from "react-tooltip";
import { useRef } from 'react';

// const Demodata = {
//     "kitchen": 120,
//     "Living_room": 200,
//     "Bedroom": 242,
//     "Bathroom": 178,
//     "Balcony": 125,
//     "Garage": 425,
//     "xxxx": 520,
//     "llll": 480,
//     "yyyy": 852,
// }

const API = 'http://localhost:8000/api/houses/averagedConsumption/';

export default function MapChart() {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [data, setData] = useState({});

    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const prevFromDate = usePrevious(fromDate);
    const prevToDate = usePrevious(toDate);

    useEffect(() => {
        const fetchData = async function() {
          try {
            const {data: response} = await axios.get(API,{params: {
                fromDay:    fromDate.split("-")[2],
                toDay:      toDate.split("-")[2],
                fromMonth:  fromDate.split("-")[1],
                toMonth:    toDate.split("-")[1]
            }});
            console.log(response);
            setData(response);
          } catch (error) {
            console.log(error);
          }
        }

        if (fromDate && toDate) {
            if ((fromDate !== prevFromDate) | (toDate !== prevToDate)) {
                fetchData();
            } 
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [fromDate,toDate]);

    const processingDateFrom = (value) => {
        setFromDate(value.target.value);
    }

    const processingDateTo = (value) => {
        setToDate(value.target.value);
    }

    const getMax = () => {
       return Object.keys(data).reduce((a, b) => data[a] > data[b] ? a : b);
    }

    const getHeight = () => {
        return (100 / Object.keys(data).length);
    }

    const renderTable = (value) => {
        let maxRate = data[getMax()];
        let eachRate = maxRate / 50;
        let rate = (value / eachRate).toFixed(0);
        let content = [];

        for (let index = 0; index < rate; index++) {
            content.push(
                <td data-tip data-for="TooltipForValue" ></td>
            )
        }

        for(let index = rate; index < 50; index++) {
            content.push(
                <td className='rest'></td>
            )
        }

        return content;
    }

    const renderTotal = (value) => {
        const max = data[getMax()];
        const rate =  ((value / max).toFixed(2)) * 100;
        let color = '';
        if (rate <= 15) color = "rgb(16, 117, 16)";
        if (rate > 15 && rate <= 35) color = "rgb(134, 134, 34)";
        if (rate > 35) color = "rgb(126, 23, 23)"; 
        return( 
            <h4 style={{color:color}} >{value} KWH</h4>
        )
    }

    const renderingToolTip = () => {
        return (
            <h6>i do not know what should i do here</h6>
        )
    }

    const renderContent = (data) => {
        return (
            <tbody>
                {(() => {
                    let content = [];
                    for (const key in data) {
                        if (Object.hasOwnProperty.call(data, key)) {
                            const value = data[key];
                            content.push(
                                <tr key={key} style={{height:`${getHeight()}%`}}>
                                    <div className='left'>
                                        <td>{key}</td>
                                    </div>
                                    <div className='middle'>
                                        {renderTable(value)}
                                    </div>
                                    <div className='right'>
                                        {renderTotal(value)}
                                    </div>
                                </tr>
                                )
                        }
                    }
                    return content;
                })()}
            </tbody>
        )
    }

    return (
        <div className="map-container">
            <div className="header">
                <h6>Month Power Total</h6>
                <div>
                    <input 
                        type="date"
                        onChange={processingDateFrom}
                    />
                    <input 
                        type="date"
                        onChange={processingDateTo}
                    />
                </div>
            </div>
            <div className="content">
                <table>
                    {renderContent(data)}
                </table>
            </div>
            <ReactTooltip 
                id="TooltipForValue" 
                place="right" 
                effect="solid"
                textColor="#aedbec"
                type="light"
            >
                {renderingToolTip()}
            </ReactTooltip>
        </div>
    )
}