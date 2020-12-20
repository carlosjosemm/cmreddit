import React from 'react';
import {Formik, Form} from 'formik';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/inputField';
import { Box, Button } from '@chakra-ui/react';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from "next/router";
import { createUrqlClient } from '../utils/createUrqlClient';
import {withUrqlClient} from 'next-urql';

export const Login: React.FC<{}> = ({}) => {
    const router = useRouter(); //hook to navigate through pages
    const [{}, login] = useLoginMutation(); //hook to call the graphQL login query
    const handleForgot = () => {
        router.push("/forgot");
    };
        return (
        <Wrapper variant='small'>
            <Formik 
                initialValues={{usernameOrEmail:"", password:""}} 
                onSubmit={
                    async (inputValues, {setErrors}) => {
                        const response = await login({
                            userOrEmail: inputValues.usernameOrEmail, 
                            pass: inputValues.password
                        });

                        if (response.data?.login.errors) {
                            setErrors(
                                toErrorMap(response.data?.login.errors)
                            );
                        } else if (response.data?.login.user) {
                            //navigate to landing page with logged in user info
                            router.push("/");
                        }
                    }
                }
            >         
                {({isSubmitting}) => (
                    <Form>
                        <InputField
                            name="usernameOrEmail"
                            placeholder="username or email"
                            label="Username or email"
                        />

                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password" //this 'type' prop hides characters from sight during input
                            />
                        </Box>

                        <Box display={'flex'} justifyContent={'space-between'}>
                        <Button 
                            mt={4} //margin top
                            isLoading={isSubmitting} //loading animation on the button during 'await'
                            type='submit' 
                            colorScheme='teal'>
                                Login
                        </Button>
                        <Button 
                            mt={4} //margin top
                            ml={2}
                            isLoading={isSubmitting} //loading animation on the button during 'await'
                            type='button' 
                            onClick={() => handleForgot()}
                            colorScheme='red'>
                                Forgot password?
                        </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Wrapper>
        );
}

export default withUrqlClient(createUrqlClient)(Login);