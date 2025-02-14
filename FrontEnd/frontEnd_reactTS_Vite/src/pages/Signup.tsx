import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Container,  Form, Button, Alert } from 'react-bootstrap';




// Animation variants
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

const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
};

export const Signup = () => {

   

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await signup({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            });
            navigate('/');
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError((error as any).response?.data || 'Signup failed');
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
                    Create Account
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
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </Form.Group>
                    </motion.div>

                    <motion.div custom={1} variants={inputVariants}>
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

                    <motion.div custom={2} variants={inputVariants}>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password (min 6 characters)"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </Form.Group>
                    </motion.div>

                    <motion.div custom={3} variants={inputVariants}>
                        <Form.Group className="mb-4">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                        </Form.Group>
                    </motion.div>

                    <motion.div
                        variants={inputVariants}
                        custom={4}
                        className="d-grid gap-2"
                    >
                        <Button
                            variant="primary"
                            type="submit"
                            as={motion.button}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            size="lg"
                        >
                            Sign Up
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
                        Already have an account?{' '}
                        <Link to="/signin" className="text-decoration-none">
                            Login here
                        </Link>
                    </span>
                </motion.div>
            </motion.div>
        </Container>
    );
};


