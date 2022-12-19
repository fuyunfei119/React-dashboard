import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import NavBar from "./NavBar"; 

const Demodatas = [
    {
        hour : '01:00',
        data : {
            "dishwasher" : 10,
            "furnace" : 15,
            "fridge" : 50,
            "microwave" : 12,
            "wine_cellar" : 17,
        }
    },
    {
        hour : '02:00',
        data : {
            "dishwasher" : 12,
            "furnace" : 14,
            "fridge" : 42,
            "microwave" : 15,
            "wine_cellar" : 17
        }
    },
    {
        hour : '03:00',
        data : {
            "dishwasher" : 5,
            "furnace" : 25,
            "fridge" : 35,
            "microwave" : 19,
            "wine_cellar" : 7
        }
    },
    {
        hour : '04:00',
        data : {
            "dishwasher" : 16,
            "furnace" : 13,
            "fridge" : 100,
            "microwave" : 120,
            "wine_cellar" : 170
        }
    },
    {
        hour : '05:00',
        data : {
            "dishwasher" : 100,
            "furnace" : 18,
            "fridge" : 75,
            "microwave" : 120,
            "wine_cellar" : 70
        }
    },
    {
        hour : '06:00',
        data : {
            "dishwasher" : 55,
            "furnace" : 215,
            "fridge" : 50,
            "microwave" : 12,
            "wine_cellar" : 17
        }
    },
    {
        hour : '07:00',
        data : {
            "dishwasher" : 20,
            "furnace" : 75,
            "fridge" : 250,
            "microwave" : 10,
            "wine_cellar" : 100
        }
    },
    {
        hour : '08:00',
        data : {
            "dishwasher" : 20,
            "furnace" : 75,
            "fridge" : 250,
            "microwave" : 10,
            "wine_cellar" : 100
        }
    }
]

const colors = ["DarkRed","CadetBlue","Chocolate","LightSlateGray","Aquamarine","LightGray","Linen","MintCream"];
const API = 'http://localhost:8000/api/houses/stackchart/';

