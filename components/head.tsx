import Head from "next/head";

const HeadComponent = ({title, desc}) => <Head>
    <title>{`Open Blog | ${title}`}</title>
    <meta name="description" content={desc} />
</Head>;

export default HeadComponent;