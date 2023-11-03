import { ReadOutlined } from "@ant-design/icons";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Avatar, Card, Skeleton, Switch, Image } from "antd";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { IArticle, IArticleFields, IHome, IHomeFields } from "../contentful";
import { client } from "../contentfulCMS/index";
// import styles from "./page.module.css";
import { NavLink } from "reactstrap";

const { Meta } = Card;

export default function HomePage({
  home,
  articles,
}: {
  articles: IArticle[];
  home: IHome;
}) {
  console.log("home", home);
  console.log("Articles", articles);

  // ========================================ANTD

  const [loading, setLoading] = useState(false);

  const onChange = (checked: boolean) => {
    setLoading(!checked);
  };
  // ========================================ANTD

  return (
    <>
      <Head>
        <title>{home.fields.title}</title>
      </Head>

      <main >
        <h1 className="mt-5"> Title: {home.fields.title}</h1>
        <div>
          <Image
            alt={`${home.fields.background.fields.title}`}
            className="text-center p-5 text-white"
            width={300}
            src={`http:${home.fields.background?.fields.file?.url}`}
            preview={{
              src: `http:${home.fields.background?.fields.file?.url}`,
            }}
          />
        </div>
        <div className="mb-5">
          Description: {documentToReactComponents(home.fields.description)}
        </div>{" "}
        <div >
          {" "}
          <Switch checked={!loading} onChange={onChange} />
          {articles.map((article) => {
            return (
              <div key={article.fields.slug}>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <NavLink
                      href={`/articles/${article.fields.slug}`}
                      key="read"
                    >
                      <ReadOutlined />
                    </NavLink>,
                  ]}
                >
                  <Skeleton loading={loading} avatar active>
                    <Meta
                      avatar={
                        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
                      }
                      title={article.fields.title}
                      description={article.fields.description}
                    />
                  </Skeleton>
                </Card>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const home = await client.getEntries<IHomeFields  | any>({
    content_type: "home",
    limit: 15,
  });

  const articleEntries = await client.getEntries<IArticleFields | any>({
    content_type: "article",
    limit: 15,
    // select:
    //   "fields.title, fields.slug, fields.description, fields.actions, fields.content",
  });

  const [homePage] = home.items;
  return {
    props: {
      home: homePage,
      articles: articleEntries.items,
    },
  };
};
