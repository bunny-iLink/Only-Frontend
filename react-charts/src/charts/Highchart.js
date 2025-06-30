import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import rawData from '../data/data.json';
import './Charts.css';

function HighCharts() {
    const [currentPage, setCurrentPage] = useState(1);

    const labels = rawData.labels;

    const getChartOptions = (page) => {
        switch (page) {
            case 1: // Electronics (bar)
                return {
                    chart: { type: 'column' },
                    title: { text: 'Electronics Sales by Region' },
                    xAxis: {
                        categories: labels,
                        title: { text: 'Period' }
                    },
                    yAxis: {
                        min: 0,
                        title: { text: 'Sales ($1,000s)' }
                    },
                    tooltip: { shared: true },
                    series: rawData.datasets
                        .filter(ds => ds.name.startsWith('Electronics'))
                        .map(ds => ({
                            name: ds.name,
                            data: ds.data,
                            color: ds.name.includes('North America') ? '#4287f5' : '#7baaf7',
                            type: 'column'
                        }))
                };

            case 2: // Clothing (line)
                return {
                    chart: { type: 'line' },
                    title: { text: 'Clothing Sales by Region' },
                    xAxis: {
                        categories: labels,
                        title: { text: 'Period' }
                    },
                    yAxis: {
                        title: { text: 'Sales ($1,000s)' }
                    },
                    tooltip: { shared: true },
                    series: rawData.datasets
                        .filter(ds => ds.name.startsWith('Clothing'))
                        .map(ds => ({
                            name: ds.name,
                            data: ds.data,
                            color: ds.name.includes('North America') ? '#f5426f' : '#f5a142',
                            type: 'line'
                        }))
                };

            case 3: // Furniture (stacked bar)
                return {
                    chart: { type: 'column' },
                    title: { text: 'Furniture Sales by Region (Stacked)' },
                    xAxis: {
                        categories: labels,
                        title: { text: 'Period' }
                    },
                    yAxis: {
                        min: 0,
                        title: { text: 'Sales ($1,000s)' },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                                color: 'gray'
                            }
                        }
                    },
                    tooltip: { shared: true },
                    plotOptions: {
                        column: {
                            stacking: 'normal'
                        }
                    },
                    series: rawData.datasets
                        .filter(ds => ds.name.startsWith('Furniture'))
                        .map(ds => ({
                            name: ds.name,
                            data: ds.data,
                            color: ds.name.includes('Asia') ? '#42f55d' : '#66f5a3',
                            type: 'column'
                        }))
                };

            case 4: // Total Units Sold (dual axis)
                const unitsSoldDataset = rawData.datasets.find(ds => ds.name === 'Total Units Sold');
                return {
                    chart: { zoomType: 'xy' },
                    title: { text: 'Total Units Sold' },
                    xAxis: [{ categories: labels }],
                    yAxis: [
                        {
                            title: { text: 'Sales ($1,000s)' }
                        },
                        {
                            title: { text: 'Units Sold' },
                            opposite: true
                        }
                    ],
                    tooltip: { shared: true },
                    series: [
                        {
                            name: unitsSoldDataset.name,
                            data: unitsSoldDataset.data,
                            type: 'line',
                            yAxis: 1,
                            color: '#000'
                        }
                    ]
                };

            default:
                return {};
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const chartOptions = getChartOptions(currentPage);

    return (
        <>
            <div className='component-title'>
                <h1>Highcharts Viewer</h1>
            </div>
            <div className="chart-viewer">
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />

                <div className="pagination">
                    <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span className="page-indicator">
                        Page {currentPage} of 4
                    </span>
                    <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === 4}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default HighCharts;
