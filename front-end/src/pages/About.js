
import { Layout, Row, Col, Card, Typography } from 'antd';
import DefaultLayout from '../components/DefaultLayout';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const AboutUsPage = () => {
  return (
        <DefaultLayout>
            <div className="container mt-4">
      <Content style={{ padding: '50px' }}>
        <Row justify="center">
          <Col xs={24} sm={16} md={12} lg={10}>
            <Card style={{ textAlign: 'center' }}>
              <Title level={2}>About Us</Title>
              <Paragraph>
                Welcome to AgriTools Rental! We are dedicated to providing an online platform for farmers and agriculture enthusiasts to rent essential tools and equipment. Our mission is to simplify access to the best agricultural equipment, ensuring that farmers can focus on their work without the hassle of expensive purchases.
              </Paragraph>
              <Paragraph>
                Our team believes in empowering the agricultural community by making high-quality tools available at affordable rental rates. Whether you are a small-scale farmer or managing a large farming operation, AgriTools Rental offers a variety of equipment that fits your needs.
              </Paragraph>
              <Paragraph>
                We strive to make the rental process easy, transparent, and efficient. With our platform, you can browse a wide range of equipment, book them for specific periods, and have them delivered directly to your location.
              </Paragraph>
              <Paragraph>
                Join us on our journey to revolutionize the agricultural industry by making tools and technology more accessible to everyone.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Content>
      </div>
      </DefaultLayout>
  );
};

export default AboutUsPage;
