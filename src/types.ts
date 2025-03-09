// src/types.ts

export type PageContext = {
    Page: (pageProps: any) => React.ReactElement;
    pageProps?: any;
    documentProps?: {
        title?: string;
        description?: string;
    }
};