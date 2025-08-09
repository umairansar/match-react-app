// Inspired by 
// https://www.newline.co/@bespoyasov/how-to-use-fetch-with-typescript--a81ac257
// https://javascript.plainenglish.io/building-a-better-react-application-with-repository-and-adapter-design-patterns-3e089f43fbc8

const ApiClient = (baseUrl: string) => {

    async function GET<TResponse>(endpoint: string) : Promise<TResponse> {
        const response = await fetch(baseUrl+endpoint);
        return (response.json()) as TResponse;
    }
    
    async function POST<TRequest extends BodyInit, TResponse>(endpoint: string, body:TRequest) : Promise<TResponse> {
        const response = await fetch(baseUrl+endpoint, {method: 'POST', body: body, headers: {"Content-Type": "application/json"}});
        return (response.json()) as TResponse;
    }

    return {
        get: <TResponse>(endpoint: string) => GET<TResponse>(endpoint),
        post: <TRequest, TResponse>(endpoint:string, body:TRequest) => POST<BodyInit, TResponse>(endpoint, JSON.stringify(body)),
    }
}

export default ApiClient;