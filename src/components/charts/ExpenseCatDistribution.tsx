'use client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useGetPayments from '@src/hooks/payments/useGetPayments';
import {pieChartTooltipFormatter} from '@src/utils/chart-formatting';

export default function ExpenseCatDistribution() {
    const {payments} = useGetPayments();

    if (!payments) return <div>Loading...</div>;

    const expenseCatDistributionOptions = {
        title: {
            text: 'Uitgaven Categorie verdeling',
        },
        tooltip: {
            formatter: pieChartTooltipFormatter,
        },
        accessibility: {
            point: {
                valueSuffix: '%',
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                },
                showInLegend: true,
            },
        },
        series: [
            {
                type: 'pie',
                data: payments?.reduce((acc, payment) => {
                    const category = payment.category.name;
                    const amount = -payment.amount / 100;
                    const index = acc.findIndex((item) => item.name === category);
                    if (amount < 1) return acc;
                    if (index === -1) {
                        acc.push({
                            name: category,
                            y: amount,
                            color: payment.category.color,
                        });
                    } else {
                        acc[index].y += amount;
                    }
                    return acc;
                }, [] as {name: string; y: number; color: string}[]),
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={expenseCatDistributionOptions} />;
}
