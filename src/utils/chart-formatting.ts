export function pieChartTooltipFormatter(this: Highcharts.TooltipFormatterContextObject): string {
    return (
        this.point.name + '<b> € ' + this?.point?.y?.toFixed(2) + ' (' + this?.point?.percentage?.toFixed(1) + '%)</b>'
    );
}
