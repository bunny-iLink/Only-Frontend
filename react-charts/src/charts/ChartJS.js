import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import {
    Chart as ChartJSCore,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import rawData from '../data/data.json';
import './Charts.css';

ChartJSCore.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title
);

function ChartJS() {
    const [currentPage, setCurrentPage] = useState(1);

    const labels = rawData.labels;

    const electronicsDatasets = rawData.datasets
        .filter(ds => ds.name.startsWith('Electronics'))
        .map(ds => ({
            label: ds.name,
            data: ds.data,
            backgroundColor: ds.name.includes('North America') ? '#4287f5' : '#7baaf7',
            type: 'bar'
        }));

    const clothingDatasets = rawData.datasets
        .filter(ds => ds.name.startsWith('Clothing'))
        .map(ds => ({
            label: ds.name,
            data: ds.data,
            borderColor: ds.name.includes('North America') ? '#f5426f' : '#f5a142',
            backgroundColor: 'transparent',
            fill: false,
            type: 'line'
        }));

    const furnitureDatasets = rawData.datasets
        .filter(ds => ds.name.startsWith('Furniture'))
        .map(ds => ({
            label: ds.name,
            data: ds.data,
            backgroundColor: ds.name.includes('Asia') ? '#42f55d' : '#66f5a3',
            stack: 'furniture',
            type: 'bar'
        }));

    const unitsSoldDataset = rawData.datasets.find(ds => ds.name === 'Total Units Sold');
    const unitsSold = [
        {
            label: unitsSoldDataset.name,
            data: unitsSoldDataset.data,
            type: 'line',
            borderColor: '#000',
            backgroundColor: 'transparent',
            yAxisID: 'y1'
        }
    ];

    const baseOptions = (title, isStacked = false, secondAxis = false) => ({
        responsive: true,
        plugins: {
            title: {
                display: false
            }
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
        stacked: isStacked,
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Sales ($1,000s)'
                }
            },
            ...(secondAxis && {
                y1: {
                    type: 'linear',
                    position: 'right',
                    grid: { drawOnChartArea: false },
                    title: { display: true, text: 'Units Sold' }
                }
            })
        }
    });

    // Define charts as an array of objects
    const chartPages = [
        {
            title: 'Electronics Sales by Region',
            type: 'bar',
            datasets: electronicsDatasets,
            options: baseOptions()
        },
        {
            title: 'Clothing Sales by Region',
            type: 'line',
            datasets: clothingDatasets,
            options: baseOptions()
        },
        {
            title: 'Furniture Sales by Region (Stacked)',
            type: 'bar',
            datasets: furnitureDatasets,
            options: baseOptions('', true)
        },
        {
            title: 'Total Units Sold',
            type: 'line',
            datasets: unitsSold,
            options: baseOptions('', false, true)
        }
    ];

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const currentChart = chartPages[currentPage - 1];

    return (
        <>
            <div className='component-title'>
                <h1>Chart.js Viewer</h1>
            </div>
            <div className="chart-viewer">
                <div className="chart-title">{currentChart.title}</div>
                <Chart
                    type={currentChart.type}
                    data={{ labels, datasets: currentChart.datasets }}
                    options={currentChart.options}
                />

                <div className="pagination">
                    <button onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span className="page-indicator">
                        Page {currentPage} of {chartPages.length}
                    </span>
                    <button onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage === chartPages.length}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default ChartJS;
