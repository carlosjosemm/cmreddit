import React from 'react';
import {Formik, Form} from 'formik';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/inputField';
import { Box, Button } from '@chakra-ui/react';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from "next/router";
import {withUrqlClient} from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';


interface registerProps {};

export const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter();
    const [{},register] = useRegisterMutation();
        return (
        <Wrapper variant='small'>
            <Formik 
                initialValues={{username:"", password:""}}
                onSubmit={async (values, {setErrors}) => {
                    const response = await register({user: values.username, pass: values.password});
                    if (response.data?.register.errors) {
                        setErrors(
                            toErrorMap(response.data?.register.errors)
                        )
                    } else if (response.data?.register.user) {
                        //navigate to landing page with logged in user info
                        router.push("/");
                    }
                }}
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
                                type="password"
                            />
                        </Box>

                        <Button 
                            mt={4} 
                            isLoading={isSubmitting} 
                            type='submit' 
                            colorScheme='teal'>
                                Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
        );
}

export default withUrqlClient(createUrqlClient)(Register);