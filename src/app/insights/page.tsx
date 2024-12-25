import TestAddDateParam from "./TestAddDateParam";

type InsightsPageProps = {
    searchParams: Promise<{
        since: string;
        until: string;
    }>;
};

const twoMonthsAgo = new Date();
twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

export default async function InsightsPage({searchParams}: InsightsPageProps) {
    let {since = twoMonthsAgo, until = new Date()} = await searchParams;
    since = new Date(since);
    until = new Date(until);

    return (
        <div>
            <h1>Insights</h1>
            <p>Since: {since.toISOString()}</p>
            <p>Until: {until.toISOString()}</p>

            <TestAddDateParam />
        </div>
    );
}