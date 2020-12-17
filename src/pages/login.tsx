import React from 'react';
import {Formik, Form} from 'formik';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/inputField';
import { Box, Button } from '@chakra-ui/react';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from "next/router";

export const Login: React.FC<{}> = ({}) => {
    const router = useRouter(); //hook to navigate through pages
    const [{}, login] = useLoginMutation(); //hook to call the graphQL login query
        return (
        <Wrapper variant='small'>
            <Formik 
                initialValues={{username:"", password:""}} 
                onSubmit={
                    async (values, {setErrors}) => {
                        const response = await login({
                            user: values.username, 
                            pass: values.password
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
                            name="username"
                            placeholder="username"
                            label="Username"
                        />

                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password" //this 'type' prop hides characters from sight during input
                            />
                        </Box>

                        <Button 
                            mt={4} //margin top
                            isLoading={isSubmitting} //loading animation on the button during 'await'
                            type='submit' 
                            colorScheme='teal'>
                                Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
        );
}

export default Login;