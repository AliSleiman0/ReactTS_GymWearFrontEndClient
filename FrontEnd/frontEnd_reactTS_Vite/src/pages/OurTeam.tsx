import { Container, Card, Row, Col, Image } from 'react-bootstrap';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
const teamMembers = [
    {
        id: 1,
        name: 'Ali Sleiman',
        role: 'Full Stack Developer',
        bio: 'Third-year Computer Engineering student with expertise in .NET, React, and TypeScript. Manages full-stack development and system architecture.',
        image: '/pf.jpg', // Replace with actual image URL
    },
    // Add more team members here
];

const OurTeam = () => {
    return (<>
        <Navbar />

        <Container className="my-5 pt-5">
            <h1 className="text-center mb-4 ">Our Team</h1>

            <Row >
                {teamMembers.map((member) => (
                    <Col key={member.id} md={12}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body className="text-center">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    className="mb-3"
                                    style={{ width: 'auto', height: '50vh' }}
                                />
                                <h3>{member.name}</h3>
                                <p className="text-black">{member.role}</p>
                                <p>{member.bio}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        <Footer />
    </>
    );
};

export default OurTeam;