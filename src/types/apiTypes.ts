export interface ApiTypes {
    constants: ApiConstantsInterface;

    processHealth(): Promise<HealthInterface>;

    makeGet(service: string, params?: string): Promise<any>;

    makeApiEndpoint(service: string, params?: string): string;

    getIdentity(): Promise<IdentityInterface>;

    networkConnected(): Promise<any>;

    getUser(): Promise<any>;
}

export interface HealthInterface {
    execution: string;
    status: string;
}

export interface IdentityInterface {
    execution: string;
    status: string;
    result: Array<IdentityResultInterface>
}

export interface IdentityResultInterface {
    certificates: Array<any>;
    contacts: Array<any>;
    date: string;
    // eslint-disable-next-line camelcase
    global_id: string;
    idurl: string;
    name: string;
    postage: string;
    publickey: string;
    revision: string;
    scrubbers: Array<any>;
    signature: string;
    sources: Array<string>;
    version: string;
}

export interface MakeGetInterface {
    service: string;
    params: string;
}

export interface ApiConstantsInterface {
    PORT: string;
    API_URL: string;
    API_VERSION: string;
    OK: string;
    ERROR: string;
}
