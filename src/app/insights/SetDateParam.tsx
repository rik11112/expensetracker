'use client';

import {MobileDatePicker} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import {useRouter, useSearchParams} from 'next/navigation';

type SetDateParamProps = {
    name: string;
    current: Date;
    defaultDate: Date;
};

const SetDateParam = ({name, current, defaultDate}: SetDateParamProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const updateSearchParams = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams?.toString());
        params.set(name, value);
        router.push(`?${params.toString()}`);
    };

    return (
        <div className='flex flex-col'>
            <label htmlFor={name} className='font-normal'>{name}</label>
            <MobileDatePicker
                name={name}
                defaultValue={dayjs(current)}
                onChange={(date) => updateSearchParams(name, date?.toISOString() ?? defaultDate.toISOString())}
            />
        </div>
    );
};

export default SetDateParam;
