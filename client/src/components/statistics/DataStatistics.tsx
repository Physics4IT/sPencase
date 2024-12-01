import DataBarChart from "./DataBarChart";
import bg_img from "../../assets/img/bg_img.jpg"
import web_logo from "../../assets/img/logo.png"
import { useNavigate } from "react-router-dom";
import DataLineChart from "./DataLineChart";

import "./statistics.css"
import { chartConfig, chartData } from "./data_chart1";
import { chartConfig2, chartData2 } from "./data_chart2";

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
                    <DataBarChart 
                        styles="h-[55dvh] w-[100%]" 
                        data={chartData} 
                        config={chartConfig} 
                        title="Cường độ tia UV" 
                        desc="Sự thay đổi của cường độ tia UV qua từng khoảng thời gian"
                    />

                    <div className="horizontal-div-line"/>

                    <div className="chart-row-container">
                        <DataLineChart 
                            styles="h-[50dvh] w-[45%]"
                            data={chartData2}
                            config={chartConfig2}
                            title="Nhiệt độ"
                            desc="Sự thay đổi của nhiệt độ môi trường"
                        />
                        <div className="vertical-div-line"/>
                        <DataLineChart 
                            styles="h-[50dvh] w-[45%]"
                            data={chartData2}
                            config={chartConfig2}
                            title="Độ ẩm"
                            desc="Sự thay đổi độ ẩm môi trường"
                        />
                    </div>

                    <div className="horizontal-div-line"/>

                    <div className="chart-row-container mb-12">
                        <DataLineChart 
                            styles="h-[50dvh] w-[45%]"
                            data={chartData2}
                            config={chartConfig2}
                            title="Độ nghiêng"
                            desc="Sự thay đổi độ nghiêng của thiết bị"
                        />
                        <div className="vertical-div-line"/>
                        <DataLineChart 
                            styles="h-[50dvh] w-[45%]"
                            data={chartData2}
                            config={chartConfig2}
                            title="Cường độ đèn"
                            desc="Sự thay đổi cường độ đèn"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DataStatistics