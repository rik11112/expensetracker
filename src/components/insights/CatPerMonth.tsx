"use client";

import { Payment, Category } from '@prisma/client';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import { format } from 'date-fns';

type PaymentWithCategory = (Payment & {
    category: Category;
})[]

// export default function CatPerMonth({ payments }: { payments: PaymentWithCategory }) {
//     const options = {
//         chart: {
//             type: 'column'
//         },
//         title: {
//             text: 'Corn vs wheat estimated production for 2023'
//         },
//         subtitle: {
//             text: 'Source: <a target="_blank" href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>'
//         },
//         xAxis: {
//             categories: ['USA', 'China', 'Brazil', 'EU', 'Argentina', 'India'],
//             crosshair: true,
//             accessibility: {
//                 description: 'Countries'
//             }
//         },
//         yAxis: {
//             min: 0,
//             title: {
//                 text: '1000 metric tons (MT)'
//             }
//         },
//         tooltip: {
//             valueSuffix: ' (1000 MT)'
//         },
//         plotOptions: {
//             column: {
//                 pointPadding: 0.2,
//                 borderWidth: 0
//             }
//         },
//         series: [
//             {
//                 name: 'Corn',
//                 data: [387749, 280000, 129000, 64300, 54000, 34300]
//             },
//             {
//                 name: 'Wheat',
//                 data: [45321, 140000, 10000, 140500, 19500, 113500]
//             }
//         ]
//     };

//     return (
//         <div>
//             <HighchartsReact highcharts={Highcharts} options={options} />
//         </div>
//     );
// };


type CategoryData = {
    [key: string]: {
        [category: string]: number;
    };
};

const formatData = (payments: PaymentWithCategory) => {
    return payments.reduce((acc: CategoryData, payment) => {
        const month = format(new Date(payment.date), 'MMM yy');
        if (!acc[month]) {
            acc[month] = {};
        }
        if (!acc[month][payment.category.name]) {
            acc[month][payment.category.name] = 0;
        }
        acc[month][payment.category.name] += payment.amount;
        return acc;
    }, {});
};

const getSeriesData = (data: CategoryData, categoryColorMap: CategoryColorMap) => {
    const categories = Object.keys(data);
    const series: Highcharts.SeriesColumnOptions[] = [];

    const categoryNames = new Set<string>();
    categories.forEach(month => {
        Object.keys(data[month]).forEach(category => {
            categoryNames.add(category);
        });
    });

    categoryNames.forEach(category => {
        const seriesData = categories.map(month => data[month][category] || 0);
        series.push({
            type: 'column',
            name: category,
            data: seriesData,
            color: categoryColorMap[category] || 'gray',
        });
    });

    return { categories, series };
};

type CategoryColorMap = {
    [key: string]: string;
};

const getCategoryColorMap = (payments: PaymentWithCategory) => {
    const colorMap: { [key: string]: string } = {};
    payments.forEach(payment => {
        colorMap[payment.category.name] = payment.category.color;
    });
    return colorMap;
}

export default function CatPerMonth({ payments }: { payments: PaymentWithCategory }) {
    const data = useMemo(() => formatData(payments), [payments]);
    const categoryColorMap = useMemo(() => getCategoryColorMap(payments), [payments]);
    const { categories, series } = useMemo(() => getSeriesData(data, categoryColorMap), [data, categoryColorMap]);

    const options: Highcharts.Options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Monthly Spending by Category'
        },
        subtitle: {
            text: 'Source: Your Expense Tracker'
        },
        xAxis: {
            categories,
            crosshair: true,
            accessibility: {
                description: 'Months'
            }
        },
        yAxis: {
            title: {
                text: 'Amount (€)'
            },
            labels: {
                formatter: function () {
                    return '€' + this.value;
                }
            }
        },
        tooltip: {
            valuePrefix: '€'
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}