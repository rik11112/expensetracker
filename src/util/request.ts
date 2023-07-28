import axios from "axios";

export async function get(url: string): Promise<any> {
    try {
        return (await axios.get(url)).data;
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            return null;
        }
        console.error(err);
        return null;
    }
}

export async function post<T>(url: string, data: any): Promise<T> {
    return (await axios.post(url, data)).data;
}

export async function put<T>(url: string, data: any): Promise<T> {
    return (await axios.put(url, data)).data;
}

export const del = async (url: string) => (await axios.delete(url)).data;