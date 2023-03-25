import * as React from "react";
import PageTitle from "./PageTitle";


type Props = {
    title: any;
    children?: any;
}

const FormPage: React.FC<Props> = ({ title, children }: Props) => {
    return (
        <>
            <PageTitle title={title} />
            <main>
                <div className="pt-10 md:pt-0 flex h-screen items-start justify-center md:items-center bg-slate-200">
                    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow sm:p-6 md:p-8">
                        {title && <h5 className="text-center text-xl font-medium text-gray-900">{title}</h5> }
                        {children}
                    </div>
                </div>
            </main>
        </>
    )
}

export default FormPage;
