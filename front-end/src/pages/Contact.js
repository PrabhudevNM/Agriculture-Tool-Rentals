
import { Layout, Row, Col, Card, Typography } from 'antd';
import DefaultLayout from '../components/DefaultLayout';

const { Title, Text } = Typography;
const { Content } = Layout;

const ContactPage = () => {
  return (
    <DefaultLayout>
            <div className="container mt-4">
      <Content style={{ padding: '50px' }}>
        <Row justify="center">
          <Col xs={24} sm={16} md={12} lg={8}>
            <Card style={{ textAlign: 'center' }}>
              <Title level={2}>Contact Us</Title>
              <div style={{ marginBottom: '20px' }}>
                <Text strong>Phone:</Text>
                <p>+91 7019760785</p>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <Text strong>Location:</Text>
                <p>1234 Farming Street,<br/>AgriTown, Country 56789</p>
              </div>
              <div>
                <Text>If you have any questions, feel free to reach out by phone or visit us at our location.</Text>
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
      </div>
    </DefaultLayout>
  );
};

export default ContactPage;
