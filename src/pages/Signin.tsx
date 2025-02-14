import { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Form, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


// Reused animation variants
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.1 + 0.3 }
    })
};



export const Signin = () => {

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            localStorage.removeItem('accessToken');
        }
        if (localStorage.getItem('user')) {
            localStorage.removeItem('user');
        }
    }, []);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await login(formData.email, formData.password);
            navigate('/');
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message || 'Login failed');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <Container className="min-vh-100 d-flex align-items-center justify-content-center">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="auth-container p-5 rounded-4 shadow-lg"
                style={{ maxWidth: '500px', width: '100%', backgroundColor: '#f8f9fa' }}
            >
                <motion.h2
                    className="text-center mb-4 display-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Sign In
                </motion.h2>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <Alert variant="danger" className="mb-4">
                                {error}
                            </Alert>
                        </motion.div>
                    )}
                </AnimatePresence>

                <Form onSubmit={handleSubmit}>
                    <motion.div custom={0} variants={inputVariants}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </Form.Group>
                    </motion.div>

                    <motion.div custom={1} variants={inputVariants}>
                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </Form.Group>
                    </motion.div>

                    <motion.div
                        variants={inputVariants}
                        custom={2}
                        className="d-grid gap-2"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Button
                            variant="primary"
                            type="submit"
                            size="lg"
                        >
                            Sign In
                        </Button>
                    </motion.div>
                </Form>

                <motion.div
                    className="text-center mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <span className="text-muted">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-decoration-none">
                            Sign up here
                        </Link>
                    </span>
                </motion.div>
            </motion.div>
        </Container>
    );
};