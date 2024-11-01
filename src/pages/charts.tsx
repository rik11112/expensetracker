import Navbar from "@src/components/Navbar"
import displayPayments from "@src/components/payments/displayPayments"
import prisma from "@src/lib/prisma"
import { getPaymentsFromMonths } from "@src/services/serverside/serversidefetching"
import { QueryClient, dehydrate } from "@tanstack/react-query"
import { GetServerSidePropsContext } from "next"
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { getJustDate } from "@src/util/dates"

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const queryClient = new QueryClient()

    await Promise.all([
        queryClient.prefetchQuery(["categories"], () => prisma.category.findMany()),
        queryClient.prefetchQuery(["payments", 1], () => getPaymentsFromMonths(1)),
    ])

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        }
    }
}

function pieChartTooltipFormatter (this: Highcharts.TooltipFormatterContextObject): string {
    return this.point.name + '<b> € ' + this?.point?.y?.toFixed(2) + ' (' + this?.point?.percentage?.toFixed(1) + '%)</b>';
}

export default function Home() {
    const {
        selectMonths,
        payments,
        downloadButton,
    } = displayPayments();

    if (!payments) return <div>Loading...</div>

    const expenseCatDistributionOptions = {
        title: {
            text: 'Uitgaven Categorie verdeling'
        },
        tooltip: {
            formatter: pieChartTooltipFormatter,
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            data: payments?.reduce((acc, payment) => {
                const category = payment.category.name;
                const amount = -payment.amount / 100;
                const index = acc.findIndex((item) => item.name === category);
                if (amount < 1) return acc;
                if (index === -1) {
                    acc.push({ name: category, y: amount })
                } else {
                    acc[index].y += amount;
                }
                return acc;
            }, [] as { name: string, y: number }[])
        }]
    }

    const incomeCatDistributionOptions = {
        title: {
            text: 'Inkomsten Categorie verdeling'
        },
        tooltip: {
            formatter: pieChartTooltipFormatter,
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            data: payments?.reduce((acc, payment) => {
                const category = payment.category.name;
                const amount = payment.amount / 100;
                const index = acc.findIndex((item) => item.name === category);
                if (amount < 1) return acc;
                if (index === -1) {
                    acc.push({ name: category, y: amount })
                } else {
                    acc[index].y += amount;
                }
                return acc;
            }, [] as { name: string, y: number }[])
        }]
    }

    // Line graph showing the balance over time
    const balanceOverTimeOptions = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Balance over time'
        },
        xAxis: {
            type: 'datetime',
        },
        yAxis: {
            title: {
                text: 'Balance'
            }
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: €{point.y:.2f}'
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: true,
                    radius: 2.5
                }
            }
        },
        series: [
            {
                name: 'Balance',
                data: payments?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .reduce((acc, payment) => {
                        const date = new Date(payment.date);
                        const amount = payment.amount / 100;
                        const newBal = amount + (acc[acc.length - 1]?.[1] || 0);
                        if (acc.length > 0 && getJustDate(date).getTime() === getJustDate(new Date(acc[acc.length - 1][0])).getTime()) {
                            // This payment happened on the same day as the previous one, so we just add the amounts together
                            const prev = acc.pop();
                            acc.push([date.getTime(), amount + prev![1]])
                        } else {
                            // This payment happened on a different day than the previous one, so we just add it to the array
                            acc.push([date.getTime(), newBal]);
                        }
                        return acc;
                    }, [] as [number, number][])
            }
        ]
    }

    return <>
        <Navbar currentPage="charts" />
        <section className="w-5/6 mx-auto min-h-fit pt-7">
            <h2 className="inline text-blue text-4xl h-6">Charts</h2>
            <div className="p-3 flex justify-between items-center">{selectMonths} {downloadButton}</div>
            <HighchartsReact
                highcharts={Highcharts}
                options={balanceOverTimeOptions}
            />
            <HighchartsReact
                highcharts={Highcharts}
                options={incomeCatDistributionOptions}
            />
            <HighchartsReact
                highcharts={Highcharts}
                options={expenseCatDistributionOptions}
            />
        </section>
    </>
}
