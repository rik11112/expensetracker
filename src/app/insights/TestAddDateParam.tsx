'use client';

import {useRouter, useSearchParams} from 'next/navigation';

const TestAddDateParam = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const updateSearchParams = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams?.toString());
        params.set(name, value);
        router.push(`?${params.toString()}`);
    };

    return <button onClick={() => updateSearchParams('since', '2024-12-25')}>Set Date</button>;
};

export default TestAddDateParam;