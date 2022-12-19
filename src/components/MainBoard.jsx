import React, { useState, useEffect } from 'react';
import Statistic from "./Statistic";
import Progress from "./Progress";
import AreaChart from "./AreaChart";
import Piechart from "./PieChart";
import Barchart from "./BarChart";
import Radarchart from "./RadarChart";
import axios from 'axios';

const API = 'http://localhost:8000/api/houses/';

export default function MainBoard() {
    const [datasourceForArea, setdatasourceForArea] = useState([]);
    const [datasourceForPie, setDatasourceForPie] = useState([]);
    const [datasourceForBar, setDatasourceForBar] = useState([]);

    const processingDatasource = (response) => {
        let windspeed = 0;
        let windbearing = 0;
        let dewpoint = 0;
        let apparenttemperature = 0;
        let home_office = 0;
        let garage_door = 0;
        let living_room = 0;
        let kitchen_12 = 0

        response.map(element => (
            // eslint-disable-next-line
            setdatasourceForArea(datasourceForArea => [...datasourceForArea, {data: element.temperature}]),
            windspeed += element.windspeed,
            windbearing += element.windbearing,
            dewpoint += element.dewpoint,
            apparenttemperature += element.apparenttemperature,
            home_office += element.home_office,
            garage_door += element.garage_door,
            living_room += element.living_room,
            kitchen_12 += element.kitchen_12
        ));

        setDatasourceForPie([{name: "windspeed",value: windspeed},
                            {name: "windbearing", value: windbearing},
                            {name: "dewpoint", value: dewpoint},
                            {name: "apparenttemperature", value: apparenttemperature}
                            ]);

        setDatasourceForBar([{name: "office", value: home_office * 100},
                             {name: "garage", value: garage_door * 1000},
                             {name: "living", value: living_room * 1000},
                             {name: "kitchen", value: kitchen_12 * 1000}
                            ]);
    }

    useEffect(() => {
        const fetchData = async function() {
          try {
            const {data: response} = await axios.get(API);
            processingDatasource(response);
          } catch (error) {
            console.log(error);
          }
        }
        fetchData();
      }, []);

    return (
        <div className="mainboard-container">
            <div className="box">
                <div className="card">
                    <Statistic />
                </div>
            </div>
            <div className="box">
                <div className="card">
                    <Progress />    
                </div>
            </div>
            <div className="box">
                <div className="card">
                    <AreaChart 
                        datasource = {datasourceForArea}
                    />
                </div>
            </div>
            <div className="box">
                <div className="card">
                    <Piechart 
                        datasource = {datasourceForPie}
                    />    
                </div>
            </div>
            <div className="box">
                <div className="card">
                    <Barchart 
                        datasource = {datasourceForBar}
                    />
                </div>
            </div>
            <div className="box">
                <div className="card">
                    <Radarchart 
                    />
                </div>
            </div>
        </div>
    )
}