import useWindowSize from "@utils/helpers/ReactHelper";
import Head from "next/head";

function HeadPage({ title, css, withDefaultCss = false }: { title: string; css?: string, withDefaultCss?: boolean }) {
  const { isMobile } = useWindowSize();
  return (
    <Head>
      <title>{`${title} | ${process.env.NEXT_PUBLIC_APPNAME ?? "APP"}`}</title>
      {
        withDefaultCss && (
          <link
            rel="stylesheet"
            type="text/css"
            href={`/css/table/ListingDesktop.css`}
          />
        )
      }
      {
        isMobile && (
          <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
        )
      }
      <link rel="stylesheet" type="text/css" href={`/css/${css}`} />
    </Head>
  );
}

export default HeadPage;
