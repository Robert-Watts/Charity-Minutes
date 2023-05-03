import * as React from "react";
import PageTitle from "./PageTitle";


type Props = {
    title?: any;
    children?: any;
}

const Page: React.FC<Props> = ({ title, children }: Props) => {
    return (
        <>
            <PageTitle title={title} />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {{children}}
                </div>
            </main>
        </>
    )
}
