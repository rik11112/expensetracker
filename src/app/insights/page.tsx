import SetDateParam from './SetDateParam';

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
        <div className="mx-3">
            <h2 className="inline text-blue text-4xl h-6">Charts</h2>
            <div className="flex gap-3">
                <SetDateParam name="since" current={since} defaultDate={twoMonthsAgo} />
                <SetDateParam name="until" current={until} defaultDate={new Date()} />
            </div>
            <p>Since: {since.toISOString()}</p>
            <p>Until: {until.toISOString()}</p>
        </div>
    );
}
