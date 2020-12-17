import React from 'react';
import {Formik, Form} from 'formik';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/inputField';
import { Box, Button } from '@chakra-ui/react';
import {useMutation} from 'urql';

interface registerProps {};

const register_mut = `
mutation Register($user: String!, $pass: String!) {
    register(options: {username:$user, password:$pass}) {
      errors {
        field
        message
      }
      user{
        username
        id
      }
    }
  }`;

export const Register: React.FC<registerProps> = ({}) => {
    const [{},register] = useMutation(register_mut);
        return (
        <Wrapper variant='small'>
            <Formik 
                initialValues={{username:"", password:""}}
                onSubmit={async (values) => {
                    const response = await register({user: values.username, pass: values.password});
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

export default Register;