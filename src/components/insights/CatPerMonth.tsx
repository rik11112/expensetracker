"use client";

import { Payment, Category } from '@prisma/client';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type PaymentWithCategory = (Payment & {
    category: Category;
})[]

export default function CatPerMonth({ payments }: { payments: PaymentWithCategory }) {
    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Corn vs wheat estimated production for 2023'
        },
        subtitle: {
            text: 'Source: <a target="_blank" href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>'
        },
        xAxis: {
            categories: ['USA', 'China', 'Brazil', 'EU', 'Argentina', 'India'],
            crosshair: true,
            accessibility: {
                description: 'Countries'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '1000 metric tons (MT)'
            }
        },
        tooltip: {
            valueSuffix: ' (1000 MT)'
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Corn',
                data: [387749, 280000, 129000, 64300, 54000, 34300]
            },
            {
                name: 'Wheat',
                data: [45321, 140000, 10000, 140500, 19500, 113500]
            }
        ]
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};