import DataBarChart from "./DataBarChart";
import bg_img from "../../assets/img/bg_img.jpg"
import web_logo from "../../assets/img/logo.png"
import { useNavigate } from "react-router-dom";
import DataLineChart from "./DataLineChart";

import "./statistics.css"

function DataStatistics() {
    const nav = useNavigate()

    return (
        <div className="overflow-hidden flex relative">
            <img src={bg_img} alt="" className="web-bg"/>
            <div className="web-content overflow-y-scroll">
                <div className="section h-[15dvh] flex-row justify-between items-center">
                    <img src={web_logo} alt="" className="web-logo z-30" onClick={() => nav("/account")}/>
                </div>

                <div className="section h-auto mt-4 flex-col justify-center items-center">
                    <DataBarChart styles="h-[55dvh] w-[100%]"/>

                    <div className="horizontal-div-line"/>

                    <div className="chart-row-container">
                        <DataLineChart styles="h-[50dvh] w-[45%]"/>
                        <div className="vertical-div-line"/>
                        <DataLineChart styles="h-[50dvh] w-[45%]"/>
                    </div>

                    <div className="horizontal-div-line"/>

                    <div className="chart-row-container mb-12">
                        <DataLineChart styles="h-[50dvh] w-[45%]"/>
                        <div className="vertical-div-line"/>
                        <DataLineChart styles="h-[50dvh] w-[45%]"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DataStatistics