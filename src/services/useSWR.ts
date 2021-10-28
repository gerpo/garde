import { IConfig, IKey, fetcherFn } from 'swrv/dist/types';

import axios from "../utils/axios";
import { computed } from "vue";
import useSWRV from "swrv";

export default function useSWR(key: IKey, fetcher?: fetcherFn<any> | undefined, options?: IConfig<any, fetcherFn<any>>) {
    if (!fetcher) {
        fetcher = (url) => axios(url).then((res) => res.data);
    }
    if (!options) {
        options = {};
    }
    if (!options.shouldRetryOnError) {
        options.shouldRetryOnError = false;
    }
    if (!options.revalidateOnFocus) {
        options.revalidateOnFocus = false;
    }
    
    const swr = useSWRV(key, fetcher, options);
    
    return {
        ...swr,
        isLoading: swr.isValidating,
        isLoaded: computed(() => swr.data.value !== undefined),
        reload: () => swr.mutate(),
    };
}