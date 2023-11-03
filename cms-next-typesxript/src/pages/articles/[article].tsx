import Head from "next/head";
import { IArticle, IArticleFields } from "../../contentful";
import { Container } from "reactstrap";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "../../contentfulCMS/index";

export default function Article({ article }: { article: IArticle }) {
  return (
    <>
      <Head>
        <title>{article.fields.title}</title>
      </Head>

      <Container
        style={{
          minHeight: "100vh",
        }}
      >
        <h1 className="py-3">{article.fields.title}</h1>
        <div className="py-2">
          {documentToReactComponents(article.fields.content!)}
        </div>
      </Container>
    </>
  );
}

export const getStaticPaths = async () => {
  const articleEntries = await client.getEntries<IArticleFields | any>({
    content_type: "article",
    // select: "fields.slug",
  });

  console.log("articleEntries", articleEntries);

  return {
    paths: articleEntries.items.map((item) => {
      return {
        params: {
          article: item.fields.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.article!;

  const articleEntries = await client.getEntries<IArticleFields | any>({
    content_type: "article",
    limit: 1,
    "fields.slug": slug,
  });

  const [article] = articleEntries.items;
  console.log("getStaticProps");

  return { props: { article } };
};
