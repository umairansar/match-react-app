const ApiClient = (baseUrl: string) => {

    async function GET<TResponse>(endpoint: string) : Promise<TResponse> {
        const response = await fetch(baseUrl+endpoint);
        return await response.json();
    }
    
    async function POST<TRequest extends BodyInit, TResponse>(endpoint: string, body:TRequest) : Promise<TResponse> {
        const response = await fetch(baseUrl+endpoint, {method:'POST', body});
        return await response.json();
    }

    return {
        get: <TResponse>(endpoint: string) => GET<TResponse>(endpoint),
        post: <TRequest extends BodyInit, TResponse>(endpoint:string, body:TRequest) => POST<TRequest, TResponse>(endpoint, body),
    }
}

export default ApiClient;