import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import rawData from '../data/data.json';
import './Charts.css'; // Reuse same styles

function Echarts() {
    const chartRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);

    const labels = rawData.labels;

    const getOption = (page) => {
        switch (page) {
            case 1: // Electronics
                return {
                    title: { text: 'Electronics Sales by Region', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: { type: 'category', data: labels },
                    yAxis: { type: 'value', name: 'Sales ($1,000s)' },
                    series: rawData.datasets
                        .filter(ds => ds.name.startsWith('Electronics'))
                        .map(ds => ({
                            name: ds.name,
                            type: 'bar',
                            data: ds.data,
                            itemStyle: {
                                color: ds.name.includes('North America') ? '#4287f5' : '#7baaf7'
                            }
                        })),
                    legend: { bottom: 0 }
                };

            case 2: // Clothing
                return {
                    title: { text: 'Clothing Sales by Region', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: { type: 'category', data: labels },
                    yAxis: { type: 'value', name: 'Sales ($1,000s)' },
                    series: rawData.datasets
                        .filter(ds => ds.name.startsWith('Clothing'))
                        .map(ds => ({
                            name: ds.name,
                            type: 'line',
                            data: ds.data,
                            lineStyle: {
                                color: ds.name.includes('North America') ? '#f5426f' : '#f5a142'
                            },
                            symbol: 'circle'
                        })),
                    legend: { bottom: 0 }
                };

            case 3: // Furniture (stacked)
                return {
                    title: { text: 'Furniture Sales by Region (Stacked)', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: { type: 'category', data: labels },
                    yAxis: { type: 'value', name: 'Sales ($1,000s)' },
                    series: rawData.datasets
                        .filter(ds => ds.name.startsWith('Furniture'))
                        .map(ds => ({
                            name: ds.name,
                            type: 'bar',
                            stack: 'furniture',
                            data: ds.data,
                            itemStyle: {
                                color: ds.name.includes('Asia') ? '#42f55d' : '#66f5a3'
                            }
                        })),
                    legend: { bottom: 0 }
                };

            case 4: // Total Units Sold (with second Y-axis)
                const totalUnits = rawData.datasets.find(ds => ds.name === 'Total Units Sold');
                return {
                    title: { text: 'Total Units Sold', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: { type: 'category', data: labels },
                    yAxis: [
                        {
                            type: 'value',
                            name: 'Sales ($1,000s)'
                        },
                        {
                            type: 'value',
                            name: 'Units Sold'
                        }
                    ],
                    series: [
                        {
                            name: totalUnits.name,
                            type: 'line',
                            data: totalUnits.data,
                            yAxisIndex: 1,
                            lineStyle: { color: '#000' }
                        }
                    ],
                    legend: { bottom: 0 }
                };

            default:
                return {};
        }
    };

    // Render chart on mount and page change
    useEffect(() => {
        const chartDom = chartRef.current;
        const chart = echarts.init(chartDom);
        const option = getOption(currentPage);
        chart.setOption(option);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        return () => chart.dispose(); // Cleanup
    }, [currentPage]);

    return (
        <>
            <div className='component-title'>
                <h1>Echarts Viewer</h1>
            </div>
            <div className="chart-viewer">
                <div
                    ref={chartRef}
                    style={{ width: '100%', height: '500px' }}
                ></div>

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

export default Echarts;
