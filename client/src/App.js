import React from "react";
import { Layout, Image, Typography } from "antd";
import Logo from "./Assets/icons8-camera-100.png";
import Home from "./Components/Home";
import styles from "./styles";

const { Title } = Typography;
const { Header, Footer } = Layout;

const App = () => {
  return (
    <Layout style={styles.layout}>
      <Header style={styles.header}>
        <Image preview={false} src={Logo} width={45} style={styles.image} />
        &nbsp;
        <Title style={styles.title}>Instarverse</Title>
      </Header>
      <Home />
      <Footer style={styles.footer}>©2022 Instarverse</Footer>
    </Layout>
  );
};

export default App;
