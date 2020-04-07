import React from "react";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Footer/Footer";
import SEO from "../components/seo";

const Index = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Footer slimFooter={false} />
    </Layout>
  );
};

export default Index;
