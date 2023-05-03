import * as React from "react";
import { Helmet } from "react-helmet";

type Props = {
    title?: string;
    favicon?: string;
};

/**
 *
 * @param title The page title
 * @param favicon A custom Favicon for the page you're on
 */
const PageTitle: React.FC<Props> = ({ title, favicon }: Props) => {
    return (
        <Helmet>
            <title>{title && `${title} - `}Charity Minutes</title>
            {favicon ? (
                <link rel="shortcut icon" href={favicon} />
            ) : (
                <link
                    rel="shortcut icon"
                    type="image/png"
                    href="/assets/favicon.ico"
                    sizes="32x32"
                />
            )}
        </Helmet>
    );
};

export default PageTitle;