export default function Custombarchart() {
    const [maxPower, setMaxPower] = useState(0);
    const [verticalAxisValue, setVerticalAxisValue] = useState(0);
    const [horizontalAxisValue, setHorizontalAxisValue] = useState([]);
    const [countOfTime, setCountOfTime] = useState(0);
    const [datas, setDatas] = useState([]);
    const [OriginalDatas, setOriginalDatas] = useState();
    const [queryDateTime, setQueryDateTime] = useState();
    const [queryStartHour, setQueryStartHour] = useState();
    const [queryEndHour, setQueryEndHour] = useState();


    // useEffect(() => {
    //     const fetchData = async function() {
    //         try {
    //           const {data: response} = await axios.get(API,{params: {
    //             month : queryDateTime.split("-")[1],
    //             day : queryDateTime.split("-")[2],
    //             start_hour : queryStartHour,
    //             end_hour : queryEndHour
    //           }});
    //           setDatas(response);
    //         } catch (error) {
    //           console.log(error);
    //         }
    //     }

    //     if (queryDateTime && queryStartHour && queryEndHour) {
    //         fetchData();
    //     }

    // }, [queryDateTime,queryStartHour,queryEndHour]);

    useEffect(() => {
        if (datas.length === 0) {
            setDatas(Demodatas);
            setOriginalDatas(Demodatas);
        }
    }, []); 

    useEffect(() => {
        getMaxPower();
        setCountOfTime(datas.length);
        getVerticalAxisValue();
        getHorizontalAxisValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [datas,maxPower,verticalAxisValue]);

    const getMaxPower = () => {
        let powers = [];

        datas.forEach(data => {
            powers.push(
                Object.values(data.data).reduce((acc,curr) => {
                    return acc + curr;
                }, 0)
            );
        })
        
        setMaxPower(Math.max(...powers));
    }

    const getVerticalAxisValue = () => {
        setVerticalAxisValue(
            (((maxPower * Math.pow(0.1,((maxPower.toString()).length - 1))) * 1.2).toFixed(1)) *
            (Math.pow(10,((maxPower.toString()).length - 1)))
        );
    }

    const getHorizontalAxisValue = () => {
        let contents = [];
        datas.forEach(data => {
            contents.push(data.hour);
        })
        setHorizontalAxisValue(contents);
    }

    const renderingVerticalAxis = () => {
        let part = Math.round(verticalAxisValue / 6);
        let contents = [];

        for (let index = 6; index >= 0; index--) {
            contents.push(
                <h4>{part * index} W</h4>
            ); 
        }

        return contents;
    }

    const renderingTable = () => {
        return (
            <table>
                <tbody>
                    {(() => {
                        let contents = [];
                        for (let index = 0; index <= countOfTime; index++) {
                            contents.push(
                                <tr>
                                    {(() => {
                                        let contents = [];
                                        for (let index = 0; index < countOfTime; index++) {
                                            contents.push(
                                                <td></td>
                                            )
                                        }
                                        return contents;
                                    })()}
                                </tr>
                            )
                        }
                        return contents;
                    })()}
                </tbody>
            </table>
        )   
    }

    const renderingBar = () => {
        return (
            <div className='bar-container'>
                {(() => {
                    let contents = [];
                    for (let index = 0; index < countOfTime; index++) {
                        contents.push(
                            <div className='devices-container'>
                                {(() => {
                                    let contents = [];
                                    let devices = Object.entries(datas[index].data);

                                    devices.forEach((device,key) => {
                                        let height = ((device[1] / verticalAxisValue) * 100);
                                        contents.push(
                                            <div style={{height:`${height}%`,background:colors[key]}}></div>
                                        )
                                    })

                                    return contents;
                                })()}
                            </div>
                        )
                    }
                    return contents;
                })()}
            </div>
        )
    }

    const renderingHorizontalAxis = () => {
        let contents = [];

        horizontalAxisValue.forEach(value => {
            contents.push(
                <h4>{value}</h4>
            )
        })
        return contents;
    }

    const renderingList = () => {
        let contents = [];
        let devices = new Set();

        datas.forEach(data => {
            for (const devicename in data.data) {
                if (Object.hasOwnProperty.call(data.data, devicename)) {
                    devices.add(devicename);
                }
            }
        })

        devices = Array.from(devices);
        
        for (let index = 0; index < devices.length; index++) {
            contents.push(
                <div id={index} className='device-block' onClick={() => {setDatas(handleDeviceBlock(index,devices));}}>
                    <div className="color" style={{background:colors[index]}}></div>
                    <h4>{devices[index]}</h4>
                </div>
            )
        }

        return contents;
    }

    const handleDeviceBlock = (index,devices) => {
        if (datas[0]) {
            console.log(Object.keys(datas[0]['data']).length);
            if (Object.keys(datas[0]['data']).length === 1) {
                console.log(OriginalDatas);
                return OriginalDatas;
            }
        }

        let newDatas = [];

        datas.forEach(item => {
            let deviceName = Object.keys(item.data).find(device => device === devices[index]);

            if (deviceName) {
                delete item.data[deviceName];
            }

            newDatas.push(item);
        })

        return newDatas;
    }

    return (
        <div className='dashboard-container'>
            <NavBar />

            <div className="custombarchart-container">
                <div className="header">
                    <h6>Hourly Power by Device</h6>
                    <div>
                        <input type="date" onChange={e => {setQueryDateTime(e.target.value)}}/>
                        <input type="time" onChange={e => {setQueryStartHour(e.target.value)}}/>
                        <input type="time" onChange={e => {setQueryEndHour(e.target.value)}}/>
                    </div>
                </div>
                
                <div className="content">
                    <div className="barchart-main">
                        <div className="vertical-axis">
                            {renderingVerticalAxis()}
                        </div>
                        <div className="content-main">
                            {renderingTable()}
                            {renderingBar()}
                        </div>
                    </div>
                    <div className="horizontal-axis">
                        <div className='horizontal-container'>
                            <div className='left'></div>
                            <div className='right'>
                                {renderingHorizontalAxis()}
                            </div>
                        </div>
                    </div>
                    <div className="barchart-list">
                        <div className="list-container">
                            {renderingList()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}