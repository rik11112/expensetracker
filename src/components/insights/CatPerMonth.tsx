'use client';

import {Payment, Category} from '@prisma/client';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {useMemo} from 'react';
import {format} from 'date-fns';

type PaymentWithCategory = (Payment & {
    category: Category;
})[];

type CategoryData = {
    [key: string]: {
        [category: string]: number;
    };
};

const formatData = (payments: PaymentWithCategory) => {
    /**
    * Why sort the payments and not the categories?
    * 
    * By sorting the payments by date before reducing them, 
    * we can utilize their conventional date format to sort them chronologically before reducing them into the desired format.
    * 
    * It's hard to sort the categories because they are in a weird format that isn't easy to convert to a sortable format.
    */
    const sortedPayments = payments.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
    });

    return sortedPayments.reduce((acc: CategoryData, payment) => {
        const month = format(new Date(payment.date), "MMM ''yy");
        if (!acc[month]) {
            acc[month] = {};
        }
        if (!acc[month][payment.category.name]) {
            acc[month][payment.category.name] = 0;
        }
        acc[month][payment.category.name] += payment.amount / 100;
        return acc;
    }, {});
};

const getSeriesData = (data: CategoryData, categoryColorMap: CategoryColorMap) => {
    const categories = Object.keys(data);
    const series: Highcharts.SeriesColumnOptions[] = [];

    const categoryNames = new Set<string>();
    categories.forEach((month) => {
        Object.keys(data[month]).forEach((category) => {
            categoryNames.add(category);
        });
    });

    categoryNames.forEach((category) => {
        const seriesData = categories.map((month) => {
            const value = data[month][category] || 0;
            return value < 0 ? -value : 0; // Flip negative values to positive and filter out positive values
        });
        series.push({
            type: 'column',
            name: category,
            data: seriesData,
            color: categoryColorMap[category] || 'gray',
        });
    });

    return {categories, series};
};

type CategoryColorMap = {
    [key: string]: string;
};

const getCategoryColorMap = (payments: PaymentWithCategory) => {
    const colorMap: {[key: string]: string} = {};
    payments.forEach((payment) => {
        colorMap[payment.category.name] = payment.category.color;
    });
    return colorMap;
};

export default function CatPerMonth({payments}: {payments: PaymentWithCategory}) {
    const data = useMemo(() => formatData(payments), [payments]);
    console.log('data', data);
    const categoryColorMap = useMemo(() => getCategoryColorMap(payments), [payments]);
    const {categories, series} = useMemo(() => getSeriesData(data, categoryColorMap), [data, categoryColorMap]);

    const options: Highcharts.Options = {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Monthly Spending by Category',
        },
        subtitle: {
            text: 'Note: Work in progress',
        },
        xAxis: {
            categories,
            crosshair: true,
            accessibility: {
                description: 'Months',
            },
        },
        yAxis: {
            title: {
                text: 'Amount (€)',
            },
            labels: {
                formatter: function () {
                    return '€' + parseFloat(this.value.toString()).toFixed(0);
                },
            },
        },
        tooltip: {
            valuePrefix: '€',
            valueDecimals: 2,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
            series: {
                events: {
                    legendItemClick: function () {
                        if (this.name === 'investeringen') {
                            return false; // Disable toggling for 'investeringen'
                        }
                    },
                },
            },
        },
        series: series.map((s) => ({
            ...s,
            visible: s.name !== 'investeringen', // Disable 'investeringen' by default
        })),
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}
