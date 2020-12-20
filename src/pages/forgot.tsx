import { Button, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { resolveHref } from 'next/dist/next-server/lib/router/router';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/inputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Forgot: React.FC<{}> = ({}) => {
    const router = useRouter(); //hook to navigate through pages
    const [{}, forgotPassword] = useForgotPasswordMutation(); //mutation hook
    const toast = useToast();

        return (
            <Wrapper variant='small'>
            <Formik 
                initialValues={{email: ""}} 
                onSubmit={
                    async (inputValues) => {

                        const response = await forgotPassword({
                            email: inputValues.email
                        });

                        if (response.data?.forgotPassword) {
                        //navigate to landing page with logged in user info
                        toast({
                            title: "Check your email inbox please.",
                            description: "We send you an email with instructions",
                            status: "success",
                            duration: 7000,
                            isClosable: true,
                            position: "top"
                        })
                        router.push("/");
                        }
                    }
                }
            >         
                {({isSubmitting}) => (
                    <Form>
                        <InputField
                            name="email"
                            placeholder="email"
                            label="Enter your email"
                        />
                        
                            <Button 
                            mt={4} //margin top
                            isLoading={isSubmitting} //loading animation on the button during 'await'
                            type='submit' 
                            colorScheme='teal'>
                                Change password
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
        );
}

export default withUrqlClient(createUrqlClient)(Forgot);