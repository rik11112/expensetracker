'use client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useGetPayments from '@src/hooks/payments/useGetPayments';
import {getJustDate} from '@src/util/dates';

export default function BalanceOverTime() {
    const {payments} = useGetPayments();

    if (!payments) return <div>Loading...</div>;

    // Line graph showing the balance over time
    const balanceOverTimeOptions = {
        chart: {
            type: 'spline',
        },
        title: {
            text: 'Balance over time',
        },
        xAxis: {
            type: 'datetime',
        },
        yAxis: {
            title: {
                text: 'Balance',
            },
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: €{point.y:.2f}',
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: true,
                    radius: 2.5,
                },
            },
        },
        series: [
            {
                name: 'Balance',
                data: payments
                    ?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .reduce((acc, payment) => {
                        const date = new Date(payment.date);
                        const amount = payment.amount / 100;
                        const newBal = amount + (acc[acc.length - 1]?.[1] || 0);
                        if (
                            acc.length > 0 &&
                            getJustDate(date).getTime() === getJustDate(new Date(acc[acc.length - 1][0])).getTime()
                        ) {
                            // This payment happened on the same day as the previous one, so we just add the amounts together
                            const prev = acc.pop();
                            acc.push([date.getTime(), amount + prev![1]]);
                        } else {
                            // This payment happened on a different day than the previous one, so we just add it to the array
                            acc.push([date.getTime(), newBal]);
                        }
                        return acc;
                    }, [] as [number, number][]),
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={balanceOverTimeOptions} />;
}
